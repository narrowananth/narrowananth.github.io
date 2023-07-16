import { ILineItem } from "./index.interface"

export interface ICombineBuyConfigArrays {
	customBuyCollection: string[]
	customBuyProduct: string[]
}

export interface ICombineSchemaOfferArray {
	customBuyCollection: string[]
	customGetCollection: string[]
	customBuyProduct: string[]
	customGetProduct: string[]
}

export interface IValidateBuyArrayAvaliable {
	customBuyCollection: string[]
	customBuyProduct: string[]
	lineItems: ILineItem[]
}

export interface IValidateGetArrayAvaliable {
	customGetCollection: string[]
	customGetProduct: string[]
	lineItems: ILineItem[]
}

export interface IValidateGetProductCount {
	getProductCount: number
	customGetProduct: string[]
	lineItems: ILineItem[]
}

export interface IFindUserProductCartTotal {
	sanitizedLineItem: any
	lineItems: ILineItem[]
}
