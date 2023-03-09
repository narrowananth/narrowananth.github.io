export const findGetProductValid = (data: any): boolean => {
	const { buyProductVariantIds, getProductVariantIds, sanitizedLineItem } = data

	const buyProductVariantIdsValid = buyProductVariantIds.every((ids: any) => {
		return sanitizedLineItem[ids]
	})

	const getProductVariantIdsValid = getProductVariantIds.every((ids: any) => {
		return sanitizedLineItem[ids]
	})

	const isValid = buyProductVariantIdsValid && getProductVariantIdsValid ? true : false

	return isValid
}

export const findBuyProductValid = (data: any): boolean => {
	const { buyProductVariantIds, sanitizedLineItem } = data

	const buyProductVariantIdsValid = buyProductVariantIds.every((ids: any) => {
		return sanitizedLineItem[ids]
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

	let localUnitPrice = 0

	const validationProductArray = getProductValid ? getProductVariantIds : buyProductVariantIds

	const finalProductArray = overAll ? Object.values(sanitizedLineItem) : validationProductArray

	return finalProductArray.map((val: any) => {
		const product = overAll ? val : sanitizedLineItem[val]

		const { unitPrice, quantity, variantId, productId } = product

		if (discountType === "percentage") {
			if (discountValue >= 100) discount = 100

			const getEditedPrice = quantity * unitPrice - quantity * unitPrice * (discount / 100)

			const finalDiscount = { productId, variantId, quantity: quantity, unitPrice: getEditedPrice / quantity }

			return finalDiscount
		} else {
			if (discountValue >= unitPrice) localUnitPrice = discountValue
			else localUnitPrice = unitPrice

			const getEditedPrice = quantity * localUnitPrice - discountValue

			const finalDiscount = { productId, variantId, quantity: quantity, unitPrice: getEditedPrice / quantity }

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

	let localUnitPrice = 0

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
			if (discountValue >= unitPrice) localUnitPrice = discountValue
			else localUnitPrice = unitPrice

			const getEditedPrice = quantity * localUnitPrice - discountValue

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

export const findPercentageDiscount = (data: any): object => {
	const { lineItems, getRemovedProductList } = data

	const {
		offerCategory,
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

	if (!collection) {
		const validGetProductRepsonse = getProductValid
			? findGetProductValid({ buyProductVariantIds, getProductVariantIds, sanitizedLineItem })
			: false

		const validBuyProductRepsonse = !getProductValid
			? findBuyProductValid({ buyProductVariantIds, sanitizedLineItem })
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
	} else {
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
	}
}
