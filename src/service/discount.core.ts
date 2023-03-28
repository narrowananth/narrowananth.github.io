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

	const buyArrayAvaliable =
		buyOfferType !== "overAll" && (customGetProduct.length > 0 || customGetCollection.length > 0)
			? validateBuyArrayAvaliable(data)
			: true

	const getArrayAvaliable =
		buyOfferType !== "overAll" && (customGetProduct.length > 0 || customGetCollection.length > 0)
			? validateGetArrayAvaliable(data)
			: true

	const isOverAllGetLevelValid =
		buyOfferType === "overAll" && (customGetProduct.length > 0 || customGetCollection.length > 0)
			? validateGetArrayAvaliable(data)
			: true

	const isOverAllValid = buyOfferType === "overAll" && isOverAllGetLevelValid ? validateOverAllData(data) : false

	const getDiscoutOffer =
		(isOverAllValid || isValidInput) && buyArrayAvaliable && getArrayAvaliable
			? applyPercentageAndAmountDiscount(data)
			: []

	const displayTextHtmlBuilder =
		getDiscoutOffer.length > 0 && displayText.length > 0 ? constructDisplayTextHtmlBuilder(displayText) : ""

	return { output: getDiscoutOffer, getRemovedProductList, displayText: displayTextHtmlBuilder }
}

export const findBuyXGetYDiscounts = (data: any): object => {
	const { getRemovedProductList, buyOfferType, displayText } = data

	const isValidInput = buyOfferType !== "overAll" ? validateInputData(data) : validateOverAllData(data)

	const isGetProductValid = validateGetProductCount(data)

	const getDiscoutOffer = isValidInput && isGetProductValid ? applyBuyXGetYDiscount(data) : []

	const displayTextHtmlBuilder =
		getDiscoutOffer.length > 0 && displayText.length > 0 ? constructDisplayTextHtmlBuilder(displayText) : ""

	return { output: getDiscoutOffer, getRemovedProductList, displayText: displayTextHtmlBuilder }
}

export const findAutomaticDiscounts = (data: any): object => {
	const { getRemovedProductList, buyOfferType, displayText } = data

	const isValidInput = buyOfferType !== "overAll" ? validateInputData(data) : validateOverAllData(data)

	const getDiscoutOffer = isValidInput ? applyBuyXGetYDiscount(data) : []

	const displayTextHtmlBuilder =
		getDiscoutOffer.length > 0 && displayText.length > 0 ? constructDisplayTextHtmlBuilder(displayText) : ""

	return { output: getDiscoutOffer, getRemovedProductList, displayText: displayTextHtmlBuilder }
}
