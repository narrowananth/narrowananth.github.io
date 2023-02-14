import { findCartQuantity } from "../utils/quantity.utils"
import { findCartTotal, findOffer, splitDiscount } from "../utils/threshold.utils"

export const thresholdProcess = (data: any): object => {
	const { getOfferConfig, getOfferType, getRemovedProductList } = data

	const getCartTotal = findCartTotal(data)

	const getOffer = findOffer(getOfferConfig, getCartTotal)

	const getSplitDiscount = getOffer.length !== 0 ? splitDiscount(data, getOffer, getCartTotal) : []

	const parsedSplitDiscount =
		getOfferType === "product" ? { getSplitDiscount, getRemovedProductList } : { getSplitDiscount }

	return parsedSplitDiscount
}

export const productProcess = (data: any): object => {
	return {}
}

export const quantityProcess = (data: any): object => {
	const { getOfferType, getRemovedProductList } = data

	const getCartQuantity = findCartQuantity(data)

	const parsedSplitDiscount =
		getOfferType === "product" ? { getCartQuantity, getRemovedProductList } : { getCartQuantity }

	return parsedSplitDiscount
}
