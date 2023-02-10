var vajroPlugin
;(() => {
	"use strict"
	var e = {
			d: (t, n) => {
				for (var r in n) e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, { enumerable: !0, get: n[r] })
			},
			o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
			r: e => {
				"undefined" != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
					Object.defineProperty(e, "__esModule", { value: !0 })
			}
		},
		t = {}
	e.r(t), e.d(t, { getBuyXGetY: () => c })
	var n = function () {
			return (
				(n =
					Object.assign ||
					function (e) {
						for (var t, n = 1, r = arguments.length; n < r; n++)
							for (var u in (t = arguments[n]))
								Object.prototype.hasOwnProperty.call(t, u) && (e[u] = t[u])
						return e
					}),
				n.apply(this, arguments)
			)
		},
		r = function (e) {
			return e.reduce(function (e, t) {
				var r,
					u = t.variantId
				return n(n({}, e), (((r = {})[u] = t), r))
			}, {})
		},
		u = function (e, t, n) {
			var r = []
			return (
				"include" === n
					? Object.keys(e).forEach(function (n) {
							t[n] && r.push(e[n])
					  })
					: "exclude" === n &&
					  Object.keys(e).forEach(function (n) {
							t[n] || r.push(e[n])
					  }),
				r
			)
		},
		i = function () {
			return (
				(i =
					Object.assign ||
					function (e) {
						for (var t, n = 1, r = arguments.length; n < r; n++)
							for (var u in (t = arguments[n]))
								Object.prototype.hasOwnProperty.call(t, u) && (e[u] = t[u])
						return e
					}),
				i.apply(this, arguments)
			)
		},
		c = function (e, t) {
			var n = e.cartLineItems,
				c = (void 0 === n ? {} : n).lineItems,
				o = void 0 === c ? {} : c,
				a = (function (e) {
					switch (e.buyOfferType) {
						case "threshold":
							return (function (e) {
								var t = e.getOfferConfig,
									n = (function (e) {
										var t = (function (e) {
												return e.reduce(function (e, t) {
													return (e[t.variantId] = t), e
												}, {})
											})(e.lineItems),
											n = r(e.includeProducts),
											i = r(e.excludeProducts),
											c = 0 !== Object.keys(n).length ? u(t, n, "include") : [],
											o = 0 !== Object.keys(i).length ? u(t, i, "exclude") : []
										;(e.includedProductLineItem = 0 !== c.length ? c : void 0),
											(e.excludedProductLineItem = 0 === c.length && 0 !== o.length ? o : void 0)
										var a = c.length ? c : o,
											l = 0 !== a.length ? a : e.lineItems,
											f = 0
										return (
											l.forEach(function (e) {
												var t = e.unitPrice,
													n = e.quantity
												f += t * n
											}),
											f
										)
									})(e),
									i = (function (e, t) {
										var n = (e = e.sort(function (e, t) {
											return e.threshold - t.threshold
										})).reduce(function (e, n) {
											return n.threshold <= Math.round(t) ? (e < n ? e : n) : e
										}, 0)
										return 0 !== n ? n : []
									})(t, n)
								return 0 !== i.length
									? (function (e, t, n) {
											var r = e.includedProductLineItem,
												u = e.excludedProductLineItem,
												i = e.lineItems,
												c = e.getOfferType,
												o = t.discount,
												a = t.getProducts,
												l = r || u || i
											return (
												"percentage" === c
													? (o >= 100 && (o = 100),
													  l.forEach(function (e) {
															return (e.unitPrice = e.unitPrice - e.unitPrice * (o / 100))
													  }))
													: "amount" === c
													? o >= n
														? l.forEach(function (e) {
																return (e.unitPrice = 0 * e.unitPrice)
														  })
														: l.forEach(function (e) {
																return (e.unitPrice =
																	e.unitPrice * (1 - ((o / n) * 100) / 100))
														  })
													: "product" === c && (l = a),
												l
											)
									  })(e, i, n)
									: []
							})(e)
						case "collection":
							break
						default:
							return []
					}
					return []
				})(i(i({}, t), { lineItems: o }))
			return JSON.stringify(a)
		}
	vajroPlugin = t
})()
//# sourceMappingURL=vajroPlugin.js.map
