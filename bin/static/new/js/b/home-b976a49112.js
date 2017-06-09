"use strict";require(["../require-config"],function(){require(["zepto","ajax_rule","yanzheng","date_change","scroll_more","if_menu","native"],function($,o,t,i,e,a,n){$(function(){var i=!1,c={menus:[{type:"uri",uri:"http://wx.qfpay.com/near-v2/save-currency.html",icon:location.protocol+"//"+location.host+"/prepaid/v1/static/new/img/ic_praise.png",title:"优秀案例"},{type:"uri",uri:location.protocol+"//"+location.host+"/prepaid/v1/page/b/user_guide.html",icon:location.protocol+"//"+location.host+"/prepaid/v1/static/new/img/ic_question.png",title:"常见问题"}],buttons:[{type:"uri",uri:location.protocol+"//"+location.host+"/prepaid/v1/page/b/bill.html",icon:"",title:"账单"}]};n.setNavMenu(c,function(o){console.log(o.ret)}),e.add_load_img(".section_action");new Vue({el:"#wap",data:{stored:{user_num:0,total_txamt:0,total_pay_amt:0,total_balances:0},membershome:[],activities:[],due_fee:0,action_ing:1,money_url:location.protocol+"//"+location.host+"/prepaid/v1/api/b/stat/activities",member_url:location.protocol+"//"+location.host+"/prepaid/v1/api/b/members",activity_url:location.protocol+"//"+location.host+"/prepaid/v1/api/b/activity_history",due_url:location.protocol+"//"+location.host+"/prepaid/v1/api/service/info",action_all:"",action_count:6,action_pos:6},created:function(){this.get_money(),this.get_member(),this.get_activity(),this.get_due()},mounted:function(){e.scroll_more(this.get_moredata)},updated:function(){e.scroll_data.body_height=Math.floor($("body").height()+90).toFixed(0),console.log("AJAX:body_height=="+e.scroll_data.body_height)},methods:{goto_members:function(){var o=location.protocol+"//"+location.host+"/prepaid/v1/page/b/members/index.html";a.goto_url(o)},goto_downpic:function(){var o=location.protocol+"//"+location.host+"/prepaid/v1/page/b/show_material.html";a.goto_url(o)},goto_scandetail:function(o){var t=location.protocol+"//"+location.host+"/prepaid/v1/page/b/activity_detail.html?activity_id="+o;a.goto_url(t)},goto_create_ac:function(){var o=location.protocol+"//"+location.host+"/prepaid/v1/page/b/create_activity.html";a.goto_url(o)},goto_renew:function(){var o={uri:i?"hjsh://member/pay":"nearmcht://view-member-pay"};n.openUri(o,function(o){var t={uri:location.protocol+"//"+location.host+"/prepaid/v1/page/b/index.html"};n.navToUri(t,function(o){console.log(o.ret)})})},goto_now_members:function(o){var t=location.protocol+"//"+location.host+"/prepaid/v1/page/b/members/specifies-activity.html?activity_id="+o;a.goto_url(t)},goto_now_money:function(o){var t=location.protocol+"//"+location.host+"/prepaid/v1/page/b/prepaid_amt_of_activity.html?activity_id="+o;a.goto_url(t)},get_money:function(){var t=this;o.ajax_rule(t.money_url,"get","json","",".zheceng",function(o){t.stored=o})},get_member:function(){var t=this;o.ajax_rule(t.member_url,"get","json","",".zheceng1",function(o){0==o.length?t.membershome=[]:t.membershome=o.slice(0,5)})},get_activity:function(){var t=this,i={pos:0,count:1e5};o.ajax_rule(t.activity_url,"get","json",i,".zheceng1",function(o){t.action_all=o,t.activities=t.action_all.slice(0,t.action_pos),t.action_ing=t.activities[0].status,1==t.activities.length&&t.donghua_if(t.activities[0].activity_id),t.action_all.length-t.action_pos<=0?(e.nomoredata_show(),window.setTimeout(e.nomoredata_hide,2e3),e.scroll_data.nomor_show=!1,e.scroll_data.scroll_if=!1):(t.action_pos+=t.action_count,e.scroll_data.scroll_if=!0),e.scroll_data.body_height=Math.floor($("body").height()+90).toFixed(0),$(".load").hide()})},get_due:function(){var e=this;({h:t.get_hash("h")});o.ajax_rule(e.due_url,"get","json","",".zheceng2",function(o){e.due_fee=o.expired,i=o.is_qfgroup})},get_moredata:function(){this.activities=this.action_all.slice(0,this.action_pos),console.log(this.activities.length),this.action_all.length-this.action_pos<=0?(e.nomoredata_show(),window.setTimeout(e.nomoredata_hide,2e3),e.scroll_data.nomor_show=!1,e.scroll_data.scroll_if=!1):(this.action_pos+=this.action_count,e.scroll_data.scroll_if=!0),$(".load").hide(),console.log("AJAX:scroll_if=="+e.scroll_data.scroll_if),console.log("AJAX:nomor_show=="+e.scroll_data.nomor_show)},donghua_if:function(t){var i=this,e={guide_type:1,activity_id:t};o.ajax_rule("/prepaid/v1/api/b/guide","get","json",e,".zheceng2",function(o){var e=o.show;if("1"==e){var a={uri:"hjsh://ppay/guide"};n.openUri(a,function(o){console.log(o.ret)}),i.donghua_off(t)}})},donghua_off:function(t){var i={guide_type:1,activity_id:t};o.ajax_rule("/prepaid/v1/api/b/guide","POST","json",i,".zheceng1")},datechange:function(o){var t=o.substr(0,10),i=t.split("-"),e=i[0],a=this.num_change(i[1]),n=this.num_change(i[2]),c=e+"."+a+"."+n;return c},datechange2:function(o,t){var i=o.substr(0,10),e=t.substr(0,10),a=i.split("-"),n=e.split("-"),c=a[0],r=n[0],l=this.num_change(n[1]),s=this.num_change(n[2]);return c!=r?r+"."+l+"."+s:l+"."+s},num_change:function(o){return o<10?o.substr(-1):o}}})})})});
//# sourceMappingURL=../../maps/js/b/home.js.map
