import { sanitizeLineItems } from "./plugin.utils"

export const resetLineItemAmount = (lineItems: Array<any>): Array<any> => {
	return lineItems.map(lineItem => {
		const { originalUnitPrice, unitPrice } = lineItem

		if (originalUnitPrice && originalUnitPrice !== unitPrice)
			return {
				...lineItem,
				unitPrice: originalUnitPrice
			}

		return lineItem
	})
}

export const removeExistingDiscount = (lineItems: Array<any>): Array<any> => {
	return lineItems.filter((lineItem: any) => {
		const { unitPrice, lineItemType } = lineItem

		return unitPrice === 0 && lineItemType === "READONLY"
	})
}

export const findCartTotal = (data: any): number => {
	const getSanitizeLineItems = sanitizeLineItems(data)

	let total = 0

	getSanitizeLineItems.forEach((lineItem: any) => {
		const { unitPrice, quantity } = lineItem

		total += unitPrice * quantity
	})

	return total
}

export const findOffer = (getOfferConfig: Array<any>, getCartTotal: number): Array<any> => {
	getOfferConfig = getOfferConfig.sort((a: any, b: any) => a.threshold - b.threshold)

	const closestThreshold = getOfferConfig.reduce((prev: number, current: any) => {
		if (current.threshold <= Math.round(getCartTotal)) return prev < current ? prev : current
		else return prev
	}, 0)

	return closestThreshold !== 0 ? closestThreshold : []
}

export const splitDiscount = (data: any, getOffer: any, getCartTotal: number): Array<any> => {
	const { includedProductLineItem, excludedProductLineItem, lineItems, getOfferType } = data

	let { discount, getProducts, getProductQuantity } = getOffer

	let filteringLineItems = includedProductLineItem || excludedProductLineItem || lineItems

	if (getOfferType === "percentage") {
		if (discount >= 100) discount = 100
		filteringLineItems.forEach((item: any) => (item.unitPrice = item.unitPrice - item.unitPrice * (discount / 100)))
	} else if (getOfferType === "amount") {
		if (discount >= getCartTotal) filteringLineItems.forEach((item: any) => (item.unitPrice = item.unitPrice * 0))
		else
			filteringLineItems.forEach(
				(item: any) => (item.unitPrice = item.unitPrice * (1 - ((discount / getCartTotal) * 100) / 100))
			)
	} else if (getOfferType === "product") {
		filteringLineItems = getProducts.map((key: any) => {
			key.quantity = getProductQuantity
			return key
		})
	}

	return filteringLineItems
}
