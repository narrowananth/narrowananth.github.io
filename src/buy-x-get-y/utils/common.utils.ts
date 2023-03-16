export const schemaReBuilder = (configSchema: any): object => {
	const { buyCollections, getCollections, buyProducts, getProducts, getProductCount } = configSchema

	const buyVariantIdList = buyProducts.map((product: any) => product.variantId)

	configSchema.customBuyProduct = buyVariantIdList

	const getVariantIdList = getProducts.map((product: any) => product.variantId)

	configSchema.customGetProduct = getVariantIdList

	const buyCollectionIdList = buyCollections.map((collection: any) => collection.collectionId)

	configSchema.customBuyCollection = buyCollectionIdList

	const getCollectionIdList = getCollections.map((collection: any) => collection.collectionId)

	configSchema.customGetCollection = getCollectionIdList

	if (!getProductCount) configSchema.getProductCount = 0

	return configSchema
}

export const buildInputData = (getConfigSchema: object | any, lineItems: Array<any>): object => {
	const getRemovedProductList = removeExistingDiscount(lineItems) || []

	const { offerCategory, customGetProduct, customBuyProduct } = getConfigSchema

	lineItems = resetInputLineItem(offerCategory, customGetProduct, customBuyProduct, lineItems)

	const config = { ...getConfigSchema, lineItems, getRemovedProductList }

	return config
}

export const resetInputLineItem = (
	offerCategory: String,
	customGetProduct: Array<any>,
	customBuyProduct: Array<any>,
	lineItems: Array<any>
): Array<any> => {
	lineItems = getLineItemsObj(lineItems)

	customGetProduct.forEach((key: any) => {
		const { lineItemType, variantId, originalUnitPrice } = lineItems[key] || {}

		if (offerCategory === "automaticOffers" && variantId === key && lineItemType === "READONLY")
			delete lineItems[key]
		else if (variantId === key && lineItemType === "READONLY") lineItems[key].unitPrice = originalUnitPrice
	})

	customBuyProduct.forEach((key: any) => {
		const { lineItemType, variantId, originalUnitPrice } = lineItems[key] || {}

		if (offerCategory === "automaticOffers" && variantId === key && lineItemType === "READONLY")
			delete lineItems[key]
		else if (variantId === key && lineItemType === "READONLY") lineItems[key].unitPrice = originalUnitPrice
	})

	lineItems = Object.values(lineItems)

	return lineItems
}

export const removeExistingDiscount = (lineItems: Array<any>): Array<any> => {
	const getRemoveItemsList = lineItems

	return getRemoveItemsList.filter((lineItem: any) => {
		const { lineItemType, originalUnitPrice } = lineItem

		lineItem.unitPrice = originalUnitPrice

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
