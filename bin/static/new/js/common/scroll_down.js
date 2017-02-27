/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
define(["zepto"],function($){function o(){d=Math.floor(n.body_height-n.window_height).toFixed(0),t=setInterval(e,20)}function e(o){o=d;var e=document.documentElement.scrollTop||document.body.scrollTop;if(!(o<=0)){var n=Math.ceil(o/10),l=e+n;l>=o?(clearInterval(t),document.documentElement.scrollTop=l>o?l:o,document.body.scrollTop=l>o?l:o):(document.documentElement.scrollTop=l,document.body.scrollTop=l)}}var t,n={body_height:$("body").height(),window_height:window.innerHeight},d=0;return{scrolldown_data:n,GoTop:o}});