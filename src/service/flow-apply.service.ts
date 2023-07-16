import { IApplyFreeDiscount, IGetOffer } from "../interfaces/flow-apply.interface"
import { IOfferCategory } from "../interfaces/flow-category.interface"
import { ILineItem } from "../interfaces/index.interface"
import { getLineItemsObj } from "../utils/flow-common.utils"
import {
	combineSchemaOfferArray,
	findOverAllCartTotal,
	findUserProductCartTotal,
	findOfferLineItemTotal
} from "../utils/flow-helper.utils"

export const applyPercentageAndAmountDiscount = (data: IOfferCategory): IGetOffer[] => {
	const {
		offerCategory,
		discountType,
		discountValue,
		lineItems,
		customGetProduct,
		customGetCollection,
		customBuyCollection,
		customBuyProduct
	} = data

	const getCombinedArray = combineSchemaOfferArray({
		customBuyCollection,
		customGetCollection,
		customBuyProduct,
		customGetProduct
	})

	const sanitizedLineItem =
		customGetProduct.length <= 0 && customGetCollection.length <= 0
			? lineItems
			: getCombinedArray

	const cartTotal =
		customGetProduct.length <= 0 && customGetCollection.length <= 0
			? findOverAllCartTotal(sanitizedLineItem)
			: findUserProductCartTotal({ sanitizedLineItem, lineItems })

	const percentageDiscountValue =
		discountType === "percentage" && discountValue >= 100 ? 100 : discountValue

	const getOffer: IGetOffer[] = []

	sanitizedLineItem.forEach((key: string | ILineItem) => {
		if (typeof key === "string") {
			lineItems.forEach((lineItem: ILineItem) => {
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
		} else {
			const value = applyPercentageAndAmountOffer(
				offerCategory,
				key,
				discountType,
				discountValue,
				percentageDiscountValue,
				cartTotal
			)

			getOffer.push(value)
		}
	})

	return getOffer
}

export const applyBuyXChooseYDiscount = (data: IOfferCategory): IGetOffer[] => {
	const { offerCategory, getProducts, customGetProduct, lineItems, getProductCount } = data

	const sanitizedLineItem = getLineItemsObj(lineItems)

	const filterGetProduct = customGetProduct.filter((id: string) => sanitizedLineItem[id])

	const sortFilteredArray = filterGetProduct.sort(
		(start: string, next: string) =>
			sanitizedLineItem[start].unitPrice - sanitizedLineItem[next].unitPrice
	)

	const getOffer: IGetOffer[] = []

	let localProductCountTrack = getProductCount

	sortFilteredArray.forEach((id: string, index: number) => {
		if (localProductCountTrack) {
			const isGetProductIdInLineitem = sanitizedLineItem[id] ? true : false

			const { productId, variantId, quantity, unitPrice, lineItemHandle } =
				sanitizedLineItem[id] || {}

			const customFreeQuantity =
				localProductCountTrack > quantity ? quantity : localProductCountTrack

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
				customGetProductPrice: getProducts[index]?.productPrice,
				isGetProductIdInLineitem
			})

			getOffer.push(getFreeOfferValue)
		}
	})

	return getOffer
}

export const applyBuyXGetYDiscount = (data: IOfferCategory): IGetOffer[] => {
	const { offerCategory, getProducts = [], customGetProduct, lineItems, getProductCount } = data

	const sanitizedLineItem = getLineItemsObj(lineItems)

	const getOffer: IGetOffer[] = []

	customGetProduct.forEach((id: string, index: number) => {
		const isGetProductIdInLineitem = sanitizedLineItem[id] ? true : false

		const { productId, variantId, quantity, unitPrice, lineItemHandle } =
			sanitizedLineItem[id] || {}

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
			customGetProductPrice: getProducts[index]?.productPrice,
			isGetProductIdInLineitem
		})

		getOffer.push(getFreeOfferValue)
	})

	return getOffer
}

export const applyPercentageAndAmountOffer = (
	offerCategory: string,
	lineItem: ILineItem,
	discountType: string,
	discountValue: number,
	percentageDiscountValue: number,
	cartTotal: number
): IGetOffer => {
	const { unitPrice, quantity, variantId, productId, lineItemHandle } = lineItem || {}

	if (discountType === "percentage") {
		const getEditedPrice =
			quantity * unitPrice - quantity * unitPrice * (percentageDiscountValue / 100)

		return {
			productId,
			variantId,
			quantity: quantity,
			unitPrice: getEditedPrice / quantity,
			lineItemHandle,
			discountType: offerCategory,
			discountValue: "",
			customLineItemType: "REGULAR"
		}
	}

	if (discountType === "amount") {
		const getPercentage = ((quantity * unitPrice) / cartTotal) * 100

		const getPercentageAmount = (getPercentage / 100) * discountValue

		const getEditedPrice =
			quantity * unitPrice >= getPercentageAmount
				? quantity * unitPrice - getPercentageAmount
				: 0

		const finalAmount = getEditedPrice !== 0 ? getEditedPrice / quantity : 0

		return {
			productId,
			variantId,
			quantity: quantity,
			unitPrice: finalAmount,
			lineItemHandle,
			discountType: offerCategory,
			discountValue: "",
			customLineItemType: "REGULAR"
		}
	}

	return {}
}

export const applyFreeDiscount = (data: IApplyFreeDiscount): IGetOffer => {
	const {
		productId,
		variantId,
		lineItemHandle,
		unitPrice,
		offerCategory,
		getProductCount,
		customGetProductId,
		customGetVariantId,
		isGetProductIdInLineitem,
		quantity = getProductCount,
		customGetProductPrice
	} = data

	const customFreeQuantity =
		isGetProductIdInLineitem && getProductCount > quantity ? getProductCount : quantity

	const customUnitPrice = customFreeQuantity === getProductCount ? 0 : unitPrice

	const customDiscountType = customFreeQuantity >= getProductCount ? offerCategory : ""

	const offerValue = {
		productId: productId || customGetProductId,
		variantId: variantId || customGetVariantId,
		quantity: customFreeQuantity,
		freeQuantity: getProductCount,
		unitPrice: customUnitPrice,
		lineItemHandle,
		discountType: customDiscountType,
		discountValue: "",
		customLineItemType: "REGULAR",
		isGetProductIdInLineitem,
		customGetProductPrice
	}

	return offerValue
}

export const afterDiscountCalcCartTotal = (
	lineItems: ILineItem[],
	getDiscoutOffer: any,
	offerCategory: string
): number => {
	if (offerCategory !== "automaticOffers") {
		const sanitizedLineItem = getLineItemsObj(getDiscoutOffer)

		return lineItems.reduce((acc: number, lineItem: ILineItem) => {
			const { variantId, unitPrice: actualUnitPrice, quantity: actualQuantity } = lineItem

			const {
				unitPrice: offerAppliesUnitPrice,
				quantity: offerAppliesQuantity,
				freeQuantity = 0
			} = sanitizedLineItem[variantId] || {}

			const finalUnitPrice =
				offerAppliesUnitPrice || offerAppliesUnitPrice === 0
					? offerAppliesUnitPrice
					: actualUnitPrice

			const localQuantity = offerAppliesQuantity || actualQuantity

			const finalQuantity = localQuantity - freeQuantity

			return (acc += finalUnitPrice * finalQuantity)
		}, 0)
	} else {
		const currentLineItemTotal = findOverAllCartTotal(lineItems)

		const offerLineItemTotal = findOfferLineItemTotal(getDiscoutOffer)

		const buyXGetYTotal =
			currentLineItemTotal > offerLineItemTotal
				? currentLineItemTotal - offerLineItemTotal
				: currentLineItemTotal

		return buyXGetYTotal
	}
}
