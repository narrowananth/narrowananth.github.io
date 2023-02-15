import { sanitizeLineItems } from "./plugin.utils"

export const findOfferAndTotal = (
	buyProductIdArray: Array<any>,
	getSanitizeLineItems: any
): { offerFlag: boolean; total: number } => {
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

	return { offerFlag, total }
}

export const splitThresholdOffer = (getFindOfferAndTotal: any, data: any): Array<any> => {
	const { offerFlag, total } = getFindOfferAndTotal

	const { getOfferType, getOfferConfig } = data

	const { threshold, getProducts, getProductQuantity } = getOfferConfig

	const getProductsLength = getProducts.length !== 0 ? getProducts.length : 1

	let { discount } = getOfferConfig

	discount = getOfferType === "amount" ? discount / getProductsLength : discount

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

export const findCartTotal = (data: any): Array<any> => {
	const { getOfferConfig } = data

	const { buyProducts } = getOfferConfig

	const buyProductIdArray = buyProducts.map((product: any) => product.variantId)

	const getSanitizeLineItems = sanitizeLineItems(data)

	const getFindOfferAndTotal = findOfferAndTotal(buyProductIdArray, getSanitizeLineItems)

	const getSplitOffer = splitThresholdOffer(getFindOfferAndTotal, data)

	return getSplitOffer
}
