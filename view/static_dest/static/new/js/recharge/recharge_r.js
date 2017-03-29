"use strict";

require(['../require-config'], function () {
    require(["jquery", "yanzheng", "ajaxps", "date"], function ($, yanzheng, ajaxps, date) {
        $(function () {
            ajaxps.get_rule_detail();
            //测试过期显示--不需要，进攻测试
            var return_expired = $('#hidden').val();
            if (return_expired == '1') {
                $('.js_li_none').show();
                $('.js_li_show').hide();
            } else {
                $('.js_li_none').hide();
                $('.js_li_show').show();
            }
            //储值首页----------------------------------------------------------------------------------------------------------------------------------------------------
            $('.js_recharge_index').get(0) && ~function () {
                $(document).ready(function () {
                    //获取储值列表todo-show
                    //get_rechargeli();
                    //获取储值规则-show
                    //get_rule_detail();
                    //获取当前用户个人信息-show
                    //get_message();
                });
                date.date();
                //选择储值项——————add_new
                // $('.js_rechage_ul li').live('click', function() {
                //     $(this).addClass('li_choose').siblings('li').removeClass('li_choose');
                // });
                $(document).on('click', '.js_rechage_ul li', function () {
                    $(this).addClass('li_choose').siblings('li').removeClass('li_choose');
                });
                //点击购买弹出填写信息——————add_new
                $('.js_content_sub').on('click', function () {
                    $('#alert_message').show();
                    yanzheng.alert_top('#alert_message');
                    $('.zheceng').show();
                });
                //点击填写信息确定按钮——————add_new
                $('.js_alert_message').on('click', function () {
                    var first = $('.js_hidden_first').val();
                    var name = $('.js_message_name').val();
                    var tel = $('.js_message_tel').val();
                    var birth = $('.js_message_birth').val();
                    if (first == '1') {
                        yanzheng.birth_test('.js_message_birth', -1, 20);
                    } else {
                        yanzheng.tel_test('.js_message_tel');
                        yanzheng.china_test('.js_message_name', 1, 4);
                        yanzheng.birth_test('.js_message_birth', -1, 20);
                    }
                    var bor_red_num = $('.border_red').length;
                    if (bor_red_num > 0) {
                        return false;
                    }
                    //提交充值
                    //get_rechargesub(name,tel,birth);
                });
            }();
            //获取储值规则
            function get_rule_detail() {
                $.ajax({
                    url: '/prepaid/v1/api/c/rulexplain',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'c': get_hash('c'),
                        'h': get_hash('h')
                    },
                    beforeSend: function beforeSend() {
                        $('#loading').show();
                        $('.zheceng1').show();
                    },
                    success: function success(data) {
                        if (data.respcd != '0000') {
                            $('#alert_alert').show();
                            $('.zheceng1').show();
                            if (!data['respmsg']) {
                                $('#alert_alert .alert_con_br').html(data['resperr']);
                            } else {
                                $('#alert_alert .alert_con_br').html(data['respmsg']);
                            }
                        } else {
                            var return_data = data.data;
                            var return_data_l = return_data.length;
                            for (var i = 0; i < return_data_l; i++) {
                                var li_detail = '<li><span>' + return_data[i] + '</span></li>';
                                $(".js_note_ul_detail").append(li_detail);
                            }
                            $('.zheceng1').hide();
                        }
                    },
                    error: function error(data) {
                        $('#alert_alert').show();
                        $('.zheceng1').show();
                        //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function complete() {
                        $('#loading').hide();
                        //$('.zheceng').hide();
                    }
                });
            }
            //获取个人信息-----add_new
            function get_message() {
                $('.js_dl_message input').val('');
                $.ajax({
                    url: '/prepaid/v1/api/c/bind',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'c': get_hash('c'),
                        'h': get_hash('h')
                    },
                    beforeSend: function beforeSend() {
                        $('#loading').show();
                        $('.zheceng2').show();
                    },
                    success: function success(data) {
                        if (data.respcd != '0000') {
                            $('#alert_alert').show();
                            $('.zheceng2').show();
                            if (!data['respmsg']) {
                                $('#alert_alert .alert_con_br').html(data['resperr']);
                            } else {
                                $('#alert_alert .alert_con_br').html(data['respmsg']);
                            }
                        } else {
                            var return_data = data.data;
                            var return_binded = return_data.binded;
                            var return_name = return_data.name;
                            var return_mobile = return_data.mobile;
                            var return_birth = return_data.birthday;
                            $('.js_hidden_first').val(return_binded);
                            $('.js_message_name').val(return_name);
                            $('.js_message_tel').val(return_mobile);
                            $('.js_message_birth').val(return_birth);
                            if (return_binded == '1') {
                                $('.js_dl_message input.js_input').attr('readonly', 'readonly').addClass('grey');
                                if (return_birth.length > 0) {
                                    $('.js_message_birth').attr('disabled', 'disabled').addClass('grey');
                                } else {
                                    $('.js_message_birth').removeAttr('disabled').removeClass('grey');
                                }
                            } else {
                                $('.js_dl_message input.js_input').removeAttr('readonly').removeClass('grey');
                                $('.js_message_birth').removeAttr('disabled').removeClass('grey');
                            }
                            $('.zheceng2').hide();
                        }
                    },
                    error: function error(data) {
                        $('#alert_alert').show();
                        $('.zheceng2').show();
                        //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function complete() {
                        $('#loading').hide();
                        //$('.zheceng').hide();
                    }
                });
            }
            //点击购买
            function get_rechargesub(name, tel, birth) {
                $.ajax({
                    url: '/prepaid/v1/api/c/recharge',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        'c': get_hash('c'),
                        'h': get_hash('h'),
                        'o': get_hash('o'),
                        'grid_index': $('.js_rechage_ul li.li_choose').attr('data-index'),
                        'name': name,
                        'mobile': tel,
                        'birthday': birth
                    },
                    beforeSend: function beforeSend() {
                        // $('#loading').show();
                        // $('.zheceng').show();
                        $('.js_alert_message').hide();
                        $('.js_load_message').show().css('display', 'inline-block');
                        // $('.js_alert_message').attr('disabled', 'disabled').addClass('disa');
                        // $('.js_alert_message').find('i.js_i_sure').hide();
                        // $('.js_alert_message').find('i.js_i_load').show().css('display','inline-block');
                    },
                    success: function success(data) {
                        if (data.respcd != '0000') {
                            $('.js_alert_message').show().css('display', 'inline-block');
                            $('.js_load_message').hide();
                            $('#alert_message').hide();
                            $('#passerror_alert').show();
                            $('.zheceng').show();
                            if (!data['respmsg']) {
                                $('#passerror_alert .alert_con_br').html(data['resperr']);
                            } else {
                                $('#passerror_alert .alert_con_br').html(data['respmsg']);
                            }
                        } else {
                            //pay_now();
                            //$('.zheceng').hide();
                            window.location.href = data.data.url;
                        }
                    },
                    error: function error(data) {
                        $('.js_alert_message').show().css('display', 'inline-block');
                        $('.js_load_message').hide();
                        $('#alert_message').hide();
                        $('#passerror_alert').show();
                        $('.zheceng').show();
                        //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                        $('#passerror_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function complete() {
                        // $('#loading').hide();
                        //$('.zheceng').hide();
                        // $('.js_alert_message').removeAttr('disabled').removeClass('disa');
                        // $('.js_alert_message').find('i.js_i_sure').show();
                        // $('.js_alert_message').find('i.js_i_load').hide();
                    }
                });
            }
            //获取储值列表
            function get_rechargeli() {
                $.ajax({
                    url: '/prepaid/v1/api/c/recharge/rules',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'c': get_hash('c'),
                        'h': get_hash('h')
                    },
                    beforeSend: function beforeSend() {
                        $('#loading').show();
                        $('.zheceng').show();
                    },
                    success: function success(data) {
                        if (data.respcd != '0000') {
                            $('#alert_alert').show();
                            $('.zheceng').show();
                            if (!data['respmsg']) {
                                $('#alert_alert .alert_con_br').html(data['resperr']);
                            } else {
                                $('#alert_alert .alert_con_br').html(data['respmsg']);
                            }
                        } else {
                            //验证是否过期
                            var return_expired = data.data.expired;
                            if (return_expired == '1') {
                                $('.js_li_none').show();
                                $('.js_li_show').hide();
                                $('.zheceng').hide();
                                return false;
                            } else {
                                $('.js_li_none').hide();
                                $('.js_li_show').show();
                            }
                            var return_data = data.data.rules;
                            //获取规则当中储值可用的规则
                            var return_data_right = [];
                            $(return_data).each(function (i, item) {
                                var tx_fee = (return_data[i].present_amt / 100).toFixed(0);
                                var tx_txamt = (return_data[i].pay_amt / 100).toFixed(0);
                                if (tx_fee >= 1 && tx_txamt >= 1) {
                                    return_data_right.push(item);
                                }
                            });
                            //console.log(return_data_right);
                            var data_length = return_data_right.length;
                            if (data_length == '0') {
                                $('.js_content_sub_disa').show();
                                $('.js_content_sub').hide();
                                $('.zheceng').hide();
                                return false;
                            } else {
                                $('.js_content_sub_disa').hide();
                                $('.js_content_sub').show();
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
                            $('.zheceng').hide();
                        }
                    },
                    error: function error(data) {
                        $('#alert_alert').show();
                        $('.zheceng').show();
                        //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function complete() {
                        $('#loading').hide();
                        //$('.zheceng').hide();
                    }
                });
            }
            //关闭弹框
            $('.js_alert_con_close').on('click', function () {
                $('.alert_con').hide();
                // $('.alert_con .alert_con_br').html();
                $('.zheceng').hide();
                $('.zheceng1').hide();
                $('.zheceng2').hide();
            });
        });
    });
});