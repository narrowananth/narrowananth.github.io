var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{flow:()=>l,showMessage:()=>f});var n=function(){return n=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var u in e=arguments[n])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},n.apply(this,arguments)},r=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},u=function(t){var e=t.cartType,n=t.cartValue,r=t.lineItems,u=function(t){var e=t.offerCategory,n=t.customBuyCollection,r=t.customGetCollection,u=t.customBuyProduct,o=t.customGetProduct,i=t.getProductCount,c=u.length>0||n.length>0?u.concat(n):[],a=0===i&&(o.length>0||r.length>0)?o.concat(r):[];return"automaticOffers"!==e?c.concat(a):c}(t),o=0;return u.forEach((function(t){if(t){var n=r.reduce((function(n,r){var u=r||{},o=u.collectionId,i=u.variantId,c=u.quantity,a=u.unitPrice;return i!==t&&o!==t||(n+="amount"===e?c*a:c),n}),0);o+=n}})),o>=n},o=function(t){var e=t.customGetProduct,n=t.getProductCount,r=t.lineItems,u=0;return e.forEach((function(t){if(t){var e=r.reduce((function(e,n){var r=n||{},u=r.collectionId,o=r.variantId,i=r.quantity;return o!==t&&u!==t||(e+=i),e}),0);u+=e}})),u>=n},i=function(t,e,n,r,u,o,i){var c=e||{},a=c.unitPrice,d=c.quantity,f=c.variantId,l=c.productId,s=c.lineItemHandle;if("percentage"===n)return{productId:l,variantId:f,quantity:d,unitPrice:(d*a-d*a*(u/100))/d,lineItemHandle:s,discountType:t,discountValue:"You got ".concat(u,"% off"),customLineItemType:"READONLY"};if("amount"===n){var v=d*a/o*100/100*r;return{productId:l,variantId:f,quantity:d,unitPrice:(d*a-v)/d,lineItemHandle:s,discountType:t,discountValue:"You save {{currency}}".concat(v.toFixed(3)),customLineItemType:"READONLY"}}if("free"===n){var m=[],y={productId:l,variantId:f,quantity:i,unitPrice:0,lineItemHandle:s,discountType:t,discountValue:"Free",customLineItemType:"READONLY"};if(m.push(y),d>=i){var p={productId:l,variantId:f,quantity:d-i,unitPrice:a,lineItemHandle:s,customLineItemType:"REGULAR"};m.push(p)}return m}return{}},c=function(t){var e=t.offerCategory,n=t.customGetProduct,u=t.getProducts,o=t.lineItems,i=t.getProductCount,c=r("automaticOffers"===e?u:o),a=[];return n.forEach((function(t){if(t){var n=c[t]||{},r=n.productId,u=n.variantId,o=n.quantity,d=n.unitPrice,f=n.lineItemHandle,l={productId:r,variantId:u,quantity:i,unitPrice:0,lineItemHandle:f,discountType:e,discountValue:"Free",customLineItemType:"READONLY"};if(a.push(l),o>=i){var s={productId:r,variantId:u,quantity:o-i,unitPrice:d,lineItemHandle:f,customLineItemType:"REGULAR"};a.push(s)}}})),a},a=function(t){var e=t.offerCategory,n=t.buyOfferType,r=t.discountType,u=t.discountValue,o=t.getProductCount,c=t.lineItems,a=function(t){var e=t.customBuyCollection,n=t.customGetCollection,r=t.customBuyProduct,u=t.customGetProduct,o=u.length>0?u:r,i=n.length>0?n:e;return o.concat(i)}(t),d="overAll"===n?c:a,f="overAll"===n?function(t){return t.reduce((function(t,e){return t+e.unitPrice*e.quantity}),0)}(d):function(t,e){var n=0;return t.forEach((function(t){if(t){var r=e.reduce((function(e,n){var r=n||{},u=r.collectionId,o=r.variantId,i=r.quantity,c=r.unitPrice;return o!==t&&u!==t||(e+=i*c),e}),0);n+=r}})),n}(d,c),l="percentage"===r&&u>=100?100:u,s=[];return d.forEach((function(t){if(t&&"string"==typeof t)return c.forEach((function(n){var c=n||{},a=c.collectionId;if(c.variantId===t||a===t){var d=i(e,n,r,u,l,f,o);"free"===r?d.forEach((function(t){return s.push(t)})):s.push(d)}}));var n=i(e,t,r,u,l,f,o);"free"===r?n.forEach((function(t){return s.push(t)})):s.push(n)})),s},d=function(t){switch(t.offerCategory){case"percentageDiscount":case"flatDiscount":case"volumeDiscount":return function(t){return function(t){var e=t.getRemovedProductList,n=t.buyOfferType,r="overAll"!==n&&u(t),o="overAll"===n&&function(t){var e=t.cartType,n=t.cartValue;return t.lineItems.reduce((function(t,n){var r=n.quantity,u=n.unitPrice;return t+("amount"===e?r*u:r)}),0)>=n}(t);return{output:o||r?a(t):[],getRemovedProductList:e}}(t)}(t);case"buyXGetY":return function(t){var e=function(t){var e=t.getRemovedProductList,n=u(t),r=o(t);return{output:n&&r?c(t):[],getRemovedProductList:e}}(t);return e}(t);case"buyMoreSaveMore":return function(t){var e=function(t){var e=t.getRemovedProductList,n=t.getProductCount,r=u(t),i=0===n||o(t);return{output:r&&i?a(t):[],getRemovedProductList:e}}(t);return e}(t);case"automaticOffers":return function(t){var e=function(t){var e=t.getRemovedProductList;return{output:u(t)?c(t):[],getRemovedProductList:e}}(t);return e}(t);default:return{}}},f=function(t){return t},l=function(t,e){var u=t.cartLineItems,o=(void 0===u?{}:u).lineItems,i=void 0===o?[]:o;if(0===i.length)return JSON.stringify({output:[],getRemovedProductList:[]});var c=function(t){var e=t.buyCollections,n=t.getCollections,r=t.buyProducts,u=t.getProducts,o=t.getProductCount,i=r.map((function(t){return t.variantId}));t.customBuyProduct=i;var c=u.map((function(t){return t.variantId}));t.customGetProduct=c;var a=e.map((function(t){return t.collectionId}));t.customBuyCollection=a;var d=n.map((function(t){return t.collectionId}));return t.customGetCollection=d,o||(t.getProductCount=0),t}(e),a=function(t,e){var u=function(t){return t.filter((function(t){var e=t.lineItemType,n=t.originalUnitPrice;return t.unitPrice=n,"READONLY"===e}))}(e)||[];return e=function(t,e,n,u){return u=r(u),e.forEach((function(e){var n=u[e]||{},r=n.lineItemType,o=n.variantId,i=n.originalUnitPrice;"automaticOffers"===t&&o===e&&"READONLY"===r?delete u[e]:o===e&&"READONLY"===r&&(u[e].unitPrice=i)})),n.forEach((function(e){var n=u[e]||{},r=n.lineItemType,o=n.variantId,i=n.originalUnitPrice;"automaticOffers"===t&&o===e&&"READONLY"===r?delete u[e]:o===e&&"READONLY"===r&&(u[e].unitPrice=i)})),u=Object.values(u)}(t.offerCategory,t.customGetProduct,t.customBuyProduct,e),n(n({},t),{lineItems:e,getRemovedProductList:u})}(c,i),f=d(a);return JSON.stringify(f)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map