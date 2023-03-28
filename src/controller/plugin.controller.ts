import { findPercentageAmountDiscounts, findBuyXGetYDiscounts, findAutomaticDiscounts } from "../service/discount.core"

export const findOfferCategory = (data: any): object => {
	const { offerCategory } = data

	switch (offerCategory) {
		case "percentageDiscount":
			return findPercentageAmountDiscounts(data)

		case "flatDiscount":
			return findPercentageAmountDiscounts(data)

		case "buyXGetY":
			return findBuyXGetYDiscounts(data)

		case "automaticOffers":
			return findAutomaticDiscounts(data)

		default:
			return {}
	}
}
