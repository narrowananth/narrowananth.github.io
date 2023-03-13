export const applyBuyXGetYDiscount = (data: any): object => {
	const { offerCategory, getProducts, sanitizedLineItem } = data

	return getProducts.map((val: any) => {
		const { productId, variantId } = val

		const finalDiscount = {
			productId,
			variantId,
			quantity: sanitizedLineItem[variantId].quantity,
			unitPrice: 0,
			lineItemHandle: sanitizedLineItem[variantId].lineItemHandle,
			discountType: offerCategory,
			discountValue: "Free"
		}

		return finalDiscount
	})
}

export const findTotalCartQuantity = (data: any): boolean => {
	const { cartQuantity, buyProducts, sanitizedLineItem } = data

	let totalCartQuantity = 0

	const buyProductVariantIdsValid = buyProducts.every((val: any) => {
		const { variantId } = val

		const { quantity = 0 } = sanitizedLineItem[variantId] || {}

		totalCartQuantity += quantity

		return sanitizedLineItem[variantId] ? true : false
	})

	return buyProductVariantIdsValid && totalCartQuantity >= cartQuantity ? true : false
}

export const findBuyXGetYDiscountProductValid = (data: any): boolean => {
	const { cartQuantity, buyProducts, getProducts, getProductCount, sanitizedLineItem } = data

	let localBuyQuantity = 0

	const buyProductVariantIdsValid = buyProducts.every((ids: any) => {
		const { variantId } = ids

		const quantity = sanitizedLineItem[variantId] ? sanitizedLineItem[variantId].quantity : 0

		localBuyQuantity += quantity

		return sanitizedLineItem[variantId] ? true : false
	})

	let localGetQuantity = 0

	const getProductVariantIdsValid = getProducts.every((ids: any) => {
		const { variantId } = ids

		const quantity = sanitizedLineItem[variantId] ? sanitizedLineItem[variantId].quantity : 0

		localGetQuantity += quantity

		return sanitizedLineItem[variantId] ? true : false
	})

	const isValid =
		localBuyQuantity >= cartQuantity &&
		localGetQuantity >= getProductCount &&
		buyProductVariantIdsValid &&
		getProductVariantIdsValid
			? true
			: false

	return isValid
}

export const findBuyXGetYDiscount = (data: any): object => {
	const { lineItems, getRemovedProductList } = data

	const { offerCategory, cartQuantity, buyProducts, getProducts, getProductCount } = data

	const sanitizedLineItem = lineItems

	const validBuyProductRepsonse = findBuyXGetYDiscountProductValid({
		cartQuantity,
		buyProducts,
		getProducts,
		getProductCount,
		sanitizedLineItem
	})

	const buyProuductDiscount = validBuyProductRepsonse
		? applyBuyXGetYDiscount({
				offerCategory,
				getProducts,
				sanitizedLineItem
		  })
		: []

	return { getRemovedProductList, output: buyProuductDiscount }
}
