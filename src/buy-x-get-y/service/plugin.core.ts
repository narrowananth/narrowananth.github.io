import { findCartTotal, findOffer, splitDiscount } from "../utils/common"

export const thresholdProcess = (data: any): object => {
	const { getOfferConfig, getOfferType, getRemovedProductList } = data

	const getCartTotal = findCartTotal(data)

	const getOffer = findOffer(getOfferConfig, getCartTotal)

	const getSplitDiscount = getOffer.length !== 0 ? splitDiscount(data, getOffer, getCartTotal) : []

	const parsedSplitDiscount =
		getOfferType === "product" ? { getSplitDiscount, getRemovedProductList } : { getSplitDiscount }

	return parsedSplitDiscount
}

export const productProcess = (data: any): Array<any> => {
	return []
}

export const quantityProcess = (data: any): Array<any> => {
	return []
}
