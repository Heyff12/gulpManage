define(function(){function n(n){if(window.QFPAY)return n(window.QFPAY);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(n);window.WVJBCallbacks=[n];var e=document.createElement("iframe");e.style.display="none",e.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(e),setTimeout(function(){document.documentElement.removeChild(e)},0)}function e(n){window.QFPAY?n(window.QFPAY):document.addEventListener("WebViewJavascriptBridgeReady",function(){n(window.QFPAY)},!1)}function i(n){c()&&n.init(function(n,e){var i={"Javascript Responds":"Wee!"};e(i)}),o.H5CallNative=function(e){n.call(e.name,e.data,function(n){e.callback&&e.callback(n)})},t()}function t(){for(var n in a)o.H5CallNative(a[n])}var a=[],o={H5CallNative:function(n){a.push(n)}},c=function(){var n=navigator.userAgent;return/Android/i.test(n)};return c()?e(i):n(i),{JSBridge:o}});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9qc2JyaWRnZS5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJzZXR1cFdlYlZpZXdKYXZhc2NyaXB0QnJpZGdlIiwiY2FsbGJhY2siLCJ3aW5kb3ciLCJRRlBBWSIsIldWSkJDYWxsYmFja3MiLCJwdXNoIiwiV1ZKQklmcmFtZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwiZGlzcGxheSIsInNyYyIsImRvY3VtZW50RWxlbWVudCIsImFwcGVuZENoaWxkIiwic2V0VGltZW91dCIsInJlbW92ZUNoaWxkIiwiY29ubmVjdFdlYlZpZXdKYXZhc2NyaXB0QnJpZGdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJyaWRnZSIsImlzQW5kcm9pZCIsImluaXQiLCJtZXNzYWdlIiwicmVzcG9uc2VDYWxsYmFjayIsImRhdGEiLCJKYXZhc2NyaXB0IFJlc3BvbmRzIiwiSlNCcmlkZ2UiLCJINUNhbGxOYXRpdmUiLCJwYXJhbSIsImNhbGwiLCJuYW1lIiwicmVzcG9uc2UiLCJydW5BY3Rpb25RdWV1ZSIsImluZGV4IiwiYWN0aW9uUXVldWUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRlc3QiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFBLFdBbUJBLFFBQUFDLEdBQUFDLEdBRUEsR0FBQUMsT0FBQUMsTUFFQSxNQUFBRixHQUFBQyxPQUFBQyxNQUVBLElBQUFELE9BQUFFLGNBRUEsTUFBQUYsUUFBQUUsY0FBQUMsS0FBQUosRUFFQUMsUUFBQUUsZUFBQUgsRUFDQSxJQUFBSyxHQUFBQyxTQUFBQyxjQUFBLFNBQ0FGLEdBQUFHLE1BQUFDLFFBQUEsT0FDQUosRUFBQUssSUFBQSxpQ0FDQUosU0FBQUssZ0JBQUFDLFlBQUFQLEdBQ0FRLFdBQUEsV0FDQVAsU0FBQUssZ0JBQUFHLFlBQUFULElBQ0EsR0FJQSxRQUFBVSxHQUFBZixHQUNBQyxPQUFBQyxNQUNBRixFQUFBQyxPQUFBQyxPQUVBSSxTQUFBVSxpQkFBQSwrQkFBQSxXQUNBaEIsRUFBQUMsT0FBQUMsU0FDQSxHQVVBLFFBQUFGLEdBQUFpQixHQUdBQyxLQUNBRCxFQUFBRSxLQUFBLFNBQUFDLEVBQUFDLEdBRUEsR0FBQUMsSUFBQUMsc0JBQUEsT0FFQUYsR0FBQUMsS0FXQUUsRUFBQUMsYUFBQSxTQUFBQyxHQVdBVCxFQUFBVSxLQUFBRCxFQUFBRSxLQUFBRixFQUFBSixLQUFBLFNBQUFPLEdBRUFILEVBQUExQixVQUFBMEIsRUFBQTFCLFNBQUE2QixNQWdCQUMsSUFJQSxRQUFBQSxLQUNBLElBQUEsR0FBQUMsS0FBQUMsR0FDQVIsRUFBQUMsYUFBQU8sRUFBQUQsSUE3R0EsR0FBQUMsTUFDQVIsR0FDQUMsYUFBQSxTQUFBQyxHQUVBTSxFQUFBNUIsS0FBQXNCLEtBSUFSLEVBQUEsV0FDQSxHQUFBZSxHQUFBQyxVQUFBQyxTQUNBLE9BQUEsV0FBQUMsS0FBQUgsR0F3R0EsT0FqRUFmLEtBQ0FILEVBQUFmLEdBRUFELEVBQUFDLElBK0RBd0IsU0FBQUEiLCJmaWxlIjoiY29tbW9uL2pzYnJpZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKGZ1bmN0aW9uKCkge+OAgFxuICAgIHZhciBhY3Rpb25RdWV1ZSA9IFtdXG4gICAgdmFyIEpTQnJpZGdlID0ge1xuICAgICAgICBINUNhbGxOYXRpdmU6IGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgICAgICAgICAvLyDnjq/looPov5jmnKrlh4blpIflpb0sYnJpZGdlIOi/mOacquazqOWFpSxINei3nyBOYXRpdmXov5jkuI3og73kuqTkupIs5pS+6L+b6Zif5YiX5LitXG4gICAgICAgICAgICBhY3Rpb25RdWV1ZS5wdXNoKHBhcmFtKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGlzQW5kcm9pZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgICAgICAgICAgcmV0dXJuICgvQW5kcm9pZC9pKS50ZXN0KHVhKVxuICAgICAgICB9XG4gICAgICAgIC8vIHZhciBpc0lvcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgICAgIC8vICAgcmV0dXJuICgvTWFjIE9TIFgvaSkudGVzdCh1YSlcbiAgICAgICAgLy8gfVxuXG4gICAgLy8gSU9TXG4gICAgZnVuY3Rpb24gc2V0dXBXZWJWaWV3SmF2YXNjcmlwdEJyaWRnZShjYWxsYmFjaykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnLT4gc2V0dXBXZWJWaWV3SmF2YXNjcmlwdEJyaWRnZSBydW4uLi4nKVxuICAgICAgICBpZiAod2luZG93LlFGUEFZKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnLT4gc2V0dXBXZWJWaWV3SmF2YXNjcmlwdEJyaWRnZSBpcyDms6jlhaUuLi4nKVxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHdpbmRvdy5RRlBBWSlcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LldWSkJDYWxsYmFja3MpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctPiBXVkpCQ2FsbGJhY2tzIHB1c2ggY2FsbGJhY2suLi4nKVxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5XVkpCQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spXG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LldWSkJDYWxsYmFja3MgPSBbY2FsbGJhY2tdXG4gICAgICAgIHZhciBXVkpCSWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJylcbiAgICAgICAgV1ZKQklmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIFdWSkJJZnJhbWUuc3JjID0gJ3d2amJzY2hlbWU6Ly9fX0JSSURHRV9MT0FERURfXydcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKFdWSkJJZnJhbWUpXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoV1ZKQklmcmFtZSlcbiAgICAgICAgfSwgMClcbiAgICB9XG5cbiAgICAvLyBBbmRyb2lkXG4gICAgZnVuY3Rpb24gY29ubmVjdFdlYlZpZXdKYXZhc2NyaXB0QnJpZGdlKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh3aW5kb3cuUUZQQVkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHdpbmRvdy5RRlBBWSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1dlYlZpZXdKYXZhc2NyaXB0QnJpZGdlUmVhZHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh3aW5kb3cuUUZQQVkpXG4gICAgICAgICAgICB9LCBmYWxzZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0FuZHJvaWQoKSkge1xuICAgICAgICBjb25uZWN0V2ViVmlld0phdmFzY3JpcHRCcmlkZ2UoY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2V0dXBXZWJWaWV3SmF2YXNjcmlwdEJyaWRnZShjYWxsYmFjaylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxsYmFjayhicmlkZ2UpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJy0+IHNldHVwV2ViVmlld0phdmFzY3JpcHRCcmlkZ2UgY2FsbGJhY2sgcnVuLi4uJylcblxuICAgICAgICBpZiAoaXNBbmRyb2lkKCkpIHtcbiAgICAgICAgICAgIGJyaWRnZS5pbml0KGZ1bmN0aW9uKG1lc3NhZ2UsIHJlc3BvbnNlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnSlMgZ290IGEgbWVzc2FnZScsIG1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7ICdKYXZhc2NyaXB0IFJlc3BvbmRzJzogJ1dlZSEnIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0pTIHJlc3BvbmRpbmcgd2l0aCcsIGRhdGEpXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VDYWxsYmFjayhkYXRhKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBINSDosIMgTmF0aXZl5LqL5Lu2IEg1Q2FsbE5hdGl2ZVxuICAgICAgICAgKiBAcGFyYW0gIHtbb2JqZWN0XX0gcGFyYW0gW2Rlc2NyaXB0aW9uXVxuICAgICAgICAgKiBwYXJhbS5kYXRh77ya5Lyg57uZIE5hdGl2ZeWPguaVsFxuICAgICAgICAgKiBwYXJhbS5jYWxsYmFja++8mk5hdGl2ZeWbnuiwgyjlvILmraXvvJ8pXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAgICAgKi9cbiAgICAgICAgSlNCcmlkZ2UuSDVDYWxsTmF0aXZlID0gZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLT4gSlMgQ2FsbCBINUNhbGxOYXRpdmUgcGFyYW06JywgcGFyYW0pXG5cbiAgICAgICAgICAgIC8vIGJyaWRnZS5jYWxsSGFuZGxlcigndGVzdE9iamNDYWxsYmFjaycsIHBhcmFtLmRhdGEsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAvLyB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIC8vICAgc2NoZW1hOiAnbmVhci1tZXJjaGFudC1uYXRpdmUnLFxuICAgICAgICAgICAgLy8gICBwYXRoOiAnaHR0cHM6Ly9vMi5xZnBheS5jb20vbWVyY2hhbnQvdjIvc2V0dGxlaW5mbycsXG4gICAgICAgICAgICAvLyAgIGFjdGlvbjogJ2dldCcsXG4gICAgICAgICAgICAvLyAgIHBhcmFtczogcGFyYW0uZGF0YVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgYnJpZGdlLmNhbGwocGFyYW0ubmFtZSwgcGFyYW0uZGF0YSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnSlMgY2FsbCBPQyBPSyEhIScsIHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIHBhcmFtLmNhbGxiYWNrICYmIHBhcmFtLmNhbGxiYWNrKHJlc3BvbnNlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5hdGl2ZSDosIMgSDXkuovku7YgUUZOYXRpdmVDYWxsSDVcbiAgICAgICAgLy8gYnJpZGdlLnJlZ2lzdGVySGFuZGxlcignUUZOYXRpdmVDYWxsSDUnLCBmdW5jdGlvbiAoZGF0YSwgcmVzcG9uc2VDYWxsYmFjaykge1xuICAgICAgICAvLyAgIC8vIGNvbnNvbGUubG9nKCdPYmpDIGNhbGxlZCB0ZXN0SmF2YXNjcmlwdEhhbmRsZXIgd2l0aO+8iOWOn+eUn+iwg+eUqEpTIHRlc3RKYXZhc2NyaXB0SGFuZGxlcigp77yJJywgZGF0YSlcbiAgICAgICAgLy8gICB2YXIgcmVzcG9uc2VEYXRhID0ge1xuICAgICAgICAvLyAgICAgJ0phdmFzY3JpcHQgU2F5cyc6ICdSaWdodCBiYWNrIGF0Y2hhISdcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vICAgLy8gY29uc29sZS5sb2coJ0pTIHJlc3BvbmRpbmcgd2l0aO+8iEpT5ZON5bqU77yJJywgcmVzcG9uc2VEYXRhKVxuICAgICAgICAvLyAgIC8vIOWbnuiwg1xuICAgICAgICAvLyAgIHJlc3BvbnNlQ2FsbGJhY2socmVzcG9uc2VEYXRhKVxuICAgICAgICAvLyB9KVxuXG4gICAgICAgIC8vIOaJp+ihjOeOr+Wig+acquWHhuWkh+WlveS5i+WJjeeahOS6i+S7tumYn+WIl1xuICAgICAgICBydW5BY3Rpb25RdWV1ZSgpXG4gICAgfVxuXG4gICAgLy8g5omn6KGM546v5aKD5pyq5YeG5aSH5aW95LmL5YmN55qE5LqL5Lu26Zif5YiXXG4gICAgZnVuY3Rpb24gcnVuQWN0aW9uUXVldWUoKSB7XG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIGFjdGlvblF1ZXVlKSB7XG4gICAgICAgICAgICBKU0JyaWRnZS5INUNhbGxOYXRpdmUoYWN0aW9uUXVldWVbaW5kZXhdKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9tb2R1bGUuZXhwb3J0cyA9IEpTQnJpZGdlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgSlNCcmlkZ2U6IEpTQnJpZGdlLFxuICAgIH0744CAXG59KTtcbiJdfQ==
