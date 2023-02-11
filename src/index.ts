export * from "../src"

import { findOfferSection } from "./buy-x-get-y/controller/plugin.controller"
import { resetLineItemAmount } from "./buy-x-get-y/utils/common"
import { appContext, configSchema } from "./input"

export const getBuyXGetY = (appContext: object | any, configSchema: object | any): string => {
	const { cartLineItems = {} } = appContext

	const { lineItems = {} } = cartLineItems

	const getResetLineItem = resetLineItemAmount(lineItems)

	const config = { ...configSchema, getResetLineItem }

	const result = findOfferSection(config)

	return JSON.stringify(result)
}
