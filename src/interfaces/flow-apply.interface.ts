export interface IGetOffer {
	productId?: string
	variantId?: string
	quantity?: number
	unitPrice?: number
	lineItemHandle?: string
	discountType?: string
	discountValue?: string
	customLineItemType?: string
	freeQuantity?: number
	isGetProductIdInLineitem?: boolean
	customGetProductPrice?: number
}

export interface IApplyFreeDiscount {
	productId: string
	variantId: string
	quantity: number
	unitPrice: number
	getProductCount: number
	lineItemHandle: string
	offerCategory: string
	customGetProductId: string
	customGetVariantId: string
	customGetProductPrice: number
	isGetProductIdInLineitem: boolean
}
