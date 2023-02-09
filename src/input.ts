export const appContext = {
	appConfig: {
		currency: "USD",
		id: 38687,
		language: "en",
		productImageAspectFill: false,
		productImageAspectRatio: 1.33,
		region: null
	},
	app_colors: {
		accent: "#fe483f",
		badge: "#fe483f",
		badge_text: "#FFFFFF",
		buy_button: "#fe483f",
		option_value: "#101010",
		primary: "#101010",
		primary_dark: "#101010",
		share_button: "#232323",
		sub_collection: "#101010",
		toolbar: "#101010",
		toolbar_content: "#ffffff"
	},
	cartLineItems: {
		lineItems: [
			{
				customAttributes: {
					color: "black",
					size: "medium",
					discount: "20%",
					"delivery fee": "free"
				},
				lineItemHandle: "nWg4GMsr",
				lineItemType: "REGULAR",
				originalUnitPrice: 418,
				productId: "7962233176382",
				quantity: 1,
				totalPrice: 418,
				unitPrice: 418,
				variantId: "43638350479678"
			},
			{
				customAttributes: {
					color: "black",
					size: "medium",
					discount: "20%",
					"delivery fee": "free"
				},
				lineItemHandle: "8AxBzJ1q",
				lineItemType: "REGULAR",
				originalUnitPrice: 188,
				productId: "7962233209150",
				quantity: 1,
				totalPrice: 188,
				unitPrice: 188,
				variantId: "43638350512446"
			},
			{
				customAttributes: {
					color: "black",
					size: "medium",
					discount: "20%",
					"delivery fee": "free"
				},
				lineItemHandle: "Sm1XL5eZ",
				lineItemType: "REGULAR",
				originalUnitPrice: 918,
				productId: "7962233143614",
				quantity: 1,
				totalPrice: 918,
				unitPrice: 918,
				variantId: "43638350446910"
			},
			{
				customAttributes: {
					color: "black",
					size: "medium",
					discount: "20%",
					"delivery fee": "free"
				},
				lineItemHandle: "Xx2PDZxT",
				lineItemType: "REGULAR",
				originalUnitPrice: 278.6,
				productId: "7962235797822",
				quantity: 1,
				totalPrice: 278.6,
				unitPrice: 278.6,
				variantId: "43638359327038"
			},
			{
				customAttributes: {
					color: "black",
					size: "medium",
					discount: "20%",
					"delivery fee": "free"
				},
				lineItemHandle: "jMictk0g",
				lineItemType: "REGULAR",
				originalUnitPrice: 257.6,
				productId: "7962236191038",
				quantity: 1,
				totalPrice: 257.6,
				unitPrice: 257.6,
				variantId: "43638360408382"
			},
			{
				customAttributes: {
					color: "black",
					size: "medium",
					discount: "20%",
					"delivery fee": "free"
				},
				lineItemHandle: "8ZZW9CCV",
				lineItemType: "REGULAR",
				originalUnitPrice: 278.6,
				productId: "7962235568446",
				quantity: 1,
				totalPrice: 278.6,
				unitPrice: 278.6,
				variantId: "43638358901054"
			},
			{
				customAttributes: {
					color: "black",
					size: "medium",
					discount: "20%",
					"delivery fee": "free"
				},
				lineItemHandle: "traLbi8c",
				lineItemType: "REGULAR",
				originalUnitPrice: 428,
				productId: "7962235535678",
				quantity: 1,
				totalPrice: 428,
				unitPrice: 428,
				variantId: "43638358769982"
			},
			{
				customAttributes: {
					color: "black",
					size: "medium",
					discount: "20%",
					"delivery fee": "free"
				},
				lineItemHandle: "O9qyOXpF",
				lineItemType: "REGULAR",
				originalUnitPrice: 159.6,
				productId: "7962231603518",
				quantity: 1,
				totalPrice: 159.6,
				unitPrice: 159.6,
				variantId: "43638344581438"
			},
			{
				customAttributes: {
					color: "black",
					size: "medium",
					discount: "20%",
					"delivery fee": "free"
				},
				lineItemHandle: "agNtWD48",
				lineItemType: "REGULAR",
				originalUnitPrice: 159.6,
				productId: "7962231570750",
				quantity: 1,
				totalPrice: 159.6,
				unitPrice: 159.6,
				variantId: "43638344417598"
			}
		],
		savings: 0,
		total: 3086.0002,
		totalAfterSavings: 3086.0002
	},
	couponCodes: null,
	customer: null
}

export const configSchema = {
	buyOfferType: "threshold",
	getOfferType: "percentage",
	productBasedOn: "product",
	quantityBasedOn: "productQuantity",
	getOfferConfig: [
		{
			threshold: 616,
			productQuantity: 2,
			discount: 9,
			buyProducts: [],
			getProducts: [
				{
					productId: "7962235535678",
					variantId: "43638358769982"
				}
			]
		},
		{
			threshold: 2051,
			productQuantity: 1,
			discount: 10,
			buyProducts: [],
			getProducts: [
				{
					productId: "7962274464062",
					variantId: "43638422667582"
				},
				{
					productId: "7962235535678",
					variantId: "43638358769982"
				}
			]
		},
		{
			threshold: 2052,
			productQuantity: 2,
			discount: 12,
			buyProducts: [],
			getProducts: [
				{
					productId: "7962235568446",
					variantId: "43638358901054"
				}
			]
		}
	],
	includeCollections: [],
	excludeCollections: [],
	includeProducts: [
		{
			productId: "7962233209150",
			variantId: "43638350512446"
		},
		{
			productId: "7962235535678",
			variantId: "43638358769982"
		}
	],
	excludeProducts: [
		{
			productId: "7962233176382",
			variantId: "43638350479678"
		},
		{
			productId: "7962233209150",
			variantId: "43638350512446"
		},
		{
			productId: "7962235535678",
			variantId: "43638358769982"
		}
	],
	messages: {
		successMessage: null,
		isShowCurrentOffer: false,
		isShowNextOffer: false,
		nextOfferContent: "",
		currentOfferContent: ""
	}
}
