import { getLineItemsObj, sanitizeLineItems } from "./plugin.utils"

export const findCartQuantity = (data: any): object => {
	const { getOfferConfig } = data

	const { buyProducts, buyProductQuantity, getProducts, getProductQuantity } = getOfferConfig

	const buyProductIdArray = buyProducts.map((product: any) => product.variantId)

	const getSanitizeLineItems = sanitizeLineItems(data)

	const getLineItems = getLineItemsObj(getSanitizeLineItems)

	let offerFlag = false

	buyProductIdArray.forEach((key: any) => {
		const { quantity } = getLineItems[key]

		if (getLineItems[key] && buyProductQuantity === quantity) offerFlag = true
		else {
			offerFlag = false
			return
		}
	})

	if (offerFlag) {
		getProducts.map((key: any) => {
			key.quantity = getProductQuantity
			return key
		})
	}

	const getOffer = offerFlag ? getProducts : {}

	return getOffer
}