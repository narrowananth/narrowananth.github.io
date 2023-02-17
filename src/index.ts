import { findOfferSection } from "./buy-x-get-y/controller/plugin.controller"
import { buildInputData } from "./buy-x-get-y/utils/plugin.utils"

export const getBuyXGetY = (appContext: object | any, configSchema: object): string => {
	const { cartLineItems = {} } = appContext

	const { lineItems = [] } = cartLineItems

	const getConfigSchema = configSchema

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getOfferSection = findOfferSection(getBuildInputData)

	return JSON.stringify(getOfferSection)
}

export const showMessage = (message: any) => {
	return message
}
