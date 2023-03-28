import { findOfferCategory } from "./controller/plugin.controller"
import { buildInputData, schemaReBuilder } from "./utils/common.utils"

export const showMessage = (message: any) => {
	return message
}

export const flow = (appContext: object | any, configSchema: object): string => {
	const { cartLineItems = {} } = appContext

	const { lineItems = [] } = cartLineItems

	if (lineItems.length === 0) return JSON.stringify({ output: [], getRemovedProductList: [], displayText: "" })

	const getConfigSchema = schemaReBuilder(configSchema)

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getOfferCategory = findOfferCategory(getBuildInputData)

	return JSON.stringify(getOfferCategory)
}
