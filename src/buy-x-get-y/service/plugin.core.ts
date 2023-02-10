import { findCartTotal, findOffer, splitDiscount } from "../utils/common"

export const thresholdProcess = (data: any): Array<any> => {
	const { getOfferConfig } = data

	const getCartTotal = findCartTotal(data)

	const getOffer = findOffer(getOfferConfig, getCartTotal)

	// removeExistingDiscount(data, getOffer, getCartTotal)

	if (getOffer.length !== 0) return splitDiscount(data, getOffer, getCartTotal)

	return []
}

export const productProcess = (data: any): Array<any> => {
	return []
}

export const quantityProcess = (data: any): Array<any> => {
	return []
}
