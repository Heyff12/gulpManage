"use strict";

require(['../require-config2'], function () {
    require(["zepto", "yanzheng", "close_tip", "ajax_rule", "scroll_more", "if_menu"], function ($, yanzheng, close_tip, ajax_rule, scroll_more, if_menu) {
        $(function () {
            //点击会员列表
            function memberto(obj) {
                var c = $(obj).attr('data-c');
                var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/members/detail.html?c=' + c;
                if_menu.goto_url(url_val);
            };
            //判断 处置活动首页显示右上角导航
            if_menu.if_menu();
            //滚动加载---------------------------------------------------------------   
            var b = 1,
                //测试专用--变更加载数据
            times_add = 0; //测试专用--控制停止加载数据判断依据  
            //添加图标和没有更多文字提示
            scroll_more.add_load_img('.js_member_list');
            //默认执行--测试专用    
            scroll_more.scroll_more(append_ul);
            //活动储值详情----------------------------------------------------------------------------------------------------------------------------------------------------
            $('.js_member_list').get(0) && ~function () {
                $(document).ready(function () {
                    //获取会员列表todo-show
                    //get_rechargeli();
                    append_ul();
                });
            }();
            //测试
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
                    scroll_more.scroll_data.body_height = Math.floor($('body').height()).toFixed(0);
                    if (last_len <= 0) {
                        scroll_more.nomoredata_show();
                        window.setTimeout(scroll_more.nomoredata_hide, 2000);
                        scroll_more.scroll_data.nomor_show = false;
                    } else {
                        scroll_more.scroll_data.nomor_show = true;
                    }
                    scroll_more.scroll_data.scroll_if = false;
                    console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                    console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                    return false;
                }
                //正常添加数据
                for (var i = 0; i < 20; i++) {
                    $('.js_ul_members').append(list);
                }
                $('.load').hide();
                scroll_more.scroll_data.scroll_if = true;
                scroll_more.scroll_data.body_height = Math.floor($('body').height()).toFixed(0);
                console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                // console.log(body_height); 
            }
            //获取会员列表
            function get_rechargeli() {
                var data = {
                    'pos': $('#js_pos').val(),
                    'count': 20
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/b/members', 'GET', 'json', data, '.zheceng', get_list);
            }
            //获取会员列表成功函数
            function get_list(return_data) {
                if ($('#js_pos').val() == '0' && return_data.length == 0) {
                    $('.js_li_none').show();
                    $('.js_member_detail').hide();
                    return false;
                }
                $('.js_li_none').hide();
                $('.js_member_detail').show();
                $(return_data).each(function (i, item) {
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
                    if (return_data.length > 0) {
                        scroll_more.scroll_data.nomor_show = true;
                    } else {
                        scroll_more.nomoredata_show();
                        window.setTimeout(scroll_more.nomoredata_hide, 2000);
                        scroll_more.scroll_data.nomor_show = false;
                    }
                    scroll_more.scroll_data.scroll_if = false;
                } else {
                    pos_val += 20;
                    $('#js_pos').val(pos_val);
                    scroll_more.scroll_data.scroll_if = true;
                }
                scroll_more.scroll_data.body_height = $('body').height();
            }
            //关闭弹框
            close_tip.close_tip();
        });
    });
});