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
		cartType,
		cartTotal,
		cartQuantity,
		buyProducts,
		getProducts,
		buyCollections,
		getProductCount
	} = data

	const sanitizedLineItem = lineItems

	const getTotalCartAmount =
		onlyCartAmoutAndQunatity && cartType === "amount"
			? findTotalCartAmount({ cartTotal, buyProducts, sanitizedLineItem })
			: false

	const getTotalCartQuantity =
		onlyCartAmoutAndQunatity && cartType === "count"
			? findTotalCartQuantity({ cartQuantity, buyProducts, sanitizedLineItem })
			: false

	const buyCollectionValue = collection
		? findCollectionValid({ offerCategory, buyCollections, cartQuantity, sanitizedLineItem })
		: {}

	const { buyCollectionsIdsValid } = buyCollectionValue

	if (getTotalCartAmount || getTotalCartQuantity || buyCollectionsIdsValid) {
		const output = getProducts.map((val: any) => {
			const { productId, variantId } = val

			return {
				productId,
				variantId,
				quantity: getProductCount,
				unitPrice: 0,
				discountType: offerCategory,
				discountValue: "Free"
			}
		})

		return { getRemovedProductList, output }
	}

	return { getRemovedProductList, output: {} }
}
