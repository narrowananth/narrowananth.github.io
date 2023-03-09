import { findBuyXGetYDiscount } from "../utils/buyXGetYDiscount.utils"
import { findVolumeDiscount } from "../utils/volumeDiscount.utils"
import { findBuyMoreSaveDiscount } from "../utils/buyMoreSaveDiscount.utils"
import { findPercentageAmountDiscount } from "../utils/percentageDiscountAndFlatDiscount.utils"
import { buildInputData } from "../utils/plugin.utils"

export const percentageDiscountProcess = (data: any): object => {
	const { getConfigSchema, lineItems } = data

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getPercentageDiscount = findPercentageAmountDiscount(getBuildInputData)

	return getPercentageDiscount
}

export const flatDiscountProcess = (data: any): object => {
	const { getConfigSchema, lineItems } = data

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getFlatDiscount = findPercentageAmountDiscount(getBuildInputData)

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
	const { getConfigSchema, lineItems } = data

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getBuyMoreSaveDiscount = findBuyMoreSaveDiscount(getBuildInputData)

	return getBuyMoreSaveDiscount
}

export const automaticOffersProcess = (data: any): object => {
	return {}
}

export const couponCodeProcess = (data: any): object => {
	return {}
}
