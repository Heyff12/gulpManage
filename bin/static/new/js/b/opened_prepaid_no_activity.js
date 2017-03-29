/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
"use strict";require(["../require-config2"],function(){require(["zepto","ajax_rule"],function($,o){$(function(){function e(){o.ajax_rule("/prepaid/v1/api/service/info","GET","json","",".zheceng",t)}function t(o){var e=o.expired;1==e?($(".section_footer_pay").show(),$(".section_footer_create").hide()):($(".section_footer_create").show(),$(".section_footer_pay").hide())}e(),$(".js_create_activity").on("click",function(){alert("创建会员储值活动");var o=location.protocol+"//"+location.host+"/prepaid/v1/page/b/create_activity.html";location.href=o}),$(".js_pay_fees").on("click",function(){alert("调到立即续费的页面");var o=location.protocol+"//"+location.host+"/prepaid/v1/page/b/xufei.html";location.href=o})})})});