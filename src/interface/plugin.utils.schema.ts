import { GetProduct, LineItem } from "./common.schema"

export interface CombineBuyConfigArrays {
	offerCategory: string
	getProductCount: number
	customGetProduct: string[]
	customBuyProduct: string[]
	customGetCollection: string[]
	customBuyCollection: string[]
}

export interface CombineSchemaOfferArray {
	customGetProduct: string[]
	customBuyProduct: string[]
	customGetCollection: string[]
	customBuyCollection: string[]
}

export interface ValidateInputData {
	lineItems: LineItem[]
	cartType: string
	cartValue: number
	offerCategory: string
	buyOfferType: string
	getOfferType: string
	getProductCount: number
	getProducts: GetProduct[]
	customGetProduct: string[]
	customBuyProduct: string[]
	customGetCollection: string[]
	customBuyCollection: string[]
}

export interface ValidateOverAllData {
	lineItems: LineItem[]
	customGetProduct: string[]
	getProducts: GetProduct[]
	cartType: string
	cartValue: number
	getProductCount: number
}

export interface FindFreeOfferOverAllCartValue {
	lineItems: LineItem[]
	customGetProduct: string[]
	cartType: string
	cartValue: number
}

export interface ValidateBuyArrayAvaliable {
	lineItems: LineItem[]
	customBuyProduct: string[]
	customBuyCollection: string[]
}

export interface ValidateGetArrayAvaliable {
	lineItems: LineItem[]
	customGetProduct: string[]
	customGetCollection: string[]
}

export interface ValidateGetProductCount {
	lineItems: LineItem[]
	getProductCount: number
	customGetProduct: string[]
	customGetCollection: string[]
}

export interface FindUserProductCartTotal {
	lineItems: LineItem[]
	sanitizedLineItem: string[]
}
