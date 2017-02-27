/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
require(["../require-config2"],function(){require(["zepto","ajax_rule","localstorage","if_menu"],function($,e,t,c){$(function(){var e=!1;$(".js_has_read").on("click",function(){0==e?(e=!0,$(".js_has_read")[0].src="../../static_dest/static/new/img/ic_selected.png"):(e=!1,$(".js_has_read")[0].src="../../static_dest/static/new/img/ic_unselect.png")}),$(".content_protocol_title").on("click",function(){alert("查看协议")}),$(".js_pay_use").on("click",function(){0==e?alert("还没有阅读协议"):alert("已经阅读协议")}),$(".js_see_other").on("click",function(){alert("查看其他案例")})})})});