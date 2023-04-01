import { findOfferCategory } from "./controller/plugin.controller"
import { buildInputData, schemaReBuilder } from "./utils/common.utils"
import { AppContext, ConfigSchema } from "./interface/common.schema"

export const flow = (appContext: AppContext, configSchema: ConfigSchema[]): string => {
	const { cartLineItems } = appContext

	const { lineItems } = cartLineItems

	const getOfferCategory = configSchema.map((schema: ConfigSchema) => {
		if (lineItems.length === 0) return JSON.stringify({ output: [], getRemovedProductList: [], displayText: "" })

		const getConfigSchema = schemaReBuilder(schema)

		const getBuildInputData = buildInputData(getConfigSchema, lineItems)

		return findOfferCategory(getBuildInputData)
	})

	getOfferCategory.sort((start: any, next: any) => start.totalCartValue - next.totalCartValue)

	return JSON.stringify(getOfferCategory[0])
}
