export const buildInputData = (configSchema: object | any, lineItems: Array<any>): object => {
	const getRemovedProductList = removeExistingDiscount(lineItems)

	lineItems = resetLineItemAmount(getRemovedProductList, lineItems)

	const config = { ...configSchema, lineItems, getRemovedProductList }

	return config
}

export const resetLineItemAmount = (getRemovedProductList: Array<any>, lineItems: Array<any>): Array<any> => {
	const getRemovedList = getRemovedProductList.map((product: any) => product.variantId)

	lineItems = getLineItemsObj(lineItems)

	getRemovedList.forEach((key: any) => {
		if (lineItems[key]) delete lineItems[key]
	})

	return lineItems
}

export const removeExistingDiscount = (lineItems: Array<any>): Array<any> => {
	lineItems = lineItems.filter((lineItem: any) => {
		const { lineItemType } = lineItem

		return lineItemType === "READONLY"
	})

	return lineItems || []
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

	console.log("lineitems: ", lineItems)

	const includeProductObj = setKeyInFilterProduct(includeProducts)

	const excludedProductObj = setKeyInFilterProduct(excludeProducts)

	const includedProductLineItem =
		Object.keys(includeProductObj).length !== 0 ? removeLineItems(lineItems, includeProductObj, "include") : []

	const excludedProductLineItem =
		Object.keys(excludedProductObj).length !== 0 ? removeLineItems(lineItems, excludedProductObj, "exclude") : []

	data.includedProductLineItem = includedProductLineItem.length !== 0 ? includedProductLineItem : undefined

	data.excludedProductLineItem =
		includedProductLineItem.length === 0 && excludedProductLineItem.length !== 0
			? excludedProductLineItem
			: undefined

	const lineItem = includedProductLineItem.length ? includedProductLineItem : excludedProductLineItem

	const finalLineItems = lineItem.length !== 0 ? lineItem : data.lineItems

	return finalLineItems
}
