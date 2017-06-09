"use strict";require(["../require-config"],function(){require(["zepto","ajax_rule","scroll_more","date_change","if_menu"],function($,t,i,e,n){$(function(){function i(){var i=new Object,e=l("activity_id");e&&(i.activity_id=e),t.ajax_rule("/prepaid/v1/api/b/activity_detail","GET","json",i,".zheceng1",c)}function e(){$(".alert_but_confirm").on("click",function(){$("#alert_view").hide(),t.ajax_rule("/prepaid/v1/api/b/activity/stop","POST","json","",".zheceng",a)}),$(".alert_but_cancel").on("click",function(){$("#alert_view").hide()})}function a(){i(),$(".but_content").hide()}function c(t){var i,e=t.status,n="black";1==e?(i="进行中",n="orange",$(".but_content").toggle()):2==e?i="已结束":0==e?(i=t.countdown_day+"天后开始",n="orange",$(".but_content").toggle()):i="已终止",$(".js_status").addClass(n),$(".js_status").html(i);var a=r(t.info.start_time),c=r(t.info.end_time);$(".js_activity_date").html(a+" - "+c);var l=t.info.update_time;$(".js_update_date").html(l),$(".activity_detail").attr("activity_id",t.info.activity_id),$("li.rule").remove(),o(t.rules),$(".js_desription").html(t.info.desc)}function o(t){for(var i=0;i<t.length;i++){var e=t[i],n=parseInt(e.pay_amt/100)+"元",a=parseInt(e.present_amt/100)+"元",c="储值"+n+"送"+a;if(0==i)$(".js_first_rule").html(c);else{var o='<li class="detail_cell rule"><dt class="black">'+c+"</dt></li>";$("#rule_section").append(o)}}}function r(t){var i=t.split(" ");return i[0]}function l(t){var i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(i);return null!=e?unescape(e[2]):null}$(document).ready(function(){i(),$(".js_stop_but").on("click",function(){$("#alert_view").toggle()}),e(),$(".js_modify_but").on("click",function(){var t=location.protocol+"//"+location.host+"/prepaid/v1/page/b/alter_activity.html?activity_id="+l("activity_id");n.goto_url(t)})})})})});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImIvYWN0aXZpdHlfZGV0YWlsLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCIkIiwiYWpheF9ydWxlIiwic2Nyb2xsX21vcmUiLCJkYXRlX2NoYW5nZSIsImlmX21lbnUiLCJhY3Rpdml0eV9kZXRhaWxfcmVxdWVzdCIsImRhdGEiLCJPYmplY3QiLCJhY3Rpdml0eUlkIiwiZ2V0UXVlcnlQYXJhbVN0cmluZyIsImFjdGl2aXR5X2lkIiwicmVxdWVzdF9zdWNjZXNzIiwiY29uZmlndXJfYWxlcnRfYWN0aW9uIiwib24iLCJoaWRlIiwic3RvcF9hY3Rpdml0eV9zdWNjZXNzIiwiZGV0YWlsRGljdCIsInN0YXR1c1N0ciIsInN0YXR1cyIsInN0YXR1c0NvbG9yIiwidG9nZ2xlIiwiY291bnRkb3duX2RheSIsImFkZENsYXNzIiwiaHRtbCIsInN0YXJ0VGltZSIsInNwbGl0RGF0ZVN0cmluZyIsImluZm8iLCJzdGFydF90aW1lIiwiZW5kVGltZSIsImVuZF90aW1lIiwidXBkYXRlVGltZSIsInVwZGF0ZV90aW1lIiwiYXR0ciIsInJlbW92ZSIsImNvbmZpZ3VyUnVsZXMiLCJydWxlcyIsImRlc2MiLCJpIiwibGVuZ3RoIiwicnVsZSIsInBheV9hbXQiLCJwYXJzZUludCIsInByZXNlbnRfYW10IiwicnVsZVN0ciIsImNlbGwiLCJhcHBlbmQiLCJkYXRlU3RyIiwic3RyaW5ncyIsInNwbGl0IiwibmFtZSIsInJlZyIsIlJlZ0V4cCIsInIiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsIm1hdGNoIiwidW5lc2NhcGUiLCJkb2N1bWVudCIsInJlYWR5IiwidXJsX3ZhbCIsInByb3RvY29sIiwiaG9zdCIsImdvdG9fdXJsIl0sIm1hcHBpbmdzIjoiWUFBQUEsVUFBUyxxQkFBc0IsV0FDM0JBLFNBQVMsUUFBUyxZQUFhLGNBQWUsY0FBYyxXQUFZLFNBQVVDLEVBQUdDLEVBQVdDLEVBQWFDLEVBQVlDLEdBQ3JISixFQUFFLFdBZUUsUUFBU0ssS0FDTCxHQUFJQyxHQUFPLEdBQUlDLFFBQ1hDLEVBQWFDLEVBQW9CLGNBQ2pDRCxLQUNBRixFQUFLSSxZQUFjRixHQUV2QlAsRUFBVUEsVUFBVSxvQ0FBcUMsTUFBTyxPQUFRSyxFQUFNLFlBQWFLLEdBRy9GLFFBQVNDLEtBRUxaLEVBQUUsc0JBQXNCYSxHQUFHLFFBQVEsV0FDL0JiLEVBQUUsZUFBZWMsT0FFakJiLEVBQVVBLFVBQVUsa0NBQW1DLE9BQVEsT0FBUSxHQUFJLFdBQVljLEtBRzNGZixFQUFFLHFCQUFxQmEsR0FBRyxRQUFRLFdBQzlCYixFQUFFLGVBQWVjLFNBSXpCLFFBQVNDLEtBQ0xWLElBQ0FMLEVBQUUsZ0JBQWdCYyxPQUd0QixRQUFTSCxHQUFnQkssR0FDckIsR0FFSUMsR0FGQUMsRUFBU0YsRUFBV0UsT0FDcEJDLEVBQWMsT0FFSixJQUFWRCxHQUVBRCxFQUFZLE1BQ1pFLEVBQWMsU0FDZG5CLEVBQUUsZ0JBQWdCb0IsVUFDRixHQUFWRixFQUVORCxFQUFZLE1BQ0ksR0FBVkMsR0FDTkQsRUFBWUQsRUFBV0ssY0FBZ0IsT0FDdkNGLEVBQWMsU0FDZG5CLEVBQUUsZ0JBQWdCb0IsVUFHbEJILEVBQVksTUFFaEJqQixFQUFFLGNBQWNzQixTQUFTSCxHQUN6Qm5CLEVBQUUsY0FBY3VCLEtBQUtOLEVBQ3JCLElBQUlPLEdBQVlDLEVBQWdCVCxFQUFXVSxLQUFLQyxZQUM1Q0MsRUFBWUgsRUFBZ0JULEVBQVdVLEtBQUtHLFNBQ2hEN0IsR0FBRSxxQkFBcUJ1QixLQUFLQyxFQUFZLE1BQU9JLEVBQy9DLElBQUlFLEdBQWFkLEVBQVdVLEtBQUtLLFdBQ2pDL0IsR0FBRSxtQkFBbUJ1QixLQUFLTyxHQUMxQjlCLEVBQUUsb0JBQW9CZ0MsS0FBSyxjQUFjaEIsRUFBV1UsS0FBS2hCLGFBQ3pEVixFQUFFLFdBQVdpQyxTQUNiQyxFQUFjbEIsRUFBV21CLE9BQ3pCbkMsRUFBRSxrQkFBa0J1QixLQUFLUCxFQUFXVSxLQUFLVSxNQUc3QyxRQUFTRixHQUFjQyxHQUNuQixJQUFLLEdBQUlFLEdBQUksRUFBR0EsRUFBSUYsRUFBTUcsT0FBUUQsSUFBSyxDQUNuQyxHQUFJRSxHQUFPSixFQUFNRSxHQUNiRyxFQUFVQyxTQUFTRixFQUFLQyxRQUFTLEtBQU0sSUFDdkNFLEVBQWNELFNBQVNGLEVBQUtHLFlBQVksS0FBTyxJQUMvQ0MsRUFBVSxLQUFPSCxFQUFVLElBQU1FLENBQ3JDLElBQVMsR0FBTEwsRUFFQXJDLEVBQUUsa0JBQWtCdUIsS0FBS29CLE9BQ3ZCLENBQ0YsR0FBSUMsR0FBTyxrREFBb0RELEVBQVUsWUFDekUzQyxHQUFFLGlCQUFpQjZDLE9BQU9ELEtBTXRDLFFBQVNuQixHQUFnQnFCLEdBQ3JCLEdBQUlDLEdBQVVELEVBQVFFLE1BQU0sSUFDNUIsT0FBT0QsR0FBUSxHQUluQixRQUFTdEMsR0FBb0J3QyxHQUN6QixHQUFJQyxHQUFNLEdBQUlDLFFBQU8sUUFBVUYsRUFBTyxpQkFDbENHLEVBQUlDLE9BQU9DLFNBQVNDLE9BQU9DLE9BQU8sR0FBR0MsTUFBTVAsRUFDL0MsT0FBUyxPQUFMRSxFQUFpQk0sU0FBU04sRUFBRSxJQUN6QixLQXJHWHBELEVBQUUyRCxVQUFVQyxNQUFNLFdBRWR2RCxJQUNBTCxFQUFFLGdCQUFnQmEsR0FBRyxRQUFRLFdBRXpCYixFQUFFLGVBQWVvQixXQUVyQlIsSUFDQVosRUFBRSxrQkFBa0JhLEdBQUcsUUFBUSxXQUMzQixHQUFJZ0QsR0FBVVAsU0FBU1EsU0FBVyxLQUFPUixTQUFTUyxLQUFPLHNEQUF3RHRELEVBQW9CLGNBQ3JJTCxHQUFRNEQsU0FBU0giLCJmaWxlIjoiYi9hY3Rpdml0eV9kZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFsnLi4vcmVxdWlyZS1jb25maWcnXSwgZnVuY3Rpb24gKCkge1xuICAgIHJlcXVpcmUoW1wiemVwdG9cIiwgXCJhamF4X3J1bGVcIiwgXCJzY3JvbGxfbW9yZVwiLCBcImRhdGVfY2hhbmdlXCIsXCJpZl9tZW51XCJdLCBmdW5jdGlvbiAoJCwgYWpheF9ydWxlLCBzY3JvbGxfbW9yZSwgZGF0ZV9jaGFuZ2UsaWZfbWVudSkge1xuICAgICAgICAkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvL+iOt+WPluS/oeaBry0tdG9kb1xuICAgICAgICAgICAgICAgIGFjdGl2aXR5X2RldGFpbF9yZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgJCgnLmpzX3N0b3BfYnV0Jykub24oJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgLy/lgZzmraLmtLvliqhcbiAgICAgICAgICAgICAgICAgICAgJCgnI2FsZXJ0X3ZpZXcnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWd1cl9hbGVydF9hY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAkKCcuanNfbW9kaWZ5X2J1dCcpLm9uKCdjbGljaycsZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsX3ZhbCA9IGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QgKyAnL3ByZXBhaWQvdjEvcGFnZS9iL2FsdGVyX2FjdGl2aXR5Lmh0bWw/YWN0aXZpdHlfaWQ9JyArIGdldFF1ZXJ5UGFyYW1TdHJpbmcoJ2FjdGl2aXR5X2lkJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmX21lbnUuZ290b191cmwodXJsX3ZhbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogcHJpdmF0ZSBmdW5jICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICAgICAgZnVuY3Rpb24gYWN0aXZpdHlfZGV0YWlsX3JlcXVlc3QoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2aXR5SWQgPSBnZXRRdWVyeVBhcmFtU3RyaW5nKCdhY3Rpdml0eV9pZCcpO1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpdml0eUlkKXtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5hY3Rpdml0eV9pZCA9IGFjdGl2aXR5SWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFqYXhfcnVsZS5hamF4X3J1bGUoJy9wcmVwYWlkL3YxL2FwaS9iL2FjdGl2aXR5X2RldGFpbCcsICdHRVQnLCAnanNvbicsIGRhdGEsICcuemhlY2VuZzEnLCByZXF1ZXN0X3N1Y2Nlc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/lvLnmoYbmjInpkq7ngrnlh7vkuovku7ZcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvbmZpZ3VyX2FsZXJ0X2FjdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvL+eCueWHu+eahOehruiupFxuICAgICAgICAgICAgICAgICQoJy5hbGVydF9idXRfY29uZmlybScpLm9uKCdjbGljaycsZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcjYWxlcnRfdmlldycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgLy/lgZzmraLmtLvliqjor7fmsYJcbiAgICAgICAgICAgICAgICAgICAgYWpheF9ydWxlLmFqYXhfcnVsZSgnL3ByZXBhaWQvdjEvYXBpL2IvYWN0aXZpdHkvc3RvcCcsICdQT1NUJywgJ2pzb24nLCAnJywgJy56aGVjZW5nJywgc3RvcF9hY3Rpdml0eV9zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL+eCueWHu+eahOWPlua2iFxuICAgICAgICAgICAgICAgICQoJy5hbGVydF9idXRfY2FuY2VsJykub24oJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNhbGVydF92aWV3JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/lgZzmraLmtLvliqjor7fmsYLmiJDlip9cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN0b3BfYWN0aXZpdHlfc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9kZXRhaWxfcmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICQoJy5idXRfY29udGVudCcpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8v6K+35rGC5oiQ5YqfXG4gICAgICAgICAgICBmdW5jdGlvbiByZXF1ZXN0X3N1Y2Nlc3MoZGV0YWlsRGljdCkge1xuICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBkZXRhaWxEaWN0LnN0YXR1cztcbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzQ29sb3IgPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0dXNTdHI7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgLy/mtLvliqjov5vooYzkuK1cbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzU3RyID0gJ+i/m+ihjOS4rSc7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvbG9yID0gJ29yYW5nZSc7XG4gICAgICAgICAgICAgICAgICAgICQoJy5idXRfY29udGVudCcpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmIChzdGF0dXMgPT0gMil7XG4gICAgICAgICAgICAgICAgICAgIC8v5bey57uT5p2fXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1N0ciA9ICflt7Lnu5PmnZ8nO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmIChzdGF0dXMgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1N0ciA9IGRldGFpbERpY3QuY291bnRkb3duX2RheSArICflpKnlkI7lvIDlp4snO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2xvciA9ICdvcmFuZ2UnO1xuICAgICAgICAgICAgICAgICAgICAkKCcuYnV0X2NvbnRlbnQnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5bey57uI5q2iXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1N0ciA9ICflt7Lnu4jmraInO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKCcuanNfc3RhdHVzJykuYWRkQ2xhc3Moc3RhdHVzQ29sb3IpO1xuICAgICAgICAgICAgICAgICQoJy5qc19zdGF0dXMnKS5odG1sKHN0YXR1c1N0cik7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0VGltZSA9IHNwbGl0RGF0ZVN0cmluZyhkZXRhaWxEaWN0LmluZm8uc3RhcnRfdGltZSk7XG4gICAgICAgICAgICAgICAgdmFyIGVuZFRpbWUgICA9IHNwbGl0RGF0ZVN0cmluZyhkZXRhaWxEaWN0LmluZm8uZW5kX3RpbWUpO1xuICAgICAgICAgICAgICAgICQoJy5qc19hY3Rpdml0eV9kYXRlJykuaHRtbChzdGFydFRpbWUgKyAnIC0gJysgZW5kVGltZSk7XG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZVRpbWUgPSBkZXRhaWxEaWN0LmluZm8udXBkYXRlX3RpbWU7XG4gICAgICAgICAgICAgICAgJCgnLmpzX3VwZGF0ZV9kYXRlJykuaHRtbCh1cGRhdGVUaW1lKTtcbiAgICAgICAgICAgICAgICAkKCcuYWN0aXZpdHlfZGV0YWlsJykuYXR0cignYWN0aXZpdHlfaWQnLGRldGFpbERpY3QuaW5mby5hY3Rpdml0eV9pZCk7XG4gICAgICAgICAgICAgICAgJCgnbGkucnVsZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyUnVsZXMoZGV0YWlsRGljdC5ydWxlcyk7XG4gICAgICAgICAgICAgICAgJCgnLmpzX2Rlc3JpcHRpb24nKS5odG1sKGRldGFpbERpY3QuaW5mby5kZXNjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8v5pu05paw6KeE5YiZXG4gICAgICAgICAgICBmdW5jdGlvbiBjb25maWd1clJ1bGVzKHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgICAgICAgICB2YXIgcnVsZSA9IHJ1bGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGF5X2FtdCA9IHBhcnNlSW50KHJ1bGUucGF5X2FtdCAvMTAwKSArJ+WFgyc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmVzZW50X2FtdCA9IHBhcnNlSW50KHJ1bGUucHJlc2VudF9hbXQvMTAwKSArICflhYMnO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcnVsZVN0ciA9ICflgqjlgLwnICsgcGF5X2FtdCArICfpgIEnICsgcHJlc2VudF9hbXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/nrKzkuIDmnaHop4TliJlcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5qc19maXJzdF9ydWxlJykuaHRtbChydWxlU3RyKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNlbGwgPSAnPGxpIGNsYXNzPVwiZGV0YWlsX2NlbGwgcnVsZVwiPjxkdCBjbGFzcz1cImJsYWNrXCI+JyArIHJ1bGVTdHIgKyAnPC9kdD48L2xpPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjcnVsZV9zZWN0aW9uJykuYXBwZW5kKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL+WkhOeQhuaXtumXtFxuICAgICAgICAgICAgZnVuY3Rpb24gc3BsaXREYXRlU3RyaW5nKGRhdGVTdHIpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5ncyA9IGRhdGVTdHIuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/ojrflj5bmn6Xor6Llj4LmlbBcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFF1ZXJ5UGFyYW1TdHJpbmcobmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKF58JilcIiArIG5hbWUgKyBcIj0oW14mXSopKCZ8JClcIik7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5tYXRjaChyZWcpO1xuICAgICAgICAgICAgICAgIGlmIChyICE9IG51bGwpcmV0dXJuIHVuZXNjYXBlKHJbMl0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
