"use strict";require(["../require-config2"],function(){require(["zepto","yanzheng","close_tip","if_menu"],function($,o,s,e){$(function(){function o(){$("#nomoredata").animate({opacity:0},500,"ease-out")}function e(){var s,e='<li><dl><dt><img src="../../../bin/static/img/wxchar.png"></dt><dd>韩梅梅</dd><dd class="grey"><i class="icon_tel"></i>13189569856</dd><dd class="grey">储值<span class="orange">2次</span></dd><div class="clearfix"></div></dl><p><span class="grey">余额</span><br/><span class="orange">￥<i class="i_normal">35.26</i></span></p></li>',n='<li><dl><dt><img src="../../../bin/static/img/ic_shop_round@3x.png"></dt><dd>韩梅梅</dd><dd class="grey"><i class="icon_tel"></i>13189569856</dd><dd class="grey">储值<span class="orange">2次</span></dd><div class="clearfix"></div></dl><p><span class="grey">余额</span><br/><span class="orange">￥<i class="i_normal">35.26</i></span></p></li>';if("1"==a?(s=n,a=0):(s=e,a=1),l++,l>3){$(".load").hide();for(var c=5,r=0;r<c;r++)$(".js_ul_members").append(s);return t=Math.floor($("body").height()).toFixed(0),c<=0?($("#nomoredata").animate({opacity:.7},500,"ease-out"),window.setTimeout(o,3e3),d=!1):d=!0,i=!1,console.log("AJAX:scroll_if=="+i),console.log("AJAX:nomor_show=="+d),!1}for(var r=0;r<20;r++)$(".js_ul_members").append(s);$(".load").hide(),i=!0,t=Math.floor($("body").height()).toFixed(0),console.log("AJAX:scroll_if=="+i),console.log("AJAX:nomor_show=="+d)}var n=null,i=!1,a=1,l=0,d=!1,c=window.innerHeight,t=$("body").height();$(".js_member_list").get(0)&&~function(){$(document).ready(function(){e()})}(),$(window).on("scroll",function(s){var a=document.documentElement.scrollTop||document.body.scrollTop;a<t-c?clearTimeout(n):(s.stopPropagation(),i&&($(".load").show(),i=!1,n=window.setTimeout(e,3e3)),d&&($("#nomoredata").animate({opacity:.7},500,"ease-out"),window.setTimeout(o,3e3),d=!1),console.log("scroll:scroll_if=="+i),console.log("scroll:nomor_show=="+d))}),s.close_tip()})})});
//# sourceMappingURL=../../maps/js/b/member_listbf.js.map
