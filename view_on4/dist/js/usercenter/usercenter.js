"use strict";function hideMenu(){WeixinJSBridge.call("hideOptionMenu"),WeixinJSBridge.call("hideToolbar")}function to_detail(e){_hmt.push(["_trackEvent","usercenter","click","index_detail"]);var a=$(e).parents("li").attr("data-url");location.href=a}function get_history_touch(){$.ajax({url:"/prepaid/v1/api/c/transactions",type:"GET",dataType:"json",data:{c:get_hash("c"),h:get_hash("h"),pos:$(".js_diff_get dl").length,count:20},beforeSend:function(){$("#load_small_bg").show()},success:function(e){if("0000"!=e.respcd)$("#alert_alert").show(),$(".zheceng").show(),e.respmsg?$("#alert_alert .alert_con_br").html(e.respmsg):$("#alert_alert .alert_con_br").html(e.resperr);else{var a=e.data;$(a).each(function(e,t){var r,d,l,s=((a[e].txamt/100).toFixed(2),(a[e].pay_amt/100).toFixed(2)),n=(a[e].present_amt/100).toFixed(2),c=a[e].sysdtm,o=a[e].biz_type;"1"==o?(r="储值",d="+"+s,l='<dl><dt class="orange">+'+n+'</dt><dd>储值赠送<span class="buy_back orange">储值'+s+"送"+n+'</span></dd><dd class="grey">'+c+'</dd><div class="clearfix"></div></dl><dl><dt class="orange">'+d+"</dt><dd>"+r+'</dd><dd class="grey">'+c+'</dd><div class="clearfix"></div></dl>'):(r="储值消费",d="-"+s,l="<dl><dt>"+d+"</dt><dd>"+r+'</dd><dd class="grey">'+c+'</dd><div class="clearfix"></div></dl>'),$("#js_diff_get").append(l)}),a.length<20?($("#alert_alert").show(),$("#alert_alert .alert_con_br").html("数据已加载完毕"),$(".zheceng").show(),$(".js_click_more").hide()):$(".js_click_more").show(),$(".zheceng").hide()}},error:function(e){$("#alert_alert").show(),$(".zheceng").show(),$("#alert_alert .alert_con_br").html("网络超时!")},complete:function(){$("#load_small_bg").hide()}})}function get_rule_detail(){$.ajax({url:"/prepaid/v1/api/c/rulexplain",type:"GET",dataType:"json",data:{c:get_hash("c"),h:get_hash("h")},beforeSend:function(){$("#load_small_bg").show()},success:function(e){if("0000"!=e.respcd)$("#alert_alert").show(),$(".zheceng1").show(),e.respmsg?$("#alert_alert .alert_con_br").html(e.respmsg):$("#alert_alert .alert_con_br").html(e.resperr);else for(var a=e.data,t=a.length,r=0;r<t;r++){var d="<li><span>"+a[r]+"</span></li>";$(".js_ul_rules").append(d)}},error:function(e){$("#alert_alert").show(),$(".zheceng1").show(),$("#alert_alert .alert_con_br").html("网络超时!")},complete:function(){$("#load_small_bg").hide()}})}function now_date(){var e=new Date,a=e.getFullYear(),t=tow_num(e.getMonth()+1),r=tow_num(e.getDate()),d=tow_num(e.getHours()),l=tow_num(e.getMinutes()),s=tow_num(e.getSeconds()),n=a+"-"+t+"-"+r+" "+d+":"+l+":"+s;return n}function tow_num(e){var a="0"+e,t=a.substr(-2,2);return t}"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",hideMenu,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",hideMenu),document.attachEvent("onWeixinJSBridgeReady",hideMenu)):hideMenu(),require(["../require-config"],function(){require(["jquery"],function($){$(function(){function e(){$.ajax({url:"/prepaid/v1/api/c/merchants",type:"GET",dataType:"json",data:{c:d("c")},beforeSend:function(){$("#load_small_bg").show()},success:function(e){if("0000"!=e.respcd)$("#alert_alert").show(),$(".zheceng").show(),e.respmsg?$("#alert_alert .alert_con_br").html(e.respmsg):$("#alert_alert .alert_con_br").html(e.resperr);else{var a=e.data,t=a.length;if($(".js_company_num").text(t),"0"==t)return!1;$(a).each(function(e,t){var r,d,l,s=(a[e].max_present_amt/100).toFixed(0),n=(a[e].balance/100).toFixed(2),c=a[e].merchant_name,o=a[e].merchant_url,i=a[e].recharge_url,_=(a[e].pay_url,a[e].prepaid_detail,a[e].expired);d=1==a[e].bigmchnt?'<li class="overtime" ':"1"==_?'<li class="overtime" ':"<li ",l='data-url="'+o+'"><header><span class="js_company_name">'+c+'</span></header><p class="grey">储值余额</p><p class="price orange">￥<span class="js_company_diff">'+n+'</span></p><dl class="company_dl"><dt><i class="sale"></i>最高返现金额达<span class="js_company_sale">'+s+'</span>元</dt><dd class="js_recharge_now"><a onclick="_hmt.push(["_trackEvent","usercenter","click","index_buy"])" href="'+i+'">立即储值</a></dd><div class="clearfix"></div></dl><span class="bg_img"></span><span class="zhe" onclick="to_detail(this)"></span></li>',r=d+l,$(".js_usercenter_ul").append(r)})}},error:function(e){$("#alert_alert").show(),$(".zheceng").show(),$("#alert_alert .alert_con_br").html("网络超时!")},complete:function(){$("#load_small_bg").hide()}})}function a(){$.ajax({url:"/prepaid/v1/api/c/merchant_info",type:"GET",dataType:"json",data:{bigmchnt_value:"",h:d("h")},beforeSend:function(){$("#load_small_bg").show()},success:function(e){"0000"!=e.respcd?($("#alert_alert").show(),$(".zheceng").show(),e.respmsg?$("#alert_alert .alert_con_br").html(e.respmsg):$("#alert_alert .alert_con_br").html(e.resperr)):1==e.data.bigmchnt&&$("footer").hide()},error:function(e){$("#alert_alert").show(),$(".zheceng").show(),$("#alert_alert .alert_con_br").html("网络超时!")},complete:function(){$("#load_small_bg").hide()}})}function t(){var e=d("h");$.ajax({url:"/prepaid/v1/api/c/merchants/"+e,type:"GET",dataType:"json",data:{c:d("c")},beforeSend:function(){$("#load_small_bg").show()},success:function(e){if("0000"!=e.respcd)$("#alert_alert").show(),$(".zheceng").show(),e.respmsg?$("#alert_alert .alert_con_br").html(e.respmsg):$("#alert_alert .alert_con_br").html(e.resperr);else{var a=e.data,t=(a.balance/100).toFixed(2),r=a.pay_url,d=a.recharge_url,l=a.prepaid_detail,s=a.merchant_name,n=a.expired,c=a.rule_detail;document.title=s,$(".js_detail_price").text(t),$(".js_charge_list").attr("href",l),$(".js_detail_buy").attr("href",d),$(".js_detail_pay").attr("href",r);for(var o=c.length,i=0;i<o;i++){var _="<li><span>"+c[i]+"</span></li>";$(".js_ul_rules").append(_)}"0"!=n?$(".js_detail_buy").hide():$(".js_detail_buy").show()}},error:function(e){$("#alert_alert").show(),$(".zheceng").show(),$("#alert_alert .alert_con_br").html("网络超时!")},complete:function(){$("#load_small_bg").hide()}})}function r(){$.ajax({url:"/prepaid/v1/api/c/transactions",type:"GET",dataType:"json",data:{c:d("c"),h:d("h"),pos:$("#js_pos").val(),count:20},beforeSend:function(){$("#load_small_bg").show()},success:function(e){if("0000"!=e.respcd)$("#alert_alert").show(),$(".zheceng").show(),e.respmsg?$("#alert_alert .alert_con_br").html(e.respmsg):$("#alert_alert .alert_con_br").html(e.resperr);else{var a=e.data,t=0;$(a).each(function(e,r){for(var d,l,s,n=$(".js_datadl").map(function(){return $(this).attr("data-bizsn")}).get(),c=n.length,o=(a[e].txamt/100).toFixed(2),i=(a[e].pay_amt/100).toFixed(2),_=(a[e].present_amt/100).toFixed(2),h=(a[e].pay_amt/100).toFixed(0),u=(a[e].present_amt/100).toFixed(0),p=a[e].sysdtm,m=a[e].status,g=a[e].biz_type,f=a[e].biz_sn,b="0",e=c-1;e>0;e--)if(n[e]==f){b="1";break}return"1"==b||(t++,"1"==g?(d="储值",l="+"+i,s='<dl class="js_datadl" data-bizsn="'+f+'"><dt class="orange">+'+_+'</dt><dd>储值赠送<span class="buy_back orange">储值'+h+"送"+u+'</span></dd><dd class="grey">'+p+'</dd><div class="clearfix"></div></dl><dl><dt class="orange">'+l+"</dt><dd>"+d+'</dd><dd class="grey">'+p+'</dd><div class="clearfix"></div></dl>'):"2"==g?(l="-"+o,"4"==m?(d="储值消费(已撤销)",s='<dl class="js_datadl grey" data-bizsn="'+f+'"><dt>'+l+"</dt><dd>"+d+'</dd><dd class="grey">'+p+'</dd><div class="clearfix"></div></dl>'):(d="储值消费",s='<dl class="js_datadl" data-bizsn="'+f+'"><dt>'+l+"</dt><dd>"+d+'</dd><dd class="grey">'+p+'</dd><div class="clearfix"></div></dl>')):"3"==g?(d="消费退款",l="+"+o,s='<dl class="js_datadl" data-bizsn="'+f+'"><dt>'+l+"</dt><dd>"+d+'</dd><dd class="grey">'+p+'</dd><div class="clearfix"></div></dl>'):"4"==g&&(d="手动储值",l="+"+i,s=u>0?'<dl class="js_datadl" data-bizsn="'+f+'"><dt class="orange">+'+_+'</dt><dd>储值赠送<span class="buy_back orange">储值'+h+"送"+u+'</span></dd><dd class="grey">'+p+'</dd><div class="clearfix"></div></dl><dl><dt class="orange">'+l+"</dt><dd>"+d+'</dd><dd class="grey">'+p+'</dd><div class="clearfix"></div></dl>':'<dl class="js_datadl" data-bizsn="'+f+'"><dt class="orange">'+l+"</dt><dd>"+d+'</dd><dd class="grey">'+p+'</dd><div class="clearfix"></div></dl>'),void $("#js_diff_get").append(s))});var r=$("#js_pos").val()-0;a.length<20?(t>0?c=!0:($("#nomoredata").animate({opacity:.7},500),window.setTimeout(l,3e3),c=!1),n=!1):(r+=20,$("#js_pos").val(r),n=!0),$(".load").hide(),i=Math.floor($("body").height()).toFixed(0)}},error:function(e){$("#alert_alert").show(),$(".zheceng").show(),$("#alert_alert .alert_con_br").html("网络超时!")},complete:function(){$("#load_small_bg").hide()}})}function d(e){var a;if(location.href.split("?").length<2)return!1;for(var t=location.href.split("?")[1].split("&"),r=t.length,d=0;d<r;d++){var l=t[d].split("=");if(l[0]==e)return a=l[1]}}function l(){$("#nomoredata").animate({opacity:0},500)}$(".js_usercenter_index").get(0)&&~function(){$(document).ready(function(){e()})}(),$(".js_usercenter_detail").get(0)&&~function(){$(document).ready(function(){a(),t()})}();var s=null,n=!1,c=!1,o=window.innerHeight,i=$("body").height();$(".js_usercenter_list").get(0)&&~function(){$(document).ready(function(){r()}),$(window).on("scroll",function(e){var a=document.documentElement.scrollTop||document.body.scrollTop;a<i-o?clearTimeout(s):(e.stopPropagation(),n&&($(".load").show(),n=!1,s=window.setTimeout(r,2e3)),c&&($("#nomoredata").animate({opacity:.7},500),window.setTimeout(l,2e3),c=!1))})}(),$(".js_alert_con_close").on("click",function(){$(".alert_con").hide(),$(".zheceng").hide(),$(".zheceng1").hide()})})})});
//# sourceMappingURL=../../maps/js/usercenter/usercenter.js.map