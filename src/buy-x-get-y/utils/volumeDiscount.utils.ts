import { findTotalCartQuantity } from "./buyXGetYDiscount.utils"
import {
	applyCollectionDiscount,
	applyProductDiscount,
	findCollectionValid
} from "./percentageDiscountAndFlatDiscount.utils"

export const findBuyProductVolumeValid = (data: any): boolean => {
	const { cartQuantity, buyProducts, sanitizedLineItem } = data

	let localQuantity = 0

	buyProducts.forEach((ids: any) => {
		const { variantId } = ids

		const quantity = sanitizedLineItem[variantId] ? sanitizedLineItem[variantId].quantity : 0

		localQuantity += quantity
	})

	const isValid = localQuantity >= cartQuantity ? true : false

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
					offerCategory,
					overAll,
					sanitizedLineItem,
					discountType,
					discountValue
			  })
			: []

		return { getRemovedProductList, output: buyProuductDiscount }
	} else if (!collection) {
		const buyProductVariantIds = buyProducts.flatMap((product: any) => product.variantId)

		const validBuyProductRepsonse = findBuyProductVolumeValid({ cartQuantity, buyProducts, sanitizedLineItem })

		const buyProuductDiscount = validBuyProductRepsonse
			? applyProductDiscount({
					offerCategory,
					buyProductVariantIds,
					sanitizedLineItem,
					discountType,
					discountValue
			  })
			: []
		return { getRemovedProductList, output: buyProuductDiscount }
	} else if (collection) {
		const buyCollectionValue = !getCollectionValid
			? findCollectionValid({
					cartQuantity,
					offerCategory,
					buyCollections,
					buyCollectionsCount,
					sanitizedLineItem
			  })
			: false

		const buyCollectionDiscount = !getCollectionValid
			? applyCollectionDiscount({
					offerCategory,
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
