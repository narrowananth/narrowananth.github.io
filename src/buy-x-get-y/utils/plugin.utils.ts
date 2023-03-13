export const schemaReBuilder = (configSchema: any): object => {
	const { buyOfferType, cartType, cartValue, buyCollections, getCollections, getProducts } = configSchema

	configSchema.onlyCartAmoutAndQunatity = false

	if (buyOfferType === "overAll") configSchema.overAll = true
	else configSchema.overAll = false

	if (buyOfferType === "collections") configSchema.collection = true
	else configSchema.collection = false

	if (cartType === "amount") {
		configSchema.onlyCartAmoutAndQunatity = true
		configSchema.cartTotal = cartValue
	} else configSchema.cartTotal = 0

	if (cartType === "count") {
		configSchema.onlyCartAmoutAndQunatity = true
		configSchema.cartQuantity = cartValue
	} else configSchema.cartQuantity = 0

	if (getCollections.length > 0) {
		configSchema.getCollectionValid = true

		const dummyGetCollectionIds = getCollections.flatMap((collection: any) => collection.collectionId)

		configSchema.getCollections = dummyGetCollectionIds
	} else configSchema.getCollectionValid = false

	if (getProducts.length > 0) configSchema.getProductValid = true
	else configSchema.getProductValid = false

	if (buyCollections.length > 0) {
		const dummyBuyCollectionIds = buyCollections.flatMap((collection: any) => collection.collectionId)

		configSchema.buyCollections = dummyBuyCollectionIds
	}

	return configSchema
}

export const buildInputData = (getConfigSchema: object | any, lineItems: Array<any>): object => {
	const getRemovedProductList = removeExistingDiscount(lineItems) || []

	const { offerCategory, getProducts, buyProducts } = getConfigSchema

	lineItems = resetInputLineItem(offerCategory, getProducts, buyProducts, lineItems)

	const config = { ...getConfigSchema, lineItems, getRemovedProductList }

	return config
}

export const resetInputLineItem = (
	offerCategory: String,
	getProducts: Array<any>,
	buyProducts: Array<any>,
	lineItems: Array<any>
): Array<any> => {
	const getRemovedList = getProducts.map((product: any) => product.variantId)

	const buyRemovedList = buyProducts.map((product: any) => product.variantId)

	lineItems = getLineItemsObj(lineItems)

	getRemovedList.forEach((key: any) => {
		const { lineItemType, variantId, originalUnitPrice } = lineItems[key] || {}

		if (offerCategory === "automaticOffers" && variantId === key && lineItemType === "READONLY")
			delete lineItems[key]
		else if (variantId === key && lineItemType === "READONLY") lineItems[key].unitPrice = originalUnitPrice
	})

	buyRemovedList.forEach((key: any) => {
		const { lineItemType, variantId, originalUnitPrice } = lineItems[key] || {}

		if (offerCategory === "automaticOffers" && variantId === key && lineItemType === "READONLY")
			delete lineItems[key]
		else if (variantId === key && lineItemType === "READONLY") lineItems[key].unitPrice = originalUnitPrice
	})

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
