import { getLineItemsObj, sanitizeLineItems } from "./plugin.utils"

export const findCartQuantity = (data: any): object => {
	let getOffer: any = []

	const { getOfferType, getOfferConfig } = data

	const { buyProducts, buyProductQuantity, getProducts, getProductQuantity } = getOfferConfig

	let { discount } = getOfferConfig

	const buyProductIdArray = buyProducts.map((product: any) => product.variantId)

	const getSanitizeLineItems = sanitizeLineItems(data)

	let offerFlag = false

	for (const key of buyProductIdArray) {
		const { quantity } = getSanitizeLineItems[key] || {}

		if (getSanitizeLineItems[key] && buyProductQuantity <= quantity) offerFlag = true
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

				const amount = getProductQuantity * unitPrice

				key.unitPrice = amount - amount * (discount / 100)
			}
			return key
		})
	}

	return getOffer
}
