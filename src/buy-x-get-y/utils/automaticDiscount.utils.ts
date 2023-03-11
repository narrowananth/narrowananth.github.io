import { findTotalCartAmount } from "./buyMoreSaveDiscount.utils"
import { findTotalCartQuantity } from "./buyXGetYDiscount.utils"
import { findCollectionValid } from "./percentageDiscountAndFlatDiscount.utils"
import { findBuyProductVolumeValid } from "./volumeDiscount.utils"

export const findAutomaticDiscount = (data: any): object => {
	const { lineItems, getRemovedProductList } = data

	const {
		offerCategory,
		onlyCartAmoutAndQunatity,
		collection,
		cartTotal,
		cartQuantity,
		buyProducts,
		getProducts,
		buyCollections,
		buyCollectionsCount
	} = data

	const sanitizedLineItem = lineItems

	const getTotalCartAmount = onlyCartAmoutAndQunatity ? findTotalCartAmount({ cartTotal, sanitizedLineItem }) : false

	const getTotalCartQuantity = onlyCartAmoutAndQunatity
		? findTotalCartQuantity({ cartQuantity, sanitizedLineItem })
		: false

	const validBuyProductRepsonse = findBuyProductVolumeValid({ buyProducts, sanitizedLineItem })

	const buyCollectionValue = collection
		? findCollectionValid({ offerCategory, buyCollections, buyCollectionsCount, sanitizedLineItem })
		: {}

	const { buyCollectionsIdsValid } = buyCollectionValue

	if (getTotalCartAmount || getTotalCartQuantity || validBuyProductRepsonse || buyCollectionsIdsValid) {
		const output = getProducts.map((val: any) => {
			const { productId, variantId, count } = val

			return {
				productId,
				variantId,
				quantity: count,
				unitPrice: 0,
				discountType: offerCategory,
				discountValue: "free"
			}
		})

		return { getRemovedProductList, output }
	}

	return { getRemovedProductList, output: {} }
}
