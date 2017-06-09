!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.VueResource=n()}(this,function(){"use strict";function t(t){this.state=tt,this.value=void 0,this.deferred=[];var n=this;try{t(function(t){n.resolve(t)},function(t){n.reject(t)})}catch(t){n.reject(t)}}function n(t,n){t instanceof et?this.promise=t:this.promise=new et(t.bind(n)),this.context=n}function e(t){it=t.util,rt=t.config.debug||!t.config.silent}function o(t){"undefined"!=typeof console&&rt&&console.warn("[VueResource warn]: "+t)}function r(t){"undefined"!=typeof console&&console.error(t)}function i(t,n){return it.nextTick(t,n)}function u(t){return t.replace(/^\s*|\s*$/g,"")}function s(t){return"string"==typeof t}function c(t){return t===!0||t===!1}function a(t){return"function"==typeof t}function f(t){return null!==t&&"object"==typeof t}function h(t){return f(t)&&Object.getPrototypeOf(t)==Object.prototype}function p(t){return"undefined"!=typeof FormData&&t instanceof FormData}function l(t,e,o){var r=n.resolve(t);return arguments.length<2?r:r.then(e,o)}function d(t,n,e){return e=e||{},a(e)&&(e=e.call(n)),v(t.bind({$vm:n,$options:e}),t,{$options:e})}function m(t,n){var e,o;if("number"==typeof t.length)for(e=0;e<t.length;e++)n.call(t[e],t[e],e);else if(f(t))for(o in t)t.hasOwnProperty(o)&&n.call(t[o],t[o],o);return t}function v(t){var n=ut.slice.call(arguments,1);return n.forEach(function(n){g(t,n,!0)}),t}function y(t){var n=ut.slice.call(arguments,1);return n.forEach(function(n){for(var e in n)void 0===t[e]&&(t[e]=n[e])}),t}function b(t){var n=ut.slice.call(arguments,1);return n.forEach(function(n){g(t,n)}),t}function g(t,n,e){for(var o in n)e&&(h(n[o])||st(n[o]))?(h(n[o])&&!h(t[o])&&(t[o]={}),st(n[o])&&!st(t[o])&&(t[o]=[]),g(t[o],n[o],e)):void 0!==n[o]&&(t[o]=n[o])}function w(t,n){var e=n(t);return s(t.root)&&!e.match(/^(https?:)?\//)&&(e=t.root+"/"+e),e}function T(t,n){var e=Object.keys(A.options.params),o={},r=n(t);return m(t.params,function(t,n){e.indexOf(n)===-1&&(o[n]=t)}),o=A.params(o),o&&(r+=(r.indexOf("?")==-1?"?":"&")+o),r}function j(t,n,e){var o=E(t),r=o.expand(n);return e&&e.push.apply(e,o.vars),r}function E(t){var n=["+","#",".","/",";","?","&"],e=[];return{vars:e,expand:function(o){return t.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g,function(t,r,i){if(r){var u=null,s=[];if(n.indexOf(r.charAt(0))!==-1&&(u=r.charAt(0),r=r.substr(1)),r.split(/,/g).forEach(function(t){var n=/([^:\*]*)(?::(\d+)|(\*))?/.exec(t);s.push.apply(s,x(o,u,n[1],n[2]||n[3])),e.push(n[1])}),u&&"+"!==u){var c=",";return"?"===u?c="&":"#"!==u&&(c=u),(0!==s.length?u:"")+s.join(c)}return s.join(",")}return U(i)})}}}function x(t,n,e,o){var r=t[e],i=[];if(O(r)&&""!==r)if("string"==typeof r||"number"==typeof r||"boolean"==typeof r)r=r.toString(),o&&"*"!==o&&(r=r.substring(0,parseInt(o,10))),i.push(C(n,r,P(n)?e:null));else if("*"===o)Array.isArray(r)?r.filter(O).forEach(function(t){i.push(C(n,t,P(n)?e:null))}):Object.keys(r).forEach(function(t){O(r[t])&&i.push(C(n,r[t],t))});else{var u=[];Array.isArray(r)?r.filter(O).forEach(function(t){u.push(C(n,t))}):Object.keys(r).forEach(function(t){O(r[t])&&(u.push(encodeURIComponent(t)),u.push(C(n,r[t].toString())))}),P(n)?i.push(encodeURIComponent(e)+"="+u.join(",")):0!==u.length&&i.push(u.join(","))}else";"===n?i.push(encodeURIComponent(e)):""!==r||"&"!==n&&"?"!==n?""===r&&i.push(""):i.push(encodeURIComponent(e)+"=");return i}function O(t){return void 0!==t&&null!==t}function P(t){return";"===t||"&"===t||"?"===t}function C(t,n,e){return n="+"===t||"#"===t?U(n):encodeURIComponent(n),e?encodeURIComponent(e)+"="+n:n}function U(t){return t.split(/(%[0-9A-Fa-f]{2})/g).map(function(t){return/%[0-9A-Fa-f]/.test(t)||(t=encodeURI(t)),t}).join("")}function R(t){var n=[],e=j(t.url,t.params,n);return n.forEach(function(n){delete t.params[n]}),e}function A(t,n){var e,o=this||{},r=t;return s(t)&&(r={url:t,params:n}),r=v({},A.options,o.$options,r),A.transforms.forEach(function(t){e=S(t,e,o.$vm)}),e(r)}function S(t,n,e){return function(o){return t.call(e,o,n)}}function k(t,n,e){var o,r=st(n),i=h(n);m(n,function(n,u){o=f(n)||st(n),e&&(u=e+"["+(i||o?u:"")+"]"),!e&&r?t.add(n.name,n.value):o?k(t,n,u):t.add(u,n)})}function H(t){return new n(function(n){var e=new XDomainRequest,o=function(o){var r=t.respondWith(e.responseText,{status:e.status,statusText:e.statusText});n(r)};t.abort=function(){return e.abort()},e.open(t.method,t.getUrl(),!0),e.timeout=0,e.onload=o,e.onerror=o,e.ontimeout=function(){},e.onprogress=function(){},e.send(t.getBody())})}function I(t,n){!c(t.crossOrigin)&&L(t)&&(t.crossOrigin=!0),t.crossOrigin&&(pt||(t.client=H),delete t.emulateHTTP),n()}function L(t){var n=A.parse(A(t));return n.protocol!==ht.protocol||n.host!==ht.host}function q(t,n){t.emulateJSON&&h(t.body)&&(t.body=A.params(t.body),t.headers["Content-Type"]="application/x-www-form-urlencoded"),p(t.body)&&delete t.headers["Content-Type"],h(t.body)&&(t.body=JSON.stringify(t.body)),n(function(t){var n=t.headers["Content-Type"];if(s(n)&&0===n.indexOf("application/json"))try{t.data=t.json()}catch(n){t.data=null}else t.data=t.text()})}function N(t){return new n(function(n){var e,o,r=t.jsonp||"callback",i="_jsonp"+Math.random().toString(36).substr(2),u=null;e=function(e){var r=0;"load"===e.type&&null!==u?r=200:"error"===e.type&&(r=404),n(t.respondWith(u,{status:r})),delete window[i],document.body.removeChild(o)},t.params[r]=i,window[i]=function(t){u=JSON.stringify(t)},o=document.createElement("script"),o.src=t.getUrl(),o.type="text/javascript",o.async=!0,o.onload=e,o.onerror=e,document.body.appendChild(o)})}function D(t,n){"JSONP"==t.method&&(t.client=N),n(function(n){"JSONP"==t.method&&(n.data=n.json())})}function J(t,n){a(t.before)&&t.before.call(this,t),n()}function M(t,n){t.emulateHTTP&&/^(PUT|PATCH|DELETE)$/i.test(t.method)&&(t.headers["X-HTTP-Method-Override"]=t.method,t.method="POST"),n()}function X(t,n){t.method=t.method.toUpperCase(),t.headers=ct({},_.headers.common,t.crossOrigin?{}:_.headers.custom,_.headers[t.method.toLowerCase()],t.headers),n()}function W(t,n){var e;t.timeout&&(e=setTimeout(function(){t.abort()},t.timeout)),n(function(t){clearTimeout(e)})}function B(t){return new n(function(n){var e=new XMLHttpRequest,o=function(o){var r=t.respondWith("response"in e?e.response:e.responseText,{status:1223===e.status?204:e.status,statusText:1223===e.status?"No Content":u(e.statusText),headers:F(e.getAllResponseHeaders())});n(r)};t.abort=function(){return e.abort()},e.open(t.method,t.getUrl(),!0),e.timeout=0,e.onload=o,e.onerror=o,t.progress&&("GET"===t.method?e.addEventListener("progress",t.progress):/^(POST|PUT)$/i.test(t.method)&&e.upload.addEventListener("progress",t.progress)),t.credentials===!0&&(e.withCredentials=!0),m(t.headers||{},function(t,n){e.setRequestHeader(n,t)}),e.send(t.getBody())})}function F(t){var n,e,o,r={};return m(u(t).split("\n"),function(t){o=t.indexOf(":"),e=u(t.slice(0,o)),n=u(t.slice(o+1)),r[e]?st(r[e])?r[e].push(n):r[e]=[r[e],n]:r[e]=n}),r}function G(t){function e(e){return new n(function(n){function s(){r=i.pop(),a(r)?r.call(t,e,c):(o("Invalid interceptor of type "+typeof r+", must be a function"),c())}function c(e){if(a(e))u.unshift(e);else if(f(e))return u.forEach(function(n){e=l(e,function(e){return n.call(t,e)||e})}),void l(e,n);s()}s()},t)}var r,i=[V],u=[];return f(t)||(t=null),e.use=function(t){i.push(t)},e}function V(t,n){var e=t.client||B;n(e(t))}function _(t){var e=this||{},o=G(e.$vm);return y(t||{},e.$options,_.options),_.interceptors.forEach(function(t){o.use(t)}),o(new mt(t)).then(function(t){return t.ok?t:n.reject(t)},function(t){return t instanceof Error&&r(t),n.reject(t)})}function z(t,n,e,o){var r=this||{},i={};return e=ct({},z.actions,e),m(e,function(e,u){e=v({url:t,params:n||{}},o,e),i[u]=function(){return(r.$http||_)(K(e,arguments))}}),i}function K(t,n){var e,o=ct({},t),r={};switch(n.length){case 2:r=n[0],e=n[1];break;case 1:/^(POST|PUT|PATCH)$/i.test(o.method)?e=n[0]:r=n[0];break;case 0:break;default:throw"Expected up to 4 arguments [params, body], got "+n.length+" arguments"}return o.body=e,o.params=ct({},o.params,r),o}function Q(t){Q.installed||(e(t),t.url=A,t.http=_,t.resource=z,t.Promise=n,Object.defineProperties(t.prototype,{$url:{get:function(){return d(t.url,this,this.$options.url)}},$http:{get:function(){return d(t.http,this,this.$options.http)}},$resource:{get:function(){return t.resource.bind(this)}},$promise:{get:function(){var n=this;return function(e){return new t.Promise(e,n)}}}}))}var Y=0,Z=1,tt=2;t.reject=function(n){return new t(function(t,e){e(n)})},t.resolve=function(n){return new t(function(t,e){t(n)})},t.all=function(n){return new t(function(e,o){function r(t){return function(o){u[t]=o,i+=1,i===n.length&&e(u)}}var i=0,u=[];0===n.length&&e(u);for(var s=0;s<n.length;s+=1)t.resolve(n[s]).then(r(s),o)})},t.race=function(n){return new t(function(e,o){for(var r=0;r<n.length;r+=1)t.resolve(n[r]).then(e,o)})};var nt=t.prototype;nt.resolve=function(t){var n=this;if(n.state===tt){if(t===n)throw new TypeError("Promise settled with itself.");var e=!1;try{var o=t&&t.then;if(null!==t&&"object"==typeof t&&"function"==typeof o)return void o.call(t,function(t){e||n.resolve(t),e=!0},function(t){e||n.reject(t),e=!0})}catch(t){return void(e||n.reject(t))}n.state=Y,n.value=t,n.notify()}},nt.reject=function(t){var n=this;if(n.state===tt){if(t===n)throw new TypeError("Promise settled with itself.");n.state=Z,n.value=t,n.notify()}},nt.notify=function(){var t=this;i(function(){if(t.state!==tt)for(;t.deferred.length;){var n=t.deferred.shift(),e=n[0],o=n[1],r=n[2],i=n[3];try{t.state===Y?r("function"==typeof e?e.call(void 0,t.value):t.value):t.state===Z&&("function"==typeof o?r(o.call(void 0,t.value)):i(t.value))}catch(t){i(t)}}})},nt.then=function(n,e){var o=this;return new t(function(t,r){o.deferred.push([n,e,t,r]),o.notify()})},nt.catch=function(t){return this.then(void 0,t)};var et=window.Promise||t;n.all=function(t,e){return new n(et.all(t),e)},n.resolve=function(t,e){return new n(et.resolve(t),e)},n.reject=function(t,e){return new n(et.reject(t),e)},n.race=function(t,e){return new n(et.race(t),e)};var ot=n.prototype;ot.bind=function(t){return this.context=t,this},ot.then=function(t,e){return t&&t.bind&&this.context&&(t=t.bind(this.context)),e&&e.bind&&this.context&&(e=e.bind(this.context)),new n(this.promise.then(t,e),this.context)},ot.catch=function(t){return t&&t.bind&&this.context&&(t=t.bind(this.context)),new n(this.promise.catch(t),this.context)},ot.finally=function(t){return this.then(function(n){return t.call(this),n},function(n){return t.call(this),et.reject(n)})};var rt=!1,it={},ut=[],st=Array.isArray,ct=Object.assign||b,at=document.documentMode,ft=document.createElement("a");A.options={url:"",root:null,params:{}},A.transforms=[R,T,w],A.params=function(t){var n=[],e=encodeURIComponent;return n.add=function(t,n){a(n)&&(n=n()),null===n&&(n=""),this.push(e(t)+"="+e(n))},k(n,t),n.join("&").replace(/%20/g,"+")},A.parse=function(t){return at&&(ft.href=t,t=ft.href),ft.href=t,{href:ft.href,protocol:ft.protocol?ft.protocol.replace(/:$/,""):"",port:ft.port,host:ft.host,hostname:ft.hostname,pathname:"/"===ft.pathname.charAt(0)?ft.pathname:"/"+ft.pathname,search:ft.search?ft.search.replace(/^\?/,""):"",hash:ft.hash?ft.hash.replace(/^#/,""):""}};var ht=A.parse(location.href),pt="withCredentials"in new XMLHttpRequest,lt=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")},dt=function(){function t(n,e){var o=e.url,r=e.headers,i=e.status,u=e.statusText;lt(this,t),this.url=o,this.body=n,this.headers=r||{},this.status=i||0,this.statusText=u||"",this.ok=i>=200&&i<300}return t.prototype.text=function(){return this.body},t.prototype.blob=function(){return new Blob([this.body])},t.prototype.json=function(){return JSON.parse(this.body)},t}(),mt=function(){function t(n){lt(this,t),this.method="GET",this.body=null,this.params={},this.headers={},ct(this,n)}return t.prototype.getUrl=function(){return A(this)},t.prototype.getBody=function(){return this.body},t.prototype.respondWith=function(t,n){return new dt(t,ct(n||{},{url:this.getUrl()}))},t}(),vt={"X-Requested-With":"XMLHttpRequest"},yt={Accept:"application/json, text/plain, */*"},bt={"Content-Type":"application/json;charset=utf-8"};return _.options={},_.headers={put:bt,post:bt,patch:bt,delete:bt,custom:vt,common:yt},_.interceptors=[J,W,M,q,D,X,I],["get","delete","head","jsonp"].forEach(function(t){_[t]=function(n,e){return this(ct(e||{},{url:n,method:t}))}}),["post","put","patch"].forEach(function(t){_[t]=function(n,e,o){return this(ct(o||{},{url:n,method:t,body:e}))}}),z.actions={get:{method:"GET"},save:{method:"POST"},query:{method:"GET"},update:{method:"PUT"},remove:{method:"DELETE"},delete:{method:"DELETE"}},"undefined"!=typeof window&&window.Vue&&window.Vue.use(Q),Q});