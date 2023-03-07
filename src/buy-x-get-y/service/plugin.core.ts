import { findBuyXGetYDiscount } from "../utils/buyXGetYDiscount.utils"
import { findVolumeDiscount } from "../utils/findVolumeDiscount.utils"
import { findPercentageDiscount } from "../utils/percentageDiscountProcess.utils"
import { buildInputData } from "../utils/plugin.utils"
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
	const { getConfigSchema, lineItems } = data

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getPercentageDiscount = findPercentageDiscount(getBuildInputData)

	return getPercentageDiscount
}

export const flatDiscountProcess = (data: any): object => {
	const { getConfigSchema, lineItems } = data

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getFlatDiscount = findPercentageDiscount(getBuildInputData)

	return getFlatDiscount
}

export const volumeDiscountProcess = (data: any): object => {
	const { getConfigSchema, lineItems } = data

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getVolumeDiscount = findVolumeDiscount(getBuildInputData)

	return getVolumeDiscount
}

export const buyXGetYProcess = (data: any): object => {
	const { getConfigSchema, lineItems } = data

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getBuyXGetYDiscount = findBuyXGetYDiscount(getBuildInputData)

	return getBuyXGetYDiscount
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
