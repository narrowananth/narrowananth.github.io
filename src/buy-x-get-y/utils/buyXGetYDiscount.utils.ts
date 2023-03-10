import { findBuyProductVolumeValid } from "./volumeDiscount.utils"

export const applyBuyXGetYDiscount = (data: any): object => {
	const { getProducts, sanitizedLineItem } = data

	return getProducts.map((val: any) => {
		const { productId, variantId, count } = val

		const isValid = sanitizedLineItem[variantId].quantity >= count ? true : false

		const getEditedPrice = isValid ? 0 : sanitizedLineItem[variantId].unitPrice

		const finalDiscount = {
			productId,
			variantId,
			quantity: sanitizedLineItem[variantId].quantity,
			unitPrice: getEditedPrice,
			discountType: "free",
			discountValue: sanitizedLineItem[variantId].unitPrice
		}

		return isValid ? finalDiscount : null
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

	const { onlyCartAmoutAndQunatity, cartQuantity, buyProducts, getProducts } = data

	const sanitizedLineItem = lineItems

	if (onlyCartAmoutAndQunatity) {
		const getTotalCartQuantity = findTotalCartQuantity({ cartQuantity, sanitizedLineItem })

		const buyProuductDiscount = getTotalCartQuantity
			? applyBuyXGetYDiscount({
					getProducts,
					sanitizedLineItem
			  })
			: []

		return { getRemovedProductList, output: buyProuductDiscount }
	} else {
		const validBuyProductRepsonse = findBuyProductVolumeValid({ buyProducts, sanitizedLineItem })

		const buyProuductDiscount = validBuyProductRepsonse
			? applyBuyXGetYDiscount({
					getProducts,
					sanitizedLineItem
			  })
			: []

		return { getRemovedProductList, output: buyProuductDiscount }
	}
}
