import { findBuyXGetYDiscount } from "../utils/buyXGetYDiscount.utils"
import { findVolumeDiscount } from "../utils/volumeDiscount.utils"
import { findBuyMoreSaveDiscount } from "../utils/buyMoreSaveDiscount.utils"
import { findPercentageAmountDiscount } from "../utils/percentageDiscountAndFlatDiscount.utils"
import { findAutomaticDiscount } from "../utils/automaticDiscount.utils"

export const percentageDiscountProcess = (data: any): object => {
	const getPercentageDiscount = findPercentageAmountDiscount(data)

	return getPercentageDiscount
}

export const flatDiscountProcess = (data: any): object => {
	const getFlatDiscount = findPercentageAmountDiscount(data)

	return getFlatDiscount
}

export const volumeDiscountProcess = (data: any): object => {
	const getVolumeDiscount = findVolumeDiscount(data)

	return getVolumeDiscount
}

export const buyXGetYProcess = (data: any): object => {
	const getBuyXGetYDiscount = findBuyXGetYDiscount(data)

	return getBuyXGetYDiscount
}

export const buyMoreSaveMoreProcess = (data: any): object => {
	const getBuyMoreSaveDiscount = findBuyMoreSaveDiscount(data)

	return getBuyMoreSaveDiscount
}

export const automaticOffersProcess = (data: any): object => {
	const getAutomaticDiscount = findAutomaticDiscount(data)

	return getAutomaticDiscount
}

export const couponCodeProcess = (data: any): object => {
	return {}
}
