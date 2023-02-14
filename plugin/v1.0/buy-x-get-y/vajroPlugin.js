var vajroPlugin;(()=>{"use strict";var t={d:(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{getBuyXGetY:()=>a});var r=function(){return r=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var u in e=arguments[r])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},r.apply(this,arguments)},n=function(){return n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var u in e=arguments[r])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},n.apply(this,arguments)},u=function(t){return t.reduce((function(t,e){var r,u=e.variantId;return n(n({},t),((r={})[u]=e,r))}),{})},i=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},o=function(t,e,r){var n=[];return"include"===r?Object.keys(t).forEach((function(r){e[r]&&n.push(t[r])})):"exclude"===r&&Object.keys(t).forEach((function(r){e[r]||n.push(t[r])})),n},c=function(t){var e=t.lineItems,r=t.includeProducts,n=t.excludeProducts,c=i(e),a=u(r),f=u(n),d=0!==Object.keys(a).length?o(c,a,"include"):[],l=0!==Object.keys(f).length?o(c,f,"exclude"):[];t.includedProductLineItem=0!==d.length?d:void 0,t.excludedProductLineItem=0===d.length&&0!==l.length?l:void 0;var s=d.length?d:l;return 0!==s.length?s:t.lineItems},a=function(t,e){var u=t.cartLineItems,o=(void 0===u?{}:u).lineItems,a=function(t){switch(t.buyOfferType){case"threshold":return function(t){var e=t.getOfferConfig,r=t.getOfferType,n=t.getRemovedProductList,u=function(t){var e=c(t),r=0;return e.forEach((function(t){var e=t.unitPrice,n=t.quantity;r+=e*n})),r}(t),i=function(t,e){var r=(t=t.sort((function(t,e){return t.threshold-e.threshold}))).reduce((function(t,r){return r.threshold<=Math.round(e)?t<r?t:r:t}),0);return 0!==r?r:[]}(e,u),o=0!==i.length?function(t,e,r){var n=t.includedProductLineItem,u=t.excludedProductLineItem,i=t.lineItems,o=t.getOfferType,c=e.discount,a=e.getProducts,f=e.getProductQuantity,d=n||u||i;return"percentage"===o?(c>=100&&(c=100),d.forEach((function(t){return t.unitPrice=t.unitPrice-t.unitPrice*(c/100)}))):"amount"===o?c>=r?d.forEach((function(t){return t.unitPrice=0*t.unitPrice})):d.forEach((function(t){return t.unitPrice=t.unitPrice*(1-c/r*100/100)})):"product"===o&&(d=a.map((function(t){return t.quantity=f,t}))),d}(t,i,u):[];return"product"===r?{getSplitDiscount:o,getRemovedProductList:n}:{getSplitDiscount:o}}(t);case"collection":break;case"product":default:return{};case"quantity":return function(t){var e=t.getOfferType,r=t.getRemovedProductList,n=function(t){var e=t.getOfferConfig,r=e.buyProducts,n=e.buyProductQuantity,u=e.getProducts,o=e.getProductQuantity,a=r.map((function(t){return t.variantId})),f=c(t),d=i(f),l=!1;return a.forEach((function(t){l=!(!d[t]||n!==d[t].quantity)})),l&&u.map((function(t){return t.quantity=o,t})),l?u:{}}(t);return"product"===e?{getCartQuantity:n,getRemovedProductList:r}:{getCartQuantity:n}}(t)}return{}}(function(t,e){var u=t.buyOfferType,i=t.getOfferType;if("threshold"===u){e="product"!==i?function(t){return t.map((function(t){var e=t.originalUnitPrice,n=t.unitPrice;return e&&e!==n?r(r({},t),{unitPrice:e}):t}))}(e):e;var o="product"===i?function(t){return t.filter((function(t){var e=t.unitPrice,r=t.lineItemType;return 0===e&&"READONLY"===r}))}(e):void 0;return n(n({},t),{lineItems:e,getRemovedProductList:o})}return n(n({},t),{lineItems:e})}(e,void 0===o?[]:o));return JSON.stringify(a)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map