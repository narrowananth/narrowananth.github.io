import { sanitizeLineItems } from "./plugin.utils"

export const findOffer = (
	buyProductIdArray: Array<any>,
	buyProductQuantity: number,
	getSanitizeLineItems: any
): { offerFlag: boolean } => {
	let offerFlag = false

	for (const key of buyProductIdArray) {
		const { quantity } = getSanitizeLineItems[key] || {}

		if (getSanitizeLineItems[key] && buyProductQuantity <= quantity) offerFlag = true
		else {
			offerFlag = false

			break
		}
	}

	return { offerFlag }
}

export const SplitQuantityOffer = (getFindOffer: any, data: any): Array<any> => {
	const { offerFlag } = getFindOffer

	const { getOfferType, getOfferConfig } = data

	const { getProducts, getProductQuantity } = getOfferConfig

	const getProductsLength = getProducts.length !== 0 ? getProducts.length : 1

	let { discount } = getOfferConfig

	discount = getOfferType === "amount" ? discount / getProductsLength : discount

	if (offerFlag) {
		return getProducts.map((key: any) => {
			let { unitPrice } = key

			let getEditedPrice = 0

			if (getOfferType !== "product") {
				if (getOfferType === "percentage") {
					if (discount >= 100) discount = 100
				} else if (getOfferType === "amount") {
					if (discount >= unitPrice) unitPrice = discount
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

export const findCartQuantity = (data: any): object => {
	const { getOfferConfig } = data

	const { buyProducts, buyProductQuantity } = getOfferConfig

	const buyProductIdArray = buyProducts.map((product: any) => product.variantId)

	const getSanitizeLineItems = sanitizeLineItems(data)

	const getFindOffer = findOffer(buyProductIdArray, buyProductQuantity, getSanitizeLineItems)

	const getSplitQuantityOffer = SplitQuantityOffer(getFindOffer, data)

	return getSplitQuantityOffer
}
