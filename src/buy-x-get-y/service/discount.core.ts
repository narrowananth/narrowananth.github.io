import { applyPercentageAndAmountDiscount, applyBuyXGetYDiscount } from "./offerApplies.core"
import {
	validateInputData,
	validateOverAllData,
	validateGetProductCount,
	validateBuyArrayAvaliable,
	validateGetArrayAvaliable
} from "../utils/plugin.utils"

export const findPercentageAmountDiscounts = (data: any): object => {
	const { getRemovedProductList, buyOfferType, customGetProduct, customGetCollection } = data

	const isValidInput = buyOfferType !== "overAll" ? validateInputData(data) : false

	const isOverAllGetLevelValid =
		buyOfferType === "overAll" && (customGetProduct.length > 0 || customGetCollection.length > 0)
			? validateGetArrayAvaliable(data)
			: true

	const isOverAllValid = buyOfferType === "overAll" && isOverAllGetLevelValid ? validateOverAllData(data) : false

	const buyArrayAvaliable =
		(customGetProduct.length > 0 || customGetCollection.length > 0) && buyOfferType !== "overAll"
			? validateBuyArrayAvaliable(data)
			: true

	const getArrayAvaliable =
		(customGetProduct.length > 0 || customGetCollection.length > 0) && buyOfferType !== "overAll"
			? validateGetArrayAvaliable(data)
			: true

	const getDiscoutOffer =
		(isOverAllValid || isValidInput) && buyArrayAvaliable && getArrayAvaliable
			? applyPercentageAndAmountDiscount(data)
			: []

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
