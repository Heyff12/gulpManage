/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
define(["add_bounced"],function(e){function r(e,r,a,t,l,o,n){$.ajax({url:e,type:r,dataType:a,data:t,beforeSend:function(e){$("#load_small_bg").show()},success:function(e){if("0000"!=e.respcd)$("#alert_alert").show(),$(l).show(),e.respmsg?$("#alert_alert .alert_con_br").html(e.respmsg):$("#alert_alert .alert_con_br").html(e.resperr),n&&n();else{var r=e.data;o&&o(r)}},error:function(e){$("#alert_alert").show(),$(l).show(),$("#alert_alert .alert_con_br").html("网络超时!")},complete:function(){$("#load_small_bg").hide()}})}return e.add_bounced(),e.close_tip(),{ajax_rule:r}});