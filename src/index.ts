export * from "../src"

import { findOfferSection } from "./buy-x-get-y/controller/plugin.controller"

import { appContext, configSchema } from "./input"

export const getBuyXGetY = (appContext: object | any, configSchema: object | any): string => {
	const { cartLineItems = {} } = appContext

	const { lineItems = {} } = cartLineItems

	const config = { ...configSchema, lineItems }

	const result = findOfferSection(config)

	return JSON.stringify(result)
}
