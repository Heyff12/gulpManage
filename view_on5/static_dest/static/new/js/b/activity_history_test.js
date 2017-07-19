"use strict";

require(['../require-config'], function () {
    require(["zepto", "add_bounced", "ajax_rule", "scroll_more", "date_change"], function ($, add_bounced, ajax_rule, scroll_more, date_change) {
        $(function () {
            //滚动加载---------------------------------------------------------------   
            var b = 1,
                //测试专用--变更加载数据
            times_add = 0; //测试专用--控制停止加载数据判断依据  
            //添加图标和没有更多文字提示
            scroll_more.add_load_img('#wap');
            //默认执行--测试专用    
            scroll_more.scroll_more(append_ul);
            //设置储值活动----------------------------------------------------------------------------------------------------------------------------------------------------
            $(document).ready(function () {
                //获取信息--todo
                //get_history();
                //测试
                append_ul();
            });
            //测试
            function append_ul() {
                var con_list = '<section class="section_history"><p class="time">4645756</p><ul class="message"><li>会员总<br/><span class="span_num"><i class="js_all_person">8</i>人</span></li><li>储值金额<br/><span class="span_num"><i class="js_all_money">8</i>元</span></li></ul><ul class="rules"><li><span class="fr"><i class="i_normal">5人</i>已购买</span>储值50送5元</li><li><span class="fr"><i class="i_normal">12人</i>已购买</span>储值100送10元</li><li><span class="fr"><i class="i_normal">3人</i>已购买</span>储值300送50元</li></ul></section>';
                var con_list1 = '<section class="section_history"><p class="time">09999999</p><ul class="message"><li>会员总<br/><span class="span_num"><i class="js_all_person">8</i>人</span></li><li>储值金额<br/><span class="span_num"><i class="js_all_money">8</i>元</span></li></ul><ul class="rules"><li><span class="fr"><i class="i_normal">5人</i>已购买</span>储值50送5元</li><li><span class="fr"><i class="i_normal">12人</i>已购买</span>储值100送10元</li><li><span class="fr"><i class="i_normal">3人</i>已购买</span>储值300送50元</li></ul></section>';

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
                    var last_len = 2;
                    for (var i = 0; i < last_len; i++) {
                        $('.js_activityhistory_index').append(list);
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
                for (var i = 0; i < 3; i++) {
                    $('.js_activityhistory_index').append(list);
                }
                $('.load').hide();
                scroll_more.scroll_data.scroll_if = true;
                scroll_more.scroll_data.body_height = Math.floor($('body').height()).toFixed(0);
                console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                // console.log(body_height); 
            }
            //获取活动列表
            function get_history() {
                var data = {
                    'pos': $('#js_pos').val(),
                    'count': 20
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/b/activity_history', 'GET', 'json', data, '.zheceng', get_list);
            }
            //获取列表成功数据
            function get_list(return_data) {
                $(return_data).each(function (i, item) {
                    var startime = return_data[i].start_time;
                    var endtime = return_data[i].end_time;
                    var activity_id = return_data[i].activity_id;
                    var user_num = return_data[i].user_num;
                    var total_txamt = (return_data[i].total_txamt / 100).toFixed(0);
                    var total_pay_amt = (return_data[i].total_pay_amt / 100).toFixed(0);
                    var detail = return_data[i].detail; //活动信息
                    var s_time = date_change.time_change_word(startime);
                    var e_time = date_change.time_change_word2(startime, endtime);
                    var p_str = '<p class="time">' + s_time + '-' + e_time + '</p>';
                    var ul_str = '<ul class="message"><li>会员总<br/><span class="span_num"><i class="js_all_person">' + user_num + '</i>人</span></li><li>储值金额<br/><span class="span_num"><i class="js_all_money">' + total_pay_amt + '</i>元</span></li></ul>';
                    var rule_str = '<ul class="rules">';
                    $(detail).each(function (i, item) {
                        var grid_index = detail[i].grid_index;
                        var title = detail[i].title;
                        var user_num = detail[i].user_num;
                        var li_str = '<li data-index="' + grid_index + '"><span class="fr"><i class="i_normal">' + user_num + '人</i>已购买</span>' + title + '</li>';
                        rule_str += li_str;
                    });
                    rule_str += '</ul>';
                    var li_detail = '<section class="section_history">' + p_str + ul_str + rule_str + '</section>';
                    $(".js_activityhistory_index").append(li_detail);
                });
                var pos_val = $('#js_pos').val() - 0;
                if (return_data.length < 10) {
                    if (return_data.length > 0) {
                        scroll_more.scroll_data.nomor_show = true;
                    } else {
                        scroll_more.nomoredata_show();
                        window.setTimeout(scroll_more.nomoredata_hide, 2000);
                        scroll_more.scroll_data.nomor_show = false;
                    }
                    scroll_more.scroll_data.scroll_if = false;
                } else {
                    pos_val += 10;
                    $('#js_pos').val(pos_val);
                    scroll_more.scroll_data.scroll_if = true;
                }
                scroll_more.scroll_data.body_height = $('body').height();
            }
            //添加弹框
            add_bounced.add_bounced();
            //关闭弹框
            add_bounced.close_tip();
        });
    });
});