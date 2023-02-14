import { findCartQuantity } from "../utils/quantity.utils"
import { findCartTotal } from "../utils/threshold.utils"

export const thresholdProcess = (data: any): object => {
	const { getRemovedProductList } = data

	const getSplitDiscount = findCartTotal(data)

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
