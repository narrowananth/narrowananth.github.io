import { IGetOffer } from "./flow-apply.interface"
import { IGetProduct, ILineItem } from "./index.interface"

export interface IGetLineItems {
	lineItems: IGetProduct[] | ILineItem[] | IGetOffer[]
}

export interface ILineItemObject {
	[variantId: string]: ILineItem
}
