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

	return validationProductArray.map((val: any) => {
		const product = sanitizedLineItem[val]

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

export const findPercentageDiscount = (data: any): object => {
	const { lineItems, getRemovedProductList } = data

	const {
		getProductValid,
		buyCollection,
		discountType,
		discountValue,
		buyCollectionValue,
		buyProducts,
		getProducts
	} = data

	const buyProductVariantIds = buyProducts.flatMap((product: any) => product.variantId)

	const getProductVariantIds = getProducts.flatMap((product: any) => product.variantId)

	const sanitizedLineItem = lineItems

	if (!buyCollection) {
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
		return {}
	}
}
