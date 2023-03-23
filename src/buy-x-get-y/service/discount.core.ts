import { applyPercentageAndAmountDiscount, applyBuyXGetYDiscount } from "./offerApplies.core"
import {
	validateInputData,
	validateOverAllData,
	validateGetProductCount,
	validateBuyArrayAvaliable,
	validateGetArrayAvaliable
} from "../utils/plugin.utils"
import { constructDisplayTextHtmlBuilder } from "../utils/common.utils"

export const findPercentageAmountDiscounts = (data: any): object => {
	const { getRemovedProductList, buyOfferType, customGetProduct, customGetCollection, displayText } = data

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

	const displayTextHtmlBuilder = getDiscoutOffer.length > 0 ? constructDisplayTextHtmlBuilder(displayText) : ""

	return { output: getDiscoutOffer, getRemovedProductList, displayText: displayTextHtmlBuilder }
}

export const findBuyXGetYDiscounts = (data: any): object => {
	const { getRemovedProductList, displayText } = data

	const isValidInput = validateInputData(data)

	const isGetProductValid = validateGetProductCount(data)

	const getDiscoutOffer = isValidInput && isGetProductValid ? applyBuyXGetYDiscount(data) : []

	const displayTextHtmlBuilder = getDiscoutOffer.length > 0 ? constructDisplayTextHtmlBuilder(displayText) : ""

	return { output: getDiscoutOffer, getRemovedProductList, displayText: displayTextHtmlBuilder }
}

export const findBuyMoreSaveDiscounts = (data: any) => {
	const { getRemovedProductList, getProductCount, displayText } = data

	const isValidInput = validateInputData(data)

	const isGetProductValid = getProductCount !== 0 ? validateGetProductCount(data) : true

	const getDiscoutOffer = isValidInput && isGetProductValid ? applyPercentageAndAmountDiscount(data) : []

	const displayTextHtmlBuilder = getDiscoutOffer.length > 0 ? constructDisplayTextHtmlBuilder(displayText) : ""

	return { output: getDiscoutOffer, getRemovedProductList, displayText: displayTextHtmlBuilder }
}

export const findAutomaticDiscounts = (data: any): object => {
	const { getRemovedProductList, displayText } = data

	const isValidInput = validateInputData(data)

	const getDiscoutOffer = isValidInput ? applyBuyXGetYDiscount(data) : []

	const displayTextHtmlBuilder = getDiscoutOffer.length > 0 ? constructDisplayTextHtmlBuilder(displayText) : ""

	return { output: getDiscoutOffer, getRemovedProductList, displayText: displayTextHtmlBuilder }
}
