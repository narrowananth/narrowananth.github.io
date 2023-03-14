export const schemaReBuilder = (configSchema: any): object => {
	const { buyCollections, getCollections, buyProducts, getProducts, getProductCount } = configSchema

	const buyVariantIdList = buyProducts.map((product: any) => product.variantId)

	configSchema.buyProducts = buyVariantIdList

	const getVariantIdList = getProducts.map((product: any) => product.variantId)

	configSchema.getProducts = getVariantIdList

	const buyCollectionIdList = buyCollections.map((collection: any) => collection.collectionId)

	configSchema.buyCollections = buyCollectionIdList

	const getCollectionIdList = getCollections.map((collection: any) => collection.collectionId)

	configSchema.getCollections = getCollectionIdList

	if (!getProductCount) configSchema.getProductCount = 0

	return configSchema
}

export const buildInputData = (getConfigSchema: object | any, lineItems: Array<any>): object => {
	const getRemovedProductList = removeExistingDiscount(lineItems) || []

	const { offerCategory, getProducts, buyProducts } = getConfigSchema

	lineItems = resetInputLineItem(offerCategory, getProducts, buyProducts, lineItems)

	const config = { ...getConfigSchema, lineItems, getRemovedProductList }

	return config
}

export const resetInputLineItem = (
	offerCategory: String,
	getProducts: Array<any>,
	buyProducts: Array<any>,
	lineItems: Array<any>
): Array<any> => {
	lineItems = getLineItemsObj(lineItems)

	getProducts.forEach((key: any) => {
		const { lineItemType, variantId, originalUnitPrice } = lineItems[key] || {}

		if (offerCategory === "automaticOffers" && variantId === key && lineItemType === "READONLY")
			delete lineItems[key]
		else if (variantId === key && lineItemType === "READONLY") lineItems[key].unitPrice = originalUnitPrice
	})

	buyProducts.forEach((key: any) => {
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
	const { offerCategory, buyCollections, getCollections, buyProducts, getProducts, getProductCount } = data

	const xValue = buyProducts.length > 0 || buyCollections.length > 0 ? buyProducts.concat(buyCollections) : []

	const yValue =
		getProductCount === 0 && (getProducts.length > 0 || getCollections.length > 0)
			? getProducts.concat(getCollections)
			: []

	const combinedArray = offerCategory !== "automaticOffers" ? xValue.concat(yValue) : xValue

	alert(`combinedArray --> ${JSON.stringify(combinedArray)}`)

	return combinedArray
}

export const combineSchemaOfferArray = (data: any): Array<string> => {
	const { buyCollections, getCollections, buyProducts, getProducts } = data

	const xValue = getProducts.length > 0 ? getProducts : buyProducts

	const yValue = getCollections.length > 0 ? getCollections : buyCollections

	const combinedArray = xValue.concat(yValue)

	return combinedArray
}

export const findOverAllCartTotal = (sanitizedLineItem: Array<any>): number => {
	return sanitizedLineItem.reduce((acc: number, currentValue: any) => {
		const { unitPrice, quantity } = currentValue

		acc += unitPrice * quantity

		return acc
	}, 0)
}

export const validateInputData = (data: any): boolean => {
	const { cartType, cartValue, lineItems } = data

	const getCombinedArray = combineSchemaInputArray(data)

	alert(`getCombinedArray --> ${getCombinedArray}`)

	return getCombinedArray.every((id: any) => {
		if (id) {
			const sum = lineItems.reduce((acc: number, lineItem: any) => {
				const { collectionId, variantId, quantity, unitPrice } = lineItem || {}

				if (variantId === id || collectionId === id) {
					const currentValue = cartType === "amount" ? quantity * unitPrice : quantity

					acc += currentValue
				}

				return acc
			}, 0)

			alert(`sum --> ${sum} & cartValue --> ${cartValue}`)

			alert(sum >= cartValue)

			return sum >= cartValue ? true : false
		}
		return false
	})
}

export const validateOverAllData = (data: any): boolean => {
	const { cartType, cartValue, lineItems } = data

	return lineItems.every((lineItem: any) => {
		const { quantity, unitPrice } = lineItem

		const currentValue = cartType === "amount" ? quantity * unitPrice : quantity

		return currentValue >= cartValue ? true : false
	})
}

export const validateGetProductCount = (data: any): boolean => {
	const { getProducts, getProductCount, lineItems } = data

	return getProducts.every((id: any) => {
		if (id) {
			const sum = lineItems.reduce((acc: number, lineItem: any) => {
				const { collectionId, variantId, quantity } = lineItem || {}

				if (variantId === id || collectionId === id) acc += quantity

				return acc
			}, 0)

			return sum >= getProductCount ? true : false
		}
		return false
	})
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
	cartTotal: number
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
			discountValue: `You got ${percentageDiscountValue}% off`
		}
		return finalDiscount
	} else if (discountType === "amount") {
		const getPercentage = ((quantity * unitPrice) / cartTotal) * 100

		const getPercentageAmount = (getPercentage / 100) * discountValue

		const getEditedPrice = quantity * unitPrice - getPercentageAmount

		const finalDiscount = {
			productId,
			variantId,
			quantity: quantity,
			unitPrice: getEditedPrice / quantity,
			lineItemHandle,
			discountType: offerCategory,
			discountValue: `You save {{currency}}${getPercentageAmount.toFixed(3)}`
		}

		return finalDiscount
	} else if (discountType === "free") {
		return {
			productId,
			variantId,
			quantity,
			unitPrice: 0,
			lineItemHandle,
			discountType: offerCategory,
			discountValue: "Free"
		}
	}

	return {}
}

export const applyBuyXGetYDiscount = (data: any): object => {
	const { offerCategory, getProducts, lineItems, getProductCount } = data

	const sanitizedLineItem = getLineItemsObj(lineItems)

	return getProducts.map((id: any) => {
		if (id) {
			const { productId, variantId, quantity, lineItemHandle } = sanitizedLineItem[id] || {}

			const customQuantity = offerCategory === "automaticOffers" ? getProductCount : quantity

			const finalValue = {
				productId,
				variantId,
				quantity: customQuantity,
				unitPrice: 0,
				lineItemHandle,
				discountType: offerCategory,
				discountValue: "Free"
			}

			return finalValue
		}
		return {}
	})
}

export const applyPercentageAndAmountDiscount = (data: any): any => {
	const { offerCategory, buyOfferType, discountType, discountValue, lineItems } = data

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
						cartTotal
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
				cartTotal
			)

			getOffer.push(value)
		}
	})

	return getOffer
}
