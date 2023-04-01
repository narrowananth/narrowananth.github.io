import {
	CombineSchemaInputArray,
	CombineSchemaOfferArray,
	FindFreeOfferOverAllCartValue,
	FindUserProductCartTotal,
	ValidateBuyArrayAvaliable,
	ValidateGetArrayAvaliable,
	ValidateGetProductCount,
	ValidateInputData,
	ValidateOverAllData
} from "../interface/plugin.utils.schema"
import { LineItem } from "../interface/common.schema"
import { getLineItemsObj } from "./common.utils"

export const combineSchemaInputArray = (data: CombineSchemaInputArray): Array<string> => {
	const {
		offerCategory,
		customBuyCollection,
		customGetCollection,
		customBuyProduct,
		customGetProduct,
		getProductCount
	} = data

	const xValue =
		customBuyProduct.length > 0 || customBuyCollection.length > 0
			? customBuyProduct.concat(customBuyCollection)
			: []

	const yValue =
		getProductCount === 0 && (customGetProduct.length > 0 || customGetCollection.length > 0)
			? customGetProduct.concat(customGetCollection)
			: []

	const combinedArray = offerCategory !== "automaticOffers" ? xValue.concat(yValue) : xValue

	return combinedArray
}

export const combineSchemaOfferArray = (data: CombineSchemaOfferArray): any => {
	const { customBuyCollection, customGetCollection, customBuyProduct, customGetProduct } = data

	const xValue = customGetProduct.length > 0 ? customGetProduct : customBuyProduct

	const yValue = customGetCollection.length > 0 ? customGetCollection : customBuyCollection

	const buyAlternativeArray =
		customBuyProduct.length > 0 && customGetCollection.length > 0 ? customGetCollection : []

	const getAlternativeArray =
		customGetProduct.length > 0 && customBuyCollection.length > 0 ? customGetProduct : []

	const combinedArray =
		buyAlternativeArray.length > 0 || getAlternativeArray.length > 0
			? buyAlternativeArray.concat(getAlternativeArray)
			: xValue.concat(yValue)

	return combinedArray
}

export const findOverAllCartTotal = (lineItems: LineItem[]): number => {
	return lineItems.reduce((acc: number, lineItem: LineItem) => {
		const { unitPrice, quantity } = lineItem

		return (acc += unitPrice * quantity)
	}, 0)
}

export const findOfferLineItemTotal = (lineItems: LineItem[]): number => {
	return lineItems.reduce((acc: number, lineItem: LineItem) => {
		const { customGetProductPrice, quantity } = lineItem

		return (acc += customGetProductPrice * quantity)
	}, 0)
}

export const afterDiscountCalcCartTotal = (
	lineItems: LineItem[],
	getDiscoutOffer: any,
	offerCategory: string
): number => {
	if (offerCategory !== "automaticOffers") {
		const sanitizedLineItem = getLineItemsObj(getDiscoutOffer)

		return lineItems.reduce((acc: number, lineItem: LineItem) => {
			const { variantId, unitPrice: actualUnitPrice, quantity: actualQuantity } = lineItem

			const { unitPrice: offerAppliesUnitPrice, quantity: offerAppliesQuantity } =
				sanitizedLineItem[variantId] || {}

			const finalUnitPrice =
				offerAppliesUnitPrice || offerAppliesUnitPrice === 0
					? offerAppliesUnitPrice
					: actualUnitPrice

			const finalQuantity = offerAppliesQuantity || actualQuantity

			return (acc += finalUnitPrice * finalQuantity)
		}, 0)
	} else {
		const currentLineItemTotal = findOverAllCartTotal(lineItems)

		const offerLineItemTotal = findOfferLineItemTotal(getDiscoutOffer)

		return currentLineItemTotal + offerLineItemTotal
	}
}

export const validateInputData = (data: ValidateInputData): boolean => {
	const { cartType, cartValue, lineItems } = data

	const getCombinedArray = combineSchemaInputArray(data)

	const total = getCombinedArray.reduce((total: number, id: string) => {
		const sum = lineItems.reduce((acc: number, lineItem: LineItem) => {
			const { collectionId, variantId, quantity, unitPrice } = lineItem || {}

			if (variantId === id || collectionId === id) {
				const currentValue = cartType === "amount" ? quantity * unitPrice : quantity

				acc += currentValue
			}

			return acc
		}, 0)

		return (total += sum)
	}, 0)

	return total >= cartValue
}

export const validateOverAllData = (data: ValidateOverAllData): boolean => {
	const { cartType, cartValue, lineItems } = data

	const total = lineItems.reduce((acc: number, lineItem: LineItem) => {
		const { quantity, unitPrice } = lineItem

		const currentValue = cartType === "amount" ? quantity * unitPrice : quantity

		return (acc += currentValue)
	}, 0)

	return total >= cartValue
}

export const findFreeOfferOverAllCartValue = (data: FindFreeOfferOverAllCartValue): boolean => {
	const { cartType, cartValue, lineItems, customGetProduct = [] } = data

	const customLineItem = lineItems || []

	const filteredGetProduct = customLineItem.filter(
		(obj: LineItem) => !customGetProduct.some((id: string) => id === obj.variantId)
	)

	const total = filteredGetProduct.reduce((acc: number, lineItem: LineItem) => {
		const { quantity, unitPrice } = lineItem

		const currentValue = cartType === "amount" ? quantity * unitPrice : quantity

		return (acc += currentValue)
	}, 0)

	return total >= cartValue
}

export const validateBuyArrayAvaliable = (data: ValidateBuyArrayAvaliable): boolean => {
	const { customBuyProduct, customBuyCollection, lineItems } = data

	const validationArray = customBuyProduct.concat(customBuyCollection)

	return validationArray.some((id: string) => {
		return lineItems.some((lineItem: LineItem) => {
			const { collectionId, variantId } = lineItem || {}

			return variantId === id || collectionId === id
		})
	})
}

export const validateGetArrayAvaliable = (data: ValidateGetArrayAvaliable): boolean => {
	const { customGetProduct, customGetCollection, lineItems } = data

	const validationArray = customGetProduct.concat(customGetCollection)

	return validationArray.some((id: string) => {
		return lineItems.some((lineItem: LineItem) => {
			const { collectionId, variantId } = lineItem || {}

			return variantId === id || collectionId === id
		})
	})
}

export const validateGetProductCount = (data: ValidateGetProductCount): boolean => {
	const { customGetProduct, getProductCount, lineItems } = data

	const quantity = customGetProduct.reduce((count: number, id: string) => {
		const sum = lineItems.reduce((acc: number, lineItem: LineItem) => {
			const { collectionId, variantId, quantity } = lineItem || {}

			if (variantId === id || collectionId === id) acc += quantity

			return acc
		}, 0)

		return (count += sum)
	}, 0)

	return quantity >= getProductCount
}

export const findUserProductCartTotal = (data: FindUserProductCartTotal): number => {
	const { sanitizedLineItem, lineItems } = data

	return sanitizedLineItem.reduce((total: number, key: string) => {
		const sum = lineItems.reduce((acc: number, lineItem: LineItem) => {
			const { collectionId, variantId, quantity, unitPrice } = lineItem || {}

			if (variantId === key || collectionId === key) acc += quantity * unitPrice

			return acc
		}, 0)

		return (total += sum)
	}, 0)
}
