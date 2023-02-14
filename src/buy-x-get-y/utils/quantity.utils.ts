import { getLineItemsObj, sanitizeLineItems } from "./plugin.utils"

export const findCartQuantity = (data: any): object => {
	let getOffer: any = []

	const { getOfferType, getOfferConfig } = data

	const { buyProducts, buyProductQuantity, getProducts, getProductQuantity } = getOfferConfig

	let { discount } = getOfferConfig

	const buyProductIdArray = buyProducts.map((product: any) => product.variantId)

	const getSanitizeLineItems = sanitizeLineItems(data)

	const getLineItems = getLineItemsObj(getSanitizeLineItems)

	let offerFlag = false

	for (const key of buyProductIdArray) {
		const { quantity } = getLineItems[key] || {}

		if (getLineItems[key] && buyProductQuantity <= quantity) offerFlag = true
		else {
			offerFlag = false
			break
		}
	}

	if (offerFlag) {
		getOffer = getProducts.map((key: any) => {
			const { unitPrice } = key
			key.quantity = getProductQuantity

			if (getOfferType === "percentage") {
				if (discount >= 100) discount = 100

				key.unitPrice = getProductQuantity * unitPrice - getProductQuantity * unitPrice * (discount / 100)
			}
			return key
		})
	}

	return getOffer
}
