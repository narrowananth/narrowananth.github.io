import {
	findPercentageAmountDiscounts,
	findBuyXChooseYDiscounts,
	findBuyXGetYDiscounts
} from "../service/discount.core"

export const findOfferCategory = (data: any): object => {
	const { offerCategory } = data

	switch (offerCategory) {
		case "percentageDiscount":
			return findPercentageAmountDiscounts(data)

		case "flatDiscount":
			return findPercentageAmountDiscounts(data)

		case "buyXGetY":
			return findBuyXChooseYDiscounts(data)

		case "automaticOffers":
			return findBuyXGetYDiscounts(data)

		default:
			return {}
	}
}
