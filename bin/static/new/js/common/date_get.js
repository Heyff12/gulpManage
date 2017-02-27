/**
 * rechargeB - rechargeB详情
 * @version v1.0.0
 * @link 
 * @license ISC
 */
define(function(){function t(t){for(var e=[],n=t;n<=t+2;n++)e.push({id:n+"",value:n+"年"});return e}function e(){for(var t=[],e=1;e<=12;e++)t.push({id:e+"",value:e+"月"});return t}function n(t){for(var e=[],n=1;n<=t;n++)e.push({id:n+"",value:n+"日"});return e}var o=new Date,u=o.getFullYear(),i=o.getMonth()+1,r=o.getDate(),a=function(e){setTimeout(function(){e(t(u))},0)},f=function(t,n){setTimeout(function(){n(e())},0)},s=function(t,e,o){setTimeout(function(){if(/^3|5|7|8|10|12$/.test(e))o(n(31));else if(/^4|6|9|11$/.test(e))o(n(30));else if(/^1$/.test(e))o(n(31));else{if(!/^2$/.test(e))throw new Error("month is illegal");o(t%4===0&&t%100!==0||t%400===0?n(29):n(28))}},0)};return{yearData:a,monthData:f,dateData:s,nowYear:u,nowMonth:i,nowDate:r}});