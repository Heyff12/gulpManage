'use strict';

function hideMenu() {
    WeixinJSBridge.call('hideOptionMenu');
    WeixinJSBridge.call('hideToolbar');
}
if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', hideMenu, false);
    } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', hideMenu);
        document.attachEvent('onWeixinJSBridgeReady', hideMenu);
    }
} else {
    hideMenu();
}
//点击储值项
function click_chulist(obj) {
    $(obj).addClass('li_choose').siblings('li').removeClass('li_choose');
};
require(['../require-config'], function () {
    require(["zepto", "ajax_rule"], function ($, ajax_rule) {
        $(function () {
            //修改--储值协议链接
            if (location.href.split('?').length > 1) {
                $('.js_protol_url').attr('href', '/prepaid/v1/page/c/pacp.html?' + location.href.split('?')[1]);
            }
            //储值首页----------------------------------------------------------------------------------------------------------------------------------------------------
            //判断屏幕是否超过一屏，按钮是否是固定
            var window_height = window.innerHeight;
            var fixedb_height = $('.js_fixed_button').height();
            var body_height = $('body').height();
            var scr_mobile = false,
                src_rule = false,
                src_note = false;
            $(document).ready(function () {
                //获取储值列表todo-show
                var data_rules = {
                    'c': get_hash('c'),
                    'h': get_hash('h')
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/recharge/rules', 'GET', 'json', data_rules, '.zheceng', get_rules);

                //获取储值规则
                var data_rulesdetail = {
                    'c': get_hash('c'),
                    'h': get_hash('h')
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/rulexplain', 'GET', 'json', data_rulesdetail, '.zheceng1', get_rulesdetail);

                //获取商家名称
                var data_merchant = {
                    'h': get_hash('h')
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/merchant_info', 'GET', 'json', data_merchant, '.zheceng1', get_merchant);

                //获取储值账户          
                var data_before = {
                    'c': get_hash('c'),
                    'h': get_hash('h'),
                    'o': get_hash('o'),
                    'grid_index': '1'
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/recharge/before', 'GET', 'json', data_before, '.zheceng2', get_bindinfo_if, get_bindinfo_if_error);

                //获取储值余额
                var data_balance = {
                    'c': get_hash('c'),
                    'h': get_hash('h')
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/balance', 'GET', 'json', data_balance, '.zheceng1', get_balance);
            });
            //点击购买弹出填写信息——————add_new
            $('.js_content_sub').on('click', function () {
                _hmt.push(['_trackEvent', 'recharge', 'click', 'recharge_buy']);
                //充值前校验
                var data_before = {
                    'c': get_hash('c'),
                    'h': get_hash('h'),
                    'o': get_hash('o'),
                    'grid_index': $('.js_rechage_ul li.li_choose').attr('data-index')
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/recharge/before', 'GET', 'json', data_before, '.zheceng2', get_pay_money);
            });
            //判断屏幕与按钮的关系
            function screen_button() {
                if (!scr_mobile || !src_rule || !src_note) {
                    return false;
                }
                body_height = $('body').height();
                if (body_height + fixedb_height - window_height >= 0) {
                    $('.js_fixed_button').hide();
                    $('.js_relative_button').show();
                    $('.js_section_mark').removeClass('margin_b');
                } else {
                    $('.js_fixed_button').show();
                    $('.js_relative_button').hide();
                    $('.js_section_mark').addClass('margin_b');
                }
            }
            //获取储值列表
            function get_rules(return_data_data) {
                //验证是否过期
                var return_expired = return_data_data.expired;
                if (return_expired == '1') {
                    $('.js_li_none').show();
                    $('.js_li_show').hide();
                    return false;
                } else {
                    $('.js_li_none').hide();
                    $('.js_li_show').show();
                }
                var return_data = return_data_data.rules;
                //获取规则当中储值可用的规则
                var return_data_right = [];
                $(return_data).each(function (i, item) {
                    var tx_fee = (return_data[i].present_amt / 100).toFixed(0);
                    var tx_txamt = (return_data[i].pay_amt / 100).toFixed(0);
                    if (tx_fee >= 1 && tx_txamt >= 1) {
                        return_data_right.push(item);
                    }
                });
                var data_length = return_data_right.length;
                if (data_length == '0') {
                    $('.js_content_sub_disa').show().css('display', 'inline-block');
                    $('.js_content_sub').hide();
                    return false;
                } else {
                    $('.js_content_sub_disa').hide();
                    $('.js_content_sub').show().css('display', 'inline-block');
                }
                $(return_data_right).each(function (i, item) {
                    var tx_fee = (return_data_right[i].present_amt / 100).toFixed(0);
                    var tx_txamt = (return_data_right[i].pay_amt / 100).toFixed(0);
                    var tx_index = return_data_right[i].grid_index;
                    var li_detail;
                    if (data_length == '1') {
                        li_detail = '<li class="li_one" onclick="click_chulist(this)" data-index="' + tx_index + '"><p class="font_17">储值<span class="js_rechar_num">' + tx_txamt + '</span>元</p><p>送<span class="js_rechar_sendnum">' + tx_fee + '</span>元</p><span class="choose"><i class="choose_i"></i></span></li>';
                    } else if (data_length == '2') {
                        li_detail = '<li class="li_two" onclick="click_chulist(this)" data-index="' + tx_index + '"><p class="font_17">储值<span class="js_rechar_num">' + tx_txamt + '</span>元</p><p>送<span class="js_rechar_sendnum">' + tx_fee + '</span>元</p><span class="choose"><i class="choose_i"></i></span></li>';
                    } else {
                        li_detail = '<li onclick="click_chulist(this)" data-index="' + tx_index + '"><p class="font_17">储值<span class="js_rechar_num">' + tx_txamt + '</span>元</p><p>送<span class="js_rechar_sendnum">' + tx_fee + '</span>元</p><span class="choose"><i class="choose_i"></i></span></li>';
                    }
                    $(".js_rechage_ul").append(li_detail);
                });
                $(".js_rechage_ul li").eq(0).addClass('li_choose');
                //成功后重新判断body高度
                src_rule = 'ture';
                screen_button();
            }
            //获取储值规则
            function get_rulesdetail(return_data_data) {
                var return_data = return_data_data;
                var return_data_l = return_data.length;
                for (var i = 0; i < return_data_l; i++) {
                    var li_detail = '<li><span>' + return_data[i] + '</span></li>';
                    $(".js_note_ul_detail").append(li_detail);
                }
                //成功后重新判断body高度
                src_note = 'ture';
                screen_button();
            }
            //获取商家名称
            function get_merchant(return_data) {
                var shopname = return_data.shopname;
                $('.js_shopname').text(shopname);
            }
            //获取储值账户
            function get_bindinfo(return_data) {
                var mobile = return_data.mobile;
                if (!mobile) {
                    $('.js_mobilehang').hide();
                    return false;
                }
                $('.js_mobile').text(mobile);
                //根据储值账户现实与否--重新判断body高度
                scr_mobile = 'ture';
                screen_button();
            }
            //获取储值账户失败
            function get_bindinfo_error() {
                $('.js_mobilehang').hide();
                //根据储值账户现实与否--重新判断body高度
                scr_mobile = 'ture';
                screen_button();
            }
            //获取余额
            function get_balance(return_data) {
                var balance = (return_data.balance / 100).toFixed(2);
                $('.js_balance').text(balance);
            }
            //点击购买
            function get_pay_money(return_data_data) {
                var return_data = return_data_data;
                var recharge_num = return_data.recharge;
                var recharge_url = return_data.url;
                if (recharge_num == '0') {
                    window.location.href = recharge_url;
                } else {
                    var data_recharge = {
                        'c': get_hash('c'),
                        'h': get_hash('h'),
                        'o': get_hash('o'),
                        'grid_index': $('.js_rechage_ul li.li_choose').attr('data-index')
                    };
                    ajax_rule.ajax_rule('/prepaid/v1/api/c/recharge', 'POST', 'json', data_recharge, '.zheceng2', get_recharge);
                }
            }
            //提交充值
            function get_recharge(return_data) {
                window.location.href = return_data.url;
            }
            //判断是否调用--储值账户
            function get_bindinfo_if(return_data) {
                var recharge_num = return_data.recharge;
                if (recharge_num == '0') {
                    $('.js_mobilehang').hide();
                    //根据储值账户现实与否--重新判断body高度
                    scr_mobile = 'ture';
                    screen_button();
                } else {
                    var data_bindinfo = {
                        'c': get_hash('c')
                    };
                    ajax_rule.ajax_rule(' /prepaid/v1/api/c/bindinfo', 'GET', 'json', data_bindinfo, '.zheceng1', get_bindinfo, get_bindinfo_error);
                }
            }
            //
            function get_bindinfo_if_error() {
                //根据储值账户现实与否--重新判断body高度
                scr_mobile = 'ture';
                screen_button();
            }
            //通用--------------------------------------------------------------------------------------------------------
            //获取url的指定hash值
            function get_hash(hash_val) {
                var c_val;
                if (location.href.split('?').length < 2) {
                    return false;
                }
                var url_l = location.href.split('?')[1].split('&');
                var url_l_l = url_l.length;
                for (var i = 0; i < url_l_l; i++) {
                    var url_val = url_l[i].split('=');
                    if (url_val[0] == hash_val) {
                        c_val = url_val[1];
                        return c_val;
                    }
                }
            }
        });
    });
});