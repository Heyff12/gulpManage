/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
define(function(){function t(t){var n=t.substr(0,10),r=n.split("-"),u=r[0],i=s(r[1]),e=s(r[2]),c=u+"."+i+"."+e;return c}function n(t,n){var r=t.substr(0,10),u=n.substr(0,10),i=r.split("-"),e=u.split("-"),c=i[0],o=e[0],a=s(e[1]),f=s(e[2]);return c!=o?o+"."+a+"."+f:a+"."+f}function r(t){var n=t.substr(0,10),r=n.split("-"),u=r[0],i=s(r[1]),e=s(r[2]),c=u+"年"+i+"月"+e+"日";return c}function u(t,n){var r=t.substr(0,10),u=n.substr(0,10),i=r.split("-"),e=u.split("-"),c=i[0],o=e[0],a=s(e[1]),f=s(e[2]);return c!=o?o+"年"+a+"月"+f+"日":a+"月"+f+"日"}function i(t){var n=t.split("-"),r=n[0],u=e(n[1]),i=e(n[2]),s=r+"-"+u+"-"+i;return s}function s(t){return t<10?t.substr(-1):t}function e(t){return t<10?"0"+t:t}return{time_change:t,time_change2:n,time_change_long:i,time_change_word:r,time_change_word2:u}});