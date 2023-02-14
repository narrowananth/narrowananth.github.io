import { sanitizeLineItems } from "./plugin.utils"

export const findCartQuantity = (data: any): object => {
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
		return getProducts.map((key: any) => {
			const { unitPrice } = key

			let amount = getProductQuantity * unitPrice

			if (getOfferType === "percentage") {
				if (discount >= 100) discount = 100
			} else if (getOfferType === "amount") {
				if (discount >= amount) discount = amount
			}

			let getEditedPrice = getOfferType === "percentage" ? amount - amount * (discount / 100) : amount - discount

			const finalDiscount = { ...key, quantity: getProductQuantity, editedUnitPrice: getEditedPrice }

			return finalDiscount
		})
	}

	return []
}
