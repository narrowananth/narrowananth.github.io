import { IOfferCategory } from "../interfaces/flow-category.interface"
import {
	ICombineBuyConfigArrays,
	ICombineSchemaOfferArray,
	IFindUserProductCartTotal,
	IValidateBuyArrayAvaliable,
	IValidateGetArrayAvaliable,
	IValidateGetProductCount
} from "../interfaces/flow-helper.interface"
import { ILineItem } from "../interfaces/index.interface"
import { getLineItemsObj } from "./flow-common.utils"

export const combineBuyConfigArrays = (data: ICombineBuyConfigArrays): string[] => {
	const { customBuyCollection, customBuyProduct } = data

	return customBuyProduct.length > 0 || customBuyCollection.length > 0
		? customBuyProduct.concat(customBuyCollection)
		: []
}

export const combineSchemaOfferArray = (data: ICombineSchemaOfferArray): string[] => {
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

export const findOverAllCartTotal = (lineItems: ILineItem[] | any): number => {
	return lineItems.reduce((acc: number, lineItem: ILineItem) => {
		const { unitPrice, quantity } = lineItem

		return (acc += unitPrice * quantity)
	}, 0)
}

export const findOfferLineItemTotal = (lineItems: ILineItem[]): number => {
	return lineItems.reduce((acc: number, lineItem: ILineItem) => {
		const { customGetProductPrice, freeQuantity } = lineItem

		return (acc += customGetProductPrice * freeQuantity)
	}, 0)
}

export const validateInputData = (data: IOfferCategory): boolean => {
	const { cartType, cartValue, lineItems, customBuyCollection, customBuyProduct } = data

	const getCombinedArray = combineBuyConfigArrays({ customBuyCollection, customBuyProduct })

	const total = getCombinedArray.reduce((total: number, id: string) => {
		const sum = lineItems.reduce((acc: number, lineItem: ILineItem) => {
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

export const validateOverAllData = (data: IOfferCategory): boolean => {
	const { cartType, cartValue, lineItems } = data

	const total = lineItems.reduce((acc: number, lineItem: ILineItem) => {
		const { quantity, unitPrice } = lineItem

		const currentValue = cartType === "amount" ? quantity * unitPrice : quantity

		return (acc += currentValue)
	}, 0)

	return total >= cartValue
}

export const buyXChooseYInputValidation = (data: IOfferCategory): boolean => {
	const {
		cartType,
		cartValue,
		lineItems,
		buyOfferType,
		getProducts,
		getProductCount,
		offerCategory
	} = data

	const sanitizedGetProduct = getLineItemsObj(getProducts)

	const buyCombinedArray = combineBuyConfigArrays(data)

	const total = buyCombinedArray.reduce((total: number, id: string) => {
		const sum = lineItems.reduce((acc: number, lineItem: ILineItem) => {
			const { collectionId, variantId, quantity, unitPrice } = lineItem || {}

			if (variantId === id || collectionId === id) {
				const currentValue = cartType === "amount" ? quantity * unitPrice : quantity

				acc += currentValue
			}

			return acc
		}, 0)

		return (total += sum)
	}, 0)

	if (buyOfferType === "collections") {
		const getProductExist = lineItems.some((lineItem: ILineItem) => {
			const { variantId } = lineItem || {}

			return sanitizedGetProduct[variantId]
		})

		const normaliseValue =
			cartType !== "amount" && getProductExist ? total - getProductCount : total

		return offerCategory === "automaticOffers"
			? total >= cartValue
			: normaliseValue >= cartValue
	}

	return total >= cartValue
}

export const validateBuyArrayAvaliable = (data: IValidateBuyArrayAvaliable): boolean => {
	const { customBuyProduct, customBuyCollection, lineItems } = data

	const validationArray = customBuyProduct.concat(customBuyCollection)

	return validationArray.some((id: string) => {
		return lineItems.some((lineItem: ILineItem) => {
			const { collectionId, variantId } = lineItem || {}

			return variantId === id || collectionId === id
		})
	})
}

export const validateGetArrayAvaliable = (data: IValidateGetArrayAvaliable): boolean => {
	const { customGetProduct, customGetCollection, lineItems } = data

	const validationArray = customGetProduct.concat(customGetCollection)

	return validationArray.some((id: string) => {
		return lineItems.some((lineItem: ILineItem) => {
			const { collectionId, variantId } = lineItem || {}

			return variantId === id || collectionId === id
		})
	})
}

export const validateGetProductCount = (data: IValidateGetProductCount): boolean => {
	const { customGetProduct, getProductCount, lineItems } = data

	const quantity = customGetProduct.reduce((count: number, id: string) => {
		const sum = lineItems.reduce((acc: number, lineItem: ILineItem) => {
			const { collectionId, variantId, quantity } = lineItem || {}

			if (variantId === id || collectionId === id) acc += quantity

			return acc
		}, 0)

		return (count += sum)
	}, 0)

	return quantity >= getProductCount
}

export const findUserProductCartTotal = (data: IFindUserProductCartTotal): number => {
	const { sanitizedLineItem, lineItems } = data

	return sanitizedLineItem.reduce((total: number, key: string) => {
		const sum = lineItems.reduce((acc: number, lineItem: ILineItem) => {
			const { collectionId, variantId, quantity, unitPrice } = lineItem || {}

			if (variantId === key || collectionId === key) acc += quantity * unitPrice

			return acc
		}, 0)

		return (total += sum)
	}, 0)
}
