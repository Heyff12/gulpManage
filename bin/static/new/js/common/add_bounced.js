/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
define(["zepto"],function($){function e(){$("body").append(a),$("body").append(c),$("body").append(n),$("body").append(i)}function d(e){var d=$(e).height(),a=d/2-20;$(e).css("marginTop",-a+"px")}var a='<div id="loading"></div>',i='<div class="zheceng"></div><div class="zheceng1"></div><div class="zheceng2"></div>',n='<div class="alert_con" id="alert_alert"><div class="alert_con_t orange">提示<span class="pass_close js_alert_con_close">×</span></div><div class="alert_con_b"><div class="alert_con_br"></div><div class="clearfix"></div><span class="alert_con_close js_alert_con_close">确定</span></div></div>',c='<div id="load_small_bg"><div id="load_small"><i></i><br/><span>数据加载中</span></div></div>',s=function(){$(".js_alert_con_close").on("click",function(){$(".alert_con").hide(),$(".zheceng").hide(),$(".zheceng1").hide(),$(".zheceng2").hide()})};return{add_bounced:e,close_tip:s,alert_top:d}});