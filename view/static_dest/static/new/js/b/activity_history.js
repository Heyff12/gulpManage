"use strict";

require(['../require-config'], function () {
    require(["zepto", "ajax_rule", "scroll_more", "date_change"], function ($, ajax_rule, scroll_more, date_change) {
        $(function () {
            //滚动加载---------------------------------------------------------------  
            //添加图标和没有更多文字提示
            scroll_more.add_load_img('#wap');
            //默认滚动执行   
            scroll_more.scroll_more(get_history);
            //设置储值活动----------------------------------------------------------------------------------------------------------------------------------------------------
            $(document).ready(function () {
                //获取信息--todo
                get_history();
            });
            //获取活动列表
            function get_history() {
                var data = {
                    'pos': $('#js_pos').val(),
                    'count': 10
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/b/activity_history', 'GET', 'json', data, '.zheceng', get_list);
            }
            //获取列表成功数据
            function get_list(return_data) {
                if (return_data.length == 0 && $('#js_pos').val() == '0') {
                    $('.js_li_none').show();
                    $('.js_activityhistory_index').hide();
                    $('body').addClass('bg_white');
                    return false;
                } else {
                    $('.js_li_none').hide();
                    $('.js_activityhistory_index').show();
                    $('body').removeClass('bg_white');
                }
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
                    var ul_str = '<ul class="message"><li>会员数<br/><span class="span_num"><i class="js_all_person">' + user_num + '</i>人</span></li><li>储值金额<br/><span class="span_num"><i class="js_all_money">' + total_pay_amt + '</i>元</span></li></ul>';
                    var rule_str = '<ul class="rules">';
                    $(detail).each(function (i, item) {
                        var grid_index = detail[i].grid_index;
                        var title = detail[i].title;
                        var user_num = detail[i].user_num;
                        var li_str = '<li data-index="' + grid_index + '"><span class="fr"><i class="i_normal">' + user_num + '人</i>已购买</span>' + title + '</li>';
                        rule_str += li_str;
                    });
                    rule_str += '</ul>';
                    var li_detail = '<section data-index="' + activity_id + '" class="section_history">' + p_str + ul_str + rule_str + '</section>';
                    $(".js_activityhistory_index").append(li_detail);
                });
                $('.load').hide();
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
                scroll_more.scroll_data.body_height = Math.floor($('body').height()).toFixed(0);
                // console.log('AJAX:scroll_more.scroll_data.body_height==' + scroll_more.scroll_data.body_height);
                // console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                // console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
            }
        });
    });
});