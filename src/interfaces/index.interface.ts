import { IOfferApplied } from "./flow-core.interface"

export interface IAppContext {
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
		lineItems: ILineItem[]
		savings: number
		total: number
		totalAfterSavings: number
	}
	couponCodes: string[] | null
	customer: Record<string, unknown> | null
}

export interface ILineItem {
	collectionId: string
	customAttributes?: Record<string, unknown>
	lineItemHandle: string
	lineItemType: string
	originalUnitPrice: number
	productId: string
	quantity: number
	freeQuantity: number
	totalPrice: number
	unitPrice: number
	variantId: string
	customGetProductPrice: number
}

export interface IConfigSchema {
	offerCategory: string
	buyOfferType: string
	cartType: string
	cartValue: number
	discountType: string
	discountValue: number
	displayText: string
	buyCollections: IBuyCollection[]
	getCollections: IGetCollection[]
	buyProducts: IBuyProduct[]
	getProducts: IGetProduct[]
	getProductCount: number
	customBuyProduct: string[]
	customGetProduct: string[]
	customBuyCollection: string[]
	customGetCollection: string[]
}

export interface IBuyCollection {
	collectionId: string
	name: string
}

export interface IGetCollection {
	collectionId: string
	name: string
}

export interface IBuyProduct {
	productId: string
	productName: string
	productPrice: number
	url: string
	variantId: string
}

export interface IGetProduct {
	productId: string
	productName: string
	productPrice: number
	url: string
	variantId: string
}
