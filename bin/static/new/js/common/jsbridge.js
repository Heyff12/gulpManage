/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
define(function(){function n(n){if(window.QFPAY)return n(window.QFPAY);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(n);window.WVJBCallbacks=[n];var e=document.createElement("iframe");e.style.display="none",e.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(e),setTimeout(function(){document.documentElement.removeChild(e)},0)}function e(n){window.QFPAY?n(window.QFPAY):document.addEventListener("WebViewJavascriptBridgeReady",function(){n(window.QFPAY)},!1)}function i(n){c()&&n.init(function(n,e){var i={"Javascript Responds":"Wee!"};e(i)}),o.H5CallNative=function(e){n.call(e.name,e.data,function(n){e.callback&&e.callback(n)})},t()}function t(){for(var n in a)o.H5CallNative(a[n])}var a=[],o={H5CallNative:function(n){a.push(n)}},c=function(){var n=navigator.userAgent;return/Android/i.test(n)};return c()?e(i):n(i),{JSBridge:o}});