var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{flow:()=>f});var n=function(){return n=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},n.apply(this,arguments)},r=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},o=function(t){return t.reduce((function(t,e){return t+e.unitPrice*e.quantity}),0)},u=function(t,e,n){if("automaticOffers"!==n){var u=r(e);return t.reduce((function(t,e){var n=e.variantId,r=e.unitPrice,o=e.quantity,i=u[n]||{},c=i.unitPrice;return t+(c||0===c?c:r)*(i.quantity||o)}),0)}var i=o(t),c=function(t){return t.reduce((function(t,e){var n=e.customGetProductPrice,r=e.freeQuantity;return t+n*(e.quantity-r)}),0)}(e);return i+c},i=function(t){var e=t.cartType,n=t.cartValue,r=t.lineItems,o=function(t){var e=t.offerCategory,n=t.customBuyCollection,r=t.customGetCollection,o=t.customBuyProduct,u=t.customGetProduct,i=t.getProductCount,c=o.length>0||n.length>0?o.concat(n):[],a=0===i&&(u.length>0||r.length>0)?u.concat(r):[];return"automaticOffers"!==e?c.concat(a):c}(t);return o.reduce((function(t,n){return t+r.reduce((function(t,r){var o=r||{},u=o.collectionId,i=o.variantId,c=o.quantity,a=o.unitPrice;return i!==n&&u!==n||(t+="amount"===e?c*a:c),t}),0)}),0)>=n},c=function(t){var e=t.cartType,n=t.cartValue;return t.lineItems.reduce((function(t,n){var r=n.quantity,o=n.unitPrice;return t+("amount"===e?r*o:r)}),0)>=n},a=function(t){var e=t.customGetProduct,n=t.customGetCollection,r=t.lineItems;return e.concat(n).some((function(t){return r.some((function(e){var n=e||{},r=n.collectionId;return n.variantId===t||r===t}))}))},d=function(t,e,n,r,o,u){var i=e||{},c=i.unitPrice,a=i.quantity,d=i.variantId,l=i.productId,f=i.lineItemHandle;if("percentage"===n)return{productId:l,variantId:d,quantity:a,unitPrice:(s=a*c-a*c*(o/100))/a,lineItemHandle:f,discountType:t,discountValue:"You got ".concat(o,"% off"),customLineItemType:"REGULAR"};if("amount"===n){var s,v=a*c/u*100/100*r;return{productId:l,variantId:d,quantity:a,unitPrice:0!=(s=a*c>=v?a*c-v:0)?s/a:0,lineItemHandle:f,discountType:t,discountValue:"You save {{currency}}".concat(v.toFixed(3)),customLineItemType:"REGULAR"}}return{}},l=function(t){var e=t.offerCategory,n=t.getProductCount,r=t.customGetProductId,o=t.customGetVariantId,u=t.isGetProductIdInLineitem,i=t.productId,c=t.variantId,a=t.lineItemHandle,d=t.quantity,l=void 0===d?n:d,f=t.unitPrice,s=t.customGetProductPrice,v=u&&n>l?n:l;return{productId:i||r,variantId:c||o,quantity:v,freeQuantity:n,unitPrice:v===n?0:f,lineItemHandle:a,discountType:v>=n?e:"",discountValue:v>=n?"Buy ".concat(v,", Get ").concat(n," Free and ").concat(v-n," For the Same Price."):"",customLineItemType:"REGULAR",isGetProductIdInLineitem:u,customGetProductPrice:s}},f=function(t,e){var f=t.cartLineItems.lineItems,s=e.map((function(t){var e=function(t){var e=t.buyCollections,n=void 0===e?[]:e,r=t.getCollections,o=void 0===r?[]:r,u=t.buyProducts,i=void 0===u?[]:u,c=t.getProducts,a=void 0===c?[]:c,d=t.getProductCount,l=i.map((function(t){return t.variantId}));t.customBuyProduct=l;var f=a.map((function(t){return t.variantId}));t.customGetProduct=f;var s=n.map((function(t){return t.collectionId}));t.customBuyCollection=s;var v=o.map((function(t){return t.collectionId}));return t.customGetCollection=v,d||(t.getProductCount=0),t}(t),s=function(t,e){var r=function(t){return t.map((function(t){var e=t.originalUnitPrice;return t.unitPrice=e,t}))}(e)||[],o=function(t){return t.map((function(t){var e=t.originalUnitPrice;return t.unitPrice=e,t}))}(e);return n(n({getConfigSchema:t},t),{lineItems:o,getRemovedProductList:r})}(e,f);return function(t){switch(t.offerCategory){case"percentageDiscount":case"flatDiscount":return function(t){var e=t.getRemovedProductList,n=t.lineItems,r=t.buyOfferType,l=t.customGetProduct,f=t.customGetCollection,s=t.displayText,v=void 0===s?"":s,m=t.getConfigSchema,g=t.offerCategory,I="overAll"!==r&&i(t),P="overAll"===r||!(l.length>0||f.length>0)||function(t){var e=t.customBuyProduct,n=t.customBuyCollection,r=t.lineItems;return e.concat(n).some((function(t){return r.some((function(e){var n=e||{},r=n.collectionId;return n.variantId===t||r===t}))}))}(t),y="overAll"===r||!(l.length>0||f.length>0)||a(t),p="overAll"!==r||!(l.length>0||f.length>0)||a(t),h=("overAll"===r&&p&&c(t)||I)&&P&&y?function(t){var e=t.offerCategory,n=t.buyOfferType,r=t.discountType,u=t.discountValue,i=t.lineItems,c=t.customGetProduct,a=t.customGetCollection,l=function(t){var e=t.customBuyCollection,n=t.customGetCollection,r=t.customBuyProduct,o=t.customGetProduct,u=o.length>0?o:r,i=n.length>0?n:e,c=r.length>0&&n.length>0?n:[],a=o.length>0&&e.length>0?o:[];return c.length>0||a.length>0?c.concat(a):u.concat(i)}(t),f="overAll"===n&&c.length<=0&&a.length<=0?i:l,s="overAll"===n?o(f):function(t){var e=t.lineItems;return t.sanitizedLineItem.reduce((function(t,n){return t+e.reduce((function(t,e){var r=e||{},o=r.collectionId,u=r.variantId,i=r.quantity,c=r.unitPrice;return u!==n&&o!==n||(t+=i*c),t}),0)}),0)}({sanitizedLineItem:f,lineItems:i}),v="percentage"===r&&u>=100?100:u,m=[];return f.forEach((function(t){"string"==typeof t&&i.forEach((function(n){var o=n||{},i=o.collectionId;if(o.variantId===t||i===t){var c=d(e,n,r,u,v,s);m.push(c)}}));var n=d(e,t,r,u,v,s);m.push(n)})),m}(t):[],C=h.length>0&&v.length>0?v:"",G=h.length>0?u(n,h,g):0;return{offerApplied:h.length>0,output:h,getRemovedProductList:e,displayText:C,totalCartValue:G,schema:m}}(t);case"buyXGetY":return function(t){var e=t.getRemovedProductList,n=t.getConfigSchema,o=t.lineItems,a=t.buyOfferType,d=t.displayText,f=t.offerCategory,s="overAll"!==a?i(t):c(t),v=function(t){var e=t.customGetProduct,n=t.getProductCount,r=t.lineItems;return e.reduce((function(t,e){return t+r.reduce((function(t,n){var r=n||{},o=r.collectionId,u=r.variantId,i=r.quantity;return u!==e&&o!==e||(t+=i),t}),0)}),0)>=n}(t),m=s&&v?function(t){var e=t.offerCategory,n=t.getProducts,o=t.customGetProduct,u=t.lineItems,i=t.getProductCount,c=r(u),a=o.filter((function(t){return c[t]})).sort((function(t,e){return c[t].unitPrice-c[e].unitPrice})),d=[],f=i;return a.forEach((function(t,r){var o,u,i;if(f){var a=!!c[t],s=c[t]||{},v=s.productId,m=s.variantId,g=s.quantity,I=s.unitPrice,P=s.lineItemHandle,y=f>g?g:f;(f-=g)<0&&(f=0);var p=l({productId:v,variantId:m,lineItemHandle:P,quantity:g,getProductCount:y,unitPrice:I,offerCategory:e,customGetProductId:null===(o=n[r])||void 0===o?void 0:o.productId,customGetVariantId:null===(u=n[r])||void 0===u?void 0:u.variantId,customGetProductPrice:null===(i=n[r])||void 0===i?void 0:i.productPrice,isGetProductIdInLineitem:a});d.push(p)}})),d}(t):[],g=m.length>0&&d.length>0?d:"",I=m.length>0?u(o,m,f):0;return{offerApplied:m.length>0,output:m,getRemovedProductList:e,displayText:g,totalCartValue:I,schema:n}}(t);case"automaticOffers":return function(t){var e=t.getRemovedProductList,n=t.getConfigSchema,o=t.lineItems,a=t.buyOfferType,d=t.displayText,f=t.offerCategory,s=("overAll"!==a?i(t):c(t))?function(t){var e=t.offerCategory,n=t.getProducts,o=void 0===n?[]:n,u=t.customGetProduct,i=t.lineItems,c=t.getProductCount,a=r(i),d=[];return u.forEach((function(t,n){var r,u,i,f=!!a[t],s=a[t]||{},v=s.productId,m=s.variantId,g=s.quantity,I=s.unitPrice,P=s.lineItemHandle,y=l({productId:v,variantId:m,lineItemHandle:P,quantity:g,getProductCount:c,unitPrice:I,offerCategory:e,customGetProductId:null===(r=o[n])||void 0===r?void 0:r.productId,customGetVariantId:null===(u=o[n])||void 0===u?void 0:u.variantId,customGetProductPrice:null===(i=o[n])||void 0===i?void 0:i.productPrice,isGetProductIdInLineitem:f});d.push(y)})),d}(t):[],v=s.length>0&&d.length>0?d:"",m=s.length>0?u(o,s,f):0;return{offerApplied:s.length>0,output:s,getRemovedProductList:e,displayText:v,totalCartValue:m,schema:n}}(t);default:return{}}}(s)})),v=[],m=s.filter((function(t){var e=t.schema,n=t.totalCartValue,r=t.offerApplied,o=t.getRemovedProductList,u=e.offerCategory;return v.push({offerApplied:r,output:[],getRemovedProductList:o,displayText:"",totalCartValue:0,schema:{}}),"automaticOffers"===u&&r?n>0:r})).sort((function(t,e){return t.totalCartValue-e.totalCartValue})),g=m.length>0?m[0]:v[0];return JSON.stringify(g)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map