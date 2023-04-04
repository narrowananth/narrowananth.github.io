var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{flow:()=>s});var n=function(){return n=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var u in e=arguments[n])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},n.apply(this,arguments)},r=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},u=function(t){var e=t.customBuyCollection,n=t.customBuyProduct;return n.length>0||e.length>0?n.concat(e):[]},o=function(t){return t.reduce((function(t,e){return t+e.unitPrice*e.quantity}),0)},i=function(t){var e=t.cartType,n=t.cartValue,o=t.lineItems,i=t.buyOfferType,c=t.getProducts,a=t.getProductCount,d=t.offerCategory,l=r(c),f=u(t).reduce((function(t,n){return t+o.reduce((function(t,r){var u=r||{},o=u.collectionId,i=u.variantId,c=u.quantity,a=u.unitPrice;return i!==n&&o!==n||(t+="amount"===e?c*a:c),t}),0)}),0);if("collections"===i){var s=o.some((function(t){var e=(t||{}).variantId;return l[e]}));return"automaticOffers"===d?f>=n:("amount"!==e&&s?f-a:f)>=n}return f>=n},c=function(t){var e=t.cartType,n=t.cartValue,u=t.lineItems,o=t.getProducts,i=t.getProductCount,c=t.offerCategory,a=r(o),d=u.reduce((function(t,n){var r=n.quantity,u=n.unitPrice;return t+("amount"===e?r*u:r)}),0),l=u.some((function(t){var e=(t||{}).variantId;return a[e]}));return"automaticOffers"===c?d>=n:("amount"!==e&&l?d-i:d)>=n},a=function(t){var e=t.customGetProduct,n=t.customGetCollection,r=t.lineItems;return e.concat(n).some((function(t){return r.some((function(e){var n=e||{},r=n.collectionId;return n.variantId===t||r===t}))}))},d=function(t,e,n,r,u,o){var i=e||{},c=i.unitPrice,a=i.quantity,d=i.variantId,l=i.productId,f=i.lineItemHandle;if("percentage"===n)return{productId:l,variantId:d,quantity:a,unitPrice:(s=a*c-a*c*(u/100))/a,lineItemHandle:f,discountType:t,discountValue:"You got ".concat(u,"% off"),customLineItemType:"REGULAR"};if("amount"===n){var s,v=a*c/o*100/100*r;return{productId:l,variantId:d,quantity:a,unitPrice:0!=(s=a*c>=v?a*c-v:0)?s/a:0,lineItemHandle:f,discountType:t,discountValue:"You save {{currency}}".concat(v.toFixed(2)),customLineItemType:"REGULAR"}}return{}},l=function(t){var e=t.offerCategory,n=t.getProductCount,r=t.customGetProductId,u=t.customGetVariantId,o=t.isGetProductIdInLineitem,i=t.productId,c=t.variantId,a=t.lineItemHandle,d=t.quantity,l=void 0===d?n:d,f=t.unitPrice,s=t.customGetProductPrice,v=o&&n>l?n:l;return{productId:i||r,variantId:c||u,quantity:v,freeQuantity:n,unitPrice:v===n?0:f,lineItemHandle:a,discountType:v>=n?e:"",discountValue:v>=n?"Buy ".concat(v,", Get ").concat(n," Free and ").concat(v-n," For the Same Price."):"",customLineItemType:"REGULAR",isGetProductIdInLineitem:o,customGetProductPrice:s}},f=function(t,e,n){if("automaticOffers"!==n){var u=r(e);return t.reduce((function(t,e){var n=e.variantId,r=e.unitPrice,o=e.quantity,i=u[n]||{},c=i.unitPrice,a=i.quantity,d=i.freeQuantity;return t+(c||0===c?c:r)*((a||o)-(void 0===d?0:d))}),0)}var i=o(t),c=function(t){return t.reduce((function(t,e){return t+e.customGetProductPrice*e.freeQuantity}),0)}(e);return i>c?i-c:i},s=function(t,e){var s=t.cartLineItems.lineItems,v=e.map((function(t){var e=function(t){var e=t.buyCollections,n=void 0===e?[]:e,r=t.getCollections,u=void 0===r?[]:r,o=t.buyProducts,i=void 0===o?[]:o,c=t.getProducts,a=void 0===c?[]:c,d=t.getProductCount,l=i.map((function(t){return t.variantId}));t.customBuyProduct=l;var f=a.map((function(t){return t.variantId}));t.customGetProduct=f;var s=n.map((function(t){return t.collectionId}));t.customBuyCollection=s;var v=u.map((function(t){return t.collectionId}));return t.customGetCollection=v,d||(t.getProductCount=0),t}(t),v=function(t,e){var r=function(t){return t.map((function(t){var e=t.originalUnitPrice;return t.unitPrice=e,t}))}(e)||[],u=function(t){return t.map((function(t){var e=t.originalUnitPrice;return t.unitPrice=e,t}))}(e);return n(n({getConfigSchema:t},t),{lineItems:u,getRemovedProductList:r})}(e,s);return function(t){switch(t.offerCategory){case"percentageDiscount":case"flatDiscount":return function(t){var e=t.getRemovedProductList,n=t.lineItems,r=t.buyOfferType,i=t.customGetProduct,c=t.customGetCollection,l=t.displayText,s=void 0===l?"":l,v=t.getConfigSchema,m=t.offerCategory,g="overAll"!==r&&function(t){var e=t.cartType,n=t.cartValue,r=t.lineItems;return u(t).reduce((function(t,n){return t+r.reduce((function(t,r){var u=r||{},o=u.collectionId,i=u.variantId,c=u.quantity,a=u.unitPrice;return i!==n&&o!==n||(t+="amount"===e?c*a:c),t}),0)}),0)>=n}(t),I="overAll"===r||!(i.length>0||c.length>0)||function(t){var e=t.customBuyProduct,n=t.customBuyCollection,r=t.lineItems;return e.concat(n).some((function(t){return r.some((function(e){var n=e||{},r=n.collectionId;return n.variantId===t||r===t}))}))}(t),y="overAll"===r||!(i.length>0||c.length>0)||a(t),P="overAll"!==r||!(i.length>0||c.length>0)||a(t),p=!("overAll"!==r||!P)&&function(t){var e=t.cartType,n=t.cartValue;return t.lineItems.reduce((function(t,n){var r=n.quantity,u=n.unitPrice;return t+("amount"===e?r*u:r)}),0)>=n}(t),h=(p||g)&&I&&y?function(t){var e=t.offerCategory,n=t.buyOfferType,r=t.discountType,u=t.discountValue,i=t.lineItems,c=t.customGetProduct,a=t.customGetCollection,l=function(t){var e=t.customBuyCollection,n=t.customGetCollection,r=t.customBuyProduct,u=t.customGetProduct,o=u.length>0?u:r,i=n.length>0?n:e,c=r.length>0&&n.length>0?n:[],a=u.length>0&&e.length>0?u:[];return c.length>0||a.length>0?c.concat(a):o.concat(i)}(t),f="overAll"===n&&c.length<=0&&a.length<=0?i:l,s="overAll"===n&&c.length<=0&&a.length<=0?o(f):function(t){var e=t.lineItems;return t.sanitizedLineItem.reduce((function(t,n){return t+e.reduce((function(t,e){var r=e||{},u=r.collectionId,o=r.variantId,i=r.quantity,c=r.unitPrice;return o!==n&&u!==n||(t+=i*c),t}),0)}),0)}({sanitizedLineItem:f,lineItems:i}),v="percentage"===r&&u>=100?100:u,m=[];return f.forEach((function(t){if("string"==typeof t)i.forEach((function(n){var o=n||{},i=o.collectionId;if(o.variantId===t||i===t){var c=d(e,n,r,u,v,s);m.push(c)}}));else{var n=d(e,t,r,u,v,s);m.push(n)}})),m}(t):[],C=h.length>0&&s.length>0?s:"",G=h.length>0?f(n,h,m):0;return{offerApplied:h.length>0,output:h,getRemovedProductList:e,displayText:C,totalCartValue:G,schema:v}}(t);case"buyXGetY":return function(t){var e=t.getRemovedProductList,n=t.getConfigSchema,u=t.lineItems,o=t.buyOfferType,a=t.displayText,d=t.offerCategory,s="overAll"!==o?i(t):c(t),v=function(t){var e=t.customGetProduct,n=t.getProductCount,r=t.lineItems;return e.reduce((function(t,e){return t+r.reduce((function(t,n){var r=n||{},u=r.collectionId,o=r.variantId,i=r.quantity;return o!==e&&u!==e||(t+=i),t}),0)}),0)>=n}(t),m=s&&v?function(t){var e=t.offerCategory,n=t.getProducts,u=t.customGetProduct,o=t.lineItems,i=t.getProductCount,c=r(o),a=u.filter((function(t){return c[t]})).sort((function(t,e){return c[t].unitPrice-c[e].unitPrice})),d=[],f=i;return a.forEach((function(t,r){var u,o,i;if(f){var a=!!c[t],s=c[t]||{},v=s.productId,m=s.variantId,g=s.quantity,I=s.unitPrice,y=s.lineItemHandle,P=f>g?g:f;(f-=g)<0&&(f=0);var p=l({productId:v,variantId:m,lineItemHandle:y,quantity:g,getProductCount:P,unitPrice:I,offerCategory:e,customGetProductId:null===(u=n[r])||void 0===u?void 0:u.productId,customGetVariantId:null===(o=n[r])||void 0===o?void 0:o.variantId,customGetProductPrice:null===(i=n[r])||void 0===i?void 0:i.productPrice,isGetProductIdInLineitem:a});d.push(p)}})),d}(t):[],g=m.length>0&&a.length>0?a:"",I=m.length>0?f(u,m,d):0;return{offerApplied:m.length>0,output:m,getRemovedProductList:e,displayText:g,totalCartValue:I,schema:n}}(t);case"automaticOffers":return function(t){var e=t.getRemovedProductList,n=t.getConfigSchema,u=t.lineItems,o=t.buyOfferType,a=t.displayText,d=t.offerCategory,s=("overAll"!==o?i(t):c(t))?function(t){var e=t.offerCategory,n=t.getProducts,u=void 0===n?[]:n,o=t.customGetProduct,i=t.lineItems,c=t.getProductCount,a=r(i),d=[];return o.forEach((function(t,n){var r,o,i,f=!!a[t],s=a[t]||{},v=s.productId,m=s.variantId,g=s.quantity,I=s.unitPrice,y=s.lineItemHandle,P=l({productId:v,variantId:m,lineItemHandle:y,quantity:g,getProductCount:c,unitPrice:I,offerCategory:e,customGetProductId:null===(r=u[n])||void 0===r?void 0:r.productId,customGetVariantId:null===(o=u[n])||void 0===o?void 0:o.variantId,customGetProductPrice:null===(i=u[n])||void 0===i?void 0:i.productPrice,isGetProductIdInLineitem:f});d.push(P)})),d}(t):[],v=s.length>0&&a.length>0?a:"",m=s.length>0?f(u,s,d):0;return{offerApplied:s.length>0,output:s,getRemovedProductList:e,displayText:v,totalCartValue:m,schema:n}}(t);default:return{}}}(v)})),m=[],g=v.filter((function(t){var e=t.schema,n=t.totalCartValue,r=t.offerApplied,u=t.getRemovedProductList,o=e.offerCategory;return r||m.push({offerApplied:r,output:[],getRemovedProductList:u,displayText:"",totalCartValue:0,schema:e}),"automaticOffers"===o&&r?n>0:r})).sort((function(t,e){return t.totalCartValue-e.totalCartValue})),I=g.length>0?g[0]:m[0];return JSON.stringify(I)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map