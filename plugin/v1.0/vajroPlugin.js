var vajroPlugin;(()=>{"use strict";var t={d:(e,n)=>{for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{flow:()=>y,showMessage:()=>v});var n=function(t){var e=t.overAll,n=t.getProductValid,i=t.getProductVariantIds,u=t.buyProductVariantIds,r=t.sanitizedLineItem,o=t.discountType,a=t.discountValue,c=a,d=0,s=n?i:u,l=e?Object.values(r):s;return l.forEach((function(t){var n=e?t:r[t],i=n.unitPrice,u=n.quantity;d+=i*u})),l.map((function(t){var n=e?t:r[t],i=n.unitPrice,u=n.quantity,s=n.variantId,l=n.productId;return"percentage"===o?(a>=100&&(c=100),{productId:l,variantId:s,quantity:u,unitPrice:(u*i-u*i*(c/100))/u}):{productId:l,variantId:s,quantity:u,unitPrice:(u*i-u*i/d*100/100*a)/u}}))},i=function(t){var e=t.offerCategory,n=t.getCollectionValid,i=t.buyCollections,u=t.buyCollectionsCount,r=t.getCollections,o=t.getCollectionsCount,a=t.sanitizedLineItem,c=[],d=[],s=0,l=0;return n&&r.split(",").forEach((function(t){t&&Object.values(a).forEach((function(e){var n=e.collectionId,i=e.variantId,u=e.quantity;n===t&&(l+=u,d.push(i))}))})),i.split(",").forEach((function(t){t&&Object.values(a).forEach((function(e){var n=e.collectionId,i=e.variantId,u=e.quantity;n===t&&(s+=u,c.push(i))}))})),"volumeDiscount"===e?(n?l>=o&&s>=u:s>=u)?{buyCollectionsIdsValid:c,getCollectionsIdsValid:d}:{}:{buyCollectionsIdsValid:c,getCollectionsIdsValid:d}},u=function(t){var e=t.getCollectionValue,n=t.buyCollectionValue,i=t.sanitizedLineItem,u=t.discountType,r=t.discountValue,o=r,a=0,c=[];if(e){var d=e.buyCollectionsIdsValid,s=e.getCollectionsIdsValid;d&&d.length>0&&s&&s.length>0&&(c=d.concat(s))}else(d=n.buyCollectionsIdsValid)&&d.length>0&&(c=d);return c.forEach((function(t){var e=i[t].unitPrice;a+=e})),c.map((function(t){var e=i[t],n=e.unitPrice,c=e.quantity,d=e.variantId,s=e.productId;return"percentage"===u?(r>=100&&(o=100),{productId:s,variantId:d,quantity:c,unitPrice:(c*n-c*n*(o/100))/c}):{productId:s,variantId:d,quantity:c,unitPrice:n-n/a*100/100*r}}))},r=function(t){var e=t.buyProducts,n=t.sanitizedLineItem;return!!e.every((function(t){var e=t.variantId,i=t.count;return!!e&&n[e].quantity>=i}))},o=function(t){var e=t.getProducts,n=t.sanitizedLineItem;return e.map((function(t){var e=t.productId,i=t.variantId,u=t.count,r=n[i].quantity>=u,o=r?0:n[i].unitPrice,a={productId:e,variantId:i,quantity:n[i].quantity,unitPrice:o};return r?a:null}))},a=function(t){var e=t.cartQuantity,n=t.sanitizedLineItem,i=0;return Object.values(n).forEach((function(t){var e=t.quantity;i+=e})),i>=e},c=function(t){var e=t.getProducts,n=t.sanitizedLineItem,i=t.discountType,u=t.discountValue,r=0;return e.forEach((function(t){var e=t.variantId,i=n[e],u=i.unitPrice,o=i.quantity;r+=u*o})),e.map((function(t){var e=t.variantId,o=t.amount,a=u,c=n[e].unitPrice*n[e].quantity>=o,d=n[e],s=d.unitPrice,l=d.quantity,v=d.productId;return c?"percentage"===i?(u>=100&&(a=100),{productId:v,variantId:e,quantity:l,unitPrice:(l*s-l*s*(a/100))/l}):{productId:v,variantId:e,quantity:l,unitPrice:(l*s-l*s/r*100/100*u)/l}:void 0}))},d=function(t){switch(t.offerCategory){case"percentageDiscount":case"flatDiscount":return function(t){return function(t){var e=t.lineItems,r=t.getRemovedProductList,o=t.offerCategory,a=t.overAll,c=t.getProductValid,d=t.getCollectionValid,s=t.collection,l=t.discountType,v=t.discountValue,y=t.buyCollections,f=t.buyCollectionsCount,I=t.getCollections,P=t.getCollectionsCount,g=t.buyProducts,m=t.getProducts,p=g.flatMap((function(t){return t.variantId})),L=m.flatMap((function(t){return t.variantId})),b=e;if(a)return{output:O=n({overAll:a,sanitizedLineItem:b,discountType:l,discountValue:v}),getRemovedProductList:r};if(s){if(s){var C=!!d&&i({offerCategory:o,getCollectionValid:d,buyCollections:y,getCollections:I,buyCollectionsCount:f,getCollectionsCount:P,sanitizedLineItem:b}),V=!d&&i({offerCategory:o,buyCollections:y,buyCollectionsCount:f,sanitizedLineItem:b}),z=d?u({getCollectionValue:C,sanitizedLineItem:b,discountType:l,discountValue:v}):[],q=d?[]:u({buyCollectionValue:V,sanitizedLineItem:b,discountType:l,discountValue:v});return{getRemovedProductList:r,output:d?z:q}}return{getRemovedProductList:r,output:{}}}var T=!!c&&function(t){var e=t.getProducts,n=t.sanitizedLineItem,i=t.buyProducts.every((function(t){var e=t.variantId,i=t.count;return n[e]&&n[e].quantity>=i})),u=e.every((function(t){var e=t.variantId,i=t.count;return n[e]&&n[e].quantity>=i}));return!(!i||!u)}({buyProducts:g,getProducts:m,sanitizedLineItem:b}),h=!c&&function(t){var e=t.sanitizedLineItem;return!!t.buyProducts.every((function(t){var n=t.variantId,i=t.count;return e[n]&&e[n].quantity>=i}))}({buyProducts:g,sanitizedLineItem:b}),R=c&&T?n({getProductValid:c,getProductVariantIds:L,sanitizedLineItem:b,discountType:l,discountValue:v}):[],O=!c&&h?n({getProductValid:c,buyProductVariantIds:p,sanitizedLineItem:b,discountType:l,discountValue:v}):[];return{output:c?R:O,getRemovedProductList:r}}(t)}(t);case"volumeDiscount":return function(t){var e=function(t){var e=t.lineItems,o=t.getRemovedProductList,c=t.overAll,d=t.cartQuantity,s=t.offerCategory,l=t.getCollectionValid,v=t.collection,y=t.discountType,f=t.discountValue,I=t.buyCollections,P=t.buyCollectionsCount,g=t.buyProducts,m=e;if(c)return{getRemovedProductList:o,output:a({cartQuantity:d,sanitizedLineItem:m})?n({overAll:c,sanitizedLineItem:m,discountType:y,discountValue:f}):[]};if(v){if(v){var p=!l&&i({offerCategory:s,buyCollections:I,buyCollectionsCount:P,sanitizedLineItem:m});return{getRemovedProductList:o,output:l?[]:u({buyCollectionValue:p,sanitizedLineItem:m,discountType:y,discountValue:f})}}return{getRemovedProductList:o,output:{}}}var L=g.flatMap((function(t){return t.variantId}));return{getRemovedProductList:o,output:r({buyProducts:g,sanitizedLineItem:m})?n({buyProductVariantIds:L,sanitizedLineItem:m,discountType:y,discountValue:f}):[]}}(t);return e}(t);case"buyXGetY":return function(t){var e=function(t){var e=t.lineItems,n=t.getRemovedProductList,i=t.onlyCartAmoutAndQunatity,u=t.cartQuantity,c=t.buyProducts,d=t.getProducts,s=e;return i?{getRemovedProductList:n,output:a({cartQuantity:u,sanitizedLineItem:s})?o({getProducts:d,sanitizedLineItem:s}):[]}:{getRemovedProductList:n,output:r({buyProducts:c,sanitizedLineItem:s})?o({getProducts:d,sanitizedLineItem:s}):[]}}(t);return e}(t);case"buyMoreSaveMore":return function(t){return function(t){var e=t.lineItems,n=t.getRemovedProductList,i=t.onlyCartAmoutAndQunatity,u=t.cartTotal,r=t.buyProducts,o=t.getProducts,a=t.discountType,d=t.discountValue,s=e;if(i){var l=function(t){var e=t.cartTotal,n=t.sanitizedLineItem,i=0;return Object.values(n).forEach((function(t){var e=t.unitPrice,n=t.quantity;i+=e*n})),i>=e}({cartTotal:u,sanitizedLineItem:s});return{getRemovedProductList:n,output:l?c({getProducts:o,sanitizedLineItem:s,discountType:a,discountValue:d}):[]}}var v=function(t){var e=t.sanitizedLineItem;return!!t.buyProducts.every((function(t){var n=t.variantId,i=t.amount;return!!n&&e[n].unitPrice*e[n].quantity>=i}))}({buyProducts:r,sanitizedLineItem:s});return{getRemovedProductList:n,output:v?c({getProducts:o,sanitizedLineItem:s,discountType:a,discountValue:d}):[]}}(t)}(t);default:return{}}},s=function(){return s=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var u in e=arguments[n])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t},s.apply(this,arguments)},l=function(t){return t.reduce((function(t,e){return t[e.variantId]=e,t}),{})},v=function(t){return t},y=function(t,e){var n,i,u,r=t.cartLineItems,o=(void 0===r?{}:r).lineItems,a=(n=e,u=function(t){return t.filter((function(t){var e=t.lineItemType,n=t.originalUnitPrice;return t.unitPrice=n,"READONLY"===e}))}(i=void 0===o?[]:o)||[],i=function(t,e,n){var i=t.map((function(t){return t.variantId})),u=e.map((function(t){return t.variantId}));return n=l(n),i.forEach((function(t){var e=n[t]||{},i=e.lineItemType,u=e.variantId,r=e.originalUnitPrice;u===t&&"READONLY"===i&&(n[t].unitPrice=r)})),u.forEach((function(t){var e=n[t]||{},i=e.lineItemType,u=e.variantId,r=e.originalUnitPrice;u===t&&"READONLY"===i&&(n[t].unitPrice=r)})),n}(n.getProducts,n.buyProducts,i),s(s({},n),{lineItems:i,getRemovedProductList:u})),c=d(a);return JSON.stringify(c)};vajroPlugin=e})();
//# sourceMappingURL=vajroPlugin.js.map