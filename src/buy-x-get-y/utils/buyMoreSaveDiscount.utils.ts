export const findBuyProductAmountValid = (data: any): boolean => {
	const { discountType, cartTotal, buyProducts, getProducts, getProductCount, sanitizedLineItem } = data

	let localBuyAmount = 0

	let localGetQuantity = 0

	buyProducts.forEach((ids: any) => {
		const { variantId } = ids

		const amount = sanitizedLineItem[variantId]
			? sanitizedLineItem[variantId].unitPrice * sanitizedLineItem[variantId].quantity
			: 0

		localBuyAmount += amount
	})

	if (discountType === "free") {
		getProducts.forEach((ids: any) => {
			const { variantId } = ids

			const quantity = sanitizedLineItem[variantId] ? sanitizedLineItem[variantId].quantity : 0

			localGetQuantity += quantity
		})
	}

	const isValid =
		(discountType === "free" && localBuyAmount >= cartTotal && localGetQuantity >= getProductCount) ||
		(discountType !== "free" && localBuyAmount >= cartTotal)
			? true
			: false

	return isValid
}

export const findTotalCartAmount = (data: any): boolean => {
	const { buyProducts, cartTotal, sanitizedLineItem } = data

	let totalCartAmount = 0

	const buyProductVariantIdsValid = buyProducts.every((val: any) => {
		const { variantId } = val

		const { unitPrice = 0, quantity = 0 } = sanitizedLineItem[variantId] || {}

		totalCartAmount += unitPrice * quantity

		return sanitizedLineItem[variantId] ? true : false
	})

	return buyProductVariantIdsValid && totalCartAmount >= cartTotal ? true : false
}

export const applyProductAmountValid = (data: any): object => {
	const { offerCategory, getProducts, buyProducts, sanitizedLineItem, discountType, discountValue } = data

	let cartTotal = 0

	if (discountType === "free") {
		return getProducts.map((val: any) => {
			const { productId, variantId } = val

			const finalDiscount = {
				productId,
				variantId,
				quantity: sanitizedLineItem[variantId].quantity,
				unitPrice: 0,
				lineItemHandle: sanitizedLineItem[variantId].lineItemHandle,
				discountType: offerCategory,
				discountValue: "Free"
			}

			return finalDiscount
		})
	}

	buyProducts.forEach((val: any) => {
		const { variantId } = val

		const product = sanitizedLineItem[variantId]

		const { unitPrice, quantity } = product

		cartTotal += unitPrice * quantity
	})

	return buyProducts.map((val: any) => {
		const { variantId } = val

		let discount = discountValue

		const { unitPrice, quantity, productId, lineItemHandle } = sanitizedLineItem[variantId]

		if (discountType === "percentage") {
			if (discountValue >= 100) discount = 100

			const getEditedPrice = quantity * unitPrice - quantity * unitPrice * (discount / 100)

			const finalDiscount = {
				productId,
				variantId,
				quantity: quantity,
				unitPrice: getEditedPrice / quantity,
				lineItemHandle,
				discountType: offerCategory,
				discountValue: `You got ${discount}% off`
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
		} else {
			return {}
		}
	})
}

export const findBuyMoreSaveDiscount = (data: any) => {
	const { lineItems, getRemovedProductList } = data

	const { offerCategory, cartTotal, buyProducts, getProducts, getProductCount, discountType, discountValue } = data

	const sanitizedLineItem = lineItems

	const validBuyProductRepsonse = findBuyProductAmountValid({
		discountType,
		cartTotal,
		buyProducts,
		getProducts,
		getProductCount,
		sanitizedLineItem
	})

	const buyProuductDiscount = validBuyProductRepsonse
		? applyProductAmountValid({
				offerCategory,
				buyProducts,
				getProducts,
				sanitizedLineItem,
				discountType,
				discountValue
		  })
		: []

	return { getRemovedProductList, output: buyProuductDiscount }
}
