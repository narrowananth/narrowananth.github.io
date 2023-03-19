var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{flow:()=>s,showMessage:()=>l});var n=function(){return n=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},n.apply(this,arguments)},r=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},o=function(t){var e=t.cartType,n=t.cartValue,r=t.lineItems,o=function(t){var e=t.offerCategory,n=t.customBuyCollection,r=t.customGetCollection,o=t.customBuyProduct,u=t.customGetProduct,c=t.getProductCount,i=o.length>0||n.length>0?o.concat(n):[],a=0===c&&(u.length>0||r.length>0)?u.concat(r):[];return"automaticOffers"!==e?i.concat(a):i}(t),u=0;return o.forEach((function(t){if(t){var n=r.reduce((function(n,r){var o=r||{},u=o.collectionId,c=o.variantId,i=o.quantity,a=o.unitPrice;return c!==t&&u!==t||(n+="amount"===e?i*a:i),n}),0);u+=n}})),u>=n},u=function(t){var e=t.customGetProduct,n=t.getProductCount,r=t.lineItems,o=0;return e.forEach((function(t){if(t){var e=r.reduce((function(e,n){var r=n||{},o=r.collectionId,u=r.variantId,c=r.quantity;return u!==t&&o!==t||(e+=c),e}),0);o+=e}})),o>=n},c=function(t,e,n,r,o,u,c){var i=e||{},a=i.unitPrice,f=i.quantity,l=i.variantId,s=i.productId,v=i.lineItemHandle;if("percentage"===n)return{productId:s,variantId:l,quantity:f,unitPrice:(m=f*a-f*a*(o/100))/f,lineItemHandle:v,discountType:t,discountValue:"You got ".concat(o,"% off"),customLineItemType:"REGULAR"};if("amount"===n){var m,P=f*a/u*100/100*r;return{productId:s,variantId:l,quantity:f,unitPrice:0!=(m=f*a>=P?f*a-P:0)?m/f:0,lineItemHandle:v,discountType:t,discountValue:"You save {{currency}}".concat(P.toFixed(3)),customLineItemType:"REGULAR"}}return"free"===n?d({productId:s,variantId:l,lineItemHandle:v,quantity:f,getProductCount:c,unitPrice:a,offerCategory:t}):{}},i=function(t){var e=t.offerCategory,n=t.getProducts,o=t.customGetProduct,u=t.lineItems,c=t.getProductCount,i=r(u),a=[];return o.forEach((function(t,r){if(t){var o=!!i[t],u=i[t]||{},f=u.productId,l=u.variantId,s=u.quantity,v=u.unitPrice,m=u.lineItemHandle,P=d({productId:f,variantId:l,lineItemHandle:m,quantity:s,getProductCount:c,unitPrice:v,offerCategory:e,customGetProductId:n[r].productId,customGetVariantId:n[r].variantId,isGetProductIdInLineitem:o});a.push(P)}})),a},a=function(t){var e=t.offerCategory,n=t.buyOfferType,r=t.discountType,o=t.discountValue,u=t.getProductCount,i=t.lineItems,a=function(t){var e=t.customBuyCollection,n=t.customGetCollection,r=t.customBuyProduct,o=t.customGetProduct,u=o.length>0?o:r,c=n.length>0?n:e;return u.concat(c)}(t),d="overAll"===n?i:a,f="overAll"===n?function(t){return t.reduce((function(t,e){return t+e.unitPrice*e.quantity}),0)}(d):function(t,e){var n=0;return t.forEach((function(t){if(t){var r=e.reduce((function(e,n){var r=n||{},o=r.collectionId,u=r.variantId,c=r.quantity,i=r.unitPrice;return u!==t&&o!==t||(e+=c*i),e}),0);n+=r}})),n}(d,i),l="percentage"===r&&o>=100?100:o,s=[];return d.forEach((function(t){if(t&&"string"==typeof t)return i.forEach((function(n){var i=n||{},a=i.collectionId;if(i.variantId===t||a===t){var d=c(e,n,r,o,l,f,u);s.push(d)}}));var n=c(e,t,r,o,l,f,u);s.push(n)})),s},d=function(t){var e=t.offerCategory,n=t.getProductCount,r=t.customGetProductId,o=t.customGetVariantId,u=t.isGetProductIdInLineitem,c=t.productId,i=t.variantId,a=t.lineItemHandle,d=t.quantity,f=void 0===d?n:d,l=t.unitPrice;return{productId:c||r,variantId:i||o,quantity:f||n,freeQuantity:n,unitPrice:f===n?0:l,lineItemHandle:a,discountType:f>=n?e:"",discountValue:"Buy ".concat(f,", Get ").concat(n," Free and ").concat(f-n," For the Same Price."),customLineItemType:"REGULAR",isGetProductIdInLineitem:u}},f=function(t){switch(t.offerCategory){case"percentageDiscount":case"flatDiscount":case"volumeDiscount":return function(t){return function(t){var e=t.getRemovedProductList,n=t.buyOfferType,r=t.customGetProduct,u=t.customGetCollection,c="overAll"!==n&&o(t),i="overAll"===n&&function(t){var e=t.cartType,n=t.cartValue;return t.lineItems.reduce((function(t,n){var r=n.quantity,o=n.unitPrice;return t+("amount"===e?r*o:r)}),0)>=n}(t),d=!(r.length>0||u.length>0)||function(t){var e=t.customBuyProduct,n=t.customBuyCollection,r=t.lineItems;return e.concat(n).some((function(t){return r.some((function(e){var n=e||{},r=n.collectionId;return n.variantId===t||r===t}))}))}(t);return{output:(i||c)&&d?a(t):[],getRemovedProductList:e}}(t)}(t);case"buyXGetY":return function(t){var e=function(t){var e=t.getRemovedProductList,n=o(t),r=u(t);return{output:n&&r?i(t):[],getRemovedProductList:e}}(t);return e}(t);case"buyMoreSaveMore":return function(t){var e=function(t){var e=t.getRemovedProductList,n=t.getProductCount,r=o(t),c=0===n||u(t);return{output:r&&c?a(t):[],getRemovedProductList:e}}(t);return e}(t);case"automaticOffers":return function(t){var e=function(t){var e=t.getRemovedProductList;return{output:o(t)?i(t):[],getRemovedProductList:e}}(t);return e}(t);default:return{}}},l=function(t){return t},s=function(t,e){var o=t.cartLineItems,u=(void 0===o?{}:o).lineItems,c=void 0===u?[]:u;if(0===c.length)return JSON.stringify({output:[],getRemovedProductList:[]});var i=function(t){var e=t.buyCollections,n=t.getCollections,r=t.buyProducts,o=t.getProducts,u=t.getProductCount,c=r.map((function(t){return t.variantId}));t.customBuyProduct=c;var i=o.map((function(t){return t.variantId}));t.customGetProduct=i;var a=e.map((function(t){return t.collectionId}));t.customBuyCollection=a;var d=n.map((function(t){return t.collectionId}));return t.customGetCollection=d,u||(t.getProductCount=0),t}(e),a=function(t,e){var o=t.offerCategory,u=t.discountType,c=t.customGetProduct,i=t.customBuyProduct,a=t.customGetCollection,d=t.customBuyCollection,f=function(t,e,n){return t.filter((function(t){var r=t.variantId,o=t.unitPrice,u=t.originalUnitPrice;return t.unitPrice=u,"free"===e?n.find((function(t){return t===r})):o!==u}))}(e,u,c)||[];return e=function(t,e,n,o,u,c){return c=r(c),e.forEach((function(e){var n=c[e]||{},r=n.variantId,o=n.originalUnitPrice;"automaticOffers"!==t&&r===e&&(c[e].unitPrice=o)})),n.forEach((function(e){var n=c[e]||{},r=n.variantId,o=n.originalUnitPrice;"automaticOffers"!==t&&r===e&&(c[e].unitPrice=o)})),c=Object.values(c),o.forEach((function(e){c.forEach((function(n){var r=n||{},o=r.collectionId;r.originalUnitPrice,"automaticOffers"===t&&o===e&&delete c[e]}))})),u.forEach((function(e){c.forEach((function(n){var r=n||{},o=r.collectionId;r.originalUnitPrice,"automaticOffers"===t&&o===e&&delete c[e]}))})),c}(o,c,i,a,d,e),n(n({},t),{lineItems:e,getRemovedProductList:f})}(i,c),d=f(a);return JSON.stringify(d)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map