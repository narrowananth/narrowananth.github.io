import {
	IBuyCollection,
	IBuyProduct,
	IConfigSchema,
	IGetCollection,
	IGetProduct,
	ILineItem
} from "../interfaces/index.interface"
import { IOfferCategory } from "../interfaces/flow-category.interface"
import { ILineItemObject } from "../interfaces/flow-common.interface"

export const schemaReBuilder = (configSchema: IConfigSchema): IConfigSchema => {
	const {
		buyCollections = [],
		getCollections = [],
		buyProducts = [],
		getProducts = [],
		getProductCount
	} = configSchema

	const buyVariantIdList = buyProducts.map((product: IBuyProduct) => product.variantId)

	configSchema.customBuyProduct = buyVariantIdList

	const getVariantIdList = getProducts.map((product: IGetProduct) => product.variantId)

	configSchema.customGetProduct = getVariantIdList

	const buyCollectionIdList = buyCollections.map(
		(collection: IBuyCollection) => collection.collectionId
	)

	configSchema.customBuyCollection = buyCollectionIdList

	const getCollectionIdList = getCollections.map(
		(collection: IGetCollection) => collection.collectionId
	)

	configSchema.customGetCollection = getCollectionIdList

	if (!getProductCount) configSchema.getProductCount = 0

	return configSchema
}

export const buildInputData = (
	getConfigSchema: IConfigSchema,
	lineItems: ILineItem[]
): IOfferCategory => {
	const modifiedLineItem = resetInputLineItem(lineItems)

	const config = {
		getConfigSchema,
		...getConfigSchema,
		lineItems: modifiedLineItem,
		getRemovedProductList: modifiedLineItem
	}

	return config
}

export const resetInputLineItem = (lineItems: ILineItem[]): ILineItem[] => {
	return lineItems.map((lineItem: ILineItem) => {
		const { originalUnitPrice } = lineItem

		lineItem.unitPrice = originalUnitPrice

		return lineItem
	})
}

export const getLineItemsObj = (lineItems: any): ILineItemObject => {
	return lineItems.reduce((acc: ILineItemObject, lineItem: ILineItem) => {
		const { variantId } = lineItem

		acc[variantId] = lineItem

		return acc
	}, {})
}

export const constructDisplayTextHtmlBuilder = (displayText: string): string => {
	return `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width,initial-scale=1.0" />
		</head>
		<body style="min-width: auto; min-height: auto">
			<h2 style="text-align: center;"><b>${displayText}</b></h2>
		</body>
	</html>`
}
