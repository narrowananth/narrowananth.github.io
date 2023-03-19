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
	const {
		offerCategory,
		discountType,
		customGetProduct,
		customBuyProduct,
		customGetCollection,
		customBuyCollection
	} = getConfigSchema

	const getRemovedProductList = removeExistingDiscount(lineItems, discountType, customGetProduct) || []

	lineItems = resetInputLineItem(
		offerCategory,
		customGetProduct,
		customBuyProduct,
		customGetCollection,
		customBuyCollection,
		lineItems
	)

	const config = { ...getConfigSchema, lineItems, getRemovedProductList }

	return config
}

export const resetInputLineItem = (
	offerCategory: String,
	customGetProduct: Array<any>,
	customBuyProduct: Array<any>,
	customGetCollection: Array<any>,
	customBuyCollection: Array<any>,
	lineItems: Array<any>
): Array<any> => {
	lineItems = getLineItemsObj(lineItems)

	customGetProduct.forEach((key: any) => {
		const { variantId, originalUnitPrice } = lineItems[key] || {}

		if (offerCategory === "automaticOffers" && variantId === key) delete lineItems[key]
		else if (variantId === key) lineItems[key].unitPrice = originalUnitPrice
	})

	customBuyProduct.forEach((key: any) => {
		const { variantId, originalUnitPrice } = lineItems[key] || {}

		if (offerCategory === "automaticOffers" && variantId === key) delete lineItems[key]
		else if (variantId === key) lineItems[key].unitPrice = originalUnitPrice
	})

	lineItems = Object.values(lineItems)

	customGetCollection.forEach((key: any) => {
		lineItems.forEach((lineItem: any) => {
			const { collectionId, originalUnitPrice } = lineItem || {}

			if (offerCategory === "automaticOffers" && collectionId === key) delete lineItems[key]
			else if (collectionId === key) lineItems[key].unitPrice = originalUnitPrice
		})
	})

	customBuyCollection.forEach((key: any) => {
		lineItems.forEach((lineItem: any) => {
			const { collectionId, originalUnitPrice } = lineItem || {}

			if (offerCategory === "automaticOffers" && collectionId === key) delete lineItems[key]
			else if (collectionId === key) lineItems[key].unitPrice = originalUnitPrice
		})
	})

	return lineItems
}

export const removeExistingDiscount = (
	lineItems: Array<any>,
	discountType: string,
	customGetProduct: Array<string>
): Array<any> => {
	const getRemoveItemsList = lineItems

	return getRemoveItemsList.filter((lineItem: any) => {
		const { variantId, unitPrice, originalUnitPrice } = lineItem

		// lineItem.unitPrice = originalUnitPrice

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
