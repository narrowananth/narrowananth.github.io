/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vajroPlugin"] = factory();
	else
		root["vajroPlugin"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/buy-x-get-y/controller/plugin.controller.ts":
/*!*********************************************************!*\
  !*** ./src/buy-x-get-y/controller/plugin.controller.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"findOfferSection\": () => (/* binding */ findOfferSection)\n/* harmony export */ });\n/* harmony import */ var _service_plugin_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service/plugin.core */ \"./src/buy-x-get-y/service/plugin.core.ts\");\n\nvar findOfferSection = function (data) {\n    switch (data.buyOfferType) {\n        case \"threshold\":\n            return (0,_service_plugin_core__WEBPACK_IMPORTED_MODULE_0__.thresholdProcess)(data);\n        case \"collection\":\n            break;\n        case \"product\":\n            return (0,_service_plugin_core__WEBPACK_IMPORTED_MODULE_0__.productProcess)(data);\n        case \"quantity\":\n            return (0,_service_plugin_core__WEBPACK_IMPORTED_MODULE_0__.quantityProcess)(data);\n        default:\n            return [];\n    }\n    return [];\n};\n\n\n//# sourceURL=webpack://vajroPlugin/./src/buy-x-get-y/controller/plugin.controller.ts?");

/***/ }),

/***/ "./src/buy-x-get-y/service/plugin.core.ts":
/*!************************************************!*\
  !*** ./src/buy-x-get-y/service/plugin.core.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"productProcess\": () => (/* binding */ productProcess),\n/* harmony export */   \"quantityProcess\": () => (/* binding */ quantityProcess),\n/* harmony export */   \"thresholdProcess\": () => (/* binding */ thresholdProcess)\n/* harmony export */ });\n/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common */ \"./src/buy-x-get-y/utils/common.ts\");\n\nvar thresholdProcess = function (data) {\n    var getOfferConfig = data.getOfferConfig;\n    var getCartTotal = (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.findCartTotal)(data);\n    var getOffer = (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.findOffer)(getOfferConfig, getCartTotal);\n    if (getOffer.length !== 0)\n        return (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.splitDiscount)(data, getOffer, getCartTotal);\n    return [];\n};\nvar productProcess = function (data) {\n    return [];\n};\nvar quantityProcess = function (data) {\n    return [];\n};\n\n\n//# sourceURL=webpack://vajroPlugin/./src/buy-x-get-y/service/plugin.core.ts?");

/***/ }),

/***/ "./src/buy-x-get-y/utils/common.ts":
/*!*****************************************!*\
  !*** ./src/buy-x-get-y/utils/common.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"findCartTotal\": () => (/* binding */ findCartTotal),\n/* harmony export */   \"findOffer\": () => (/* binding */ findOffer),\n/* harmony export */   \"getLineItemsObj\": () => (/* binding */ getLineItemsObj),\n/* harmony export */   \"removeLineItems\": () => (/* binding */ removeLineItems),\n/* harmony export */   \"setKeyInFilterProduct\": () => (/* binding */ setKeyInFilterProduct),\n/* harmony export */   \"splitDiscount\": () => (/* binding */ splitDiscount)\n/* harmony export */ });\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar setKeyInFilterProduct = function (product) {\n    return product.reduce(function (obj, producDetails) {\n        var _a;\n        var variantId = producDetails.variantId;\n        return __assign(__assign({}, obj), (_a = {}, _a[variantId] = producDetails, _a));\n    }, {});\n};\nvar getLineItemsObj = function (lineItems) {\n    return lineItems.reduce(function (acc, lineItem) {\n        var variantId = lineItem.variantId;\n        acc[variantId] = lineItem;\n        return acc;\n    }, {});\n};\nvar removeLineItems = function (lineItems, productObj, selection) {\n    var editedLineItem = [];\n    if (selection === \"include\") {\n        Object.keys(lineItems).forEach(function (key) {\n            if (productObj[key])\n                editedLineItem.push(lineItems[key]);\n        });\n    }\n    else if (selection === \"exclude\") {\n        Object.keys(lineItems).forEach(function (key) {\n            if (!productObj[key])\n                editedLineItem.push(lineItems[key]);\n        });\n    }\n    return editedLineItem;\n};\nvar findCartTotal = function (data) {\n    var lineItemsObj = getLineItemsObj(data.lineItems);\n    var includeProductObj = setKeyInFilterProduct(data.includeProducts);\n    var excludedProductObj = setKeyInFilterProduct(data.excludeProducts);\n    var includedProductLineItem = Object.keys(includeProductObj).length !== 0 ? removeLineItems(lineItemsObj, includeProductObj, \"include\") : [];\n    var excludedProductLineItem = Object.keys(excludedProductObj).length !== 0 ? removeLineItems(lineItemsObj, excludedProductObj, \"exclude\") : [];\n    data.includedProductLineItem = includedProductLineItem.length !== 0 ? includedProductLineItem : undefined;\n    data.excludedProductLineItem =\n        includedProductLineItem.length === 0 && excludedProductLineItem.length !== 0\n            ? excludedProductLineItem\n            : undefined;\n    var lineItems = includedProductLineItem.length ? includedProductLineItem : excludedProductLineItem;\n    var finalLineItems = lineItems.length !== 0 ? lineItems : data.lineItems;\n    var total = 0;\n    finalLineItems.forEach(function (lineItem) {\n        var unitPrice = lineItem.unitPrice, quantity = lineItem.quantity;\n        total += unitPrice * quantity;\n    });\n    return total;\n};\nvar findOffer = function (getOfferConfig, getCartTotal) {\n    getOfferConfig = getOfferConfig.sort(function (a, b) { return a.threshold - b.threshold; });\n    var closestThreshold = getOfferConfig.reduce(function (prev, current) {\n        if (current.threshold <= Math.round(getCartTotal)) {\n            return prev < current ? prev : current;\n        }\n        else {\n            return prev;\n        }\n    }, 0);\n    return closestThreshold !== 0 ? closestThreshold : [];\n};\nvar splitDiscount = function (data, getOffer, getCartTotal) {\n    var includedProductLineItem = data.includedProductLineItem, excludedProductLineItem = data.excludedProductLineItem, lineItems = data.lineItems, getOfferType = data.getOfferType;\n    var discount = getOffer.discount, getProducts = getOffer.getProducts;\n    var filteringLineItems = includedProductLineItem || excludedProductLineItem || lineItems;\n    if (getOfferType === \"percentage\") {\n        if (discount >= 100)\n            discount = 100;\n        filteringLineItems.forEach(function (item) { return (item.unitPrice = item.unitPrice - item.unitPrice * (discount / 100)); });\n    }\n    else if (getOfferType === \"amount\") {\n        if (discount >= getCartTotal)\n            filteringLineItems.forEach(function (item) { return (item.unitPrice = item.unitPrice * 0); });\n        else\n            filteringLineItems.forEach(function (item) { return (item.unitPrice = item.unitPrice * (1 - ((discount / getCartTotal) * 100) / 100)); });\n    }\n    else if (getOfferType === \"product\") {\n        filteringLineItems = getProducts;\n    }\n    return filteringLineItems;\n};\n\n\n//# sourceURL=webpack://vajroPlugin/./src/buy-x-get-y/utils/common.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getBuyXGetY\": () => (/* binding */ getBuyXGetY)\n/* harmony export */ });\n/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src */ \"./src/index.ts\");\n/* harmony import */ var _buy_x_get_y_controller_plugin_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buy-x-get-y/controller/plugin.controller */ \"./src/buy-x-get-y/controller/plugin.controller.ts\");\n\n\nvar getBuyXGetY = function (appContext, configSchema) {\n    var _a = appContext.cartLineItems, cartLineItems = _a === void 0 ? {} : _a;\n    var _b = cartLineItems.lineItems, lineItems = _b === void 0 ? {} : _b;\n    configSchema.lineItems = lineItems;\n    return (0,_buy_x_get_y_controller_plugin_controller__WEBPACK_IMPORTED_MODULE_1__.findOfferSection)(configSchema);\n};\n\n\n//# sourceURL=webpack://vajroPlugin/./src/index.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});