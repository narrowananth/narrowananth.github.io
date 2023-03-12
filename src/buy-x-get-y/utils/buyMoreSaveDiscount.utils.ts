export const findBuyProductAmountValid = (data: any): boolean => {
	const { cartTotal, buyProducts, sanitizedLineItem } = data

	let localAmount = 0

	buyProducts.forEach((ids: any) => {
		const { variantId } = ids

		const amount = sanitizedLineItem[variantId]
			? sanitizedLineItem[variantId].unitPrice * sanitizedLineItem[variantId].quantity
			: 0

		localAmount += amount
	})

	const isValid = localAmount >= cartTotal ? true : false

	return isValid
}

export const findTotalCartAmount = (data: any): boolean => {
	const { cartTotal, sanitizedLineItem } = data

	let totalCartAmount = 0

	Object.values(sanitizedLineItem).forEach((val: any) => {
		const { unitPrice, quantity } = val

		totalCartAmount += unitPrice * quantity
	})

	return totalCartAmount >= cartTotal ? true : false
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

	const { offerCategory, cartTotal, buyProducts, getProducts, discountType, discountValue } = data

	const sanitizedLineItem = lineItems

	const validBuyProductRepsonse = findBuyProductAmountValid({
		cartTotal,
		buyProducts,
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
