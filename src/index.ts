import { findOfferCategory } from "./controller/plugin.controller"
import { buildInputData, schemaReBuilder } from "./utils/common.utils"
import { AppContext, ConfigSchema } from "./interface/common.schema"

export const flow = (appContext: AppContext, configSchema: ConfigSchema[]): string => {
	const { cartLineItems } = appContext

	const { lineItems } = cartLineItems

	const getOfferCategory = configSchema.map((schema: ConfigSchema) => {
		const getConfigSchema = schemaReBuilder(schema)

		const getBuildInputData = buildInputData(getConfigSchema, lineItems)

		return findOfferCategory(getBuildInputData)
	})

	const filteredArray = getOfferCategory.filter((output: any) => {
		const { schema, totalCartValue, offerApplied } = output

		const { offerCategory } = schema

		if (offerCategory === "automaticOffers" && offerApplied) return totalCartValue > 0

		return offerApplied
	})

	const getBestOfferData = filteredArray.sort(
		(start: any, next: any) => start.totalCartValue - next.totalCartValue
	)

	return JSON.stringify(getBestOfferData[0])
}
