import {
	findAutomaticDiscounts,
	findBuyMoreSaveDiscounts,
	findBuyXGetYDiscounts,
	findPercentageAmountDiscounts
} from "./discount.core"

export const percentageDiscountProcess = (data: any): object => {
	const getPercentageDiscount = findPercentageAmountDiscounts(data)

	return getPercentageDiscount
}

export const flatDiscountProcess = (data: any): object => {
	const getFlatDiscount = findPercentageAmountDiscounts(data)

	return getFlatDiscount
}

export const volumeDiscountProcess = (data: any): object => {
	const getVolumeDiscount = findPercentageAmountDiscounts(data)

	return getVolumeDiscount
}

export const buyXGetYProcess = (data: any): object => {
	const getBuyXGetYDiscount = findBuyXGetYDiscounts(data)

	return getBuyXGetYDiscount
}

export const buyMoreSaveMoreProcess = (data: any): object => {
	const getBuyMoreSaveDiscount = findBuyMoreSaveDiscounts(data)

	return getBuyMoreSaveDiscount
}

export const automaticOffersProcess = (data: any): object => {
	const getAutomaticDiscounts = findAutomaticDiscounts(data)

	return getAutomaticDiscounts
}

export const couponCodeProcess = (data: any): object => {
	return {}
}
