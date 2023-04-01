import {
	ConfigSchema,
	BuyProduct,
	GetProduct,
	BuyCollection,
	GetCollection,
	LineItem,
	LineItemObject,
	BuildInputData
} from "../interface/common.schema"

export const schemaReBuilder = (configSchema: ConfigSchema): object => {
	const {
		buyCollections = [],
		getCollections = [],
		buyProducts = [],
		getProducts = [],
		getProductCount
	} = configSchema

	const buyVariantIdList = buyProducts.map((product: BuyProduct) => product.variantId)

	configSchema.customBuyProduct = buyVariantIdList

	const getVariantIdList = getProducts.map((product: GetProduct) => product.variantId)

	configSchema.customGetProduct = getVariantIdList

	const buyCollectionIdList = buyCollections.map((collection: BuyCollection) => collection.collectionId)

	configSchema.customBuyCollection = buyCollectionIdList

	const getCollectionIdList = getCollections.map((collection: GetCollection) => collection.collectionId)

	configSchema.customGetCollection = getCollectionIdList

	if (!getProductCount) configSchema.getProductCount = 0

	return configSchema
}

export const buildInputData = (getConfigSchema: BuildInputData | any, lineItems: LineItem[]): object => {
	const { discountType, customGetProduct } = getConfigSchema

	const getRemovedProductList = removeExistingDiscount(lineItems, discountType, customGetProduct) || []

	const modifiedLineItem = resetInputLineItem(lineItems)

	const config = { getConfigSchema, ...getConfigSchema, lineItems: modifiedLineItem, getRemovedProductList }

	return config
}

export const resetInputLineItem = (lineItems: LineItem[]): Array<LineItem> => {
	const modifiedLineItem = lineItems.map((lineItem: LineItem) => {
		const { originalUnitPrice } = lineItem

		lineItem.unitPrice = originalUnitPrice

		return lineItem
	})

	return modifiedLineItem
}

export const removeExistingDiscount = (
	lineItems: LineItem[],
	discountType: string,
	customGetProduct: Array<string>
): Array<object> => {
	const getRemoveItemsList = lineItems

	return getRemoveItemsList.map((lineItem: LineItem) => {
		const { variantId, unitPrice, originalUnitPrice } = lineItem

		lineItem.unitPrice = originalUnitPrice

		// if (discountType === "free") return customGetProduct.find((id: string) => id === variantId)

		return lineItem
	})
}

export const getLineItemsObj = (lineItems: LineItem[]): LineItemObject => {
	return lineItems.reduce((acc: LineItemObject, lineItem: LineItem) => {
		const { variantId } = lineItem

		acc[variantId] = lineItem

		return acc
	}, {})
}
