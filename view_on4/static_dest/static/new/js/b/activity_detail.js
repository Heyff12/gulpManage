"use strict";

require(['../require-config'], function () {
    require(["zepto", "ajax_rule", "scroll_more", "date_change", "if_menu"], function ($, ajax_rule, scroll_more, date_change, if_menu) {
        $(function () {
            $(document).ready(function () {
                //获取信息--todo
                activity_detail_request();
                $('.js_stop_but').on('click', function () {
                    //停止活动
                    $('#alert_view').toggle();
                });
                configur_alert_action();
                $('.js_modify_but').on('click', function () {
                    var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/alter_activity.html?activity_id=' + getQueryParamString('activity_id');
                    if_menu.goto_url(url_val);
                });
            });
            /*************************************** private func **************************************/
            function activity_detail_request() {
                var data = new Object();
                var activityId = getQueryParamString('activity_id');
                if (activityId) {
                    data.activity_id = activityId;
                }
                ajax_rule.ajax_rule('/prepaid/v1/api/b/activity_detail', 'GET', 'json', data, '.zheceng1', request_success);
            }
            //弹框按钮点击事件
            function configur_alert_action() {
                //点击的确认
                $('.alert_but_confirm').on('click', function () {
                    $('#alert_view').hide();
                    //停止活动请求
                    ajax_rule.ajax_rule('/prepaid/v1/api/b/activity/stop', 'POST', 'json', '', '.zheceng', stop_activity_success);
                });
                //点击的取消
                $('.alert_but_cancel').on('click', function () {
                    $('#alert_view').hide();
                });
            }
            //停止活动请求成功
            function stop_activity_success() {
                activity_detail_request();
                $('.but_content').hide();
            }
            //请求成功
            function request_success(detailDict) {
                var status = detailDict.status;
                var statusColor = 'black';
                var statusStr;
                if (status == 1) {
                    //活动进行中
                    statusStr = '进行中';
                    statusColor = 'orange';
                    $('.but_content').toggle();
                } else if (status == 2) {
                    //已结束
                    statusStr = '已结束';
                } else if (status == 0) {
                    statusStr = detailDict.countdown_day + '天后开始';
                    statusColor = 'orange';
                    $('.but_content').toggle();
                } else {
                    //已终止
                    statusStr = '已终止';
                }
                $('.js_status').addClass(statusColor);
                $('.js_status').html(statusStr);
                var startTime = splitDateString(detailDict.info.start_time);
                var endTime = splitDateString(detailDict.info.end_time);
                $('.js_activity_date').html(startTime + ' - ' + endTime);
                var updateTime = detailDict.info.update_time;
                $('.js_update_date').html(updateTime);
                $('.activity_detail').attr('activity_id', detailDict.info.activity_id);
                $('li.rule').remove();
                configurRules(detailDict.rules);
                $('.js_desription').html(detailDict.info.desc);
            }
            //更新规则
            function configurRules(rules) {
                for (var i = 0; i < rules.length; i++) {
                    var rule = rules[i];
                    var pay_amt = parseInt(rule.pay_amt / 100) + '元';
                    var present_amt = parseInt(rule.present_amt / 100) + '元';
                    var ruleStr = '储值' + pay_amt + '送' + present_amt;
                    if (i == 0) {
                        //第一条规则
                        $('.js_first_rule').html(ruleStr);
                    } else {
                        var cell = '<li class="detail_cell rule"><dt class="black">' + ruleStr + '</dt></li>';
                        $('#rule_section').append(cell);
                    }
                }
            }

            //处理时间
            function splitDateString(dateStr) {
                var strings = dateStr.split(' ');
                return strings[0];
            }

            //获取查询参数
            function getQueryParamString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
        });
    });
});