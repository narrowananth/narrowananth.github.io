import { resetLineItemAmount, removeExistingDiscount } from "./threshold.utils"

export const buildInputData = (configSchema: object | any, lineItems: Array<any>): object => {
	const { buyOfferType, getOfferType } = configSchema

	if (buyOfferType === "threshold") {
		lineItems = getOfferType !== "product" ? resetLineItemAmount(lineItems) : lineItems

		const getRemovedProductList = getOfferType === "product" ? removeExistingDiscount(lineItems) : undefined

		const config = { ...configSchema, lineItems, getRemovedProductList }

		return config
	}
	return { ...configSchema, lineItems }
}
