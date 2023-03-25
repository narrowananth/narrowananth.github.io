import {
	findPercentageAmountDiscounts,
	findBuyXGetYDiscounts,
	findBuyMoreSaveDiscounts,
	findAutomaticDiscounts
} from "../service/discount.core"

export const findOfferCategory = (data: any): object => {
	const { offerCategory } = data

	switch (offerCategory) {
		case "percentageDiscount":
			return findPercentageAmountDiscounts(data)

		case "flatDiscount":
			return findPercentageAmountDiscounts(data)

		case "volumeDiscount":
			return findPercentageAmountDiscounts(data)

		case "buyXGetY":
			return findBuyXGetYDiscounts(data)

		case "buyMoreSaveMore":
			return findBuyMoreSaveDiscounts(data)

		case "automaticOffers":
			return findAutomaticDiscounts(data)

		default:
			return {}
	}
}
