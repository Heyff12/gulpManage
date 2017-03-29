'use strict';

//点击储值项
function click_chulist(obj) {
    $(obj).addClass('li_choose').siblings('li').removeClass('li_choose');
};
require(['../require-config'], function () {
    require(["zepto", "yanzheng", "ajax_rule", "localstorage", "date_change"], function ($, yanzheng, ajax_rule, localstorage, date_change) {
        $(function () {
            //---取消了native if_menu的引用0106
            //设置储值活动----------------------------------------------------------------------------------------------------------------------------------------------------
            var preview_data = ['start_time', 'end_time', 'rules', 'desc', 'mch_mobile', 'merchant_name'];
            $(document).ready(function () {
                //获取初始值
                localstorage.get_storage(get_data);
            });
            //点击提交预览
            $('.js_preview_sub').on('click', function () {
                //提交数据
                var data_post = localstorage.get_data_all(preview_data);
                data_post.start_time = date_change.time_change_long(data_post.start_time) + ' 00:00:00';
                data_post.end_time = date_change.time_change_long(data_post.end_time) + ' 23:59:59';
                var rules_data = JSON.parse(data_post.rules);
                var rules_data_str = '[';
                for (var i = 0; i < rules_data.length; i++) {
                    var rule = rules_data[i];
                    var rule_str;
                    if (i == '0') {
                        rule_str = JSON.stringify(rule);
                    } else {
                        rule_str = ',' + JSON.stringify(rule);
                    }
                    rules_data_str += rule_str;
                }
                rules_data_str += ']';
                data_post.rules = rules_data_str;
                var eidt = yanzheng.get_hash('edit');
                if (eidt == 'mend') {
                    ajax_rule.ajax_rule('/prepaid/v1/api/b/activity/alter', 'POST', 'json', data_post, '.zheceng', post_data);
                } else {
                    ajax_rule.ajax_rule('/prepaid/v1/api/b/activity', 'POST', 'json', data_post, '.zheceng', post_data);
                }
            });
            //点击切换储值
            // $(document).on('click', '.js_rechage_ul li', function() {
            //     $(this).addClass('li_choose').siblings('li').removeClass('li_choose');
            // });
            //获取时间后设置日期显示--规则显示
            function get_data() {
                //日期
                var startime = localstorage.getone_storage('start_time');
                var startime_zu = startime.split('-');
                if (startime) {
                    $('.js_startime').text(startime_zu[0] + '年' + startime_zu[1] + '月' + startime_zu[2] + '日');
                } else {
                    $('.js_startime').text('');
                }
                var endtime = localstorage.getone_storage('end_time');
                var endtime_zu = endtime.split('-');
                if (endtime) {
                    $('.js_endtime').text(endtime_zu[0] + '年' + endtime_zu[1] + '月' + endtime_zu[2] + '日');
                } else {
                    $('.js_endtime').text('');
                }
                //储值规则--有退出，放置最后
                var rules = JSON.parse(localstorage.getone_storage('rules'));
                if (!rules) {
                    return false;
                }
                var class_val = '';
                if (rules.length == 1) {
                    class_val = 'li_one';
                } else if (rules.length == 2) {
                    class_val = 'li_two';
                } else {
                    class_val = '';
                }
                for (var i = 0; i < rules.length; i++) {
                    var chu_value = (rules[i].pay_amt / 100).toFixed(0);
                    var song_value = (rules[i].present_amt / 100).toFixed(0);
                    var index_value = rules[i].grid_index;
                    var rule_li = '<li onclick="click_chulist(this)" data-index="' + index_value + '" class="' + class_val + '"><p class="font_17">储值<span>' + chu_value + '</span>元</p><p>送<span>' + song_value + '</span>元</p><span class="choose"><i class="choose_i"></i></span></li>';
                    $('.js_rechage_ul').append(rule_li);
                }
                $('.js_rechage_ul li').eq(0).addClass('li_choose');
            }
            //提交数据
            function post_data(return_data) {
                //清空数据
                localstorage.clean_storage(preview_data);
                //调到储值活动首页todo
                // var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/index.html';
                // if_menu.goto_url(url_val);
                location.href = location.protocol + '//' + location.host + '/prepaid/v1/page/b/index.html';
                // if (typeof QFPAY !== "undefined") {
                //     var go_url = {
                //         uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/index.html',
                //     };
                //     native.openUri(go_url, function(cb) {
                //         console.log(cb.ret);
                //     });
                //     //暂时隐藏关闭所有---下次版本更新使用
                //     // var close_url = {};
                //     // native.closeAll(close_url, function(cb) {
                //     //     console.log(cb.ret);
                //     // });
                // } else {
                //     location.href = location.protocol + '//' + location.host + '/prepaid/v1/page/b/index.html';
                // }
            }
        });
    });
});