import { findOfferCategory } from "./buy-x-get-y/controller/plugin.controller"
import { schemaReBuilder, buildInputData } from "./buy-x-get-y/utils/plugin.utils"

export const showMessage = (message: any) => {
	return message
}

export const flow = (appContext: object | any, configSchema: object): string => {
	const { cartLineItems = {} } = appContext

	const { lineItems = [] } = cartLineItems

	if (lineItems.length === 0) return JSON.stringify({ output: [], getRemovedProductList: [] })

	const getConfigSchema = schemaReBuilder(configSchema)

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getOfferCategory = findOfferCategory(getBuildInputData)

	return JSON.stringify(getOfferCategory)
}
