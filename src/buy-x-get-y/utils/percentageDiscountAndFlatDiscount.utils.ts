export const findGetProductValid = (data: any): boolean => {
	const { buyProducts, getProducts, sanitizedLineItem } = data

	const buyProductVariantIdsValid = buyProducts.every((ids: any) => {
		const { variantId, count } = ids

		return sanitizedLineItem[variantId] && sanitizedLineItem[variantId].quantity >= count
	})

	const getProductVariantIdsValid = getProducts.every((ids: any) => {
		const { variantId, count } = ids

		return sanitizedLineItem[variantId] && sanitizedLineItem[variantId].quantity >= count
	})

	const isValid = buyProductVariantIdsValid && getProductVariantIdsValid ? true : false

	return isValid
}

export const findBuyProductValid = (data: any): boolean => {
	const { buyProducts, sanitizedLineItem } = data

	const buyProductVariantIdsValid = buyProducts.every((ids: any) => {
		const { variantId, count } = ids

		return sanitizedLineItem[variantId] && sanitizedLineItem[variantId].quantity >= count
	})

	const isValid = buyProductVariantIdsValid ? true : false

	return isValid
}

export const applyProductDiscount = (data: any): object => {
	const {
		overAll,
		getProductValid,
		getProductVariantIds,
		buyProductVariantIds,
		sanitizedLineItem,
		discountType,
		discountValue
	} = data

	let discount = discountValue

	let cartTotal = 0

	const validationProductArray = getProductValid ? getProductVariantIds : buyProductVariantIds

	const finalProductArray = overAll ? Object.values(sanitizedLineItem) : validationProductArray

	finalProductArray.forEach((val: any) => {
		const product = overAll ? val : sanitizedLineItem[val]

		const { unitPrice, quantity } = product

		cartTotal += unitPrice * quantity
	})

	return finalProductArray.map((val: any) => {
		const product = overAll ? val : sanitizedLineItem[val]

		const { unitPrice, quantity, variantId, productId } = product

		if (discountType === "percentage") {
			if (discountValue >= 100) discount = 100

			const getEditedPrice = quantity * unitPrice - quantity * unitPrice * (discount / 100)

			const finalDiscount = { productId, variantId, quantity: quantity, unitPrice: getEditedPrice / quantity }

			return finalDiscount
		} else {
			const getPercentage = ((quantity * unitPrice) / cartTotal) * 100

			const getPercentageAmount = (getPercentage / 100) * discountValue

			const getEditedPrice = quantity * unitPrice - getPercentageAmount

			const finalDiscount = {
				productId,
				variantId,
				quantity: quantity,
				unitPrice: getEditedPrice / quantity
			}

			return finalDiscount
		}
	})
}

export const findCollectionValid = (data: any) => {
	const {
		offerCategory,
		getCollectionValid,
		buyCollections,
		buyCollectionsCount,
		getCollections,
		getCollectionsCount,
		sanitizedLineItem
	} = data

	let buyCollectionsIdsValid: any[] = []
	let getCollectionsIdsValid: any[] = []

	let buyCollectionQuantity = 0
	let getCollectionQuantity = 0

	if (getCollectionValid) {
		getCollections.split(",").forEach((val: any) => {
			if (val) {
				Object.values(sanitizedLineItem).forEach((lineItem: any) => {
					const { collectionId, variantId, quantity } = lineItem

					if (collectionId === val) {
						getCollectionQuantity += quantity

						getCollectionsIdsValid.push(variantId)
					}
				})
			}
		})
	}
	buyCollections.split(",").forEach((val: any) => {
		if (val) {
			Object.values(sanitizedLineItem).forEach((lineItem: any) => {
				const { collectionId, variantId, quantity } = lineItem

				if (collectionId === val) {
					buyCollectionQuantity += quantity

					buyCollectionsIdsValid.push(variantId)
				}
			})
		}
	})

	if (offerCategory === "volumeDiscount") {
		const isQuantityValid = getCollectionValid
			? getCollectionQuantity >= getCollectionsCount && buyCollectionQuantity >= buyCollectionsCount
			: buyCollectionQuantity >= buyCollectionsCount

		const output = isQuantityValid ? { buyCollectionsIdsValid, getCollectionsIdsValid } : {}

		return output
	} else {
		return { buyCollectionsIdsValid, getCollectionsIdsValid }
	}
}

export const applyCollectionDiscount = (data: any): any => {
	const { getCollectionValue, buyCollectionValue, sanitizedLineItem, discountType, discountValue } = data

	let discount = discountValue

	let cartTotal = 0

	let combinedArray: any[] = []

	if (getCollectionValue) {
		const { buyCollectionsIdsValid, getCollectionsIdsValid } = getCollectionValue

		if (
			buyCollectionsIdsValid &&
			buyCollectionsIdsValid.length > 0 &&
			getCollectionsIdsValid &&
			getCollectionsIdsValid.length > 0
		) {
			combinedArray = buyCollectionsIdsValid.concat(getCollectionsIdsValid)
		}
	} else {
		const { buyCollectionsIdsValid } = buyCollectionValue

		if (buyCollectionsIdsValid && buyCollectionsIdsValid.length > 0) {
			combinedArray = buyCollectionsIdsValid
		}
	}

	combinedArray.forEach((val: any) => {
		const product = sanitizedLineItem[val]

		const { unitPrice } = product

		cartTotal += unitPrice
	})

	return combinedArray.map((val: any) => {
		const product = sanitizedLineItem[val]

		const { unitPrice, quantity, variantId, productId } = product
		if (discountType === "percentage") {
			if (discountValue >= 100) discount = 100

			const getEditedPrice = quantity * unitPrice - quantity * unitPrice * (discount / 100)

			const finalDiscount = {
				productId,
				variantId,
				quantity: quantity,
				unitPrice: getEditedPrice / quantity
			}

			return finalDiscount
		} else {
			const getPercentage = (unitPrice / cartTotal) * 100

			const getPercentageAmount = (getPercentage / 100) * discountValue

			const getEditedPrice = unitPrice - getPercentageAmount

			const finalDiscount = { productId, variantId, quantity: quantity, unitPrice: getEditedPrice }

			return finalDiscount
		}
	})
}

export const findPercentageAmountDiscount = (data: any): object => {
	const { lineItems, getRemovedProductList } = data

	const {
		offerCategory,
		overAll,
		getProductValid,
		getCollectionValid,
		collection,
		discountType,
		discountValue,
		buyCollections,
		buyCollectionsCount,
		getCollections,
		getCollectionsCount,
		buyProducts,
		getProducts
	} = data

	const buyProductVariantIds = buyProducts.flatMap((product: any) => product.variantId)

	const getProductVariantIds = getProducts.flatMap((product: any) => product.variantId)

	const sanitizedLineItem = lineItems
	if (overAll) {
		const buyProuductDiscount = applyProductDiscount({
			overAll,
			sanitizedLineItem,
			discountType,
			discountValue
		})

		return { output: buyProuductDiscount, getRemovedProductList }
	} else if (!collection) {
		const validGetProductRepsonse = getProductValid
			? findGetProductValid({
					buyProducts,
					getProducts,
					sanitizedLineItem
			  })
			: false

		const validBuyProductRepsonse = !getProductValid
			? findBuyProductValid({ buyProducts, sanitizedLineItem })
			: false

		const getProuductDiscount =
			getProductValid && validGetProductRepsonse
				? applyProductDiscount({
						getProductValid,
						getProductVariantIds,
						sanitizedLineItem,
						discountType,
						discountValue
				  })
				: []

		const buyProuductDiscount =
			!getProductValid && validBuyProductRepsonse
				? applyProductDiscount({
						getProductValid,
						buyProductVariantIds,
						sanitizedLineItem,
						discountType,
						discountValue
				  })
				: []

		const output = getProductValid ? getProuductDiscount : buyProuductDiscount

		return { output, getRemovedProductList }
	} else if (collection) {
		const getCollectionValue = getCollectionValid
			? findCollectionValid({
					offerCategory,
					getCollectionValid,
					buyCollections,
					getCollections,
					buyCollectionsCount,
					getCollectionsCount,
					sanitizedLineItem
			  })
			: false

		const buyCollectionValue = !getCollectionValid
			? findCollectionValid({ offerCategory, buyCollections, buyCollectionsCount, sanitizedLineItem })
			: false

		const getCollectionDiscount = getCollectionValid
			? applyCollectionDiscount({
					getCollectionValue,
					sanitizedLineItem,
					discountType,
					discountValue
			  })
			: []

		const buyCollectionDiscount = !getCollectionValid
			? applyCollectionDiscount({
					buyCollectionValue,
					sanitizedLineItem,
					discountType,
					discountValue
			  })
			: []

		const output = getCollectionValid ? getCollectionDiscount : buyCollectionDiscount

		return { getRemovedProductList, output }
	} else {
		return { getRemovedProductList, output: {} }
	}
}
