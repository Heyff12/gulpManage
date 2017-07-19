"use strict";

/**
 * Created by mac on 17/2/10.
 */

require(['../require-config'], function () {
    require(["zepto", "ajax_rule", "native", "if_menu"], function ($, ajax_rule, native, if_menu) {
        //付费开通储值服务
        $(function () {
            //$(document).ready(function(){}) DOM加载完成后执行一系列预定义好的函数
            var is_qfgroup = false;
            //请求service/info查询商户是否直营
            ajax_rule.ajax_rule('/prepaid/v1/api/service/info', 'get', 'json', '', '.zheceng', function (jsonData) {
                is_qfgroup = jsonData.is_qfgroup;
            });
            //设置右边的菜单按钮
            var menu_data = {
                menus: [{
                    type: 'uri',
                    uri: 'http://wx.qfpay.com/near-v2/save-currency.html',
                    icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_praise.png',
                    title: '优秀案例'
                }, {
                    type: 'uri',
                    uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/user_guide.html',
                    icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_question.png',
                    title: '常见问题'
                }]
            };

            native.setNavMenu(menu_data, function (cb) {
                console.log(cb.ret);
            });

            function check_service_status() {
                //使用默认的错误处理
                ajax_rule.ajax_rule('/prepaid/v1/api/service/info', 'GET', 'json', '', '.zheceng', create_activity_success);
            }

            function create_activity_success(return_data) {
                //请求成功的回调
                var feesExpire = return_data.expired;
                if (feesExpire == 1) {
                    //费用过期显示续费按钮
                    $('.section_footer_pay').show();
                    $('.section_footer_create').hide();
                } else {
                    //费用没有过期显示创建活动
                    $('.section_footer_create').show();
                    $('.section_footer_pay').hide();
                }
            }

            check_service_status();

            //页面加载完成就发送请求，通过返回判断是立即续费和创建活动
            $('.js_create_activity').on('click', function () {
                //close all
                var closeToUri = location.protocol + '//' + location.host + '/prepaid/v1/page/b/create_activity.html';
                if_menu.goto_url(closeToUri);
            });

            $('.js_pay_fees').on('click', function () {
                //close all
                var openUriData = {
                    uri: is_qfgroup ? "hjsh://member/pay" : 'nearmcht://view-member-pay'
                };
                native.openUri(openUriData, function (cb) {
                    //不关心支付成功和失败都是要回首页的
                    var closeToUri = {
                        uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/index.html'
                    };
                    native.navToUri(closeToUri, function (cb) {
                        console.log(cb.ret);
                    });
                });
            });
        });
    });
});