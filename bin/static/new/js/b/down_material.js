/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
"use strict";require(["../require-config"],function(){require(["zepto","yanzheng","ajax_rule"],function($,e,i){$(function(){function o(e){location.href=location.protocol+"//"+location.host+"/prepaid/v1/page/b/succsend_materials.html"}$(document).ready(function(){}),$(".js_email_sub").on("click",function(){e.email_test(".js_mail");var n=$(".error_tips").length;if(n>0)return!1;var a={mail:$(".js_mail").val()};i.ajax_rule("/prepaid/v1/api/b/materials/send","POST","json",a,".zheceng",o)}),$(".js_close_email").on("click",function(){location.href=location.protocol+"//"+location.host+"/prepaid/v1/page/b/index.html"})})})});