export const schemaReBuilder = (configSchema: any): object => {
	const {
		buyCollections = [],
		getCollections = [],
		buyProducts = [],
		getProducts = [],
		getProductCount
	} = configSchema

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
	const { discountType, customGetProduct } = getConfigSchema

	const getRemovedProductList = removeExistingDiscount(lineItems, discountType, customGetProduct) || []

	const modifiedLineItem = resetInputLineItem(lineItems)

	const config = { ...getConfigSchema, lineItems: modifiedLineItem, getRemovedProductList }

	return config
}

export const resetInputLineItem = (lineItems: Array<any>): Array<any> => {
	const modifiedLineItem = lineItems.map((lineItem: any) => {
		const { originalUnitPrice } = lineItem

		lineItem.unitPrice = originalUnitPrice

		return lineItem
	})

	return modifiedLineItem
}

export const removeExistingDiscount = (
	lineItems: Array<any>,
	discountType: string,
	customGetProduct: Array<string>
): Array<any> => {
	const getRemoveItemsList = lineItems

	return getRemoveItemsList.filter((lineItem: any) => {
		const { variantId, unitPrice, originalUnitPrice } = lineItem

		lineItem.unitPrice = originalUnitPrice

		if (discountType === "free") return customGetProduct.find((id: any) => id === variantId)

		return unitPrice !== originalUnitPrice
	})
}

export const getLineItemsObj = (lineItems: Array<any>): any => {
	return lineItems.reduce((acc: any, lineItem: any) => {
		const { variantId } = lineItem

		acc[variantId] = lineItem

		return acc
	}, {})
}
