"use strict";require(["../require-config"],function(){require(["zepto","yanzheng","ajax_rule","native","if_menu"],function($,i,o,e,n){$(function(){function a(i){var o=location.protocol+"//"+location.host+"/prepaid/v1/page/b/succsend_materials.html";n.goto_url(o)}$(document).ready(function(){}),$(".js_email_sub").on("click",function(){i.email_test(".js_mail");var e=$(".error_tips").length;if(e>0)return!1;var n={mail:$(".js_mail").val()};o.ajax_rule("/prepaid/v1/api/b/materials/send","POST","json",n,".zheceng",a)}),$(".js_close_email").on("click",function(){var i={uri:location.protocol+"//"+location.host+"/prepaid/v1/page/b/index.html"};e.navToUri(i,function(i){console.log(i.ret)})})})})});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImIvZG93bl9tYXRlcmlhbC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiJCIsInlhbnpoZW5nIiwiYWpheF9ydWxlIiwibmF0aXZlIiwiaWZfbWVudSIsInNlbmRfcGljIiwicmV0dXJuX2RhdGEiLCJ1cmwiLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCIsImdvdG9fdXJsIiwiZG9jdW1lbnQiLCJyZWFkeSIsIm9uIiwiZW1haWxfdGVzdCIsImVycm9yX2xlbiIsImxlbmd0aCIsImRhdGFfbWFpbCIsIm1haWwiLCJ2YWwiLCJjbG9zZVRvVXJpIiwidXJpIiwibmF2VG9VcmkiLCJjYiIsImNvbnNvbGUiLCJsb2ciLCJyZXQiXSwibWFwcGluZ3MiOiJZQUFBQSxVQUFTLHFCQUFzQixXQUMzQkEsU0FBUyxRQUFTLFdBQVksWUFBYSxTQUFVLFdBQVksU0FBU0MsRUFBR0MsRUFBVUMsRUFBV0MsRUFBUUMsR0FDdEdKLEVBQUUsV0FtREUsUUFBU0ssR0FBU0MsR0FLZCxHQUFJQyxHQUFPQyxTQUFTQyxTQUFXLEtBQU9ELFNBQVNFLEtBQU8sNENBQ3RETixHQUFRTyxTQUFTSixHQXREckJQLEVBQUVZLFVBQVVDLE1BQU0sY0FJbEJiLEVBQUUsaUJBQWlCYyxHQUFHLFFBQVMsV0FFM0JiLEVBQVNjLFdBQVcsV0FDcEIsSUFBSUMsR0FBWWhCLEVBQUUsZUFBZWlCLE1BQ2pDLElBQUlELEVBQVksRUFDWixPQUFPLENBRVgsSUFBSUUsSUFBY0MsS0FBUW5CLEVBQUUsWUFBWW9CLE1BR3hDbEIsR0FBVUEsVUFBVSxtQ0FBb0MsT0FBUSxPQUFRZ0IsRUFBVyxXQUFZYixLQUduR0wsRUFBRSxtQkFBbUJjLEdBQUcsUUFBUyxXQXNCN0IsR0FBSU8sSUFDQUMsSUFBSWQsU0FBU0MsU0FBVyxLQUFPRCxTQUFTRSxLQUFPLGdDQUVuRFAsR0FBT29CLFNBQVNGLEVBQVksU0FBVUcsR0FDbENDLFFBQVFDLElBQUlGLEVBQUdHIiwiZmlsZSI6ImIvZG93bl9tYXRlcmlhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoWycuLi9yZXF1aXJlLWNvbmZpZyddLCBmdW5jdGlvbigpIHtcbiAgICByZXF1aXJlKFtcInplcHRvXCIsIFwieWFuemhlbmdcIiwgXCJhamF4X3J1bGVcIiwgXCJuYXRpdmVcIiwgXCJpZl9tZW51XCJdLCBmdW5jdGlvbigkLCB5YW56aGVuZywgYWpheF9ydWxlLCBuYXRpdmUsIGlmX21lbnUpIHtcbiAgICAgICAgJChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vLS0t5Y+W5raI5LqGbmF0aXZlIGlmX21lbnXnmoTlvJXnlKgwMTA2XG4gICAgICAgICAgICAvL+WPkemAgeeJqeaWmS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8v54K55Ye75o+Q5LqkXG4gICAgICAgICAgICAkKCcuanNfZW1haWxfc3ViJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy/pqozor4Hpgq7nrrFcbiAgICAgICAgICAgICAgICB5YW56aGVuZy5lbWFpbF90ZXN0KCcuanNfbWFpbCcpO1xuICAgICAgICAgICAgICAgIHZhciBlcnJvcl9sZW4gPSAkKCcuZXJyb3JfdGlwcycpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JfbGVuID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBkYXRhX21haWwgPSB7ICdtYWlsJzogJCgnLmpzX21haWwnKS52YWwoKSB9O1xuICAgICAgICAgICAgICAgIC8v5rWL6K+V5oiQ5Yqf5ZCO5pWI5p6cXG4gICAgICAgICAgICAgICAgLy9zZW5kX3BpYygpO1xuICAgICAgICAgICAgICAgIGFqYXhfcnVsZS5hamF4X3J1bGUoJy9wcmVwYWlkL3YxL2FwaS9iL21hdGVyaWFscy9zZW5kJywgJ1BPU1QnLCAnanNvbicsIGRhdGFfbWFpbCwgJy56aGVjZW5nJywgc2VuZF9waWMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvL+eCueWHu+WFs+mXrVxuICAgICAgICAgICAgJCgnLmpzX2Nsb3NlX2VtYWlsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy/ov5Tlm57lgqjlgLzmtLvliqjpppbpobVcbiAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbi5ocmVmID0gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdCArICcvcHJlcGFpZC92MS9wYWdlL2IvaW5kZXguaHRtbCc7XG4gICAgICAgICAgICAgICAgLy8gdmFyIHVybF92YWwgPSBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0ICsgJy9wcmVwYWlkL3YxL3BhZ2UvYi9pbmRleC5odG1sJztcbiAgICAgICAgICAgICAgICAvLyBpZl9tZW51LmdvdG9fdXJsKHVybF92YWwpO1xuICAgICAgICAgICAgICAgIC8vIGlmICh0eXBlb2YgUUZQQVkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFyIGdvX3VybCA9IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVyaTogbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdCArICcvcHJlcGFpZC92MS9wYWdlL2IvaW5kZXguaHRtbCcsXG4gICAgICAgICAgICAgICAgLy8gICAgIH07XG4gICAgICAgICAgICAgICAgLy8gICAgIG5hdGl2ZS5vcGVuVXJpKGdvX3VybCwgZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGNiLnJldCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vICAgICAvL+aaguaXtumakOiXj+WFs+mXreaJgOaciS0tLeS4i+asoeeJiOacrOabtOaWsOS9v+eUqFxuICAgICAgICAgICAgICAgIC8vICAgICAvLyB2YXIgY2xvc2VfdXJsID0ge307XG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIG5hdGl2ZS5jbG9zZUFsbChjbG9zZV91cmwsIGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIC8vICAgICBjb25zb2xlLmxvZyhjYi5yZXQpO1xuICAgICAgICAgICAgICAgIC8vICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICBsb2NhdGlvbi5ocmVmID0gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdCArICcvcHJlcGFpZC92MS9wYWdlL2IvaW5kZXguaHRtbCc7XG4gICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAgICAgLy90b2RvOiBjbG9zZSBhbGwgZ290b3VybCDpppbpobVcbiAgICAgICAgICAgICAgICB2YXIgY2xvc2VUb1VyaSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJpOmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QgKyAnL3ByZXBhaWQvdjEvcGFnZS9iL2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbmF0aXZlLm5hdlRvVXJpKGNsb3NlVG9VcmksIGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjYi5yZXQpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy/mj5DkuqTpgq7nrrFcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbmRfcGljKHJldHVybl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gJCgnLmpzX2Rvd25fbWF0ZXJpYWxfaW5kZXgnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgLy8gJCgnLmpzX2Rvd25fc3VjY2VzcycpLnNob3coKTtcbiAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC50aXRsZT0n5Y+R6YCB5oiQ5YqfJ1xuICAgICAgICAgICAgICAgIC8vICQoJ2JvZHknKS5hZGRDbGFzcygnYmdfd2hpdGUnKTtcbiAgICAgICAgICAgICAgICB2YXIgdXJsICA9IGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QgKyAnL3ByZXBhaWQvdjEvcGFnZS9iL3N1Y2NzZW5kX21hdGVyaWFscy5odG1sJztcbiAgICAgICAgICAgICAgICBpZl9tZW51LmdvdG9fdXJsKHVybCk7XG4gICAgICAgICAgICAgICAgLy8gaWYgKHR5cGVvZiBRRlBBWSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIC8vICAgICB2YXIgZ29fdXJsID0ge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdXJpOiBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0ICsgJy9wcmVwYWlkL3YxL3BhZ2UvYi9zdWNjc2VuZF9tYXRlcmlhbHMuaHRtbCcsXG4gICAgICAgICAgICAgICAgLy8gICAgIH07XG4gICAgICAgICAgICAgICAgLy8gICAgIG5hdGl2ZS5vcGVuVXJpKGdvX3VybCwgZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGNiLnJldCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGxvY2F0aW9uLmhyZWYgPSBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0ICsgJy9wcmVwYWlkL3YxL3BhZ2UvYi9zdWNjc2VuZF9tYXRlcmlhbHMuaHRtbCc7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
