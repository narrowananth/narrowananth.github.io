import { findOfferCategory } from "./controller/flow-category.controller"
import { IOfferApplied } from "./interfaces/flow-core.interface"
import { IAppContext, IConfigSchema } from "./interfaces/index.interface"
import { buildInputData, schemaReBuilder } from "./utils/flow-common.utils"

export const flow = (appContext: IAppContext, configSchema: IConfigSchema[]): string => {
	const { cartLineItems } = appContext

	const { lineItems } = cartLineItems

	const getOfferCategory = configSchema.map((schema: IConfigSchema) => {
		const getConfigSchema = schemaReBuilder(schema)

		const getBuildInputData = buildInputData(getConfigSchema, lineItems)

		return findOfferCategory(getBuildInputData)
	})

	const defalutFlowOffer: IOfferApplied[] = []

	const filteredArray = getOfferCategory.filter((output: any) => {
		const { schema, totalCartValue, offerApplied, getRemovedProductList } = output

		const { offerCategory } = schema

		if (!offerApplied)
			defalutFlowOffer.push({
				offerApplied,
				output: [],
				getRemovedProductList,
				displayText: "",
				totalCartValue: 0,
				schema
			})

		if (offerCategory === "automaticOffers" && offerApplied) return totalCartValue > 0

		return offerApplied
	})

	const sortBestOfferData = filteredArray.sort(
		(start: any, next: any) => start.totalCartValue - next.totalCartValue
	)

	const getBestOfferData =
		sortBestOfferData.length > 0 ? sortBestOfferData[0] : defalutFlowOffer[0]

	return JSON.stringify(getBestOfferData)
}
