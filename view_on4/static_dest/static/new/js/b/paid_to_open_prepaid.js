"use strict";

/**
 * Created by mac on 17/2/10.
 */
require(['../require-config'], function () {
    require(["zepto", "ajax_rule", "native", "if_menu"], function ($, ajax_rule, native, if_menu) {
        //付费开通储值服务
        $(function () {
            var is_qfgroup = false;
            //请求service/info查询商户是否直营
            ajax_rule.ajax_rule('/prepaid/v1/api/service/info', 'get', 'json', '', '.zheceng', function (jsonData) {
                is_qfgroup = jsonData.is_qfgroup;
            });
            //设置左边的返回按钮

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

            $('.content_protocol_title').on('click', function () {
                //var openUrl = 'http://wx.qfpay.com/near-v2/save-currency-agreement.html';
                var openUrl = location.protocol + '//' + location.host + '/prepaid/v1/page/b/pacp.html';
                if_menu.goto_url(openUrl);
            });

            $('.ic_check').on('click', function () {
                if ($('#protocol_checkbox').attr("checked") == false) {
                    $('#protocol_checkbox').attr("checked", "checked");
                } else {
                    $('#protocol_checkbox').removeAttr("checked");
                }
            });

            $('.protocol_read').on('click', function () {
                if ($('#protocol_checkbox').attr("checked") == false) {
                    $('#protocol_checkbox').attr("checked", "checked");
                } else {
                    $('#protocol_checkbox').removeAttr("checked");
                }
            });

            $('.js_pay_use').on('click', function () {

                if ($('#protocol_checkbox').attr("checked") == false) {
                    //还没有选择阅读协议,弹提示
                    native.toast({ msg: "你是否已经阅读《储值业务服务协议》" }, function (cb) {
                        console.log(cb.ret);
                    });
                } else {
                    //已经于都协议，跳付费开通服务
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
                }
            });

            $('.js_see_other').on('click', function () {
                var otherActivityUrl = "http://wx.qfpay.com/near-v2/save-currency.html";
                if_menu.goto_url(otherActivityUrl);
            });
        });
    });
});