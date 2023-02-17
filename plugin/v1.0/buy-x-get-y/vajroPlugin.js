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
    var getRemovedProductList = data.getRemovedProductList;
    var getSplitDiscount = (0,_utils_threshold_utils__WEBPACK_IMPORTED_MODULE_1__.findCartTotal)(data);
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
/* harmony export */   "resetInputLineItem": () => (/* binding */ resetInputLineItem),
/* harmony export */   "sanitizeLineItems": () => (/* binding */ sanitizeLineItems)
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
    lineItems = resetInputLineItem(getProducts, lineItems);
    var config = __assign(__assign({}, getConfigSchema), { lineItems: lineItems, getRemovedProductList: getRemovedProductList });
    return config;
};
var resetInputLineItem = function (getProducts, lineItems) {
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
    var includeProductObj = getLineItemsObj(includeProducts);
    var excludedProductObj = getLineItemsObj(excludeProducts);
    var includedProductLineItem = Object.keys(includeProductObj).length !== 0 ? removeLineItems(lineItems, includeProductObj, "include") : [];
    var excludedProductLineItem = Object.keys(excludedProductObj).length !== 0 ? removeLineItems(lineItems, excludedProductObj, "exclude") : [];
    var lineItem = includedProductLineItem.length ? includedProductLineItem : excludedProductLineItem;
    var setKeyToLineItem = getLineItemsObj(lineItem);
    var finalLineItems = lineItem.length !== 0 ? setKeyToLineItem : lineItems;
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
/* harmony export */   "SplitQuantityOffer": () => (/* binding */ SplitQuantityOffer),
/* harmony export */   "findCartQuantity": () => (/* binding */ findCartQuantity),
/* harmony export */   "findOffer": () => (/* binding */ findOffer)
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

var findOffer = function (buyProductIdArray, buyProductQuantity, getSanitizeLineItems) {
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
    return { offerFlag: offerFlag };
};
var SplitQuantityOffer = function (getFindOffer, data) {
    var offerFlag = getFindOffer.offerFlag;
    var getOfferType = data.getOfferType, getOfferConfig = data.getOfferConfig;
    var getProducts = getOfferConfig.getProducts, getProductQuantity = getOfferConfig.getProductQuantity;
    var getProductsLength = getProducts.length !== 0 ? getProducts.length : 1;
    var discount = getOfferConfig.discount;
    discount = getOfferType === "amount" ? discount / getProductsLength : discount;
    if (offerFlag) {
        return getProducts.map(function (key) {
            var unitPrice = key.unitPrice;
            var getEditedPrice = 0;
            if (getOfferType !== "product") {
                if (getOfferType === "percentage") {
                    if (discount >= 100)
                        discount = 100;
                }
                else if (getOfferType === "amount") {
                    if (discount >= unitPrice)
                        unitPrice = discount;
                }
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
var findCartQuantity = function (data) {
    var getOfferConfig = data.getOfferConfig;
    var buyProducts = getOfferConfig.buyProducts, buyProductQuantity = getOfferConfig.buyProductQuantity;
    var buyProductIdArray = buyProducts.map(function (product) { return product.variantId; });
    var getSanitizeLineItems = (0,_plugin_utils__WEBPACK_IMPORTED_MODULE_0__.sanitizeLineItems)(data);
    var getFindOffer = findOffer(buyProductIdArray, buyProductQuantity, getSanitizeLineItems);
    var getSplitQuantityOffer = SplitQuantityOffer(getFindOffer, data);
    return getSplitQuantityOffer;
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
/* harmony export */   "findOfferAndTotal": () => (/* binding */ findOfferAndTotal),
/* harmony export */   "splitThresholdOffer": () => (/* binding */ splitThresholdOffer)
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

var findOfferAndTotal = function (buyProductIdArray, getSanitizeLineItems) {
    var offerFlag = false;
    var total = 0;
    for (var _i = 0, buyProductIdArray_1 = buyProductIdArray; _i < buyProductIdArray_1.length; _i++) {
        var key = buyProductIdArray_1[_i];
        var _a = getSanitizeLineItems[key] || {}, quantity = _a.quantity, unitPrice = _a.unitPrice;
        if (quantity && unitPrice) {
            total += quantity * unitPrice;
            offerFlag = true;
        }
        else {
            offerFlag = false;
            break;
        }
    }
    return { offerFlag: offerFlag, total: total };
};
var splitThresholdOffer = function (getFindOfferAndTotal, data) {
    var offerFlag = getFindOfferAndTotal.offerFlag, total = getFindOfferAndTotal.total;
    var getOfferType = data.getOfferType, getOfferConfig = data.getOfferConfig;
    var threshold = getOfferConfig.threshold, getProducts = getOfferConfig.getProducts, getProductQuantity = getOfferConfig.getProductQuantity;
    var getProductsLength = getProducts.length !== 0 ? getProducts.length : 1;
    var discount = getOfferConfig.discount;
    discount = getOfferType === "amount" ? discount / getProductsLength : discount;
    if (offerFlag && threshold <= total) {
        return getProducts.map(function (key) {
            var unitPrice = key.unitPrice;
            var getEditedPrice = 0;
            if (getOfferType !== "product") {
                if (getOfferType === "percentage") {
                    if (discount >= 100)
                        discount = 100;
                }
                else if (getOfferType === "amount") {
                    if (discount >= unitPrice)
                        unitPrice = discount;
                }
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
var findCartTotal = function (data) {
    var getOfferConfig = data.getOfferConfig;
    var buyProducts = getOfferConfig.buyProducts;
    var buyProductIdArray = buyProducts.map(function (product) { return product.variantId; });
    var getSanitizeLineItems = (0,_plugin_utils__WEBPACK_IMPORTED_MODULE_0__.sanitizeLineItems)(data);
    var getFindOfferAndTotal = findOfferAndTotal(buyProductIdArray, getSanitizeLineItems);
    var getSplitOffer = splitThresholdOffer(getFindOfferAndTotal, data);
    return getSplitOffer;
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
/* harmony export */   "getBuyXGetY": () => (/* binding */ getBuyXGetY),
/* harmony export */   "showMessage": () => (/* binding */ showMessage)
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
var showMessage = function (message) {
    return message;
};

})();

vajroPlugin = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=vajroPlugin.js.map