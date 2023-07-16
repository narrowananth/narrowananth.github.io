import {
	IBuyCollection,
	IBuyProduct,
	IConfigSchema,
	IGetCollection,
	IGetProduct,
	ILineItem
} from "./index.interface"

export interface IOfferCategory {
	getConfigSchema: IConfigSchema
	lineItems: ILineItem[]
	getRemovedProductList: ILineItem[]
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
