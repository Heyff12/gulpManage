/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
define(["zepto"],function($){function o(o){$(window).on("scroll",function(e){var i=document.documentElement.scrollTop||document.body.scrollTop;console.log("document.body.scrollTop--"+document.body.scrollTop),console.log(d.body_height-a),i<d.body_height-a?clearTimeout(d.timer_rt):(e.stopPropagation(),d.scroll_if&&($(".load").show(),d.scroll_if=!1,d.timer_rt=window.setTimeout(o,2e3)),d.nomor_show&&(n(),window.setTimeout(t,2e3),d.nomor_show=!1))})}function e(o,e){$(o).append(d.load_img),$(o).append(d.nomore_word),e?$("#nomoredata").text(e):$("#nomoredata").text("没有更多数据了")}function t(){$("#nomoredata").animate({opacity:0},500,"ease-out")}function n(){$("#nomoredata").animate({opacity:.7},500,"ease-out")}var d={timer_rt:null,scroll_if:!1,nomor_show:!1,body_height:$("body").height(),load_img:'<div class="load"></div>',nomore_word:'<div class="nomoredata" id="nomoredata"></div>'},a=window.innerHeight;return{scroll_more:o,nomoredata_hide:t,nomoredata_show:n,scroll_data:d,add_load_img:e}});