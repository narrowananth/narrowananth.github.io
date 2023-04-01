import { BuyProduct, ConfigSchema, GetProduct, LineItem } from "./common.schema"

export interface FindPercentageAmountDiscounts {
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
	getConfigSchema: ConfigSchema
}
