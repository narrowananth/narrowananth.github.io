var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{flow:()=>s,showMessage:()=>l});var n=function(){return n=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var u in e=arguments[n])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},n.apply(this,arguments)},r=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},u=function(t){var e=t.cartType,n=t.cartValue,r=t.lineItems,u=function(t){var e=t.offerCategory,n=t.customBuyCollection,r=t.customGetCollection,u=t.customBuyProduct,o=t.customGetProduct,c=t.getProductCount,i=u.length>0||n.length>0?u.concat(n):[],a=0===c&&(o.length>0||r.length>0)?o.concat(r):[];return"automaticOffers"!==e?i.concat(a):i}(t),o=0;return u.forEach((function(t){if(t){var n=r.reduce((function(n,r){var u=r||{},o=u.collectionId,c=u.variantId,i=u.quantity,a=u.unitPrice;return c!==t&&o!==t||(n+="amount"===e?i*a:i),n}),0);o+=n}})),o>=n},o=function(t){var e=t.customGetProduct,n=t.getProductCount,r=t.lineItems,u=0;return e.forEach((function(t){if(t){var e=r.reduce((function(e,n){var r=n||{},u=r.collectionId,o=r.variantId,c=r.quantity;return o!==t&&u!==t||(e+=c),e}),0);u+=e}})),u>=n},c=function(t,e,n,r,u,o,c){var i=e||{},a=i.unitPrice,f=i.quantity,l=i.variantId,s=i.productId,v=i.lineItemHandle;if("percentage"===n)return{productId:s,variantId:l,quantity:f,unitPrice:(m=f*a-f*a*(u/100))/f,lineItemHandle:v,discountType:t,discountValue:"You got ".concat(u,"% off"),customLineItemType:"READONLY"};if("amount"===n){var m,y=f*a/o*100/100*r;return{productId:s,variantId:l,quantity:f,unitPrice:0!=(m=f*a>=y?f*a-y:0)?m/f:0,lineItemHandle:v,discountType:t,discountValue:"You save {{currency}}".concat(y.toFixed(3)),customLineItemType:"READONLY"}}return"free"===n?d({productId:s,variantId:l,lineItemHandle:v,quantity:f,getProductCount:c,unitPrice:a,offerCategory:t}):{}},i=function(t){var e=t.offerCategory,n=t.customGetProduct,u=t.lineItems,o=t.getProductCount,c=r(u),i=[];return n.forEach((function(t){if(t){var n=c[t]||{},r=n.productId,u=n.variantId,a=n.quantity,f=n.unitPrice,l=n.lineItemHandle,s=d({productId:r,variantId:u,lineItemHandle:l,quantity:a,getProductCount:o,unitPrice:f,offerCategory:e});i.push(s)}})),i},a=function(t){var e=t.offerCategory,n=t.buyOfferType,r=t.discountType,u=t.discountValue,o=t.getProductCount,i=t.lineItems,a=function(t){var e=t.customBuyCollection,n=t.customGetCollection,r=t.customBuyProduct,u=t.customGetProduct,o=u.length>0?u:r,c=n.length>0?n:e;return o.concat(c)}(t),d="overAll"===n?i:a,f="overAll"===n?function(t){return t.reduce((function(t,e){return t+e.unitPrice*e.quantity}),0)}(d):function(t,e){var n=0;return t.forEach((function(t){if(t){var r=e.reduce((function(e,n){var r=n||{},u=r.collectionId,o=r.variantId,c=r.quantity,i=r.unitPrice;return o!==t&&u!==t||(e+=c*i),e}),0);n+=r}})),n}(d,i),l="percentage"===r&&u>=100?100:u,s=[];return d.forEach((function(t){if(t&&"string"==typeof t)return i.forEach((function(n){var i=n||{},a=i.collectionId;if(i.variantId===t||a===t){var d=c(e,n,r,u,l,f,o);s.push(d)}}));var n=c(e,t,r,u,l,f,o);s.push(n)})),s},d=function(t){var e=t.productId,n=t.variantId,r=t.lineItemHandle,u=t.quantity,o=t.getProductCount,c=t.unitPrice,i=t.offerCategory;return{productId:e,variantId:n,quantity:u,freeQuantity:o,unitPrice:u===o?0:c,lineItemHandle:r,discountType:u>=o?i:void 0,discountValue:u>=o?"Buy ".concat(u,", get ").concat(o," Free and ").concat(u-o," for the same price."):"Free",customLineItemType:u>=o?"REGULAR":"READONLY"}},f=function(t){switch(t.offerCategory){case"percentageDiscount":case"flatDiscount":case"volumeDiscount":return function(t){return function(t){var e=t.getRemovedProductList,n=t.buyOfferType,r=t.customGetProduct,o=t.customGetCollection,c="overAll"!==n&&u(t),i="overAll"===n&&function(t){var e=t.cartType,n=t.cartValue;return t.lineItems.reduce((function(t,n){var r=n.quantity,u=n.unitPrice;return t+("amount"===e?r*u:r)}),0)>=n}(t),d=!(r.length>0||o.length>0)||function(t){var e=t.customBuyProduct,n=t.customBuyCollection,r=t.lineItems;return e.concat(n).some((function(t){return r.some((function(e){var n=e||{},r=n.collectionId;return n.variantId===t||r===t}))}))}(t);return{output:(i||c)&&d?a(t):[],getRemovedProductList:e}}(t)}(t);case"buyXGetY":return function(t){var e=function(t){var e=t.getRemovedProductList,n=u(t),r=o(t);return{output:n&&r?i(t):[],getRemovedProductList:e}}(t);return e}(t);case"buyMoreSaveMore":return function(t){var e=function(t){var e=t.getRemovedProductList,n=t.getProductCount,r=u(t),c=0===n||o(t);return{output:r&&c?a(t):[],getRemovedProductList:e}}(t);return e}(t);case"automaticOffers":return function(t){var e=function(t){var e=t.getRemovedProductList;return{output:u(t)?i(t):[],getRemovedProductList:e}}(t);return e}(t);default:return{}}},l=function(t){return t},s=function(t,e){var u=t.cartLineItems,o=(void 0===u?{}:u).lineItems,c=void 0===o?[]:o;if(0===c.length)return JSON.stringify({output:[],getRemovedProductList:[]});var i=function(t){var e=t.buyCollections,n=t.getCollections,r=t.buyProducts,u=t.getProducts,o=t.getProductCount,c=r.map((function(t){return t.variantId}));t.customBuyProduct=c;var i=u.map((function(t){return t.variantId}));t.customGetProduct=i;var a=e.map((function(t){return t.collectionId}));t.customBuyCollection=a;var d=n.map((function(t){return t.collectionId}));return t.customGetCollection=d,o||(t.getProductCount=0),t}(e),a=function(t,e){var u=t.offerCategory,o=t.discountType,c=t.customGetProduct,i=t.customBuyProduct,a=function(t,e,n){return t.filter((function(t){var r=t.variantId,u=t.lineItemType,o=t.originalUnitPrice;return t.unitPrice=o,"free"===e?n.find((function(t){return t===r})):"READONLY"===u}))}(e,o,c)||[];return e=function(t,e,n,u){return u=r(u),e.forEach((function(e){var n=u[e]||{},r=n.lineItemType,o=n.variantId,c=n.originalUnitPrice;"automaticOffers"===t&&o===e&&"READONLY"===r?delete u[e]:o===e&&"READONLY"===r&&(u[e].unitPrice=c)})),n.forEach((function(e){var n=u[e]||{},r=n.lineItemType,o=n.variantId,c=n.originalUnitPrice;"automaticOffers"===t&&o===e&&"READONLY"===r?delete u[e]:o===e&&"READONLY"===r&&(u[e].unitPrice=c)})),u=Object.values(u)}(u,c,i,e),n(n({},t),{lineItems:e,getRemovedProductList:a})}(i,c),d=f(a);return JSON.stringify(d)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map