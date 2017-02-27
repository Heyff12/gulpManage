/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
require(["../require-config"],function(){require(["zepto","yanzheng","ajax_rule"],function($,o,e){$(function(){function i(o){location.href=location.protocol+"//"+location.host+"/prepaid/v1/page/b/succsend_materials.html"}$(document).ready(function(){}),$(".js_email_sub").on("click",function(){o.email_test(".js_mail");var n=$(".error_tips").length;if(n>0)return!1;var a={mail:$(".js_mail").val()};e.ajax_rule("/prepaid/v1/api/b/materials/send","POST","json",a,".zheceng",i)}),$(".js_close_email").on("click",function(){location.href=location.protocol+"//"+location.host+"/prepaid/v1/page/b/index.html"})})})});