import { IConfigSchema, ILineItem } from "./index.interface"

export interface IOfferApplied {
	offerApplied?: boolean
	output?: ILineItem[] | unknown[]
	getRemovedProductList?: ILineItem[]
	displayText?: string
	totalCartValue?: number
	schema?: IConfigSchema
}
