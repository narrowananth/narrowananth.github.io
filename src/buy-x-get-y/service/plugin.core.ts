import { findCartTotal, findOffer, removeExistingDiscount, splitDiscount } from "../utils/common"

export const thresholdProcess = (data: any): Array<any> => {
	const { getOfferConfig, getOfferType } = data

	const getCartTotal = findCartTotal(data)

	const getOffer = findOffer(getOfferConfig, getCartTotal)

	const getRemoveDiscount = getOfferType === "product" ? removeExistingDiscount(data) : undefined

	data.lineItems = getRemoveDiscount ? (data.lineItems = [...getRemoveDiscount]) : data.lineItems

	if (getOffer.length !== 0) return splitDiscount(data, getOffer, getCartTotal)

	return []
}

export const productProcess = (data: any): Array<any> => {
	return []
}

export const quantityProcess = (data: any): Array<any> => {
	return []
}
