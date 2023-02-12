import { findCartTotal, findOffer, removeExistingDiscount, splitDiscount } from "../utils/common"

export const thresholdProcess = (data: any): Array<any> => {
	const { getOfferConfig, getOfferType } = data

	const getCartTotal = findCartTotal(data)

	const getOffer = findOffer(getOfferConfig, getCartTotal)

	const getRemoveDiscount: any = getOfferType === "product" ? removeExistingDiscount(data) : undefined

	if (getOffer.length !== 0) {
		let getSplitDiscount = splitDiscount(data, getOffer, getCartTotal)

		const getValue = getOfferType === "product" ? [...getSplitDiscount, ...getRemoveDiscount] : getSplitDiscount

		return getValue
	}

	return []
}

export const productProcess = (data: any): Array<any> => {
	return []
}

export const quantityProcess = (data: any): Array<any> => {
	return []
}
