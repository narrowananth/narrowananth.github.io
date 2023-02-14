import { sanitizeLineItems } from "./plugin.utils"

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
				let amount = getProductQuantity * unitPrice

				if (discount >= 100) discount = 100

				amount = amount - amount * (discount / 100)

				key.editedUnitPrice = amount
			} else if (getOfferType === "amount") {
				let amount = getProductQuantity * unitPrice

				if (discount >= amount) discount = amount

				amount = amount - discount

				key.editedUnitPrice = amount
			}
			return key
		})
	}

	return getOffer
}
