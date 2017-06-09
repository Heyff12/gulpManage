define(["zepto"],function($){function o(o){$(window).on("scroll",function(e){var i=document.documentElement.scrollTop||document.body.scrollTop;console.log("document.body.scrollTop--"+i),console.log(a.body_height-d),i<a.body_height-d?clearTimeout(a.timer_rt):(e.stopPropagation(),a.scroll_if&&($(".load").show(),a.scroll_if=!1,a.timer_rt=window.setTimeout(o,2e3)),a.nomor_show&&(n(),window.setTimeout(t,2e3),a.nomor_show=!1))})}function e(o,e){$(o).append(a.load_img),$(o).append(a.nomore_word),e?$("#nomoredata").text(e):$("#nomoredata").text("没有更多数据了")}function t(){$("#nomoredata").animate({opacity:0},500,"ease-out")}function n(){$("#nomoredata").animate({opacity:.7},500,"ease-out")}var a={timer_rt:null,scroll_if:!1,nomor_show:!1,body_height:$("body").height(),load_img:'<div class="load"></div>',nomore_word:'<div class="nomoredata" id="nomoredata"></div>'},d=window.innerHeight;return{scroll_more:o,nomoredata_hide:t,nomoredata_show:n,scroll_data:a,add_load_img:e}});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zY3JvbGxfbW9yZS5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCIkIiwic2Nyb2xsX21vcmUiLCJtb3JlX2RhdGEiLCJ3aW5kb3ciLCJvbiIsImUiLCJoaXN0b3J5X3RvcCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsVG9wIiwiYm9keSIsImNvbnNvbGUiLCJsb2ciLCJzY3JvbGxfZGF0YSIsImJvZHlfaGVpZ2h0Iiwid2luZG93X2hlaWdodCIsImNsZWFyVGltZW91dCIsInRpbWVyX3J0Iiwic3RvcFByb3BhZ2F0aW9uIiwic2Nyb2xsX2lmIiwic2hvdyIsInNldFRpbWVvdXQiLCJub21vcl9zaG93Iiwibm9tb3JlZGF0YV9zaG93Iiwibm9tb3JlZGF0YV9oaWRlIiwiYWRkX2xvYWRfaW1nIiwiaWQiLCJ0ZXh0IiwiYXBwZW5kIiwibG9hZF9pbWciLCJub21vcmVfd29yZCIsImFuaW1hdGUiLCJvcGFjaXR5IiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiXSwibWFwcGluZ3MiOiJBQUFBQSxRQUFBLFNBQUEsU0FBQUMsR0FlQSxRQUFBQyxHQUFBQyxHQUNBRixFQUFBRyxRQUFBQyxHQUFBLFNBQUEsU0FBQUMsR0FJQSxHQUFBQyxHQUFBQyxTQUFBQyxnQkFBQUMsV0FBQUYsU0FBQUcsS0FBQUQsU0FFQUUsU0FBQUMsSUFBQSw0QkFBQU4sR0FDQUssUUFBQUMsSUFBQUMsRUFBQUMsWUFBQUMsR0FDQVQsRUFBQU8sRUFBQUMsWUFBQUMsRUFDQUMsYUFBQUgsRUFBQUksV0FFQVosRUFBQWEsa0JBQ0FMLEVBQUFNLFlBQ0FuQixFQUFBLFNBQUFvQixPQUNBUCxFQUFBTSxXQUFBLEVBQ0FOLEVBQUFJLFNBQUFkLE9BQUFrQixXQUFBbkIsRUFBQSxNQUVBVyxFQUFBUyxhQUNBQyxJQUNBcEIsT0FBQWtCLFdBQUFHLEVBQUEsS0FDQVgsRUFBQVMsWUFBQSxNQVNBLFFBQUFHLEdBQUFDLEVBQUFDLEdBRUEzQixFQUFBMEIsR0FBQUUsT0FBQWYsRUFBQWdCLFVBQ0E3QixFQUFBMEIsR0FBQUUsT0FBQWYsRUFBQWlCLGFBQ0FILEVBQ0EzQixFQUFBLGVBQUEyQixLQUFBQSxHQUVBM0IsRUFBQSxlQUFBMkIsS0FBQSxXQU1BLFFBQUFILEtBQ0F4QixFQUFBLGVBQUErQixTQUFBQyxRQUFBLEdBQUEsSUFBQSxZQUlBLFFBQUFULEtBQ0F2QixFQUFBLGVBQUErQixTQUFBQyxRQUFBLElBQUEsSUFBQSxZQTlEQSxHQUFBbkIsSUFDQUksU0FBQSxLQUNBRSxXQUFBLEVBQ0FHLFlBQUEsRUFDQVIsWUFBQWQsRUFBQSxRQUFBaUMsU0FDQUosU0FBQSwyQkFDQUMsWUFBQSxrREFHQWYsRUFBQVosT0FBQStCLFdBeURBLFFBQ0FqQyxZQUFBQSxFQUNBdUIsZ0JBQUFBLEVBQ0FELGdCQUFBQSxFQUNBVixZQUFBQSxFQUNBWSxhQUFBQSIsImZpbGUiOiJjb21tb24vc2Nyb2xsX21vcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoW1wiemVwdG9cIl0sIGZ1bmN0aW9uKCQpIHvjgIBcbiAgICAvL+a7muWKqOS4i+aLiS0tLS0tLS1zdGFydC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIHNjcm9sbF9kYXRhID0ge1xuICAgICAgICB0aW1lcl9ydDogbnVsbCwgLy/muIXnqbrlrprml7blmag95Y+C5pWwXG4gICAgICAgIHNjcm9sbF9pZjogZmFsc2UsIC8v5piv5ZCm5YaN5qyh6L+b6KGM5pWw5o2u5Yqg6L29LOm7mOiupGZhbHNl5LiN5Yqg6L29XG4gICAgICAgIG5vbW9yX3Nob3c6IGZhbHNlLCAvL+aOp+WItiDmsqHmnInmm7TlpJrmlbDmja7kuobnmoQg5o+Q56S6IOaYr+WQpuaYvuekuu+8jOm7mOiupGZhbHNl5LiN5Ye6546wXG4gICAgICAgIGJvZHlfaGVpZ2h0OiAkKCdib2R5JykuaGVpZ2h0KCksXG4gICAgICAgIGxvYWRfaW1nOiAnPGRpdiBjbGFzcz1cImxvYWRcIj48L2Rpdj4nLCAvL+WKoOi9veWKqOeUu+Wbvuagh1xuICAgICAgICBub21vcmVfd29yZDogJzxkaXYgY2xhc3M9XCJub21vcmVkYXRhXCIgaWQ9XCJub21vcmVkYXRhXCI+PC9kaXY+JywvL+WKoOi9veWIsOacgOWQjueahOaPkOekulxuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2coc2Nyb2xsX2RhdGEuc2Nyb2xsX2lmKTtcbiAgICB2YXIgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAvLyBjb25zb2xlLmxvZyh3aW5kb3dfaGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhzY3JvbGxfZGF0YS5ib2R5X2hlaWdodCk7IFxuICAgIC8vYWpheOinhOWImVxuICAgIGZ1bmN0aW9uIHNjcm9sbF9tb3JlKG1vcmVfZGF0YSkge1xuICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNjcm9sbF9pZik7IFxuICAgICAgICAgICAgLy92YXIgaGlzdG9yeV90b3AgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coaGlzdG9yeV90b3ApOyBcbiAgICAgICAgICAgIHZhciBoaXN0b3J5X3RvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLS0nK2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLS0nK2hpc3RvcnlfdG9wKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNjcm9sbF9kYXRhLmJvZHlfaGVpZ2h0IC0gd2luZG93X2hlaWdodCk7XG4gICAgICAgICAgICBpZiAoaGlzdG9yeV90b3AgPCBzY3JvbGxfZGF0YS5ib2R5X2hlaWdodCAtIHdpbmRvd19oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc2Nyb2xsX2RhdGEudGltZXJfcnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxfZGF0YS5zY3JvbGxfaWYpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmxvYWQnKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbF9kYXRhLnNjcm9sbF9pZiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxfZGF0YS50aW1lcl9ydCA9IHdpbmRvdy5zZXRUaW1lb3V0KG1vcmVfZGF0YSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxfZGF0YS5ub21vcl9zaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vbW9yZWRhdGFfc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChub21vcmVkYXRhX2hpZGUsIDIwMDApO1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxfZGF0YS5ub21vcl9zaG93ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY3JvbGw6c2Nyb2xsX2lmPT0nICsgc2Nyb2xsX2RhdGEuc2Nyb2xsX2lmKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2Nyb2xsOm5vbW9yX3Nob3c9PScgKyBzY3JvbGxfZGF0YS5ub21vcl9zaG93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8v5Yqg6L295Zu+5qCH5ZKM5paH5a2X5o+Q56S6IOa3u+WKoOWcqOmhtemdouS4re+8jOW5tuWPr+S7peS/ruaUueWKoOi9veaPkOekuuaWh+Wtly0tLS0t5b+F6aG75Y2V54us5byV5YWl5Yiw6aG16Z2iXG4gICAgZnVuY3Rpb24gYWRkX2xvYWRfaW1nKGlkLHRleHQpe1xuICAgICAgICAvL2lk5Li66ZyA6KaB5bCG5Yqg6L295Zu+5qCH5ZKM5rKh5pyJ5L+h5oGv5pe255qE5o+Q56S65re75Yqg5Zyo55qEZGl277yMdGV4dOeUqOadpemHjeaWsOiuvue9ruWKoOi9veWIsOacgOWQjueahOaWh+Wtl+aPkOekuu+8jOWmguaenOayoeaciXRleHTliJnnlKjpu5jorqTnmoTmloflrZfmmL7npLpcbiAgICAgICAgJChpZCkuYXBwZW5kKHNjcm9sbF9kYXRhLmxvYWRfaW1nKTtcbiAgICAgICAgJChpZCkuYXBwZW5kKHNjcm9sbF9kYXRhLm5vbW9yZV93b3JkKTtcbiAgICAgICAgaWYodGV4dCl7XG4gICAgICAgICAgICAkKCcjbm9tb3JlZGF0YScpLnRleHQodGV4dCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJCgnI25vbW9yZWRhdGEnKS50ZXh0KCfmsqHmnInmm7TlpJrmlbDmja7kuoYnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygn5rWL6K+VLS1zb3VyY2VtYXBzJyk7XG4gICAgfVxuICAgIFxuICAgIC8v5o+Q56S65paH5a2X6ZqQ6JeP5Yqo55S7XG4gICAgZnVuY3Rpb24gbm9tb3JlZGF0YV9oaWRlKCkge1xuICAgICAgICAkKFwiI25vbW9yZWRhdGFcIikuYW5pbWF0ZSh7IG9wYWNpdHk6IDAsIH0sIDUwMCwgJ2Vhc2Utb3V0Jyk7XG4gICAgfVxuICAgIFxuICAgIC8v5o+Q56S65paH5a2X5pi+56S65Yqo55S7IFxuICAgIGZ1bmN0aW9uIG5vbW9yZWRhdGFfc2hvdygpIHtcbiAgICAgICAgJChcIiNub21vcmVkYXRhXCIpLmFuaW1hdGUoeyBvcGFjaXR5OiAwLjcsIH0sIDUwMCwgJ2Vhc2Utb3V0Jyk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzY3JvbGxfbW9yZTogc2Nyb2xsX21vcmUsXG4gICAgICAgIG5vbW9yZWRhdGFfaGlkZTogbm9tb3JlZGF0YV9oaWRlLFxuICAgICAgICBub21vcmVkYXRhX3Nob3c6IG5vbW9yZWRhdGFfc2hvdyxcbiAgICAgICAgc2Nyb2xsX2RhdGE6IHNjcm9sbF9kYXRhLFxuICAgICAgICBhZGRfbG9hZF9pbWc6IGFkZF9sb2FkX2ltZyxcbiAgICB9O+OAgFxufSk7XG4iXX0=
