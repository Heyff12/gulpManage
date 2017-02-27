/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
define(function(){function o(){"undefined"!=typeof QFPAY&&("-1"==location.href.indexOf("/prepaid/v1/page/b/index.html")?QFPAY.call("setNavMenu",{menus:[],buttons:[]},function(o){console.log(o.ret)}):QFPAY.call("setNavMenu",{menus:[{type:"uri",uri:location.protocol+"//"+location.host+"/prepaid/v1/page/b/transactions/consume.html",icon:location.protocol+"//"+location.host+"/prepaid/v1/static/new/img/ic_mingxi.png",title:"储值消费"},{type:"uri",uri:location.protocol+"//"+location.host+"/prepaid/v1/page/b/activity_history.html",icon:location.protocol+"//"+location.host+"/prepaid/v1/static/new/img/ic_history.png",title:"历史活动"},{type:"uri",uri:location.protocol+"//"+location.host+"/prepaid/v1/page/b/user_guide.html",icon:location.protocol+"//"+location.host+"/prepaid/v1/static/new/img/ic_jiaocheng.png",title:"储值教程"}],buttons:[]},function(o){console.log(o.ret)}))}function t(o){"undefined"!=typeof QFPAY?QFPAY.call("openUri",{uri:o},function(o){console.log(o.ret)}):location.href=o}return{if_menu:o,goto_url:t}});