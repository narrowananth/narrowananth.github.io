var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{flow:()=>l,showMessage:()=>d});var n=function(t){var e=t.cartQuantity,n=t.buyProducts,r=t.sanitizedLineItem,i=0;return!!(n.every((function(t){var e=t.variantId,n=(r[e]||{}).quantity;return i+=void 0===n?0:n,!!r[e]}))&&i>=e)},r=function(t){var e=t.offerCategory,n=t.overAll,r=t.getProductValid,i=t.getProductVariantIds,u=t.buyProductVariantIds,o=t.sanitizedLineItem,a=t.discountType,c=t.discountValue,d=c,l=0,s=r?i:u,y=n?Object.values(o):s;return y.forEach((function(t){var e=n?t:o[t],r=e.unitPrice,i=e.quantity;l+=r*i})),y.map((function(t){var r=n?t:o[t],i=r.unitPrice,u=r.quantity,s=r.variantId,y=r.productId,f=r.lineItemHandle;if("percentage"===a)return c>=100&&(d=100),{productId:y,variantId:s,quantity:u,unitPrice:(u*i-u*i*(d/100))/u,lineItemHandle:f,discountType:e,discountValue:"You got ".concat(d,"% off")};if("amount"===a){var v=u*i/l*100/100*c;return{productId:y,variantId:s,quantity:u,unitPrice:(u*i-v)/u,lineItemHandle:f,discountType:e,discountValue:"You save {{currency}}".concat(v.toFixed(3))}}return{}}))},i=function(t){var e=t.cartQuantity,n=(t.offerCategory,t.getCollectionValid),r=t.buyCollections,i=t.getCollections,u=t.sanitizedLineItem,o=[],a=[],c=0,d=0;return n&&i.forEach((function(t){t&&Object.values(u).forEach((function(e){var n=e.collectionId,r=e.variantId,i=e.quantity;n===t&&(d+=i,a.push(r))}))})),r.forEach((function(t){t&&Object.values(u).forEach((function(e){var n=e.collectionId,r=e.variantId,i=e.quantity;n===t&&(c+=i,o.push(r))}))})),(n?c+d:c)>=e?{buyCollectionsIdsValid:o,getCollectionsIdsValid:a}:{}},u=function(t){var e=t.offerCategory,n=t.getCollectionValue,r=t.buyCollectionValue,i=t.sanitizedLineItem,u=t.discountType,o=t.discountValue,a=o,c=0,d=[];if(n){var l=n.buyCollectionsIdsValid,s=n.getCollectionsIdsValid;l&&l.length>0&&s&&s.length>0&&(d=l.concat(s))}else(l=r.buyCollectionsIdsValid)&&l.length>0&&(d=l);return d.forEach((function(t){var e=i[t].unitPrice;c+=e})),d.map((function(t){var n=i[t],r=n.unitPrice,d=n.quantity,l=n.variantId,s=n.productId,y=n.lineItemHandle;if("percentage"===u)return o>=100&&(a=100),{productId:s,variantId:l,quantity:d,unitPrice:(d*r-d*r*(a/100))/d,lineItemHandle:y,discountType:e,discountValue:"You got ".concat(a,"% off")};var f=r/c*100/100*o;return{productId:s,variantId:l,quantity:d,unitPrice:(d*r-f)/d,lineItemHandle:y,discountType:e,discountValue:"You save {{currency}}".concat(f.toFixed(3))}}))},o=function(t){switch(t.offerCategory){case"percentageDiscount":case"flatDiscount":return function(t){return function(t){var e=t.lineItems,n=t.getRemovedProductList,o=t.offerCategory,a=t.overAll,c=t.getProductValid,d=t.getCollectionValid,l=t.collection,s=t.discountType,y=t.discountValue,f=t.buyCollections,v=t.buyCollectionsCount,I=t.getCollections,g=t.getCollectionsCount,P=t.buyProducts,m=t.getProducts,p=t.cartQuantity,C=P.flatMap((function(t){return t.variantId})),b=m.flatMap((function(t){return t.variantId})),L=e;if(a)return{output:O=r({offerCategory:o,overAll:a,sanitizedLineItem:L,discountType:s,discountValue:y}),getRemovedProductList:n};if(l){if(l){var V=!!d&&i({cartQuantity:p,offerCategory:o,getCollectionValid:d,buyCollections:f,getCollections:I,buyCollectionsCount:v,getCollectionsCount:g,sanitizedLineItem:L}),T=!d&&i({cartQuantity:p,offerCategory:o,buyCollections:f,buyCollectionsCount:v,sanitizedLineItem:L}),z=d?u({offerCategory:o,getCollectionValue:V,sanitizedLineItem:L,discountType:s,discountValue:y}):[],q=d?[]:u({offerCategory:o,buyCollectionValue:T,sanitizedLineItem:L,discountType:s,discountValue:y});return{getRemovedProductList:n,output:d?z:q}}return{getRemovedProductList:n,output:{}}}var Q=!!c&&function(t){var e=t.cartQuantity,n=t.getProducts,r=t.sanitizedLineItem,i=0,u=t.buyProducts.every((function(t){var e=t.variantId,n=r[e]?r[e].quantity:0;return i+=n,!!r[e]})),o=n.every((function(t){var e=t.variantId,n=r[e]?r[e].quantity:0;return i+=n,!!r[e]}));return!!(i>=e&&u&&o)}({cartQuantity:p,buyProducts:P,getProducts:m,sanitizedLineItem:L}),h=!c&&function(t){var e=t.cartQuantity,n=t.sanitizedLineItem,r=0,i=t.buyProducts.every((function(t){var e=t.variantId,i=n[e]?n[e].quantity:0;return r+=i,!!n[e]}));return!!(r>=e&&i)}({cartQuantity:p,buyProducts:P,sanitizedLineItem:L}),R=c&&Q?r({offerCategory:o,getProductValid:c,getProductVariantIds:b,sanitizedLineItem:L,discountType:s,discountValue:y}):[],O=!c&&h?r({offerCategory:o,getProductValid:c,buyProductVariantIds:C,sanitizedLineItem:L,discountType:s,discountValue:y}):[];return{output:c?R:O,getRemovedProductList:n}}(t)}(t);case"volumeDiscount":return function(t){var e=function(t){var e=t.lineItems,o=t.getRemovedProductList,a=t.overAll,c=t.cartQuantity,d=t.offerCategory,l=t.getCollectionValid,s=t.collection,y=t.discountType,f=t.discountValue,v=t.buyCollections,I=t.buyCollectionsCount,g=t.buyProducts,P=e;if(a)return{getRemovedProductList:o,output:n({cartQuantity:c,sanitizedLineItem:P})?r({offerCategory:d,overAll:a,sanitizedLineItem:P,discountType:y,discountValue:f}):[]};if(s){if(s){var m=!l&&i({cartQuantity:c,offerCategory:d,buyCollections:v,buyCollectionsCount:I,sanitizedLineItem:P});return{getRemovedProductList:o,output:l?[]:u({offerCategory:d,buyCollectionValue:m,sanitizedLineItem:P,discountType:y,discountValue:f})}}return{getRemovedProductList:o,output:{}}}var p=g.flatMap((function(t){return t.variantId})),C=function(t){var e=t.cartQuantity,n=t.sanitizedLineItem,r=0;return t.buyProducts.forEach((function(t){var e=t.variantId,i=n[e]?n[e].quantity:0;r+=i})),r>=e}({cartQuantity:c,buyProducts:g,sanitizedLineItem:P});return{getRemovedProductList:o,output:C?r({offerCategory:d,buyProductVariantIds:p,sanitizedLineItem:P,discountType:y,discountValue:f}):[]}}(t);return e}(t);case"buyXGetY":return function(t){var e=function(t){var e=t.lineItems,n=t.getRemovedProductList,r=t.offerCategory,i=t.cartQuantity,u=t.buyProducts,o=t.getProducts,a=e,c=function(t){var e=t.cartQuantity,n=t.getProducts,r=t.getProductCount,i=t.sanitizedLineItem,u=0,o=t.buyProducts.every((function(t){var e=t.variantId,n=i[e]?i[e].quantity:0;return u+=n,!!i[e]})),a=0,c=n.every((function(t){var e=t.variantId,n=i[e]?i[e].quantity:0;return a+=n,!!i[e]}));return!!(u>=e&&a>=r&&o&&c)}({cartQuantity:i,buyProducts:u,getProducts:o,getProductCount:t.getProductCount,sanitizedLineItem:a}),d=c?function(t){var e=t.offerCategory,n=t.sanitizedLineItem;return t.getProducts.map((function(t){var r=t.productId,i=t.variantId;return{productId:r,variantId:i,quantity:n[i].quantity,unitPrice:0,lineItemHandle:n[i].lineItemHandle,discountType:e,discountValue:"Free"}}))}({offerCategory:r,getProducts:o,sanitizedLineItem:a}):[];return{getRemovedProductList:n,output:d}}(t);return e}(t);case"buyMoreSaveMore":return function(t){var e=function(t){var e=t.lineItems,n=t.getRemovedProductList,r=t.offerCategory,i=t.cartTotal,u=t.buyProducts,o=t.getProducts,a=t.getProductCount,c=t.discountType,d=t.discountValue,l=e,s=function(t){var e=t.discountType,n=t.cartTotal,r=t.getProducts,i=t.getProductCount,u=t.sanitizedLineItem,o=0,a=0;return t.buyProducts.forEach((function(t){var e=t.variantId,n=u[e]?u[e].unitPrice*u[e].quantity:0;o+=n})),"free"===e&&r.forEach((function(t){var e=t.variantId,n=u[e]?u[e].quantity:0;a+=n})),"free"===e&&o>=n&&a>=i||"free"!==e&&o>=n}({discountType:c,cartTotal:i,buyProducts:u,getProducts:o,getProductCount:a,sanitizedLineItem:l}),y=s?function(t){var e=t.offerCategory,n=t.buyProducts,r=t.sanitizedLineItem,i=t.discountType,u=t.discountValue,o=0;return"free"===i?t.getProducts.map((function(t){var n=t.productId,i=t.variantId;return{productId:n,variantId:i,quantity:r[i].quantity,unitPrice:0,lineItemHandle:r[i].lineItemHandle,discountType:e,discountValue:"Free"}})):(n.forEach((function(t){var e=t.variantId,n=r[e],i=n.unitPrice,u=n.quantity;o+=i*u})),n.map((function(t){var n=t.variantId,a=u,c=r[n],d=c.unitPrice,l=c.quantity,s=c.productId,y=c.lineItemHandle;if("percentage"===i)return u>=100&&(a=100),{productId:s,variantId:n,quantity:l,unitPrice:(l*d-l*d*(a/100))/l,lineItemHandle:y,discountType:e,discountValue:"You got ".concat(a,"% off")};if("amount"===i){var f=l*d/o*100/100*u;return{productId:s,variantId:n,quantity:l,unitPrice:(l*d-f)/l,lineItemHandle:y,discountType:e,discountValue:"You save {{currency}}".concat(f.toFixed(3))}}return{}})))}({offerCategory:r,buyProducts:u,getProducts:o,sanitizedLineItem:l,discountType:c,discountValue:d}):[];return{getRemovedProductList:n,output:y}}(t);return e}(t);case"automaticOffers":return function(t){var e=function(t){var e=t.lineItems,r=t.getRemovedProductList,u=t.offerCategory,o=t.onlyCartAmoutAndQunatity,a=t.collection,c=t.cartType,d=t.cartTotal,l=t.cartQuantity,s=t.buyProducts,y=t.getProducts,f=t.buyCollections,v=t.getProductCount,I=e,g=!(!o||"amount"!==c)&&function(t){var e=t.cartTotal,n=t.sanitizedLineItem,r=0;return!!(t.buyProducts.every((function(t){var e=t.variantId,i=n[e]||{},u=i.unitPrice,o=void 0===u?0:u,a=i.quantity;return r+=o*(void 0===a?0:a),!!n[e]}))&&r>=e)}({cartTotal:d,buyProducts:s,sanitizedLineItem:I}),P=!(!o||"count"!==c)&&n({cartQuantity:l,buyProducts:s,sanitizedLineItem:I}),m=(a?i({offerCategory:u,buyCollections:f,cartQuantity:l,sanitizedLineItem:I}):{}).buyCollectionsIdsValid;return g||P||m?{getRemovedProductList:r,output:y.map((function(t){return{productId:t.productId,variantId:t.variantId,quantity:v,unitPrice:0,discountType:u,discountValue:"Free"}}))}:{getRemovedProductList:r,output:{}}}(t);return e}(t);default:return{}}},a=function(){return a=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},a.apply(this,arguments)},c=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},d=function(t){return t},l=function(t,e){var n=t.cartLineItems,r=(void 0===n?{}:n).lineItems,i=void 0===r?[]:r,u=function(t){var e=t.buyOfferType,n=t.cartType,r=t.cartValue,i=t.getCollections,u=t.getProducts;return t.onlyCartAmoutAndQunatity=!1,t.overAll="overAll"===e,t.collection="collections"===e,"amount"===n?(t.onlyCartAmoutAndQunatity=!0,t.cartTotal=r):t.cartTotal=0,"count"===n?(t.onlyCartAmoutAndQunatity=!0,t.cartQuantity=r):t.cartQuantity=0,i.length>0?t.getCollectionValid=!0:t.getCollectionValid=!1,u.length>0?t.getProductValid=!0:t.getProductValid=!1,t}(e),d=function(t,e){var n=function(t){return t.filter((function(t){var e=t.lineItemType,n=t.originalUnitPrice;return t.unitPrice=n,"READONLY"===e}))}(e)||[];return e=function(t,e,n,r){var i=e.map((function(t){return t.variantId})),u=n.map((function(t){return t.variantId}));return r=c(r),i.forEach((function(e){var n=r[e]||{},i=n.lineItemType,u=n.variantId,o=n.originalUnitPrice;"automaticOffers"===t&&u===e&&"READONLY"===i?delete r[e]:u===e&&"READONLY"===i&&(r[e].unitPrice=o)})),u.forEach((function(e){var n=r[e]||{},i=n.lineItemType,u=n.variantId,o=n.originalUnitPrice;"automaticOffers"===t&&u===e&&"READONLY"===i?delete r[e]:u===e&&"READONLY"===i&&(r[e].unitPrice=o)})),r}(t.offerCategory,t.getProducts,t.buyProducts,e),a(a({},t),{lineItems:e,getRemovedProductList:n})}(u,i),l=o(d);return JSON.stringify(l)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map