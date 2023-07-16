import { IOfferCategory } from "../interfaces/flow-category.interface"
import { IOfferApplied } from "../interfaces/flow-core.interface"
import {
	findPercentageAmountDiscounts,
	findBuyXChooseYDiscounts,
	findBuyXGetYDiscounts
} from "../service/flow-core.service"

export const findOfferCategory = (data: IOfferCategory): IOfferApplied => {
	const { offerCategory } = data

	switch (offerCategory) {
		case "percentageDiscount":
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
