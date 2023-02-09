export * from "../src"

import { findOfferSection } from "./buy-x-get-y/controller/plugin.controller"

import { appContext, configSchema } from "./input"

export const getBuyXGetY = (appContext: object | any, configSchema: object | any): Array<any> => {
	const { cartLineItems = {} } = appContext

	const { lineItems = {} } = cartLineItems

	configSchema.lineItems = lineItems

	return findOfferSection(configSchema)
}
