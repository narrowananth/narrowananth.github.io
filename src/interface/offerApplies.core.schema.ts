import { BuyProduct, GetProduct, LineItem } from "./common.schema"

export interface ApplyBuyXGetYDiscount {
	getProductCount: number
	getProducts: GetProduct[]
	offerCategory: string
	customGetProduct: string[]
	lineItems: LineItem[]
}

export interface ApplyFreeDiscount {
	productId: string
	variantId: string
	unitPrice: number
	lineItemHandle: string
	quantity: number
	getProductCount: number
	offerCategory: string
	customGetProductId: string
	customGetVariantId: string
	isGetProductIdInLineitem: boolean
}

export interface ApplyPercentageAndAmountDiscount {
	offerCategory: string
	buyOfferType: string
	discountType: string
	discountValue: number
	lineItems: LineItem[]
	customGetProduct: string[]
	customBuyProduct: string[]
	customGetCollection: string[]
	customBuyCollection: string[]
}
