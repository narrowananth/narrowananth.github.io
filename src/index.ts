export * from "../src"

import { findOfferSection } from "./buy-x-get-y/controller/plugin.controller"
import { setDuplicateAmount, resetLineItemAmount } from "./buy-x-get-y/utils/common"
import { appContext, configSchema } from "./input"

export const getBuyXGetY = (appContext: object | any, configSchema: object | any): string => {
	const { cartLineItems = {} } = appContext

	let { lineItems = {} } = cartLineItems

	const { getOfferType } = configSchema

	lineItems = getOfferType !== "product" ? setDuplicateAmount(lineItems) : lineItems

	lineItems = getOfferType !== "product" ? resetLineItemAmount(lineItems) : lineItems

	const config = { ...configSchema, lineItems }

	const result = findOfferSection(config)

	return JSON.stringify(result)
}
