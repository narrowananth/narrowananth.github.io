var vajroPlugin;(()=>{"use strict";var t={d:(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{getBuyXGetY:()=>l});var r=function(){return r=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var u in e=arguments[r])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},r.apply(this,arguments)},n=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},u=function(t,e,r){var n=[];return"include"===r?Object.keys(t).forEach((function(r){e[r]&&n.push(t[r])})):"exclude"===r&&Object.keys(t).forEach((function(r){e[r]||n.push(t[r])})),n},o=function(t){var e=t.lineItems,r=t.includeProducts,o=t.excludeProducts,i=n(r),c=n(o),a=0!==Object.keys(i).length?u(e,i,"include"):[],f=0!==Object.keys(c).length?u(e,c,"exclude"):[],l=a.length?a:f,g=n(l);return 0!==l.length?g:e},i=function(){return i=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var u in e=arguments[r])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},i.apply(this,arguments)},c=function(t){var e=t.getOfferConfig,r=e.buyProducts,n=e.buyProductQuantity,u=function(t,e,r){for(var n=!1,u=0,o=t;u<o.length;u++){var i=o[u],c=(r[i]||{}).quantity;if(!(r[i]&&e<=c)){n=!1;break}n=!0}return{offerFlag:n}}(r.map((function(t){return t.variantId})),n,o(t)),c=function(t,e){var r=t.offerFlag,n=e.getOfferType,u=e.getOfferConfig,o=u.getProducts,c=u.getProductQuantity,a=0!==o.length?o.length:1,f=u.discount;return f="amount"===n?f/a:f,r?o.map((function(t){var e=t.unitPrice,r=0;return"product"!==n&&("percentage"===n&&f>=100&&(f=100),r="percentage"===n?c*e-c*e*(f/100):c*e-f),i(i({},t),{quantity:c,unitPrice:r})})):[]}(u,t);return c},a=function(){return a=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var u in e=arguments[r])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},a.apply(this,arguments)},f=function(t){var e=function(t,e){var r=t.offerFlag,n=t.total,u=e.getOfferType,o=e.getOfferConfig,i=o.threshold,c=o.getProducts,f=o.getProductQuantity,l=0!==c.length?c.length:1,g=o.discount;return g="amount"===u?g/l:g,r&&i<=n?c.map((function(t){var e=t.unitPrice,r=0;return"product"!==u&&("percentage"===u&&g>=100&&(g=100),r="percentage"===u?f*e-f*e*(g/100):f*e-g),a(a({},t),{quantity:f,unitPrice:r})})):[]}(function(t,e){for(var r=!1,n=0,u=0,o=t;u<o.length;u++){var i=e[o[u]]||{},c=i.quantity,a=i.unitPrice;if(!c||!a){r=!1;break}n+=c*a,r=!0}return{offerFlag:r,total:n}}(t.getOfferConfig.buyProducts.map((function(t){return t.variantId})),o(t)),t);return e},l=function(t,e){var u,o,i,a=t.cartLineItems,l=(void 0===a?{}:a).lineItems,g=(u=e,i=function(t){return t.filter((function(t){return"READONLY"===t.lineItemType}))}(o=void 0===l?[]:l)||[],o=function(t,e){var r=t.map((function(t){return t.variantId}));return e=n(e),r.forEach((function(t){var r=e[t]||{},n=r.lineItemType;r.variantId===t&&"READONLY"===n&&delete e[t]})),e}(u.getOfferConfig.getProducts,o),r(r({},u),{lineItems:o,getRemovedProductList:i})),d=function(t){switch(t.buyOfferType){case"threshold":return function(t){var e=t.getRemovedProductList;return{getSplitDiscount:f(t),getRemovedProductList:e}}(t);case"collection":break;case"product":default:return{};case"quantity":return function(t){var e=t.getRemovedProductList;return{getSplitDiscount:c(t),getRemovedProductList:e}}(t)}return{}}(g);return JSON.stringify(d)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map