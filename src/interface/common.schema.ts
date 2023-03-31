export interface LineItem {
	collectionId: string
	customAttributes?: Record<string, unknown>
	lineItemHandle: string
	lineItemType: string
	originalUnitPrice: number
	productId: string
	quantity: number
	totalPrice: number
	unitPrice: number
	variantId: string
}

export interface AppContext {
	appColors: Record<string, string>
	appConfig: {
		currency: string
		id: number
		language: string
		productImageAspectFill: boolean
		productImageAspectRatio: number
		region: string | null
	}
	cartLineItems: {
		lineItems: LineItem[]
		savings: number
		total: number
		totalAfterSavings: number
	}
	couponCodes: string[] | null
	customer: Record<string, unknown> | null
}

export interface ConfigSchema {
	offerCategory: string
	buyOfferType: string
	cartType: string
	cartValue: number
	discountType: string
	discountValue: number
	displayText: string
	buyCollections: BuyCollection[]
	getCollections: GetCollection[]
	buyProducts: BuyProduct[]
	getProducts: GetProduct[]
	getProductCount: number
	customBuyProduct: string[]
	customGetProduct: string[]
	customBuyCollection: string[]
	customGetCollection: string[]
}

export interface BuyCollection {
	collectionId: string
	name: string
}

export interface GetCollection {
	collectionId: string
	name: string
}

export interface BuyProduct {
	productId: string
	productName: string
	productPrice: number
	url: string
	variantId: string
}

export interface GetProduct {
	productId: string
	productName: string
	productPrice: number
	url: string
	variantId: string
}

export interface Data {
	buyOfferType: string
	buyProducts: BuyProduct[]
	cartType: string
	cartValue: number
	discountType: string
	discountValue: number
	displayText: string
	getOfferType: string
	getProductCount: number
	getProducts: GetProduct[]
	offerCategory: string
	customBuyProduct: string[]
	customGetProduct: string[]
	customBuyCollection: string[]
	customGetCollection: string[]
	lineItems: LineItem[]
	getRemovedProductList: LineItem[]
}

export interface LineItemObject {
	[variantId: string]: LineItem
}

export interface BuildInputData {
	discountType: string
	customGetProduct: string[]
}
