import { applyProductPercentageDiscount } from "./percentageDiscountProcess.utils"
import { getLineItemsObj } from "./plugin.utils"

export const findBuyProductVolumeValid = (data: any): boolean => {
	const { buyProduct, sanitizedLineItem } = data

	const buyProductVariantIdsValid = buyProduct.every((val: any) => {
		const { variantId, count } = val

		return variantId ? sanitizedLineItem[variantId]?.quantity >= count : false
	})

	const isValid = buyProductVariantIdsValid ? true : false

	return isValid
}

export const findVolumeDiscount = (data: any): object => {
	const { lineItems, getConfigSchema } = data

	const { buyCollection, discountType, discountValue, buyCollectionValue, buyProduct } = getConfigSchema

	if (!buyCollection) {
		const buyProductVariantIds = buyProduct.flatMap((product: any) => product.variantId)

		const sanitizedLineItem = getLineItemsObj(lineItems)

		const validBuyProductRepsonse = findBuyProductVolumeValid({ buyProduct, sanitizedLineItem })

		const buyProuductDiscount = validBuyProductRepsonse
			? applyProductPercentageDiscount({
					buyProductVariantIds,
					sanitizedLineItem,
					discountType,
					discountValue
			  })
			: []
		return buyProuductDiscount
	} else {
		return {}
	}
}
