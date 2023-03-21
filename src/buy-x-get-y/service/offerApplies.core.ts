import { getLineItemsObj } from "../utils/common.utils"
import { combineSchemaOfferArray, findOverAllCartTotal, findUserProductCartTotal } from "../utils/plugin.utils"

export const applyPercentageAndAmountOffer = (
	offerCategory: string,
	lineItem: any,
	discountType: string,
	discountValue: number,
	percentageDiscountValue: number,
	cartTotal: number,
	getProductCount: number
): object => {
	const { unitPrice, quantity, variantId, productId, lineItemHandle } = lineItem || {}

	if (discountType === "percentage") {
		const getEditedPrice = quantity * unitPrice - quantity * unitPrice * (percentageDiscountValue / 100)

		const finalDiscount = {
			productId,
			variantId,
			quantity: quantity,
			unitPrice: getEditedPrice / quantity,
			lineItemHandle,
			discountType: offerCategory,
			discountValue: `You got ${percentageDiscountValue}% off`,
			customLineItemType: "REGULAR"
		}
		return finalDiscount
	} else if (discountType === "amount") {
		const getPercentage = ((quantity * unitPrice) / cartTotal) * 100

		const getPercentageAmount = (getPercentage / 100) * discountValue

		const getEditedPrice =
			quantity * unitPrice >= getPercentageAmount ? quantity * unitPrice - getPercentageAmount : 0

		const finalAmount = getEditedPrice !== 0 ? getEditedPrice / quantity : 0

		const finalDiscount = {
			productId,
			variantId,
			quantity: quantity,
			unitPrice: finalAmount,
			lineItemHandle,
			discountType: offerCategory,
			discountValue: `You save {{currency}}${getPercentageAmount.toFixed(3)}`,
			customLineItemType: "REGULAR"
		}

		return finalDiscount
	} else if (discountType === "free") {
		const getFreeOfferValue = applyFreeDiscount({
			productId,
			variantId,
			lineItemHandle,
			quantity,
			getProductCount,
			unitPrice,
			offerCategory
		})

		return getFreeOfferValue
	}

	return {}
}

export const applyBuyXGetYDiscount = (data: any): object => {
	const { offerCategory, getProducts = [], customGetProduct, lineItems, getProductCount } = data

	const sanitizedLineItem = getLineItemsObj(lineItems)

	const offerArray: object[] = []

	customGetProduct.forEach((id: any, index: number) => {
		if (id) {
			const isGetProductIdInLineitem = sanitizedLineItem[id] ? true : false

			const { productId, variantId, quantity, unitPrice, lineItemHandle } = sanitizedLineItem[id] || {}

			const getFreeOfferValue = applyFreeDiscount({
				productId,
				variantId,
				lineItemHandle,
				quantity,
				getProductCount,
				unitPrice,
				offerCategory,
				customGetProductId: getProducts[index]?.productId,
				customGetVariantId: getProducts[index]?.variantId,
				isGetProductIdInLineitem
			})

			offerArray.push(getFreeOfferValue)
		}
	})

	return offerArray
}

export const applyPercentageAndAmountDiscount = (data: any): any => {
	const { offerCategory, buyOfferType, discountType, discountValue, getProductCount, lineItems } = data

	const getCombinedArray = combineSchemaOfferArray(data)

	const sanitizedLineItem = buyOfferType === "overAll" ? lineItems : getCombinedArray

	const cartTotal =
		buyOfferType === "overAll"
			? findOverAllCartTotal(sanitizedLineItem)
			: findUserProductCartTotal(sanitizedLineItem, lineItems)

	const percentageDiscountValue = discountType === "percentage" && discountValue >= 100 ? 100 : discountValue

	const getOffer: object[] = []

	sanitizedLineItem.forEach((key: any) => {
		if (key && typeof key === "string") {
			lineItems.forEach((lineItem: any) => {
				const { collectionId, variantId } = lineItem || {}

				if (variantId === key || collectionId === key) {
					const value = applyPercentageAndAmountOffer(
						offerCategory,
						lineItem,
						discountType,
						discountValue,
						percentageDiscountValue,
						cartTotal,
						getProductCount
					)

					getOffer.push(value)
				}
			})
		} else {
			const value = applyPercentageAndAmountOffer(
				offerCategory,
				key,
				discountType,
				discountValue,
				percentageDiscountValue,
				cartTotal,
				getProductCount
			)

			getOffer.push(value)
		}
	})

	return getOffer
}

export const applyFreeDiscount = (data: any): object => {
	const { offerCategory, getProductCount, customGetProductId, customGetVariantId, isGetProductIdInLineitem } = data

	const { productId, variantId, lineItemHandle, quantity = getProductCount, unitPrice } = data

	const customFreeQuantity = isGetProductIdInLineitem && getProductCount > quantity ? getProductCount : quantity

	const customUnitPrice = customFreeQuantity === getProductCount ? 0 : unitPrice

	const customDiscountType = customFreeQuantity >= getProductCount ? offerCategory : ""

	const customDiscountValue =
		customFreeQuantity >= getProductCount
			? `Buy ${customFreeQuantity}, Get ${getProductCount} Free and ${
					customFreeQuantity - getProductCount
			  } For the Same Price.`
			: ""

	const offerValue = {
		productId: productId || customGetProductId,
		variantId: variantId || customGetVariantId,
		quantity: customFreeQuantity,
		freeQuantity: getProductCount,
		unitPrice: customUnitPrice,
		lineItemHandle,
		discountType: customDiscountType,
		discountValue: customDiscountValue,
		customLineItemType: "REGULAR",
		isGetProductIdInLineitem
	}

	return offerValue
}
