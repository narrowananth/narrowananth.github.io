export const schemaReBuilder = (configSchema: any): object => {
	const { buyCollections, getCollections, buyProducts, getProducts, getProductCount } = configSchema

	const buyVariantIdList = buyProducts.map((product: any) => product.variantId)

	configSchema.customBuyProduct = buyVariantIdList

	const getVariantIdList = getProducts.map((product: any) => product.variantId)

	configSchema.customGetProduct = getVariantIdList

	const buyCollectionIdList = buyCollections.map((collection: any) => collection.collectionId)

	configSchema.customBuyCollection = buyCollectionIdList

	const getCollectionIdList = getCollections.map((collection: any) => collection.collectionId)

	configSchema.customGetCollection = getCollectionIdList

	if (!getProductCount) configSchema.getProductCount = 0

	return configSchema
}

export const buildInputData = (getConfigSchema: object | any, lineItems: Array<any>): object => {
	const getRemovedProductList = removeExistingDiscount(lineItems) || []

	const { offerCategory, customGetProduct, customBuyProduct } = getConfigSchema

	lineItems = resetInputLineItem(offerCategory, customGetProduct, customBuyProduct, lineItems)

	const config = { ...getConfigSchema, lineItems, getRemovedProductList }

	return config
}

export const resetInputLineItem = (
	offerCategory: String,
	customGetProduct: Array<any>,
	customBuyProduct: Array<any>,
	lineItems: Array<any>
): Array<any> => {
	lineItems = getLineItemsObj(lineItems)

	customGetProduct.forEach((key: any) => {
		const { lineItemType, variantId, originalUnitPrice } = lineItems[key] || {}

		if (offerCategory === "automaticOffers" && variantId === key && lineItemType === "READONLY")
			delete lineItems[key]
		else if (variantId === key && lineItemType === "READONLY") lineItems[key].unitPrice = originalUnitPrice
	})

	customBuyProduct.forEach((key: any) => {
		const { lineItemType, variantId, originalUnitPrice } = lineItems[key] || {}

		if (offerCategory === "automaticOffers" && variantId === key && lineItemType === "READONLY")
			delete lineItems[key]
		else if (variantId === key && lineItemType === "READONLY") lineItems[key].unitPrice = originalUnitPrice
	})

	lineItems = Object.values(lineItems)

	return lineItems
}

export const removeExistingDiscount = (lineItems: Array<any>): Array<any> => {
	const getRemoveItemsList = lineItems

	return getRemoveItemsList.filter((lineItem: any) => {
		const { lineItemType, originalUnitPrice } = lineItem

		lineItem.unitPrice = originalUnitPrice

		return lineItemType === "READONLY"
	})
}

export const getLineItemsObj = (lineItems: Array<any>): any => {
	return lineItems.reduce((acc: any, lineItem: any) => {
		const { variantId } = lineItem

		acc[variantId] = lineItem

		return acc
	}, {})
}

export const combineSchemaInputArray = (data: any): Array<string> => {
	const {
		offerCategory,
		customBuyCollection,
		customGetCollection,
		customBuyProduct,
		customGetProduct,
		getProductCount
	} = data

	const xValue =
		customBuyProduct.length > 0 || customBuyCollection.length > 0
			? customBuyProduct.concat(customBuyCollection)
			: []

	const yValue =
		getProductCount === 0 && (customGetProduct.length > 0 || customGetCollection.length > 0)
			? customGetProduct.concat(customGetCollection)
			: []

	const combinedArray = offerCategory !== "automaticOffers" ? xValue.concat(yValue) : xValue

	return combinedArray
}

export const combineSchemaOfferArray = (data: any): Array<string> => {
	const { customBuyCollection, customGetCollection, customBuyProduct, customGetProduct } = data

	const xValue = customGetProduct.length > 0 ? customGetProduct : customBuyProduct

	const yValue = customGetCollection.length > 0 ? customGetCollection : customBuyCollection

	const combinedArray = xValue.concat(yValue)

	return combinedArray
}

export const findOverAllCartTotal = (sanitizedLineItem: Array<any>): number => {
	return sanitizedLineItem.reduce((acc: number, currentValue: any) => {
		const { unitPrice, quantity } = currentValue

		return (acc += unitPrice * quantity)
	}, 0)
}

export const validateInputData = (data: any): boolean => {
	const { cartType, cartValue, lineItems } = data

	const getCombinedArray = combineSchemaInputArray(data)

	let total = 0

	getCombinedArray.forEach((id: any) => {
		if (id) {
			const sum = lineItems.reduce((acc: number, lineItem: any) => {
				const { collectionId, variantId, quantity, unitPrice } = lineItem || {}

				if (variantId === id || collectionId === id) {
					const currentValue = cartType === "amount" ? quantity * unitPrice : quantity

					acc += currentValue
				}

				return acc
			}, 0)

			total += sum
		}
	})

	return total >= cartValue
}

export const validateOverAllData = (data: any): boolean => {
	const { cartType, cartValue, lineItems } = data

	const total = lineItems.reduce((acc: number, lineItem: any) => {
		const { quantity, unitPrice } = lineItem

		const currentValue = cartType === "amount" ? quantity * unitPrice : quantity

		return (acc += currentValue)
	}, 0)

	return total >= cartValue
}

export const validateGetProductCount = (data: any): boolean => {
	const { customGetProduct, getProductCount, lineItems } = data

	let dummyQuantity = 0

	customGetProduct.forEach((id: any) => {
		if (id) {
			const sum = lineItems.reduce((acc: number, lineItem: any) => {
				const { collectionId, variantId, quantity } = lineItem || {}

				if (variantId === id || collectionId === id) acc += quantity

				return acc
			}, 0)

			dummyQuantity += sum
		}
	})

	return dummyQuantity >= getProductCount
}

export const findUserProductCartTotal = (sanitizedLineItem: Array<string>, lineItems: Array<any>): number => {
	let cartValue = 0

	sanitizedLineItem.forEach((key: any) => {
		if (key) {
			const total = lineItems.reduce((acc: number, lineItem: any) => {
				const { collectionId, variantId, quantity, unitPrice } = lineItem || {}

				if (variantId === key || collectionId === key) acc += quantity * unitPrice

				return acc
			}, 0)

			cartValue += total
		}
	})

	return cartValue
}

export const applyPercentageAndAmountOffer = (
	offerCategory: string,
	lineItem: any,
	discountType: string,
	discountValue: number,
	percentageDiscountValue: number,
	cartTotal: number,
	getProductCount: number
): object => {
	const { unitPrice, quantity, variantId, productId, lineItemHandle } = lineItem || {}

	if (discountType === "percentage") {
		const getEditedPrice = quantity * unitPrice - quantity * unitPrice * (percentageDiscountValue / 100)

		const finalDiscount = {
			productId,
			variantId,
			quantity: quantity,
			unitPrice: getEditedPrice / quantity,
			lineItemHandle,
			discountType: offerCategory,
			discountValue: `You got ${percentageDiscountValue}% off`,
			customLineItemType: "READONLY"
		}
		return finalDiscount
	} else if (discountType === "amount") {
		const getPercentage = ((quantity * unitPrice) / cartTotal) * 100

		const getPercentageAmount = (getPercentage / 100) * discountValue

		const getEditedPrice =
			quantity * unitPrice >= getPercentageAmount ? quantity * unitPrice - getPercentageAmount : 0

		const finalAmount = getEditedPrice !== 0 ? getEditedPrice / quantity : 0

		const finalDiscount = {
			productId,
			variantId,
			quantity: quantity,
			unitPrice: finalAmount,
			lineItemHandle,
			discountType: offerCategory,
			discountValue: `You save {{currency}}${getPercentageAmount.toFixed(3)}`,
			customLineItemType: "READONLY"
		}

		return finalDiscount
	} else if (discountType === "free") {
		const getFreeOfferValue = applyFreeDiscount({
			productId,
			variantId,
			lineItemHandle,
			quantity,
			getProductCount,
			unitPrice,
			offerCategory
		})

		return getFreeOfferValue
	}

	return {}
}

export const applyBuyXGetYDiscount = (data: any): object => {
	const { offerCategory, customGetProduct, getProducts, lineItems, getProductCount } = data

	const sanitizedLineItem = getLineItemsObj(lineItems)

	const offerArray: object[] = []

	customGetProduct.forEach((id: any) => {
		if (id) {
			const { productId, variantId, quantity, unitPrice, lineItemHandle } = sanitizedLineItem[id] || {}

			const getFreeOfferValue = applyFreeDiscount({
				productId,
				variantId,
				lineItemHandle,
				quantity,
				getProductCount,
				unitPrice,
				offerCategory
			})

			offerArray.push(getFreeOfferValue)
		}
	})

	return offerArray
}

export const applyPercentageAndAmountDiscount = (data: any): any => {
	const { offerCategory, buyOfferType, discountType, discountValue, getProductCount, lineItems } = data

	const getCombinedArray = combineSchemaOfferArray(data)

	const sanitizedLineItem = buyOfferType === "overAll" ? lineItems : getCombinedArray

	const cartTotal =
		buyOfferType === "overAll"
			? findOverAllCartTotal(sanitizedLineItem)
			: findUserProductCartTotal(sanitizedLineItem, lineItems)

	const percentageDiscountValue = discountType === "percentage" && discountValue >= 100 ? 100 : discountValue

	const getOffer: object[] = []

	sanitizedLineItem.forEach((key: any) => {
		if (key && typeof key === "string") {
			return lineItems.forEach((lineItem: any) => {
				const { collectionId, variantId } = lineItem || {}

				if (variantId === key || collectionId === key) {
					const value = applyPercentageAndAmountOffer(
						offerCategory,
						lineItem,
						discountType,
						discountValue,
						percentageDiscountValue,
						cartTotal,
						getProductCount
					)

					getOffer.push(value)
				}
			})
		} else {
			const value = applyPercentageAndAmountOffer(
				offerCategory,
				key,
				discountType,
				discountValue,
				percentageDiscountValue,
				cartTotal,
				getProductCount
			)

			getOffer.push(value)
		}
	})

	return getOffer
}

export const applyFreeDiscount = (data: any): object => {
	const { productId, variantId, lineItemHandle, quantity, getProductCount, unitPrice, offerCategory } = data

	const customUnitPrice = quantity >= getProductCount ? unitPrice : 0

	const customQuantity = quantity >= getProductCount ? quantity - getProductCount : getProductCount

	const customDiscountType = quantity >= getProductCount ? undefined : offerCategory

	const customDiscountValue =
		quantity >= getProductCount
			? `Buy ${quantity}, get ${getProductCount} Free and ${quantity - getProductCount} for the same price.`
			: "Free"

	const customLineItemType = quantity >= getProductCount ? "REGULAR" : "READONLY"

	const offerValue = {
		productId,
		variantId,
		quantity: customQuantity,
		unitPrice: customUnitPrice,
		lineItemHandle,
		discountType: customDiscountType,
		discountValue: customDiscountValue,
		customLineItemType
	}

	return offerValue
}
