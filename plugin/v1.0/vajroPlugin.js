var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{flow:()=>l});var n=function(){return n=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var u in e=arguments[n])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},n.apply(this,arguments)},r=function(t){var e=t.cartType,n=t.cartValue,r=t.lineItems,u=function(t){var e=t.offerCategory,n=t.customBuyCollection,r=t.customGetCollection,u=t.customBuyProduct,o=t.customGetProduct,i=t.getProductCount,c=u.length>0||n.length>0?u.concat(n):[],a=0===i&&(o.length>0||r.length>0)?o.concat(r):[];return"automaticOffers"!==e?c.concat(a):c}(t);return u.reduce((function(t,n){return t+r.reduce((function(t,r){var u=r||{},o=u.collectionId,i=u.variantId,c=u.quantity,a=u.unitPrice;return i!==n&&o!==n||(t+="amount"===e?c*a:c),t}),0)}),0)>=n},u=function(t){var e=t.cartType,n=t.cartValue,r=t.lineItems,u=t.customGetProduct,o=void 0===u?[]:u;return(r||[]).filter((function(t){return!o.some((function(e){return e===t.variantId}))})).reduce((function(t,n){var r=n.quantity,u=n.unitPrice;return t+("amount"===e?r*u:r)}),0)>=n},o=function(t){var e=t.customGetProduct,n=t.customGetCollection,r=t.lineItems;return e.concat(n).some((function(t){return r.some((function(e){var n=e||{},r=n.collectionId;return n.variantId===t||r===t}))}))},i=function(t,e,n,r,u,o){var i=e||{},c=i.unitPrice,a=i.quantity,d=i.variantId,l=i.productId,f=i.lineItemHandle;if("percentage"===n)return{productId:l,variantId:d,quantity:a,unitPrice:(s=a*c-a*c*(u/100))/a,lineItemHandle:f,discountType:t,discountValue:"You got ".concat(u,"% off"),customLineItemType:"REGULAR"};if("amount"===n){var s,v=a*c/o*100/100*r;return{productId:l,variantId:d,quantity:a,unitPrice:0!=(s=a*c>=v?a*c-v:0)?s/a:0,lineItemHandle:f,discountType:t,discountValue:"You save {{currency}}".concat(v.toFixed(3)),customLineItemType:"REGULAR"}}return{}},c=function(t){var e=t.offerCategory,n=t.getProducts,r=t.customGetProduct,u=t.lineItems,o=t.getProductCount,i=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})}(u),c=r.filter((function(t){return i[t]})).sort((function(t,e){return i[t].unitPrice-i[e].unitPrice})),d=[],l=o;return c.forEach((function(t,r){var u,o;if(l){var c=!!i[t],f=i[t]||{},s=f.productId,v=f.variantId,m=f.quantity,y=f.unitPrice,I=f.lineItemHandle,g=l>m?m:l;(l-=m)<0&&(l=0);var P=a({productId:s,variantId:v,lineItemHandle:I,quantity:m,getProductCount:g,unitPrice:y,offerCategory:e,customGetProductId:null===(u=n[r])||void 0===u?void 0:u.productId,customGetVariantId:null===(o=n[r])||void 0===o?void 0:o.variantId,isGetProductIdInLineitem:c});d.push(P)}})),d},a=function(t){var e=t.offerCategory,n=t.getProductCount,r=t.customGetProductId,u=t.customGetVariantId,o=t.isGetProductIdInLineitem,i=t.productId,c=t.variantId,a=t.lineItemHandle,d=t.quantity,l=void 0===d?n:d,f=t.unitPrice,s=o&&n>l?n:l;return{productId:i||r,variantId:c||u,quantity:s,freeQuantity:n,unitPrice:s===n?0:f,lineItemHandle:a,discountType:s>=n?e:"",discountValue:s>=n?"Buy ".concat(s,", Get ").concat(n," Free and ").concat(s-n," For the Same Price."):"",customLineItemType:"REGULAR",isGetProductIdInLineitem:o}},d=function(t){switch(t.offerCategory){case"percentageDiscount":case"flatDiscount":return function(t){var e=t.getRemovedProductList,n=t.buyOfferType,u=t.customGetProduct,c=void 0===u?[]:u,a=t.customGetCollection,d=void 0===a?[]:a,l=t.displayText,f=void 0===l?"":l,s="overAll"!==n&&r(t),v="overAll"===n||!(c.length>0||d.length>0)||function(t){var e=t.customBuyProduct,n=t.customBuyCollection,r=t.lineItems;return e.concat(n).some((function(t){return r.some((function(e){var n=e||{},r=n.collectionId;return n.variantId===t||r===t}))}))}(t),m="overAll"===n||!(c.length>0||d.length>0)||o(t),y="overAll"!==n||!(c.length>0||d.length>0)||o(t),I=!("overAll"!==n||!y)&&function(t){var e=t.cartType,n=t.cartValue;return t.lineItems.reduce((function(t,n){var r=n.quantity,u=n.unitPrice;return t+("amount"===e?r*u:r)}),0)>=n}(t),g=(I||s)&&v&&m?function(t){var e=t.offerCategory,n=t.buyOfferType,r=t.discountType,u=t.discountValue,o=t.lineItems,c=t.customGetProduct,a=t.customGetCollection,d=function(t){var e=t.customBuyCollection,n=t.customGetCollection,r=t.customBuyProduct,u=t.customGetProduct,o=u.length>0?u:r,i=n.length>0?n:e,c=r.length>0&&n.length>0?n:[],a=u.length>0&&e.length>0?u:[];return c.length>0||a.length>0?c.concat(a):o.concat(i)}(t),l="overAll"===n&&c.length<=0&&a.length<=0?o:d,f="overAll"===n?function(t){return t.reduce((function(t,e){var n=e.unitPrice,r=void 0===n?0:n,u=e.quantity;return t+r*(void 0===u?0:u)}),0)}(l):function(t){var e=t.lineItems;return t.sanitizedLineItem.reduce((function(t,n){return t+e.reduce((function(t,e){var r=e||{},u=r.collectionId,o=r.variantId,i=r.quantity,c=r.unitPrice;return o!==n&&u!==n||(t+=i*c),t}),0)}),0)}({sanitizedLineItem:l,lineItems:o}),s="percentage"===r&&u>=100?100:u,v=[];return l.forEach((function(t){"string"==typeof t&&o.forEach((function(n){var o=n||{},c=o.collectionId;if(o.variantId===t||c===t){var a=i(e,n,r,u,s,f);v.push(a)}}));var n=i(e,t,r,u,s,f);v.push(n)})),v}(t):[];return{output:g,getRemovedProductList:e,displayText:g.length>0&&f.length>0?f:""}}(t);case"buyXGetY":return function(t){var e=t.getRemovedProductList,n=t.buyOfferType,o=t.displayText,i=void 0===o?"":o,a="overAll"!==n?r(t):u(t),d=function(t){var e=t.customGetProduct,n=t.getProductCount,r=t.lineItems;return e.reduce((function(t,e){var n=r.reduce((function(t,n){var r=n||{},u=r.collectionId,o=r.variantId,i=r.quantity;return o!==e&&u!==e||(t+=i),t}),0);return t+n}),0)>=n}(t),l=a&&d?c(t):[];return{output:l,getRemovedProductList:e,displayText:l.length>0&&i.length>0?i:""}}(t);case"automaticOffers":return function(t){var e=t.getRemovedProductList,n=t.buyOfferType,o=t.displayText,i=void 0===o?"":o,a=("overAll"!==n?r(t):u(t))?c(t):[];return{output:a,getRemovedProductList:e,displayText:a.length>0&&i.length>0?i:""}}(t);default:return{}}},l=function(t,e){var r=t.cartLineItems.lineItems;if(0===r.length)return JSON.stringify({output:[],getRemovedProductList:[],displayText:""});var u=function(t){var e=t.buyCollections,n=void 0===e?[]:e,r=t.getCollections,u=void 0===r?[]:r,o=t.buyProducts,i=void 0===o?[]:o,c=t.getProducts,a=void 0===c?[]:c,d=t.getProductCount,l=i.map((function(t){return t.variantId}));t.customBuyProduct=l;var f=a.map((function(t){return t.variantId}));t.customGetProduct=f;var s=n.map((function(t){return t.collectionId}));t.customBuyCollection=s;var v=u.map((function(t){return t.collectionId}));return t.customGetCollection=v,d||(t.getProductCount=0),t}(e),o=function(t,e){var r=function(t,e,n){return t.filter((function(t){var r=t.variantId,u=t.unitPrice,o=t.originalUnitPrice;return t.unitPrice=o,"free"===e?n.find((function(t){return t===r})):u!==o}))}(e,t.discountType,t.customGetProduct)||[],u=function(t){return t.map((function(t){var e=t.originalUnitPrice;return t.unitPrice=e,t}))}(e);return n(n({},t),{lineItems:u,getRemovedProductList:r})}(u,r),i=d(o);return JSON.stringify(i)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map