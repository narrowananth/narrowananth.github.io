import { findGetProductValid } from "./percentageDiscountAndFlatDiscount.utils"

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
	const { cartQuantity, sanitizedLineItem } = data

	let totalCartQuantity = 0

	Object.values(sanitizedLineItem).forEach((val: any) => {
		const { quantity } = val

		totalCartQuantity += quantity
	})

	return totalCartQuantity >= cartQuantity ? true : false
}

export const findBuyXGetYDiscount = (data: any): object => {
	const { lineItems, getRemovedProductList } = data

	const { offerCategory, cartQuantity, buyProducts, getProducts } = data

	const sanitizedLineItem = lineItems

	const validBuyProductRepsonse = findGetProductValid({
		cartQuantity,
		buyProducts,
		getProducts,
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
