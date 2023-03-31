import { Data, LineItem } from "../interface/common.schema"
import {
	ApplyBuyXGetYDiscount,
	ApplyFreeDiscount,
	ApplyPercentageAndAmountDiscount
} from "../interface/offerApplies.core.schema"
import { getLineItemsObj } from "../utils/common.utils"
import { combineSchemaOfferArray, findOverAllCartTotal, findUserProductCartTotal } from "../utils/plugin.utils"

export const applyPercentageAndAmountOffer = (
	offerCategory: string,
	lineItem: LineItem,
	discountType: string,
	discountValue: number,
	percentageDiscountValue: number,
	cartTotal: number
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
	}

	if (discountType === "amount") {
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
	}

	return {}
}

export const applyBuyXGetYDiscount = (data: ApplyBuyXGetYDiscount): Array<object> => {
	const { offerCategory, getProducts, customGetProduct, lineItems, getProductCount } = data

	const sanitizedLineItem = getLineItemsObj(lineItems)

	const filterGetProduct = customGetProduct.filter((id: string) => sanitizedLineItem[id])

	const sortFilteredArray = filterGetProduct.sort(
		(start: string, next: string) => sanitizedLineItem[start].unitPrice - sanitizedLineItem[next].unitPrice
	)

	const offerArray: object[] = []

	let localProductCountTrack = getProductCount

	sortFilteredArray.forEach((id: string, index: number) => {
		if (localProductCountTrack) {
			const isGetProductIdInLineitem = sanitizedLineItem[id] ? true : false

			const { productId, variantId, quantity, unitPrice, lineItemHandle } = sanitizedLineItem[id] || {}

			const customFreeQuantity = localProductCountTrack > quantity ? quantity : localProductCountTrack

			localProductCountTrack -= quantity

			if (localProductCountTrack < 0) localProductCountTrack = 0

			const getFreeOfferValue = applyFreeDiscount({
				productId,
				variantId,
				lineItemHandle,
				quantity,
				getProductCount: customFreeQuantity,
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

export const applyPercentageAndAmountDiscount = (data: ApplyPercentageAndAmountDiscount): Array<object> => {
	const { offerCategory, buyOfferType, discountType, discountValue } = data

	const { lineItems, customGetProduct, customGetCollection } = data

	const getCombinedArray = combineSchemaOfferArray(data)

	const sanitizedLineItem =
		buyOfferType === "overAll" && customGetProduct.length <= 0 && customGetCollection.length <= 0
			? lineItems
			: getCombinedArray

	const cartTotal =
		buyOfferType === "overAll"
			? findOverAllCartTotal(sanitizedLineItem)
			: findUserProductCartTotal({ sanitizedLineItem, lineItems })

	const percentageDiscountValue = discountType === "percentage" && discountValue >= 100 ? 100 : discountValue

	const getOffer: object[] = []

	sanitizedLineItem.forEach((key: any) => {
		if (typeof key === "string") {
			lineItems.forEach((lineItem: LineItem) => {
				const { collectionId, variantId } = lineItem || {}

				if (variantId === key || collectionId === key) {
					const value = applyPercentageAndAmountOffer(
						offerCategory,
						lineItem,
						discountType,
						discountValue,
						percentageDiscountValue,
						cartTotal
					)

					getOffer.push(value)
				}
			})
		}
		const value = applyPercentageAndAmountOffer(
			offerCategory,
			key,
			discountType,
			discountValue,
			percentageDiscountValue,
			cartTotal
		)

		getOffer.push(value)
	})

	return getOffer
}

export const applyFreeDiscount = (data: ApplyFreeDiscount): object => {
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
