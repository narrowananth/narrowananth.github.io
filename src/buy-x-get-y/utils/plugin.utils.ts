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

export const validateGetArrayAvaliable = (data: any): boolean => {
	const { customGetProduct, customGetCollection, lineItems } = data

	const validationArray = customGetProduct.concat(customGetCollection)

	return validationArray.some((id: any) => {
		return lineItems.some((lineItem: any) => {
			const { collectionId, variantId } = lineItem || {}

			return variantId === id || collectionId === id
		})
	})
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
