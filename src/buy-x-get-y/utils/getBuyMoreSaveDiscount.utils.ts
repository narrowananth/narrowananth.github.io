export const findBuyProductAmountValid = (data: any): boolean => {
	const { buyProducts, sanitizedLineItem } = data

	const buyProductVariantIdsValid = buyProducts.every((val: any) => {
		const { variantId, amount } = val

		return variantId
			? sanitizedLineItem[variantId].unitPrice * sanitizedLineItem[variantId].quantity >= amount
			: false
	})

	const isValid = buyProductVariantIdsValid ? true : false

	return isValid
}

export const applyProductAmountValid = (data: any): object => {
	const { getProducts, sanitizedLineItem, discountType, discountValue } = data

	return getProducts.map((val: any) => {
		const { variantId, amount } = val

		let discount = discountValue

		let localUnitPrice = 0

		const isValid =
			sanitizedLineItem[variantId].unitPrice * sanitizedLineItem[variantId].quantity >= amount ? true : false

		const { unitPrice, quantity, productId } = sanitizedLineItem[variantId]

		if (isValid) {
			if (discountType === "percentage") {
				if (discountValue >= 100) discount = 100

				const getEditedPrice = quantity * unitPrice - quantity * unitPrice * (discount / 100)

				const finalDiscount = {
					productId,
					variantId,
					quantity: quantity,
					unitPrice: getEditedPrice
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
					unitPrice: getEditedPrice
				}

				return finalDiscount
			}
		} else {
			return
		}
	})
}

export const findBuyMoreSaveDiscount = (data: any) => {
	const { lineItems, getRemovedProductList } = data

	const { buyProducts, getProducts, discountType, discountValue } = data

	const sanitizedLineItem = lineItems

	const validBuyProductRepsonse = findBuyProductAmountValid({ buyProducts, sanitizedLineItem })

	const buyProuductDiscount = validBuyProductRepsonse
		? applyProductAmountValid({
				getProducts,
				sanitizedLineItem,
				discountType,
				discountValue
		  })
		: []

	return { getRemovedProductList, output: buyProuductDiscount }
}
