var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{flow:()=>I,getBuyXGetY:()=>m,showMessage:()=>p});var n=function(t){var e=t.getProductValid,n=t.getProductVariantIds,r=t.buyProductVariantIds,u=t.sanitizedLineItem,i=t.discountType,o=t.discountValue,a=o;return(e?n:r).map((function(t){var e=u[t],n=e.unitPrice,r=e.quantity,c=e.variantId,d=e.productId;return"percentage"===i?(o>=100&&(a=100),{productId:d,variantId:c,quantity:r,unitPrice:r*n-r*n*(a/100)}):{productId:d,variantId:c,quantity:r,unitPrice:r*(o>=n?o:n)-o}}))},r=function(t){var e=t.lineItems,r=t.getRemovedProductList,u=t.getProductValid,i=t.buyCollection,o=t.discountType,a=t.discountValue,c=(t.buyCollectionValue,t.buyProducts),d=t.getProducts,s=c.flatMap((function(t){return t.variantId})),f=d.flatMap((function(t){return t.variantId})),l=e;if(i)return{};var g=!!u&&function(t){var e=t.getProductVariantIds,n=t.sanitizedLineItem,r=t.buyProductVariantIds.every((function(t){return n[t]})),u=e.every((function(t){return n[t]}));return!(!r||!u)}({buyProductVariantIds:s,getProductVariantIds:f,sanitizedLineItem:l}),v=!u&&function(t){var e=t.sanitizedLineItem;return!!t.buyProductVariantIds.every((function(t){return e[t]}))}({buyProductVariantIds:s,sanitizedLineItem:l}),y=u&&g?n({getProductValid:u,getProductVariantIds:f,sanitizedLineItem:l,discountType:o,discountValue:a}):[],P=!u&&v?n({getProductValid:u,buyProductVariantIds:s,sanitizedLineItem:l,discountType:o,discountValue:a}):[];return{output:u?y:P,getRemovedProductList:r}},u=function(t){var e=t.buyProducts,n=t.sanitizedLineItem;return!!e.every((function(t){var e=t.variantId,r=t.count;return!!e&&n[e].quantity>=r}))},i=function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var u in e=arguments[n])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},i.apply(this,arguments)},o=function(t,e){var n=c(e)||[],r=t.getProducts,u=t.buyProducts;return e=a(r,u,e),i(i({},t),{lineItems:e,getRemovedProductList:n})},a=function(t,e,n){var r=t.map((function(t){return t.variantId})),u=e.map((function(t){return t.variantId}));return n=d(n),r.forEach((function(t){var e=n[t]||{},r=e.lineItemType,u=e.variantId,i=e.originalUnitPrice;u===t&&"READONLY"===r&&(n[t].unitPrice=i)})),u.forEach((function(t){var e=n[t]||{},r=e.lineItemType,u=e.variantId,i=e.originalUnitPrice;u===t&&"READONLY"===r&&(n[t].unitPrice=i)})),n},c=function(t){return t.filter((function(t){return"READONLY"===t.lineItemType}))},d=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},s=function(t,e,n){var r=[];return"include"===n?Object.keys(t).forEach((function(n){e[n]&&r.push(t[n])})):"exclude"===n&&Object.keys(t).forEach((function(n){e[n]||r.push(t[n])})),r},f=function(t){var e=t.lineItems,n=t.includeProducts,r=t.excludeProducts,u=d(n),i=d(r),o=0!==Object.keys(u).length?s(e,u,"include"):[],a=0!==Object.keys(i).length?s(e,i,"exclude"):[],c=o.length?o:a,f=d(c);return 0!==c.length?f:e},l=function(){return l=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var u in e=arguments[n])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},l.apply(this,arguments)},g=function(t){var e=t.getOfferConfig,n=e.buyProducts,r=e.buyProductQuantity,u=function(t,e,n){for(var r=!1,u=0,i=t;u<i.length;u++){var o=i[u],a=(n[o]||{}).quantity;if(!(n[o]&&e<=a)){r=!1;break}r=!0}return{offerFlag:r}}(n.map((function(t){return t.variantId})),r,f(t)),i=function(t,e){var n=t.offerFlag,r=e.getOfferType,u=e.getOfferConfig,i=u.getProducts,o=u.getProductQuantity,a=0!==i.length?i.length:1,c=u.discount;return c="amount"===r?c/a:c,n?i.map((function(t){var e=t.unitPrice,n=0;return"product"!==r&&("percentage"===r?c>=100&&(c=100):"amount"===r&&c>=e&&(e=c),n="percentage"===r?o*e-o*e*(c/100):o*e-c),l(l({},t),{quantity:o,unitPrice:n})})):[]}(u,t);return i},v=function(){return v=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var u in e=arguments[n])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},v.apply(this,arguments)},y=function(t){var e=function(t,e){var n=t.offerFlag,r=t.total,u=e.getOfferType,i=e.getOfferConfig,o=i.threshold,a=i.getProducts,c=i.getProductQuantity,d=0!==a.length?a.length:1,s=i.discount;return s="amount"===u?s/d:s,n&&o<=r?a.map((function(t){var e=t.unitPrice,n=0;return"product"!==u&&("percentage"===u?s>=100&&(s=100):"amount"===u&&s>=e&&(e=s),n="percentage"===u?c*e-c*e*(s/100):c*e-s),v(v({},t),{quantity:c,unitPrice:n})})):[]}(function(t,e){for(var n=!1,r=0,u=0,i=t;u<i.length;u++){var o=e[i[u]]||{},a=o.quantity,c=o.unitPrice;if(!a||!c){n=!1;break}r+=a*c,n=!0}return{offerFlag:n,total:r}}(t.getOfferConfig.buyProducts.map((function(t){return t.variantId})),f(t)),t);return e},P=function(t){switch(t.getConfigSchema.offerCategory){case"percentageDiscount":return function(t){var e=t.getConfigSchema,n=t.lineItems,u=o(e,n);return r(u)}(t);case"flatDiscount":return function(t){var e=t.getConfigSchema,n=t.lineItems,u=o(e,n);return r(u)}(t);case"volumeDiscount":return function(t){var e=t.getConfigSchema,r=t.lineItems,i=function(t){var e=t.lineItems,r=(t.getConfigSchema,t.getRemovedProductList),i=t.buyCollection,o=t.discountType,a=t.discountValue,c=(t.buyCollectionValue,t.buyProducts);if(i)return{};var d=c.flatMap((function(t){return t.variantId})),s=e;return{getRemovedProductList:r,output:u({buyProducts:c,sanitizedLineItem:s})?n({buyProductVariantIds:d,sanitizedLineItem:s,discountType:o,discountValue:a}):[]}}(o(e,r));return i}(t);case"buyXGetY":return function(t){var e=t.getConfigSchema,n=t.lineItems,r=function(t){var e=t.lineItems,n=t.getRemovedProductList,r=t.buyProducts,i=t.getProducts,o=e,a=u({buyProducts:r,sanitizedLineItem:o})?function(t){var e=t.sanitizedLineItem;return t.getProducts.map((function(t){var n=t.productId,r=t.variantId,u=t.count,i=e[r].quantity>=u,o=i?0:e[r].unitPrice,a={productId:n,variantId:r,quantity:e[r].quantity,unitPrice:o};return i?a:null}))}({getProducts:i,sanitizedLineItem:o}):[];return{getRemovedProductList:n,output:a}}(o(e,n));return r}(t);case"buyMoreSaveMore":return function(t){var e=t.getConfigSchema,n=t.lineItems,r=function(t){var e=t.lineItems,n=t.getRemovedProductList,r=t.buyProducts,u=t.getProducts,i=t.discountType,o=t.discountValue,a=e,c=function(t){var e=t.sanitizedLineItem;return!!t.buyProducts.every((function(t){var n=t.variantId,r=t.amount;return!!n&&e[n].unitPrice*e[n].quantity>=r}))}({buyProducts:r,sanitizedLineItem:a}),d=c?function(t){var e=t.sanitizedLineItem,n=t.discountType,r=t.discountValue;return t.getProducts.map((function(t){var u=t.variantId,i=t.amount,o=r,a=e[u].unitPrice*e[u].quantity>=i,c=e[u],d=c.unitPrice,s=c.quantity,f=c.productId;return a?"percentage"===n?(r>=100&&(o=100),{productId:f,variantId:u,quantity:s,unitPrice:s*d-s*d*(o/100)}):{productId:f,variantId:u,quantity:s,unitPrice:s*(r>=d?r:d)-r}:void 0}))}({getProducts:u,sanitizedLineItem:a,discountType:i,discountValue:o}):[];return{getRemovedProductList:n,output:d}}(o(e,n));return r}(t);default:return{}}},m=function(t,e){var n=t.cartLineItems,r=(void 0===n?{}:n).lineItems,u=function(t){switch(t.buyOfferType){case"threshold":return function(t){var e=t.getRemovedProductList;return{getSplitDiscount:y(t),getRemovedProductList:e}}(t);case"collection":case"product":default:return{};case"quantity":return function(t){var e=t.getRemovedProductList;return{getSplitDiscount:g(t),getRemovedProductList:e}}(t)}}(o(e,void 0===r?[]:r));return JSON.stringify(u)},p=function(t){return t},I=function(t,e){var n=t.cartLineItems,r=(void 0===n?{}:n).lineItems,u=P({lineItems:void 0===r?[]:r,getConfigSchema:e});return JSON.stringify(u)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map