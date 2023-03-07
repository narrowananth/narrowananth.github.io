import { findBuyProductVolumeValid } from "./findVolumeDiscount.utils"

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
			unitPrice: getEditedPrice
		}

		return isValid ? finalDiscount : {}
	})
}

export const findBuyXGetYDiscount = (data: any): object => {
	const { lineItems, getRemovedProductList } = data

	const { buyProducts, getProducts } = data

	const sanitizedLineItem = lineItems

	const validBuyProductRepsonse = findBuyProductVolumeValid({ buyProducts, sanitizedLineItem })

	const buyProuductDiscount = validBuyProductRepsonse
		? applyBuyXGetYDiscount({
				getProducts,
				sanitizedLineItem
		  })
		: []

	return { getRemovedProductList, output: buyProuductDiscount }
}
