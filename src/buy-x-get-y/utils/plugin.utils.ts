export const buildInputData = (getConfigSchema: object | any, lineItems: Array<any>): object => {
	const getRemovedProductList = removeExistingDiscount(lineItems) || []

	const { getOfferConfig } = getConfigSchema

	const { getProducts } = getOfferConfig

	lineItems = resetInputLineItem(getProducts, lineItems)

	const config = { ...getConfigSchema, lineItems, getRemovedProductList }

	return config
}

export const resetInputLineItem = (getProducts: Array<any>, lineItems: Array<any>): Array<any> => {
	const getRemovedList = getProducts.map((product: any) => product.variantId)

	lineItems = getLineItemsObj(lineItems)

	getRemovedList.forEach((key: any) => {
		const { lineItemType, variantId } = lineItems[key] || {}

		if (variantId === key && lineItemType === "READONLY") delete lineItems[key]
	})

	return lineItems
}

export const removeExistingDiscount = (lineItems: Array<any>): Array<any> => {
	const getRemoveItemsList = lineItems

	return getRemoveItemsList.filter((lineItem: any) => {
		const { lineItemType } = lineItem

		return lineItemType === "READONLY"
	})
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

	const includeProductObj = getLineItemsObj(includeProducts)

	const excludedProductObj = getLineItemsObj(excludeProducts)

	const includedProductLineItem =
		Object.keys(includeProductObj).length !== 0 ? removeLineItems(lineItems, includeProductObj, "include") : []

	const excludedProductLineItem =
		Object.keys(excludedProductObj).length !== 0 ? removeLineItems(lineItems, excludedProductObj, "exclude") : []

	const lineItem = includedProductLineItem.length ? includedProductLineItem : excludedProductLineItem

	const setKeyToLineItem = getLineItemsObj(lineItem)

	const finalLineItems = lineItem.length !== 0 ? setKeyToLineItem : lineItems

	return finalLineItems
}
