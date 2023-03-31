import { findOfferCategory } from "./controller/plugin.controller"
import { buildInputData, schemaReBuilder } from "./utils/common.utils"
import { AppContext, ConfigSchema } from "./interface/common.schema"

export const flow = (appContext: AppContext, configSchema: ConfigSchema): string => {
	const { cartLineItems } = appContext

	const { lineItems } = cartLineItems

	if (lineItems.length === 0) return JSON.stringify({ output: [], getRemovedProductList: [], displayText: "" })

	const getConfigSchema = schemaReBuilder(configSchema)

	const getBuildInputData = buildInputData(getConfigSchema, lineItems)

	const getOfferCategory = findOfferCategory(getBuildInputData)

	return JSON.stringify(getOfferCategory)
}
