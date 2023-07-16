import { IOfferCategory } from "../interfaces/flow-category.interface"
import { IOfferApplied } from "../interfaces/flow-core.interface"
import { constructDisplayTextHtmlBuilder } from "../utils/flow-common.utils"
import {
	validateInputData,
	validateBuyArrayAvaliable,
	validateGetArrayAvaliable,
	validateOverAllData,
	buyXChooseYInputValidation,
	validateGetProductCount
} from "../utils/flow-helper.utils"
import {
	applyPercentageAndAmountDiscount,
	afterDiscountCalcCartTotal,
	applyBuyXChooseYDiscount,
	applyBuyXGetYDiscount
} from "./flow-apply.service"

export const findPercentageAmountDiscounts = (data: IOfferCategory): IOfferApplied => {
	const {
		getRemovedProductList,
		lineItems,
		buyOfferType,
		customGetProduct,
		customGetCollection,
		displayText = "",
		getConfigSchema,
		offerCategory
	} = data

	const isValidInput = buyOfferType !== "overAll" ? validateInputData(data) : false

	const buyArrayAvaliable =
		buyOfferType !== "overAll" &&
		(customGetProduct.length > 0 || customGetCollection.length > 0)
			? validateBuyArrayAvaliable(data)
			: true

	const getArrayAvaliable =
		buyOfferType !== "overAll" &&
		(customGetProduct.length > 0 || customGetCollection.length > 0)
			? validateGetArrayAvaliable(data)
			: true

	const isOverAllGetLevelValid =
		buyOfferType === "overAll" &&
		(customGetProduct.length > 0 || customGetCollection.length > 0)
			? validateGetArrayAvaliable(data)
			: true

	const isOverAllValid =
		buyOfferType === "overAll" && isOverAllGetLevelValid ? validateOverAllData(data) : false

	const getDiscoutOffer =
		(isOverAllValid || isValidInput) && buyArrayAvaliable && getArrayAvaliable
			? applyPercentageAndAmountDiscount(data)
			: []

	const displayTextHtmlBuilder =
		getDiscoutOffer.length > 0 && displayText.length > 0
			? constructDisplayTextHtmlBuilder(displayText)
			: ""

	const totalCartValue =
		getDiscoutOffer.length > 0
			? afterDiscountCalcCartTotal(lineItems, getDiscoutOffer, offerCategory)
			: 0

	const offerApplied = getDiscoutOffer.length > 0 ? true : false

	return {
		offerApplied,
		output: getDiscoutOffer,
		getRemovedProductList,
		displayText: displayTextHtmlBuilder,
		totalCartValue,
		schema: getConfigSchema
	}
}

export const findBuyXChooseYDiscounts = (data: IOfferCategory): IOfferApplied => {
	const { getRemovedProductList, getConfigSchema, lineItems, displayText, offerCategory } = data

	const isValidInput = buyXChooseYInputValidation(data)

	const isGetProductValid = validateGetProductCount(data)

	const getDiscoutOffer = isValidInput && isGetProductValid ? applyBuyXChooseYDiscount(data) : []

	const displayTextHtmlBuilder =
		getDiscoutOffer.length > 0 && displayText.length > 0
			? constructDisplayTextHtmlBuilder(displayText)
			: ""

	const totalCartValue =
		getDiscoutOffer.length > 0
			? afterDiscountCalcCartTotal(lineItems, getDiscoutOffer, offerCategory)
			: 0

	const offerApplied = getDiscoutOffer.length > 0 ? true : false

	return {
		offerApplied,
		output: getDiscoutOffer,
		getRemovedProductList,
		displayText: displayTextHtmlBuilder,
		totalCartValue,
		schema: getConfigSchema
	}
}

export const findBuyXGetYDiscounts = (data: IOfferCategory): IOfferApplied => {
	const { getRemovedProductList, getConfigSchema, lineItems, displayText, offerCategory } = data

	const isValidInput = buyXChooseYInputValidation(data)

	const getDiscoutOffer = isValidInput ? applyBuyXGetYDiscount(data) : []

	const displayTextHtmlBuilder =
		getDiscoutOffer.length > 0 && displayText.length > 0
			? constructDisplayTextHtmlBuilder(displayText)
			: ""

	const totalCartValue =
		getDiscoutOffer.length > 0
			? afterDiscountCalcCartTotal(lineItems, getDiscoutOffer, offerCategory)
			: 0

	const offerApplied = getDiscoutOffer.length > 0 ? true : false

	return {
		offerApplied,
		output: getDiscoutOffer,
		getRemovedProductList,
		displayText: displayTextHtmlBuilder,
		totalCartValue,
		schema: getConfigSchema
	}
}
