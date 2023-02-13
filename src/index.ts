export * from "../src"

import { findOfferSection } from "./buy-x-get-y/controller/plugin.controller"
import { resetLineItemAmount, removeExistingDiscount } from "./buy-x-get-y/utils/common"
import { appContext, configSchema } from "./input"

export const getBuyXGetY = (appContext: object | any, configSchema: object | any): string => {
	const { cartLineItems = {} } = appContext

	let { lineItems = {} } = cartLineItems

	const { getOfferType } = configSchema

	lineItems = getOfferType !== "product" ? resetLineItemAmount(lineItems) : lineItems

	const getRemovedProductList = getOfferType === "product" ? removeExistingDiscount(lineItems) : undefined

	const config = { ...configSchema, lineItems, getRemovedProductList }

	const result = findOfferSection(config)

	return JSON.stringify(result)
}
