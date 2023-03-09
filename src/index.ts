import { findOfferCategory } from "./buy-x-get-y/controller/plugin.controller"
import { buildInputData } from "./buy-x-get-y/utils/plugin.utils"

export const showMessage = (message: any) => {
	return message
}

export const flow = (appContext: object | any, configSchema: object): string => {
	const { cartLineItems = {} } = appContext

	const { lineItems = [] } = cartLineItems

	const getConfigSchema = configSchema

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getOfferCategory = findOfferCategory(getBuildInputData)

	return JSON.stringify(getOfferCategory)
}
