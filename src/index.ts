import { findOfferCategory } from "./buy-x-get-y/controller/plugin.controller"

export const showMessage = (message: any) => {
	return message
}

export const flow = (appContext: object | any, configSchema: object): string => {
	const { cartLineItems = {} } = appContext

	const { lineItems = [] } = cartLineItems

	const getConfigSchema = configSchema

	const getOfferCategory = findOfferCategory({ lineItems, getConfigSchema })

	return JSON.stringify(getOfferCategory)
}
