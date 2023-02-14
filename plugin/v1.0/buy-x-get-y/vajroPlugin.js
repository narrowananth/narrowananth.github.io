var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{getBuyXGetY:()=>c});var n=function(){return n=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var u in e=arguments[n])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},n.apply(this,arguments)},r=function(t){return t.reduce((function(t,e){var r,u=e.variantId;return n(n({},t),((r={})[u]=e,r))}),{})},u=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},i=function(t,e,n){var r=[];return"include"===n?Object.keys(t).forEach((function(n){e[n]&&r.push(t[n])})):"exclude"===n&&Object.keys(t).forEach((function(n){e[n]||r.push(t[n])})),r},o=function(t){var e=t.lineItems,n=t.includeProducts,u=t.excludeProducts,o=r(n),c=r(u),a=0!==Object.keys(o).length?i(e,o,"include"):[],f=0!==Object.keys(c).length?i(e,c,"exclude"):[];t.includedProductLineItem=0!==a.length?a:void 0,t.excludedProductLineItem=0===a.length&&0!==f.length?f:void 0;var d=a.length?a:f;return 0!==d.length?d:t.lineItems},c=function(t,e){var r=t.cartLineItems,i=(void 0===r?{}:r).lineItems,c=function(t,e){var r=function(t){return(t=t.filter((function(t){return"READONLY"===t.lineItemType})))||[]}(e);return e=function(t,e){var n=t.map((function(t){return t.variantId}));return e=u(e),n.forEach((function(t){e[t]&&delete e[t]})),e}(t.getOfferConfig.getProducts,e),n(n({},t),{lineItems:e,getRemovedProductList:r})}(e,void 0===i?[]:i),a=function(t){switch(t.buyOfferType){case"threshold":return function(t){var e=t.getOfferConfig,n=t.getRemovedProductList,r=function(t){var e=o(t),n=0;return e.forEach((function(t){var e=t.unitPrice,r=t.quantity;n+=e*r})),n}(t),u=function(t,e){var n=(t=t.sort((function(t,e){return t.threshold-e.threshold}))).reduce((function(t,n){return n.threshold<=Math.round(e)?t<n?t:n:t}),0);return 0!==n?n:[]}(e,r),i=0!==u.length?function(t,e,n){var r=t.includedProductLineItem,u=t.excludedProductLineItem,i=t.lineItems,o=t.getOfferType,c=e.discount,a=e.getProducts,f=e.getProductQuantity,d=r||u||i;return"percentage"===o?(c>=100&&(c=100),d.forEach((function(t){return t.unitPrice=t.unitPrice-t.unitPrice*(c/100)}))):"amount"===o?c>=n?d.forEach((function(t){return t.unitPrice=0*t.unitPrice})):d.forEach((function(t){return t.unitPrice=t.unitPrice*(1-c/n*100/100)})):"product"===o&&(d=a.map((function(t){return t.quantity=f,t}))),d}(t,u,r):[];return{getSplitDiscount:i,getRemovedProductList:n}}(t);case"collection":break;case"product":default:return{};case"quantity":return function(t){var e=t.getRemovedProductList,n=function(t){for(var e=[],n=t.getOfferType,r=t.getOfferConfig,u=r.buyProducts,i=r.buyProductQuantity,c=r.getProducts,a=r.getProductQuantity,f=r.discount,d=u.map((function(t){return t.variantId})),l=o(t),s=!1,g=0,v=d;g<v.length;g++){var P=v[g],y=(l[P]||{}).quantity;if(!(l[P]&&i<=y)){s=!1;break}s=!0}return s&&(e=c.map((function(t){var e=t.unitPrice;if(t.quantity=a,"percentage"===n){f>=100&&(f=100);var r=a*e;t.unitPrice=r-r*(f/100)}return t}))),e}(t);return{getSplitDiscount:n,getRemovedProductList:e}}(t)}return{}}(c);return JSON.stringify(a)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map