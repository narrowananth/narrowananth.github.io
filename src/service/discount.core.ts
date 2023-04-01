import { applyPercentageAndAmountDiscount, applyBuyXGetYDiscount, applyBuyXChooseYDiscount } from "./offerApplies.core"
import {
	validateInputData,
	validateOverAllData,
	validateGetProductCount,
	validateBuyArrayAvaliable,
	validateGetArrayAvaliable,
	afterDiscountCalcCartTotal
} from "../utils/plugin.utils"
import { FindPercentageAmountDiscounts } from "../interface/discount.core.schema"

export const findPercentageAmountDiscounts = (data: FindPercentageAmountDiscounts): object => {
	const {
		getRemovedProductList,
		lineItems,
		buyOfferType,
		customGetProduct,
		customGetCollection,
		displayText = "",
		getConfigSchema
	} = data

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

	const displayTextHtmlBuilder = getDiscoutOffer.length > 0 && displayText.length > 0 ? displayText : ""

	const totalCartValue = afterDiscountCalcCartTotal(lineItems, getDiscoutOffer)

	return {
		output: getDiscoutOffer,
		getRemovedProductList,
		displayText: displayTextHtmlBuilder,
		totalCartValue,
		schema: getConfigSchema
	}
}

export const findBuyXChooseYDiscounts = (data: FindPercentageAmountDiscounts): object => {
	const { getRemovedProductList, getConfigSchema, lineItems, buyOfferType, displayText } = data

	const isValidInput = buyOfferType !== "overAll" ? validateInputData(data) : validateOverAllData(data)

	const isGetProductValid = validateGetProductCount(data)

	const getDiscoutOffer = isValidInput && isGetProductValid ? applyBuyXChooseYDiscount(data) : []

	const displayTextHtmlBuilder = getDiscoutOffer.length > 0 && displayText.length > 0 ? displayText : ""

	const totalCartValue = afterDiscountCalcCartTotal(lineItems, getDiscoutOffer)

	return {
		output: getDiscoutOffer,
		getRemovedProductList,
		displayText: displayTextHtmlBuilder,
		totalCartValue,
		schema: getConfigSchema
	}
}

export const findBuyXGetYDiscounts = (data: FindPercentageAmountDiscounts): object => {
	const { getRemovedProductList, getConfigSchema, lineItems, buyOfferType, displayText } = data

	const isValidInput = buyOfferType !== "overAll" ? validateInputData(data) : validateOverAllData(data)

	const getDiscoutOffer = isValidInput ? applyBuyXGetYDiscount(data) : []

	const displayTextHtmlBuilder = getDiscoutOffer.length > 0 && displayText.length > 0 ? displayText : ""

	const totalCartValue = afterDiscountCalcCartTotal(lineItems, getDiscoutOffer)

	return {
		output: getDiscoutOffer,
		getRemovedProductList,
		displayText: displayTextHtmlBuilder,
		totalCartValue,
		schema: getConfigSchema
	}
}
