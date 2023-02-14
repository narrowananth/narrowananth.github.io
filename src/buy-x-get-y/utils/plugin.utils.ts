import { resetLineItemAmount, removeExistingDiscount } from "./threshold.utils"

export const buildInputData = (configSchema: object | any, lineItems: Array<any>): object => {
	const { buyOfferType, getOfferType } = configSchema

	if (buyOfferType === "threshold") {
		lineItems = getOfferType !== "product" ? resetLineItemAmount(lineItems) : lineItems

		const getRemovedProductList = getOfferType === "product" ? removeExistingDiscount(lineItems) : undefined

		const config = { ...configSchema, lineItems, getRemovedProductList }

		return config
	}
	return { ...configSchema, lineItems }
}

export const setKeyInFilterProduct = (product: Array<any>): any => {
	return product.reduce((obj: object, producDetails: any) => {
		const { variantId } = producDetails

		return { ...obj, [variantId]: producDetails }
	}, {})
}

export const getLineItemsObj = (lineItems: Array<any>): any => {
	return lineItems.reduce((acc: any, lineItem: any) => {
		const { variantId } = lineItem

		acc[variantId] = lineItem

		return acc
	}, {})
}

export const removeLineItems = (lineItems: any, productObj: any, selection: string): Array<object> => {
	const editedLineItem: any[] = []

	if (selection === "include") {
		Object.keys(lineItems).forEach((key: any) => {
			if (productObj[key]) editedLineItem.push(lineItems[key])
		})
	} else if (selection === "exclude") {
		Object.keys(lineItems).forEach((key: any) => {
			if (!productObj[key]) editedLineItem.push(lineItems[key])
		})
	}

	return editedLineItem
}

export const sanitizeLineItems = (data: any): Array<any> => {
	const { lineItems, includeProducts, excludeProducts } = data

	const lineItemsObj = getLineItemsObj(lineItems)

	const includeProductObj = setKeyInFilterProduct(includeProducts)

	const excludedProductObj = setKeyInFilterProduct(excludeProducts)

	const includedProductLineItem =
		Object.keys(includeProductObj).length !== 0 ? removeLineItems(lineItemsObj, includeProductObj, "include") : []

	const excludedProductLineItem =
		Object.keys(excludedProductObj).length !== 0 ? removeLineItems(lineItemsObj, excludedProductObj, "exclude") : []

	data.includedProductLineItem = includedProductLineItem.length !== 0 ? includedProductLineItem : undefined

	data.excludedProductLineItem =
		includedProductLineItem.length === 0 && excludedProductLineItem.length !== 0
			? excludedProductLineItem
			: undefined

	const lineItem = includedProductLineItem.length ? includedProductLineItem : excludedProductLineItem

	const finalLineItems = lineItem.length !== 0 ? lineItem : data.lineItems

	return finalLineItems
}
