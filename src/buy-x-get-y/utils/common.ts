export const resetLineItemAmount = (lineItems: Array<any>): Array<any> => {
	return lineItems.map(lineItem => {
		const { totalPrice, unitPrice } = lineItem

		if (totalPrice !== unitPrice)
			return {
				...lineItem,
				unitPrice: totalPrice
			}

		return lineItem
	})
}

export const setKeyInFilterProduct = (product: Array<any>): any => {
	return product.reduce((obj: object, producDetails: any) => {
		const { variantId } = producDetails

		return { ...obj, [variantId]: producDetails }
	}, {})
}

export const getLineItemsObj = (lineItems: Array<any>): any => {
	return lineItems.reduce((acc: any, lineItem: any) => {
		const { variantId } = lineItem

		acc[variantId] = lineItem

		return acc
	}, {})
}

export const removeLineItems = (lineItems: any, productObj: any, selection: string): Array<object> => {
	const editedLineItem: any[] = []

	if (selection === "include") {
		Object.keys(lineItems).forEach((key: any) => {
			if (productObj[key]) editedLineItem.push(lineItems[key])
		})
	} else if (selection === "exclude") {
		Object.keys(lineItems).forEach((key: any) => {
			if (!productObj[key]) editedLineItem.push(lineItems[key])
		})
	}

	return editedLineItem
}

export const findCartTotal = (data: any): number => {
	const lineItemsObj = getLineItemsObj(data.lineItems)

	const includeProductObj = setKeyInFilterProduct(data.includeProducts)

	const excludedProductObj = setKeyInFilterProduct(data.excludeProducts)

	const includedProductLineItem =
		Object.keys(includeProductObj).length !== 0 ? removeLineItems(lineItemsObj, includeProductObj, "include") : []

	const excludedProductLineItem =
		Object.keys(excludedProductObj).length !== 0 ? removeLineItems(lineItemsObj, excludedProductObj, "exclude") : []

	data.includedProductLineItem = includedProductLineItem.length !== 0 ? includedProductLineItem : undefined

	data.excludedProductLineItem =
		includedProductLineItem.length === 0 && excludedProductLineItem.length !== 0
			? excludedProductLineItem
			: undefined

	const lineItems = includedProductLineItem.length ? includedProductLineItem : excludedProductLineItem

	const finalLineItems = lineItems.length !== 0 ? lineItems : data.lineItems

	let total = 0

	finalLineItems.forEach((lineItem: any) => {
		const { unitPrice, quantity } = lineItem

		total += unitPrice * quantity
	})

	return total
}

export const findOffer = (getOfferConfig: Array<any>, getCartTotal: number): Array<any> => {
	getOfferConfig = getOfferConfig.sort((a: any, b: any) => a.threshold - b.threshold)

	const closestThreshold = getOfferConfig.reduce((prev: number, current: any) => {
		if (current.threshold <= Math.round(getCartTotal)) return prev < current ? prev : current
		else return prev
	}, 0)

	return closestThreshold !== 0 ? closestThreshold : []
}

export const removeExistingDiscount = (data: any): Array<any> => {
	const { lineItems } = data

	return lineItems.filter((lineItem: any) => {
		const { unitPrice } = lineItem

		return unitPrice !== 0
	})
}

export const splitDiscount = (data: any, getOffer: any, getCartTotal: number): Array<any> => {
	const { includedProductLineItem, excludedProductLineItem, lineItems, getOfferType } = data

	let { discount, getProducts } = getOffer

	let filteringLineItems = includedProductLineItem || excludedProductLineItem || lineItems

	if (getOfferType === "percentage") {
		if (discount >= 100) discount = 100
		filteringLineItems.forEach((item: any) => (item.unitPrice = item.unitPrice - item.unitPrice * (discount / 100)))
	} else if (getOfferType === "amount") {
		if (discount >= getCartTotal) filteringLineItems.forEach((item: any) => (item.unitPrice = item.unitPrice * 0))
		else
			filteringLineItems.forEach(
				(item: any) => (item.unitPrice = item.unitPrice * (1 - ((discount / getCartTotal) * 100) / 100))
			)
	} else if (getOfferType === "product") {
		filteringLineItems = getProducts
	}

	return filteringLineItems
}
