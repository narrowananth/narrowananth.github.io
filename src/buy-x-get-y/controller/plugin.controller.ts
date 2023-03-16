import {
	automaticOffersProcess,
	buyMoreSaveMoreProcess,
	buyXGetYProcess,
	couponCodeProcess,
	flatDiscountProcess,
	percentageDiscountProcess,
	volumeDiscountProcess
} from "./offer.controller"

export const findOfferCategory = (data: any): object => {
	const { offerCategory } = data

	switch (offerCategory) {
		case "percentageDiscount":
			return percentageDiscountProcess(data)

		case "flatDiscount":
			return flatDiscountProcess(data)

		case "volumeDiscount":
			return volumeDiscountProcess(data)

		case "buyXGetY":
			return buyXGetYProcess(data)

		case "buyMoreSaveMore":
			return buyMoreSaveMoreProcess(data)

		case "automaticOffers":
			return automaticOffersProcess(data)

		case "couponCode":
			return couponCodeProcess(data)

		default:
			return {}
	}
}
