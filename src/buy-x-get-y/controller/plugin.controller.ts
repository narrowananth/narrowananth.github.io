import { thresholdProcess, productProcess, quantityProcess } from "../service/plugin.core"

export const findOfferSection = (data: any): Array<any> => {
	switch (data.buyOfferType) {
		case "threshold":
			return thresholdProcess(data)

		case "collection":
			break

		case "product":
			return productProcess(data)

		case "quantity":
			return quantityProcess(data)

		default:
			return []
	}

	return []
}
