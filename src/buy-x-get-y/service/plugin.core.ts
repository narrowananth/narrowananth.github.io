import { findVolumeDiscount } from "../utils/findVolumeDiscount.utils"
import { findPercentageDiscount } from "../utils/percentageDiscountProcess.utils"
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

export const percentageDiscountProcess = (data: any): object => {
	const getPercentageDiscount = findPercentageDiscount(data)

	return getPercentageDiscount
}

export const flatDiscountProcess = (data: any): object => {
	const getFlatDiscount = findPercentageDiscount(data)

	return getFlatDiscount
}

export const volumeDiscountProcess = (data: any): object => {
	const getVolumeDiscount = findVolumeDiscount(data)

	return getVolumeDiscount
}

export const buyXGetYProcess = (data: any): object => {
	return {}
}

export const buyMoreSaveMoreProcess = (data: any): object => {
	return {}
}

export const automaticOffersProcess = (data: any): object => {
	return {}
}

export const couponCodeProcess = (data: any): object => {
	return {}
}
