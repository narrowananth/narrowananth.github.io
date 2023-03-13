import {
	validateInputData,
	validateOverAllData,
	validateGetProductCount,
	applyBuyXGetYDiscount,
	applyPercentageAndAmountDiscount
} from "../utils/plugin.utils"

export const findPercentageAmountDiscounts = (data: any): object => {
	const { getRemovedProductList, buyOfferType } = data

	const isValidInput = buyOfferType !== "overAll" ? validateInputData(data) : false

	const isOverAllValidInput = buyOfferType === "overAll" ? validateOverAllData(data) : false

	const getDiscoutOffer = isOverAllValidInput || isValidInput ? applyPercentageAndAmountDiscount(data) : []

	return { output: getDiscoutOffer, getRemovedProductList }
}

export const findBuyXGetYDiscounts = (data: any): object => {
	const { getRemovedProductList } = data

	const isValidInput = validateInputData(data)

	const isGetProductValid = validateGetProductCount(data)

	const getDiscoutOffer = isValidInput && isGetProductValid ? applyBuyXGetYDiscount(data) : []

	return { output: getDiscoutOffer, getRemovedProductList }
}

export const findBuyMoreSaveDiscounts = (data: any) => {
	const { getRemovedProductList, getProductCount } = data

	const isValidInput = validateInputData(data)

	const isGetProductValid = getProductCount !== 0 ? validateGetProductCount(data) : true

	const getDiscoutOffer = isValidInput && isGetProductValid ? applyPercentageAndAmountDiscount(data) : []

	return { output: getDiscoutOffer, getRemovedProductList }
}

export const findAutomaticDiscounts = (data: any): object => {
	const { getRemovedProductList } = data

	const isValidInput = validateInputData(data)

	const getDiscoutOffer = isValidInput ? applyBuyXGetYDiscount(data) : []

	return { output: getDiscoutOffer, getRemovedProductList }
}
