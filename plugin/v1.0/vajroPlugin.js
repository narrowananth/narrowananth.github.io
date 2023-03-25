var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{flow:()=>v,showMessage:()=>f});var n=function(){return n=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},n.apply(this,arguments)},r=function(t){return'<!DOCTYPE html>\n\t<html lang="en">\n\t\t<head>\n\t\t\t<meta charset="UTF-8" />\n\t\t\t<meta http-equiv="X-UA-Compatible" content="IE=edge" />\n\t\t\t<meta name="viewport" content="width=device-width,initial-scale=1.0" />\n\t\t</head>\n\t\t<body style="min-width: auto; min-height: auto">\n\t\t\t<h2 style="text-align: center;"><b>'.concat(t,"</b></h2>\n\t\t</body>\n\t</html>")},o=function(t){var e=t.cartType,n=t.cartValue,r=t.lineItems,o=function(t){var e=t.offerCategory,n=t.customBuyCollection,r=t.customGetCollection,o=t.customBuyProduct,u=t.customGetProduct,c=t.getProductCount,i=o.length>0||n.length>0?o.concat(n):[],a=0===c&&(u.length>0||r.length>0)?u.concat(r):[];return"automaticOffers"!==e?i.concat(a):i}(t);return o.reduce((function(t,n){return t+r.reduce((function(t,r){var o=r||{},u=o.collectionId,c=o.variantId,i=o.quantity,a=o.unitPrice;return c!==n&&u!==n||(t+="amount"===e?i*a:i),t}),0)}),0)>=n},u=function(t){var e=t.customGetProduct,n=t.customGetCollection,r=t.lineItems;return e.concat(n).some((function(t){return r.some((function(e){var n=e||{},r=n.collectionId;return n.variantId===t||r===t}))}))},c=function(t){var e=t.customGetProduct,n=t.getProductCount,r=t.lineItems;return e.reduce((function(t,e){return t+r.reduce((function(t,n){var r=n||{},o=r.collectionId,u=r.variantId,c=r.quantity;return u!==e&&o!==e||(t+=c),t}),0)}),0)>=n},i=function(t,e,n,r,o,u,c){var i=e||{},a=i.unitPrice,d=i.quantity,s=i.variantId,f=i.productId,v=i.lineItemHandle;if("percentage"===n)return{productId:f,variantId:s,quantity:d,unitPrice:(m=d*a-d*a*(o/100))/d,lineItemHandle:v,discountType:t,discountValue:"You got ".concat(o,"% off"),customLineItemType:"REGULAR"};if("amount"===n){var m,g=d*a/u*100/100*r;return{productId:f,variantId:s,quantity:d,unitPrice:0!=(m=d*a>=g?d*a-g:0)?m/d:0,lineItemHandle:v,discountType:t,discountValue:"You save {{currency}}".concat(g.toFixed(3)),customLineItemType:"REGULAR"}}return"free"===n?l({productId:f,variantId:s,lineItemHandle:v,quantity:d,getProductCount:c,unitPrice:a,offerCategory:t}):{}},a=function(t){var e=t.offerCategory,n=t.getProducts,r=void 0===n?[]:n,o=t.customGetProduct,u=t.lineItems,c=t.getProductCount,i=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})}(u),a=[];return o.forEach((function(t,n){var o,u;if(t){var d=!!i[t],s=i[t]||{},f=s.productId,v=s.variantId,m=s.quantity,g=s.unitPrice,y=s.lineItemHandle,I=l({productId:f,variantId:v,lineItemHandle:y,quantity:m,getProductCount:c,unitPrice:g,offerCategory:e,customGetProductId:null===(o=r[n])||void 0===o?void 0:o.productId,customGetVariantId:null===(u=r[n])||void 0===u?void 0:u.variantId,isGetProductIdInLineitem:d});a.push(I)}})),a},d=function(t){var e=t.offerCategory,n=t.buyOfferType,r=t.discountType,o=t.discountValue,u=t.getProductCount,c=t.lineItems,a=t.customGetProduct,d=t.customGetCollection,l=function(t){var e=t.customBuyCollection,n=t.customGetCollection,r=t.customBuyProduct,o=t.customGetProduct,u=o.length>0?o:r,c=n.length>0?n:e,i=r.length>0&&n.length>0?n:[],a=o.length>0&&e.length>0?o:[],d=i.length>0||a.length>0?i.concat(a):u.concat(c);return console.log(d),d}(t),s="overAll"===n&&a.length<=0&&d.length<=0?c:l,f="overAll"===n?function(t){return t.reduce((function(t,e){return t+e.unitPrice*e.quantity}),0)}(s):function(t,e){return t.reduce((function(t,n){return t+e.reduce((function(t,e){var r=e||{},o=r.collectionId,u=r.variantId,c=r.quantity,i=r.unitPrice;return u!==n&&o!==n||(t+=c*i),t}),0)}),0)}(s,c),v="percentage"===r&&o>=100?100:o,m=[];return s.forEach((function(t){if(t&&"string"==typeof t)c.forEach((function(n){var c=n||{},a=c.collectionId;if(c.variantId===t||a===t){var d=i(e,n,r,o,v,f,u);m.push(d)}}));else{var n=i(e,t,r,o,v,f,u);m.push(n)}})),m},l=function(t){var e=t.offerCategory,n=t.getProductCount,r=t.customGetProductId,o=t.customGetVariantId,u=t.isGetProductIdInLineitem,c=t.productId,i=t.variantId,a=t.lineItemHandle,d=t.quantity,l=void 0===d?n:d,s=t.unitPrice,f=u&&n>l?n:l;return{productId:c||r,variantId:i||o,quantity:f,freeQuantity:n,unitPrice:f===n?0:s,lineItemHandle:a,discountType:f>=n?e:"",discountValue:f>=n?"Buy ".concat(f,", Get ").concat(n," Free and ").concat(f-n," For the Same Price."):"",customLineItemType:"REGULAR",isGetProductIdInLineitem:u}},s=function(t){switch(t.offerCategory){case"percentageDiscount":case"flatDiscount":case"volumeDiscount":return function(t){var e=t.getRemovedProductList,n=t.buyOfferType,c=t.customGetProduct,i=t.customGetCollection,a=t.displayText,l="overAll"!==n&&o(t),s="overAll"!==n||!(c.length>0||i.length>0)||u(t),f=!("overAll"!==n||!s)&&function(t){var e=t.cartType,n=t.cartValue;return t.lineItems.reduce((function(t,n){var r=n.quantity,o=n.unitPrice;return t+("amount"===e?r*o:r)}),0)>=n}(t),v=!(c.length>0||i.length>0)||"overAll"===n||function(t){var e=t.customBuyProduct,n=t.customBuyCollection,r=t.lineItems;return e.concat(n).some((function(t){return r.some((function(e){var n=e||{},r=n.collectionId;return n.variantId===t||r===t}))}))}(t),m=!(c.length>0||i.length>0)||"overAll"===n||u(t),g=(f||l)&&v&&m?d(t):[];return{output:g,getRemovedProductList:e,displayText:g.length>0&&a.length>0?r(a):""}}(t);case"buyXGetY":return function(t){var e=t.getRemovedProductList,n=t.displayText,u=o(t),i=c(t),d=u&&i?a(t):[];return{output:d,getRemovedProductList:e,displayText:d.length>0&&n.length>0?r(n):""}}(t);case"buyMoreSaveMore":return function(t){var e=t.getRemovedProductList,n=t.getProductCount,u=t.displayText,i=o(t),a=0===n||c(t),l=i&&a?d(t):[];return{output:l,getRemovedProductList:e,displayText:l.length>0&&u.length>0?r(u):""}}(t);case"automaticOffers":return function(t){var e=t.getRemovedProductList,n=t.displayText,u=o(t)?a(t):[];return{output:u,getRemovedProductList:e,displayText:u.length>0&&n.length>0?r(n):""}}(t);default:return{}}},f=function(t){return t},v=function(t,e){var r=t.cartLineItems,o=(void 0===r?{}:r).lineItems,u=void 0===o?[]:o;if(0===u.length)return JSON.stringify({output:[],getRemovedProductList:[],displayText:""});var c=function(t){var e=t.buyCollections,n=void 0===e?[]:e,r=t.getCollections,o=void 0===r?[]:r,u=t.buyProducts,c=void 0===u?[]:u,i=t.getProducts,a=void 0===i?[]:i,d=t.getProductCount,l=c.map((function(t){return t.variantId}));t.customBuyProduct=l;var s=a.map((function(t){return t.variantId}));t.customGetProduct=s;var f=n.map((function(t){return t.collectionId}));t.customBuyCollection=f;var v=o.map((function(t){return t.collectionId}));return t.customGetCollection=v,d||(t.getProductCount=0),t}(e),i=function(t,e){var r=function(t,e,n){return t.filter((function(t){var r=t.variantId,o=t.unitPrice,u=t.originalUnitPrice;return t.unitPrice=u,"free"===e?n.find((function(t){return t===r})):o!==u}))}(e,t.discountType,t.customGetProduct)||[],o=function(t){return t.map((function(t){var e=t.originalUnitPrice;return t.unitPrice=e,t}))}(e);return n(n({},t),{lineItems:o,getRemovedProductList:r})}(c,u),a=s(i);return JSON.stringify(a)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map