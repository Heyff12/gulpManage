
require(['../require-config2'], function() {
    require(["zepto", "yanzheng", "close_tip","if_menu"], function($, yanzheng, close_tip,if_menu) {
        $(function() {
            //点击会员列表
            function memberto(obj) {
                var c = $(obj).attr('data-c');
                var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/members/detail.html?c=' + c;
                if_menu.goto_url(url_val);
            };
            //滚动下拉-------start--------------------------------------------------------
            var timer_rt = null;
            var scroll_if = false;
            var b = 1,
                times_add = 0,
                nomor_show = false;
            // console.log(scroll_if);
            var window_height = window.innerHeight;
            var body_height = $('body').height();
            // console.log(window_height);
            // console.log(body_height); 
            //活动储值详情----------------------------------------------------------------------------------------------------------------------------------------------------
            $('.js_member_list').get(0) && (~ function() {
                $(document).ready(function() {
                    //获取会员列表todo-show
                    //get_rechargeli();
                    append_ul();
                });
            }());
            $(window).on('scroll', function(e) {
                // console.log(scroll_if); 
                //var history_top = $(document).scrollTop();
                //console.log(history_top); 
                var history_top = document.documentElement.scrollTop || document.body.scrollTop;
                // console.log('document.documentElement.scrollTop--'+document.documentElement.scrollTop);
                // console.log('document.body.scrollTop--'+document.body.scrollTop);
                if (history_top < body_height - window_height) {
                    clearTimeout(timer_rt);
                } else {
                    e.stopPropagation();
                    if (scroll_if) {
                        $('.load').show();
                        scroll_if = false;
                        timer_rt = window.setTimeout(append_ul, 3000);
                    }
                    if (nomor_show) {
                        $("#nomoredata").animate({ opacity: 0.7, }, 500, 'ease-out');
                        window.setTimeout(nomoredata_hide, 3000);
                        nomor_show = false;
                    }
                    console.log('scroll:scroll_if==' + scroll_if);
                    console.log('scroll:nomor_show==' + nomor_show);
                }
            });

            function nomoredata_hide() {
                //$('#nomoredata').hide();
                $("#nomoredata").animate({ opacity: 0, }, 500, 'ease-out');
            }

            function append_ul() {
                var con_list = '<li><dl><dt><img src="../../../bin/static/img/wxchar.png"></dt><dd>韩梅梅</dd><dd class="grey"><i class="icon_tel"></i>13189569856</dd><dd class="grey">储值<span class="orange">2次</span></dd><div class="clearfix"></div></dl><p><span class="grey">余额</span><br/><span class="orange">￥<i class="i_normal">35.26</i></span></p></li>';
                var con_list1 = '<li><dl><dt><img src="../../../bin/static/img/ic_shop_round@3x.png"></dt><dd>韩梅梅</dd><dd class="grey"><i class="icon_tel"></i>13189569856</dd><dd class="grey">储值<span class="orange">2次</span></dd><div class="clearfix"></div></dl><p><span class="grey">余额</span><br/><span class="orange">￥<i class="i_normal">35.26</i></span></p></li>';

                var list;
                if (b == '1') {
                    list = con_list1;
                    b = 0;
                } else {
                    list = con_list;
                    b = 1;
                }
                //判断终止添加数据
                times_add++;
                if (times_add > 3) {
                    $('.load').hide();
                    //最后添加的数据
                    var last_len = 5;
                    for (var i = 0; i < last_len; i++) {
                        $('.js_ul_members').append(list);
                    }
                    body_height = Math.floor($('body').height()).toFixed(0);
                    if (last_len <= 0) {
                        //$('#nomoredata').show();
                        $("#nomoredata").animate({ opacity: 0.7, }, 500, 'ease-out');
                        window.setTimeout(nomoredata_hide, 3000);
                        nomor_show = false;
                    } else {
                        nomor_show = true;
                    }
                    scroll_if = false;
                    console.log('AJAX:scroll_if==' + scroll_if);
                    console.log('AJAX:nomor_show==' + nomor_show);
                    return false;
                }
                //正常添加数据
                for (var i = 0; i < 20; i++) {
                    $('.js_ul_members').append(list);
                }
                $('.load').hide();
                scroll_if = true;
                body_height = Math.floor($('body').height()).toFixed(0);
                console.log('AJAX:scroll_if==' + scroll_if);
                console.log('AJAX:nomor_show==' + nomor_show);
                // console.log(body_height); 
            }
            //获取会员列表
            function get_rechargeli() {
                $.ajax({
                    url: '/prepaid/v1/api/b/members',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'pos': $('#js_pos').val(),
                        'count': 20,
                    },
                    beforeSend: function() {
                        $('#loading').show();
                        $('.zheceng').show();
                    },
                    success: function(data) {
                        if (data.respcd != '0000') {
                            $('#alert_alert').show();
                            $('.zheceng').show();
                            if (!data['respmsg']) {
                                $('#alert_alert .alert_con_br').html(data['resperr']);
                            } else {
                                $('#alert_alert .alert_con_br').html(data['respmsg']);
                            }
                        } else {
                            var return_data = data.data;
                            $(return_data).each(function(i, item) {
                                var cz_avatar = return_data[i].avatar;
                                var cz_recharge_times = return_data[i].recharge_times;
                                var cz_mobile = return_data[i].mobile;
                                var cz_name = return_data[i].name;
                                var cz_balance = (return_data[i].balance / 100).toFixed(2);
                                var cz_c = return_data[i].c;
                                var li_detail = '<li data-c="' + cz_c + '" onclick="memberto(this)"><dl><dt><img src="' + cz_avatar + '"></dt><dd>' + cz_name + '</dd><dd class="grey"><i class="icon_tel"></i>' + cz_mobile + '</dd><dd class="grey">储值<span class="orange">' + cz_recharge_times + '次</span></dd><div class="clearfix"></div></dl><p><span class="grey">余额</span><br/><span class="orange">￥<i class="i_normal">' + cz_balance + '</i></span></p></li>';
                                $(".js_ul_members").append(li_detail);
                            });
                            var pos_val = $('#js_pos').val() - 0;
                            if (return_data.length < 20) {
                                if (pos_val > 0) {
                                    $('.load').hide();
                                    $("#nomoredata").animate({ opacity: 0.7, }, 500, 'ease-out');
                                    window.setTimeout(nomoredata_hide, 2000);
                                }
                                // $('#alert_alert').show();
                                // $('#alert_alert .alert_con_br').html('数据已加载完毕');
                                // $('.zheceng1').show();
                                scroll_if = false;
                            } else {
                                pos_val += 20;
                                $('#js_pos').val(pos_val);
                                scroll_if = true;
                            }
                            $('.zheceng').hide();
                            $('.load').hide();
                            body_height = $('body').height();
                        }
                    },
                    error: function(data) {
                        $('#alert_alert').show();
                        $('.zheceng').show();
                        //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function() {
                        $('#loading').hide();
                    }
                });
            }
            //关闭弹框
            close_tip.close_tip();
        })
    })
})
