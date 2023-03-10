export const findBuyProductAmountValid = (data: any): boolean => {
	const { buyProducts, sanitizedLineItem } = data

	const buyProductVariantIdsValid = buyProducts.every((val: any) => {
		const { variantId, amount } = val

		return variantId
			? sanitizedLineItem[variantId].unitPrice * sanitizedLineItem[variantId].quantity >= amount
			: false
	})

	const isValid = buyProductVariantIdsValid ? true : false

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
	const { getProducts, sanitizedLineItem, discountType, discountValue } = data

	let cartTotal = 0

	getProducts.forEach((val: any) => {
		const { variantId } = val

		const product = sanitizedLineItem[variantId]

		const { unitPrice, quantity } = product

		cartTotal += unitPrice * quantity
	})

	return getProducts.map((val: any) => {
		const { variantId, amount } = val

		let discount = discountValue

		const isValid =
			sanitizedLineItem[variantId].unitPrice * sanitizedLineItem[variantId].quantity >= amount ? true : false

		const { unitPrice, quantity, productId } = sanitizedLineItem[variantId]

		if (isValid) {
			if (discountType === "percentage") {
				if (discountValue >= 100) discount = 100

				const getEditedPrice = quantity * unitPrice - quantity * unitPrice * (discount / 100)

				const finalDiscount = {
					productId,
					variantId,
					quantity: quantity,
					unitPrice: getEditedPrice / quantity,
					discountType,
					discountValue: discount
				}

				return finalDiscount
			} else {
				const getPercentage = ((quantity * unitPrice) / cartTotal) * 100

				const getPercentageAmount = (getPercentage / 100) * discountValue

				const getEditedPrice = quantity * unitPrice - getPercentageAmount

				const finalDiscount = {
					productId,
					variantId,
					quantity: quantity,
					unitPrice: getEditedPrice / quantity,
					discountType,
					discountValue: getPercentageAmount
				}

				return finalDiscount
			}
		} else {
			return
		}
	})
}

export const findBuyMoreSaveDiscount = (data: any) => {
	const { lineItems, getRemovedProductList } = data

	const { onlyCartAmoutAndQunatity, cartTotal, buyProducts, getProducts, discountType, discountValue } = data

	const sanitizedLineItem = lineItems

	if (onlyCartAmoutAndQunatity) {
		const getTotalCartAmount = findTotalCartAmount({ cartTotal, sanitizedLineItem })

		const buyProuductDiscount = getTotalCartAmount
			? applyProductAmountValid({
					getProducts,
					sanitizedLineItem,
					discountType,
					discountValue
			  })
			: []

		return { getRemovedProductList, output: buyProuductDiscount }
	} else {
		const validBuyProductRepsonse = findBuyProductAmountValid({ buyProducts, sanitizedLineItem })

		const buyProuductDiscount = validBuyProductRepsonse
			? applyProductAmountValid({
					getProducts,
					sanitizedLineItem,
					discountType,
					discountValue
			  })
			: []

		return { getRemovedProductList, output: buyProuductDiscount }
	}
}
