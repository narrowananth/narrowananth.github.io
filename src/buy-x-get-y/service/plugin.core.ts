import { findCartQuantity } from "../utils/quantity.utils"
import { findCartTotal, findOffer, splitDiscount } from "../utils/threshold.utils"

export const thresholdProcess = (data: any): object => {
	const { getOfferConfig, getRemovedProductList } = data

	const getCartTotal = findCartTotal(data)

	const getOffer = findOffer(getOfferConfig, getCartTotal)

	const getSplitDiscount = getOffer.length !== 0 ? splitDiscount(data, getOffer, getCartTotal) : []

	const parsedSplitDiscount = { getSplitDiscount, getRemovedProductList }

	return parsedSplitDiscount
}

export const productProcess = (data: any): object => {
	return {}
}

export const quantityProcess = (data: any): object => {
	const { getRemovedProductList } = data

	const getSplitDiscount = findCartQuantity(data)

	const parsedSplitDiscount = { getSplitDiscount, getRemovedProductList }

	return parsedSplitDiscount
}
