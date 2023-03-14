var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{flow:()=>l,showMessage:()=>f});var n=function(){return n=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var u in e=arguments[n])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},n.apply(this,arguments)},r=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},u=function(t){var e=t.cartType,n=t.cartValue,r=t.lineItems,u=function(t){var e=t.offerCategory,n=t.buyCollections,r=t.getCollections,u=t.buyProducts,o=t.getProducts,i=t.getProductCount,c=u.length>0||n.length>0?u.concat(n):[],a=0===i&&(o.length>0||r.length>0)?o.concat(r):[];return"automaticOffers"!==e?c.concat(a):c}(t);return u.every((function(t){return!!t&&r.reduce((function(n,r){var u=r||{},o=u.collectionId,i=u.variantId,c=u.quantity,a=u.unitPrice;return i!==t&&o!==t||(n+="amount"===e?c*a:c),n}),0)>=n}))},o=function(t){var e=t.getProducts,n=t.getProductCount,r=t.lineItems;return e.every((function(t){return!!t&&r.reduce((function(e,n){var r=n||{},u=r.collectionId,o=r.variantId,i=r.quantity;return o!==t&&u!==t||(e+=i),e}),0)>=n}))},i=function(t,e,n,r,u,o){var i=e||{},c=i.unitPrice,a=i.quantity,d=i.variantId,f=i.productId,l=i.lineItemHandle;if("percentage"===n)return{productId:f,variantId:d,quantity:a,unitPrice:(a*c-a*c*(u/100))/a,lineItemHandle:l,discountType:t,discountValue:"You got ".concat(u,"% off")};if("amount"===n){var v=a*c/o*100/100*r;return{productId:f,variantId:d,quantity:a,unitPrice:(a*c-v)/a,lineItemHandle:l,discountType:t,discountValue:"You save {{currency}}".concat(v.toFixed(3))}}return"free"===n?{productId:f,variantId:d,quantity:a,unitPrice:0,lineItemHandle:l,discountType:t,discountValue:"Free"}:{}},c=function(t){var e=t.offerCategory,n=t.getProducts,u=t.lineItems,o=t.getProductCount,i=r(u);return n.map((function(t){if(t){var n=i[t]||{},r=n.productId,u=n.variantId,c=n.quantity,a=n.lineItemHandle;return{productId:r,variantId:u,quantity:"automaticOffers"===e?o:c,unitPrice:0,lineItemHandle:a,discountType:e,discountValue:"Free"}}return{}}))},a=function(t){var e=t.offerCategory,n=t.buyOfferType,r=t.discountType,u=t.discountValue,o=t.lineItems,c=function(t){var e=t.buyCollections,n=t.getCollections,r=t.buyProducts,u=t.getProducts,o=u.length>0?u:r,i=n.length>0?n:e;return o.concat(i)}(t),a="overAll"===n?o:c,d="overAll"===n?function(t){return t.reduce((function(t,e){return t+e.unitPrice*e.quantity}),0)}(a):function(t,e){var n=0;return t.forEach((function(t){if(t){var r=e.reduce((function(e,n){var r=n||{},u=r.collectionId,o=r.variantId,i=r.quantity,c=r.unitPrice;return o!==t&&u!==t||(e+=i*c),e}),0);n+=r}})),n}(a,o),f="percentage"===r&&u>=100?100:u,l=[];return a.forEach((function(t){if(t&&"string"==typeof t)return o.forEach((function(n){var o=n||{},c=o.collectionId;if(o.variantId===t||c===t){var a=i(e,n,r,u,f,d);l.push(a)}}));var n=i(e,t,r,u,f,d);l.push(n)})),l},d=function(t){switch(t.offerCategory){case"percentageDiscount":case"flatDiscount":case"volumeDiscount":return function(t){return function(t){var e=t.getRemovedProductList,n=t.buyOfferType,r="overAll"!==n&&u(t),o="overAll"===n&&function(t){var e=t.cartType,n=t.cartValue;return t.lineItems.every((function(t){var r=t.quantity,u=t.unitPrice;return("amount"===e?r*u:r)>=n}))}(t);return{output:o||r?a(t):[],getRemovedProductList:e}}(t)}(t);case"buyXGetY":return function(t){var e=function(t){var e=t.getRemovedProductList,n=u(t),r=o(t);return{output:n&&r?c(t):[],getRemovedProductList:e}}(t);return e}(t);case"buyMoreSaveMore":return function(t){var e=function(t){var e=t.getRemovedProductList,n=t.getProductCount,r=u(t),i=0===n||o(t);return{output:r&&i?a(t):[],getRemovedProductList:e}}(t);return e}(t);case"automaticOffers":return function(t){var e=function(t){var e=t.getRemovedProductList;return{output:u(t)?c(t):[],getRemovedProductList:e}}(t);return e}(t);default:return{}}},f=function(t){return t},l=function(t,e){var u=t.cartLineItems,o=(void 0===u?{}:u).lineItems,i=void 0===o?[]:o;if(0===i.length)return JSON.stringify({output:[],getRemovedProductList:[]});var c=function(t){var e=t.buyCollections,n=t.getCollections,r=t.buyProducts,u=t.getProducts,o=t.getProductCount;if(r.length>0){var i=r.map((function(t){return t.variantId}));t.buyProducts=i}if(u.length>0){var c=u.map((function(t){return t.variantId}));t.getProducts=c}if(e.length>0){var a=e.map((function(t){return t.collectionId}));t.buyCollections=a}if(n.length>0){var d=n.map((function(t){return t.collectionId}));t.getCollections=d}return o||(t.getProductCount=0),t}(e),a=function(t,e){var u=function(t){return t.filter((function(t){var e=t.lineItemType,n=t.originalUnitPrice;return t.unitPrice=n,"READONLY"===e}))}(e)||[];return e=function(t,e,n,u){return u=r(u),e.forEach((function(e){var n=u[e]||{},r=n.lineItemType,o=n.variantId,i=n.originalUnitPrice;"automaticOffers"===t&&o===e&&"READONLY"===r?delete u[e]:o===e&&"READONLY"===r&&(u[e].unitPrice=i)})),n.forEach((function(e){var n=u[e]||{},r=n.lineItemType,o=n.variantId,i=n.originalUnitPrice;"automaticOffers"===t&&o===e&&"READONLY"===r?delete u[e]:o===e&&"READONLY"===r&&(u[e].unitPrice=i)})),u=Object.values(u)}(t.offerCategory,t.getProducts,t.buyProducts,e),n(n({},t),{lineItems:e,getRemovedProductList:u})}(c,i),f=d(a);return JSON.stringify(f)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map