import { findTotalCartQuantity } from "./buyXGetYDiscount.utils"
import {
	applyCollectionDiscount,
	applyProductDiscount,
	findCollectionValid
} from "./percentageDiscountAndFlatDiscount.utils"

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
	const { lineItems, getRemovedProductList } = data

	const {
		overAll,
		cartQuantity,
		offerCategory,
		getCollectionValid,
		collection,
		discountType,
		discountValue,
		buyCollections,
		buyCollectionsCount,
		buyProducts
	} = data

	const sanitizedLineItem = lineItems

	if (overAll) {
		const getTotalCartQuantity = findTotalCartQuantity({ cartQuantity, sanitizedLineItem })

		const buyProuductDiscount = getTotalCartQuantity
			? applyProductDiscount({
					overAll,
					sanitizedLineItem,
					discountType,
					discountValue
			  })
			: []

		return { getRemovedProductList, output: buyProuductDiscount }
	} else if (!collection) {
		const buyProductVariantIds = buyProducts.flatMap((product: any) => product.variantId)

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
	} else if (collection) {
		const buyCollectionValue = !getCollectionValid
			? findCollectionValid({ offerCategory, buyCollections, buyCollectionsCount, sanitizedLineItem })
			: false

		const buyCollectionDiscount = !getCollectionValid
			? applyCollectionDiscount({
					buyCollectionValue,
					sanitizedLineItem,
					discountType,
					discountValue
			  })
			: []

		return { getRemovedProductList, output: buyCollectionDiscount }
	} else {
		return { getRemovedProductList, output: {} }
	}
}
