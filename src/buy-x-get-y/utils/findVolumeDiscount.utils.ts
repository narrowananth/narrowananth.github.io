import { applyProductDiscount } from "./percentageDiscountProcess.utils"

export const findBuyProductVolumeValid = (data: any): boolean => {
	const { buyProducts, sanitizedLineItem } = data

	const buyProductVariantIdsValid = buyProducts.every((val: any) => {
		const { variantId, count } = val

		return variantId ? sanitizedLineItem[variantId].quantity >= count : false
	})

	const isValid = buyProductVariantIdsValid ? true : false

	return isValid
}

export const findVolumeDiscount = (data: any): object => {
	const { lineItems, getConfigSchema, getRemovedProductList } = data

	const { buyCollection, discountType, discountValue, buyCollectionValue, buyProducts } = data

	if (!buyCollection) {
		const buyProductVariantIds = buyProducts.flatMap((product: any) => product.variantId)

		const sanitizedLineItem = lineItems

		const validBuyProductRepsonse = findBuyProductVolumeValid({ buyProducts, sanitizedLineItem })

		const buyProuductDiscount = validBuyProductRepsonse
			? applyProductDiscount({
					buyProductVariantIds,
					sanitizedLineItem,
					discountType,
					discountValue
			  })
			: []
		return { getRemovedProductList, output: buyProuductDiscount }
	} else {
		return {}
	}
}
