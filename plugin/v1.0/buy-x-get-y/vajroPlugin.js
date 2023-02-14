var vajroPlugin;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/buy-x-get-y/controller/plugin.controller.ts":
/*!*********************************************************!*\
  !*** ./src/buy-x-get-y/controller/plugin.controller.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findOfferSection": () => (/* binding */ findOfferSection)
/* harmony export */ });
/* harmony import */ var _service_plugin_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service/plugin.core */ "./src/buy-x-get-y/service/plugin.core.ts");

var findOfferSection = function (data) {
    switch (data.buyOfferType) {
        case "threshold":
            return (0,_service_plugin_core__WEBPACK_IMPORTED_MODULE_0__.thresholdProcess)(data);
        case "collection":
            break;
        case "product":
            return (0,_service_plugin_core__WEBPACK_IMPORTED_MODULE_0__.productProcess)(data);
        case "quantity":
            return (0,_service_plugin_core__WEBPACK_IMPORTED_MODULE_0__.quantityProcess)(data);
        default:
            return {};
    }
    return {};
};


/***/ }),

/***/ "./src/buy-x-get-y/service/plugin.core.ts":
/*!************************************************!*\
  !*** ./src/buy-x-get-y/service/plugin.core.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productProcess": () => (/* binding */ productProcess),
/* harmony export */   "quantityProcess": () => (/* binding */ quantityProcess),
/* harmony export */   "thresholdProcess": () => (/* binding */ thresholdProcess)
/* harmony export */ });
/* harmony import */ var _utils_quantity_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/quantity.utils */ "./src/buy-x-get-y/utils/quantity.utils.ts");
/* harmony import */ var _utils_threshold_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/threshold.utils */ "./src/buy-x-get-y/utils/threshold.utils.ts");


var thresholdProcess = function (data) {
    var getOfferConfig = data.getOfferConfig, getRemovedProductList = data.getRemovedProductList;
    var getCartTotal = (0,_utils_threshold_utils__WEBPACK_IMPORTED_MODULE_1__.findCartTotal)(data);
    var getOffer = (0,_utils_threshold_utils__WEBPACK_IMPORTED_MODULE_1__.findOffer)(getOfferConfig, getCartTotal);
    var getSplitDiscount = getOffer.length !== 0 ? (0,_utils_threshold_utils__WEBPACK_IMPORTED_MODULE_1__.splitDiscount)(data, getOffer, getCartTotal) : [];
    var parsedSplitDiscount = { getSplitDiscount: getSplitDiscount, getRemovedProductList: getRemovedProductList };
    return parsedSplitDiscount;
};
var productProcess = function (data) {
    return {};
};
var quantityProcess = function (data) {
    var getRemovedProductList = data.getRemovedProductList;
    var getSplitDiscount = (0,_utils_quantity_utils__WEBPACK_IMPORTED_MODULE_0__.findCartQuantity)(data);
    var parsedSplitDiscount = { getSplitDiscount: getSplitDiscount, getRemovedProductList: getRemovedProductList };
    return parsedSplitDiscount;
};


/***/ }),

/***/ "./src/buy-x-get-y/utils/plugin.utils.ts":
/*!***********************************************!*\
  !*** ./src/buy-x-get-y/utils/plugin.utils.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildInputData": () => (/* binding */ buildInputData),
/* harmony export */   "getLineItemsObj": () => (/* binding */ getLineItemsObj),
/* harmony export */   "removeExistingDiscount": () => (/* binding */ removeExistingDiscount),
/* harmony export */   "removeLineItems": () => (/* binding */ removeLineItems),
/* harmony export */   "resetLineItemAmount": () => (/* binding */ resetLineItemAmount),
/* harmony export */   "sanitizeLineItems": () => (/* binding */ sanitizeLineItems),
/* harmony export */   "setKeyInFilterProduct": () => (/* binding */ setKeyInFilterProduct)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var buildInputData = function (getConfigSchema, lineItems) {
    var getRemovedProductList = removeExistingDiscount(lineItems) || [];
    var getOfferConfig = getConfigSchema.getOfferConfig;
    var getProducts = getOfferConfig.getProducts;
    lineItems = resetLineItemAmount(getProducts, lineItems);
    var config = __assign(__assign({}, getConfigSchema), { lineItems: lineItems, getRemovedProductList: getRemovedProductList });
    return config;
};
var resetLineItemAmount = function (getProducts, lineItems) {
    var getRemovedList = getProducts.map(function (product) { return product.variantId; });
    lineItems = getLineItemsObj(lineItems);
    getRemovedList.forEach(function (key) {
        var _a = lineItems[key] || {}, lineItemType = _a.lineItemType, variantId = _a.variantId;
        if (variantId === key && lineItemType === "READONLY")
            delete lineItems[key];
    });
    return lineItems;
};
var removeExistingDiscount = function (lineItems) {
    var getRemoveItemsList = lineItems;
    return getRemoveItemsList.filter(function (lineItem) {
        var lineItemType = lineItem.lineItemType;
        return lineItemType === "READONLY";
    });
};
var setKeyInFilterProduct = function (product) {
    return product.reduce(function (obj, producDetails) {
        var _a;
        var variantId = producDetails.variantId;
        return __assign(__assign({}, obj), (_a = {}, _a[variantId] = producDetails, _a));
    }, {});
};
var getLineItemsObj = function (lineItems) {
    return lineItems.reduce(function (acc, lineItem) {
        var variantId = lineItem.variantId;
        acc[variantId] = lineItem;
        return acc;
    }, {});
};
var removeLineItems = function (lineItems, productObj, selection) {
    var editedLineItem = [];
    if (selection === "include") {
        Object.keys(lineItems).forEach(function (key) {
            if (productObj[key])
                editedLineItem.push(lineItems[key]);
        });
    }
    else if (selection === "exclude") {
        Object.keys(lineItems).forEach(function (key) {
            if (!productObj[key])
                editedLineItem.push(lineItems[key]);
        });
    }
    return editedLineItem;
};
var sanitizeLineItems = function (data) {
    var lineItems = data.lineItems, includeProducts = data.includeProducts, excludeProducts = data.excludeProducts;
    var includeProductObj = setKeyInFilterProduct(includeProducts);
    var excludedProductObj = setKeyInFilterProduct(excludeProducts);
    var includedProductLineItem = Object.keys(includeProductObj).length !== 0 ? removeLineItems(lineItems, includeProductObj, "include") : [];
    var excludedProductLineItem = Object.keys(excludedProductObj).length !== 0 ? removeLineItems(lineItems, excludedProductObj, "exclude") : [];
    data.includedProductLineItem = includedProductLineItem.length !== 0 ? includedProductLineItem : undefined;
    data.excludedProductLineItem =
        includedProductLineItem.length === 0 && excludedProductLineItem.length !== 0
            ? excludedProductLineItem
            : undefined;
    var lineItem = includedProductLineItem.length ? includedProductLineItem : excludedProductLineItem;
    var finalLineItems = lineItem.length !== 0 ? lineItem : data.lineItems;
    return finalLineItems;
};


/***/ }),

/***/ "./src/buy-x-get-y/utils/quantity.utils.ts":
/*!*************************************************!*\
  !*** ./src/buy-x-get-y/utils/quantity.utils.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findCartQuantity": () => (/* binding */ findCartQuantity)
/* harmony export */ });
/* harmony import */ var _plugin_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugin.utils */ "./src/buy-x-get-y/utils/plugin.utils.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var findCartQuantity = function (data) {
    var getOfferType = data.getOfferType, getOfferConfig = data.getOfferConfig;
    var buyProducts = getOfferConfig.buyProducts, buyProductQuantity = getOfferConfig.buyProductQuantity, getProducts = getOfferConfig.getProducts, getProductQuantity = getOfferConfig.getProductQuantity;
    var discount = getOfferConfig.discount;
    var buyProductIdArray = buyProducts.map(function (product) { return product.variantId; });
    var getSanitizeLineItems = (0,_plugin_utils__WEBPACK_IMPORTED_MODULE_0__.sanitizeLineItems)(data);
    var offerFlag = false;
    for (var _i = 0, buyProductIdArray_1 = buyProductIdArray; _i < buyProductIdArray_1.length; _i++) {
        var key = buyProductIdArray_1[_i];
        var quantity = (getSanitizeLineItems[key] || {}).quantity;
        if (getSanitizeLineItems[key] && buyProductQuantity <= quantity)
            offerFlag = true;
        else {
            offerFlag = false;
            break;
        }
    }
    if (offerFlag) {
        return getProducts.map(function (key) {
            var unitPrice = key.unitPrice;
            var getEditedPrice = 0;
            if (getOfferType !== "product") {
                if (getOfferType === "percentage") {
                    if (discount >= 100)
                        discount = 100;
                }
                // else if (getOfferType === "amount") {
                // 	if (discount >= getProductQuantity * unitPrice) discount = getProductQuantity * unitPrice
                // }
                getEditedPrice =
                    getOfferType === "percentage"
                        ? getProductQuantity * unitPrice - getProductQuantity * unitPrice * (discount / 100)
                        : getProductQuantity * unitPrice - discount;
            }
            var finalDiscount = __assign(__assign({}, key), { quantity: getProductQuantity, unitPrice: getEditedPrice });
            return finalDiscount;
        });
    }
    return [];
};


/***/ }),

/***/ "./src/buy-x-get-y/utils/threshold.utils.ts":
/*!**************************************************!*\
  !*** ./src/buy-x-get-y/utils/threshold.utils.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findCartTotal": () => (/* binding */ findCartTotal),
/* harmony export */   "findOffer": () => (/* binding */ findOffer),
/* harmony export */   "splitDiscount": () => (/* binding */ splitDiscount)
/* harmony export */ });
/* harmony import */ var _plugin_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugin.utils */ "./src/buy-x-get-y/utils/plugin.utils.ts");

var findCartTotal = function (data) {
    var getSanitizeLineItems = (0,_plugin_utils__WEBPACK_IMPORTED_MODULE_0__.sanitizeLineItems)(data);
    var total = 0;
    getSanitizeLineItems.forEach(function (lineItem) {
        var unitPrice = lineItem.unitPrice, quantity = lineItem.quantity;
        total += unitPrice * quantity;
    });
    return total;
};
var findOffer = function (getOfferConfig, getCartTotal) {
    getOfferConfig = getOfferConfig.sort(function (a, b) { return a.threshold - b.threshold; });
    var closestThreshold = getOfferConfig.reduce(function (prev, current) {
        if (current.threshold <= Math.round(getCartTotal))
            return prev < current ? prev : current;
        else
            return prev;
    }, 0);
    return closestThreshold !== 0 ? closestThreshold : [];
};
var splitDiscount = function (data, getOffer, getCartTotal) {
    var includedProductLineItem = data.includedProductLineItem, excludedProductLineItem = data.excludedProductLineItem, lineItems = data.lineItems, getOfferType = data.getOfferType;
    var discount = getOffer.discount, getProducts = getOffer.getProducts, getProductQuantity = getOffer.getProductQuantity;
    var filteringLineItems = includedProductLineItem || excludedProductLineItem || lineItems;
    if (getOfferType === "percentage") {
        if (discount >= 100)
            discount = 100;
        filteringLineItems.forEach(function (item) { return (item.unitPrice = item.unitPrice - item.unitPrice * (discount / 100)); });
    }
    else if (getOfferType === "amount") {
        if (discount >= getCartTotal)
            filteringLineItems.forEach(function (item) { return (item.unitPrice = item.unitPrice * 0); });
        else
            filteringLineItems.forEach(function (item) { return (item.unitPrice = item.unitPrice * (1 - ((discount / getCartTotal) * 100) / 100)); });
    }
    else if (getOfferType === "product") {
        filteringLineItems = getProducts.map(function (key) {
            key.quantity = getProductQuantity;
            return key;
        });
    }
    return filteringLineItems;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBuyXGetY": () => (/* binding */ getBuyXGetY)
/* harmony export */ });
/* harmony import */ var _buy_x_get_y_controller_plugin_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buy-x-get-y/controller/plugin.controller */ "./src/buy-x-get-y/controller/plugin.controller.ts");
/* harmony import */ var _buy_x_get_y_utils_plugin_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buy-x-get-y/utils/plugin.utils */ "./src/buy-x-get-y/utils/plugin.utils.ts");


var getBuyXGetY = function (appContext, configSchema) {
    var _a = appContext.cartLineItems, cartLineItems = _a === void 0 ? {} : _a;
    var _b = cartLineItems.lineItems, lineItems = _b === void 0 ? [] : _b;
    var getConfigSchema = configSchema;
    var getBuildInputData = (0,_buy_x_get_y_utils_plugin_utils__WEBPACK_IMPORTED_MODULE_1__.buildInputData)(getConfigSchema, lineItems);
    var getOfferSection = (0,_buy_x_get_y_controller_plugin_controller__WEBPACK_IMPORTED_MODULE_0__.findOfferSection)(getBuildInputData);
    return JSON.stringify(getOfferSection);
};

})();

vajroPlugin = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=vajroPlugin.js.map