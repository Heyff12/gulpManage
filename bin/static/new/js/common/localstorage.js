/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
define(function(){function t(){$(".js_storage").each(function(t,e){var a=$(this).attr("name"),n=$(this).val();localStorage.setItem(a,n)})}function e(t){$(".js_storage").each(function(t,e){var a,n=$(this).attr("name");a=null==n?$(this).attr("data-name"):$(this).attr("name");var o=localStorage.getItem(a);return!o||void(null==n?$(this).text(o):$(this).val(o))}),t&&t()}function a(){localStorage.clear()}function n(t){$(t).each(function(e,a){var n=t[e];localStorage.setItem(n,"")})}function o(t){return localStorage.getItem(t)}function r(t,e){localStorage.setItem(t,e)}function c(t){var e={};return $(t).each(function(a,n){var o=t[a],r=localStorage.getItem(o);return!r||void(e[o]=r)}),e}return{set_storage:t,get_storage:e,clear_storage:a,clean_storage:n,getone_storage:o,setone_storage:r,get_data_all:c}});