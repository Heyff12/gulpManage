!function(e,t){function o(){var t=l.getBoundingClientRect().width;t/s>540&&(t=540*s);var o=t/10;l.style.fontSize=o+"px",d.rem=e.rem=o}var i,n=e.document,l=n.documentElement,a=n.querySelector('meta[name="viewport"]'),r=n.querySelector('meta[name="flexible"]'),s=0,c=0,d=t.flexible||(t.flexible={});if(a){var m=a.getAttribute("content").match(/initial\-scale=([\d\.]+)/);m&&(c=parseFloat(m[1]),s=parseInt(1/c)),console.log("metaEl="+a),console.log(a),console.log("dpr="+s),console.log("scale="+c)}else if(r){var p=r.getAttribute("content");if(p){var u=p.match(/initial\-dpr=([\d\.]+)/),f=p.match(/maximum\-dpr=([\d\.]+)/);u&&(s=parseFloat(u[1]),c=parseFloat((1/s).toFixed(2))),f&&(s=parseFloat(f[1]),c=parseFloat((1/s).toFixed(2)))}console.log("flexibleEl="+r),console.log(r),console.log("dpr="+s),console.log("scale="+c)}if(console.log("window.devicePixelRatio="+window.devicePixelRatio),!s&&!c){var g=e.navigator.appVersion.match(/android/gi),v=e.navigator.appVersion.match(/iphone/gi),x=e.devicePixelRatio;s=v?x>=3&&(!s||s>=3)?3:x>=2&&(!s||s>=2)?2:1:1,c=1/s,console.log("isAndroid="+g),console.log("isIPhone="+v),console.log("devicePixelRatio="+x),console.log("dpr="+s),console.log("scale="+c)}if(l.setAttribute("data-dpr",s),!a)if(a=n.createElement("meta"),a.setAttribute("name","viewport"),a.setAttribute("content","initial-scale="+c+", maximum-scale="+c+", minimum-scale="+c+", user-scalable=no"),l.firstElementChild)l.firstElementChild.appendChild(a);else{var h=n.createElement("div");h.appendChild(a),n.write(h.innerHTML)}e.addEventListener("resize",function(){clearTimeout(i),i=setTimeout(o,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(i),i=setTimeout(o,300))},!1),"complete"===n.readyState?n.body.style.fontSize=12*s+"px":n.addEventListener("DOMContentLoaded",function(e){n.body.style.fontSize=12*s+"px"},!1),o(),d.dpr=e.dpr=s,d.refreshRem=o,d.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},d.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWcvZmxleGlibGUuZGVidWdfbG9nLmpzIl0sIm5hbWVzIjpbIndpbiIsImxpYiIsInJlZnJlc2hSZW0iLCJ3aWR0aCIsImRvY0VsIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZHByIiwicmVtIiwic3R5bGUiLCJmb250U2l6ZSIsImZsZXhpYmxlIiwidGlkIiwiZG9jIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJtZXRhRWwiLCJxdWVyeVNlbGVjdG9yIiwiZmxleGlibGVFbCIsInNjYWxlIiwibWF0Y2giLCJnZXRBdHRyaWJ1dGUiLCJwYXJzZUZsb2F0IiwicGFyc2VJbnQiLCJjb25zb2xlIiwibG9nIiwiY29udGVudCIsImluaXRpYWxEcHIiLCJtYXhpbXVtRHByIiwidG9GaXhlZCIsIndpbmRvdyIsImRldmljZVBpeGVsUmF0aW8iLCJpc0FuZHJvaWQiLCJuYXZpZ2F0b3IiLCJhcHBWZXJzaW9uIiwiaXNJUGhvbmUiLCJzZXRBdHRyaWJ1dGUiLCJjcmVhdGVFbGVtZW50IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhcHBlbmRDaGlsZCIsIndyYXAiLCJ3cml0ZSIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZSIsInBlcnNpc3RlZCIsInJlYWR5U3RhdGUiLCJib2R5IiwicmVtMnB4IiwiZCIsInZhbCIsInRoaXMiLCJweDJyZW0iXSwibWFwcGluZ3MiOiJDQUFBLFNBQUFBLEVBQUFDLEdBaUZBLFFBQUFDLEtBQ0EsR0FBQUMsR0FBQUMsRUFBQUMsd0JBQUFGLEtBQ0FBLEdBQUFHLEVBQUEsTUFDQUgsRUFBQSxJQUFBRyxFQUVBLElBQUFDLEdBQUFKLEVBQUEsRUFDQUMsR0FBQUksTUFBQUMsU0FBQUYsRUFBQSxLQUNBRyxFQUFBSCxJQUFBUCxFQUFBTyxJQUFBQSxFQXZGQSxHQU1BSSxHQU5BQyxFQUFBWixFQUFBYSxTQUNBVCxFQUFBUSxFQUFBRSxnQkFDQUMsRUFBQUgs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R0FJQSxPQUhBLGdCQUFBMkMsSUFBQUEsRUFBQS9CLE1BQUEsU0FDQWdDLEdBQUEsT0FFQUEsSUFHQXRCLE9BQUFBLE9BQUEsTUFBQUEsT0FBQSIsImZpbGUiOiJwbHVnL2ZsZXhpYmxlLmRlYnVnX2xvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIjsoZnVuY3Rpb24od2luLCBsaWIpIHtcbiAgICB2YXIgZG9jID0gd2luLmRvY3VtZW50O1xuICAgIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdmFyIG1ldGFFbCA9IGRvYy5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ2aWV3cG9ydFwiXScpO1xuICAgIHZhciBmbGV4aWJsZUVsID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cImZsZXhpYmxlXCJdJyk7XG4gICAgdmFyIGRwciA9IDA7XG4gICAgdmFyIHNjYWxlID0gMDtcbiAgICB2YXIgdGlkO1xuICAgIHZhciBmbGV4aWJsZSA9IGxpYi5mbGV4aWJsZSB8fCAobGliLmZsZXhpYmxlID0ge30pO1xuICAgIFxuICAgIGlmIChtZXRhRWwpIHtcbiAgICAgICAgLy9jb25zb2xlLndhcm4oJ+WwhuagueaNruW3suacieeahG1ldGHmoIfnrb7mnaXorr7nva7nvKnmlL7mr5TkvosnKTtcbiAgICAgICAgdmFyIG1hdGNoID0gbWV0YUVsLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLm1hdGNoKC9pbml0aWFsXFwtc2NhbGU9KFtcXGRcXC5dKykvKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBzY2FsZSA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICAgICAgICAgICAgZHByID0gcGFyc2VJbnQoMSAvIHNjYWxlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnbWV0YUVsPScrbWV0YUVsKTtcbiAgICAgICAgY29uc29sZS5sb2cobWV0YUVsKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rwcj0nK2Rwcik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzY2FsZT0nK3NjYWxlKTtcbiAgICB9IGVsc2UgaWYgKGZsZXhpYmxlRWwpIHtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBmbGV4aWJsZUVsLmdldEF0dHJpYnV0ZSgnY29udGVudCcpO1xuICAgICAgICBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgdmFyIGluaXRpYWxEcHIgPSBjb250ZW50Lm1hdGNoKC9pbml0aWFsXFwtZHByPShbXFxkXFwuXSspLyk7XG4gICAgICAgICAgICB2YXIgbWF4aW11bURwciA9IGNvbnRlbnQubWF0Y2goL21heGltdW1cXC1kcHI9KFtcXGRcXC5dKykvKTtcbiAgICAgICAgICAgIGlmIChpbml0aWFsRHByKSB7XG4gICAgICAgICAgICAgICAgZHByID0gcGFyc2VGbG9hdChpbml0aWFsRHByWzFdKTtcbiAgICAgICAgICAgICAgICBzY2FsZSA9IHBhcnNlRmxvYXQoKDEgLyBkcHIpLnRvRml4ZWQoMikpOyAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXhpbXVtRHByKSB7XG4gICAgICAgICAgICAgICAgZHByID0gcGFyc2VGbG9hdChtYXhpbXVtRHByWzFdKTtcbiAgICAgICAgICAgICAgICBzY2FsZSA9IHBhcnNlRmxvYXQoKDEgLyBkcHIpLnRvRml4ZWQoMikpOyAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnZmxleGlibGVFbD0nK2ZsZXhpYmxlRWwpO1xuICAgICAgICBjb25zb2xlLmxvZyhmbGV4aWJsZUVsKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rwcj0nK2Rwcik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzY2FsZT0nK3NjYWxlKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ3dpbmRvdy5kZXZpY2VQaXhlbFJhdGlvPScrd2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuXG4gICAgaWYgKCFkcHIgJiYgIXNjYWxlKSB7XG4gICAgICAgIHZhciBpc0FuZHJvaWQgPSB3aW4ubmF2aWdhdG9yLmFwcFZlcnNpb24ubWF0Y2goL2FuZHJvaWQvZ2kpO1xuICAgICAgICB2YXIgaXNJUGhvbmUgPSB3aW4ubmF2aWdhdG9yLmFwcFZlcnNpb24ubWF0Y2goL2lwaG9uZS9naSk7XG4gICAgICAgIHZhciBkZXZpY2VQaXhlbFJhdGlvID0gd2luLmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgIGlmIChpc0lQaG9uZSkge1xuICAgICAgICAgICAgLy8gaU9T5LiL77yM5a+55LqOMuWSjDPnmoTlsY/vvIznlKgy5YCN55qE5pa55qGI77yM5YW25L2Z55qE55SoMeWAjeaWueahiFxuICAgICAgICAgICAgaWYgKGRldmljZVBpeGVsUmF0aW8gPj0gMyAmJiAoIWRwciB8fCBkcHIgPj0gMykpIHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZHByID0gMztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGV2aWNlUGl4ZWxSYXRpbyA+PSAyICYmICghZHByIHx8IGRwciA+PSAyKSl7XG4gICAgICAgICAgICAgICAgZHByID0gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZHByID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOWFtuS7luiuvuWkh+S4i++8jOS7jeaXp+S9v+eUqDHlgI3nmoTmlrnmoYhcbiAgICAgICAgICAgIGRwciA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgc2NhbGUgPSAxIC8gZHByO1xuICAgICAgICBjb25zb2xlLmxvZygnaXNBbmRyb2lkPScraXNBbmRyb2lkKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2lzSVBob25lPScraXNJUGhvbmUpO1xuICAgICAgICBjb25zb2xlLmxvZygnZGV2aWNlUGl4ZWxSYXRpbz0nK2RldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICBjb25zb2xlLmxvZygnZHByPScrZHByKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3NjYWxlPScrc2NhbGUpO1xuICAgIH1cblxuICAgIGRvY0VsLnNldEF0dHJpYnV0ZSgnZGF0YS1kcHInLCBkcHIpO1xuICAgIGlmICghbWV0YUVsKSB7XG4gICAgICAgIG1ldGFFbCA9IGRvYy5jcmVhdGVFbGVtZW50KCdtZXRhJyk7XG4gICAgICAgIG1ldGFFbC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAndmlld3BvcnQnKTtcbiAgICAgICAgbWV0YUVsLnNldEF0dHJpYnV0ZSgnY29udGVudCcsICdpbml0aWFsLXNjYWxlPScgKyBzY2FsZSArICcsIG1heGltdW0tc2NhbGU9JyArIHNjYWxlICsgJywgbWluaW11bS1zY2FsZT0nICsgc2NhbGUgKyAnLCB1c2VyLXNjYWxhYmxlPW5vJyk7XG4gICAgICAgIGlmIChkb2NFbC5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgZG9jRWwuZmlyc3RFbGVtZW50Q2hpbGQuYXBwZW5kQ2hpbGQobWV0YUVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB3cmFwID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgd3JhcC5hcHBlbmRDaGlsZChtZXRhRWwpO1xuICAgICAgICAgICAgZG9jLndyaXRlKHdyYXAuaW5uZXJIVE1MKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hSZW0oKXtcbiAgICAgICAgdmFyIHdpZHRoID0gZG9jRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGlmICh3aWR0aCAvIGRwciA+IDU0MCkge1xuICAgICAgICAgICAgd2lkdGggPSA1NDAgKiBkcHI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlbSA9IHdpZHRoIC8gMTA7XG4gICAgICAgIGRvY0VsLnN0eWxlLmZvbnRTaXplID0gcmVtICsgJ3B4JztcbiAgICAgICAgZmxleGlibGUucmVtID0gd2luLnJlbSA9IHJlbTtcbiAgICB9XG5cbiAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aWQpO1xuICAgICAgICB0aWQgPSBzZXRUaW1lb3V0KHJlZnJlc2hSZW0sIDMwMCk7XG4gICAgfSwgZmFsc2UpO1xuICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKCdwYWdlc2hvdycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUucGVyc2lzdGVkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGlkKTtcbiAgICAgICAgICAgIHRpZCA9IHNldFRpbWVvdXQocmVmcmVzaFJlbSwgMzAwKTtcbiAgICAgICAgfVxuICAgIH0sIGZhbHNlKTtcblxuICAgIGlmIChkb2MucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBkb2MuYm9keS5zdHlsZS5mb250U2l6ZSA9IDEyICogZHByICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGRvYy5ib2R5LnN0eWxlLmZvbnRTaXplID0gMTIgKiBkcHIgKyAncHgnO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuICAgIFxuXG4gICAgcmVmcmVzaFJlbSgpO1xuXG4gICAgZmxleGlibGUuZHByID0gd2luLmRwciA9IGRwcjtcbiAgICBmbGV4aWJsZS5yZWZyZXNoUmVtID0gcmVmcmVzaFJlbTtcbiAgICBmbGV4aWJsZS5yZW0ycHggPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciB2YWwgPSBwYXJzZUZsb2F0KGQpICogdGhpcy5yZW07XG4gICAgICAgIGlmICh0eXBlb2YgZCA9PT0gJ3N0cmluZycgJiYgZC5tYXRjaCgvcmVtJC8pKSB7XG4gICAgICAgICAgICB2YWwgKz0gJ3B4JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICBmbGV4aWJsZS5weDJyZW0gPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciB2YWwgPSBwYXJzZUZsb2F0KGQpIC8gdGhpcy5yZW07XG4gICAgICAgIGlmICh0eXBlb2YgZCA9PT0gJ3N0cmluZycgJiYgZC5tYXRjaCgvcHgkLykpIHtcbiAgICAgICAgICAgIHZhbCArPSAncmVtJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxufSkod2luZG93LCB3aW5kb3dbJ2xpYiddIHx8ICh3aW5kb3dbJ2xpYiddID0ge30pKTsiXX0=
