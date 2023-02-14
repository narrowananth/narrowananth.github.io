import { sanitizeLineItems } from "./plugin.utils"

export const findCartTotal = (data: any): object => {
	const { getOfferType, getOfferConfig } = data

	let { discount } = getOfferConfig

	const { threshold, buyProducts, getProducts, getProductQuantity } = getOfferConfig

	const buyProductIdArray = buyProducts.map((product: any) => product.variantId)

	const getSanitizeLineItems = sanitizeLineItems(data)

	let offerFlag = false

	let total = 0

	for (const key of buyProductIdArray) {
		const { quantity, unitPrice } = getSanitizeLineItems[key] || {}

		if (quantity && unitPrice) {
			total += quantity * unitPrice
			offerFlag = true
		} else {
			offerFlag = false
			break
		}
	}

	if (offerFlag && threshold <= total) {
		return getProducts.map((key: any) => {
			const { unitPrice } = key

			let getEditedPrice = 0

			if (getOfferType !== "product") {
				if (getOfferType === "percentage") {
					if (discount >= 100) discount = 100
				}

				getEditedPrice =
					getOfferType === "percentage"
						? getProductQuantity * unitPrice - getProductQuantity * unitPrice * (discount / 100)
						: getProductQuantity * unitPrice - discount
			}
			const finalDiscount = { ...key, quantity: getProductQuantity, unitPrice: getEditedPrice }

			return finalDiscount
		})
	}

	return []
}
