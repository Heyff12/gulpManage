"use strict";

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
$('.js_recharge_index').get(0) && (~ function() {
    $(document).ready(function() {
        //获取储值列表todo-show
        //get_rechargeli();
        //获取储值规则-show
        //get_rule_detail();
        //获取当前用户个人信息
        //get_message();-show
        //获取储值余额todo-取消
        //get_rechargediff();
        //点击购买todo-取消
        // $('.js_content_sub').on('click', function() {
        //     //get_rechargesub();
        // });
    });
    //选择储值项——————add_new
    // $('.js_rechage_ul li').live('click', function() {
    //     $(this).addClass('li_choose').siblings('li').removeClass('li_choose');
    //     //recharge_num(this);//--取消
    // });
    $(document).on('click', '.js_rechage_ul li', function() {
        $(this).addClass('li_choose').siblings('li').removeClass('li_choose');
        //recharge_num(this);//--取消
    });
    //查看活动协议--作废
    $('.js_scan_protocol').on('click', function() {
        $('#alert_protocol').show();
        $('.zheceng').show();
    });
    //查看活动规则--作废
    $('.js_scan_rule').on('click', function() {
        $('#alert_rule').show();
        $('.zheceng').show();
    });
    //点击购买弹出填写信息——————add_new
    $('.js_content_sub').on('click', function() {
        $('#alert_message').show();
        alert_top('#alert_message');
        $('.zheceng').show();
    });
    //点击填写信息确定按钮——————add_new
    $('.js_alert_message').on('click', function() {
        var first = $('.js_hidden_first').val();
        var name = $('.js_message_name').val();
        var tel = $('.js_message_tel').val();
        var birth = $('.js_message_birth').val();
        if (first == '1') {
            birth_test('.js_message_birth', -1, 20);
        } else {
            tel_test('.js_message_tel');
            china_test('.js_message_name', 1, 4);
            birth_test('.js_message_birth', -1, 20);
        }
        var bor_red_num = $('.border_red').length;
        if (bor_red_num > 0) {
            return false;
        }
        //提交充值
        //get_rechargesub(name,tel,birth);
    });
    // 初始化插件内容——————add_new
    var opt_data = {
        preset: 'date', //日期格式 date（日期）|datetime（日期加时间）
        theme: 'jqm', //皮肤样式
        display: 'modal', //显示方式
        mode: 'clickpick', //日期选择模式
        dateFormat: 'yy-mm-dd', // 日期格式
        setText: '确定', //确认按钮名称
        cancelText: '取消', //取消按钮名籍我
        dateOrder: 'yymmdd', //面板中日期排列格式
        dayText: '日',
        monthText: '月',
        yearText: '年', //面板中年月日文字
        endYear: 2050, //结束年份
        showNow: true,
        nowText: '今天',
        hourText: '小时',
        minuteText: '分'
    };
    // 使用定义插件——————add_new
    $("#f_companydate").mobiscroll(opt_data);
}());
//储值结果----------------------------------------------------------------------------------------------------------------------------------------------------
$('.js_result_index').get(0) && (~ function() {
    $(document).ready(function() {
        //获取储值结果
        //get_recharge_result();
    });
    $('.js_result_recharge').on('click', function() {
        open(location, '_self').close();
        WeixinJSBridge.invoke('closeWindow', {}, function(res) {});
    });
}());
//获取储值结果--内容
function get_recharge_result() {
    $.ajax({
        url: '/prepaid/v1/api/c/recharge/result',
        type: 'GET',
        dataType: 'json',
        data: {
            'c': get_hash('c'),
            'h': get_hash('h'),
            'biz_sn': get_hash('biz_sn'),
            'syssn': get_hash('syssn'),
        },
        start: function() {
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
                var return_pay = (return_data.pay_amt / 100).toFixed(2);
                var return_recharge = (return_data.txamt / 100).toFixed(2);
                var return_href = return_data.uri;
                $('.js_paynum').text(return_pay);
                $('.js_chargenum').text(return_recharge);
                $('.js_result_buy').attr('href', return_href);
                //获取储值结果--商家和总储值余额
                get_rechargedetail();
            }
        },
        error: function(data) {
            $('#alert_alert').show();
            $('.zheceng').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#alert_alert .alert_con_br').html('网络超时!');
        },
        end: function() {
            $('#loading').hide();
            $('.zheceng').hide();
        }
    });
}
//获取储值规则
function get_rule_detail() {
    $.ajax({
        url: '/prepaid/v1/api/c/rulexplain',
        type: 'GET',
        dataType: 'json',
        data: {
            'c': get_hash('c'),
            'h': get_hash('h'),
        },
        beforeSend: function() {
            $('#loading').show();
            $('.zheceng1').show();
        },
        success: function(data) {
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
        error: function(data) {
            $('#alert_alert').show();
            $('.zheceng1').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#alert_alert .alert_con_br').html('网络超时!');
        },
        complete: function() {
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
            'h': get_hash('h'),
        },
        beforeSend: function() {
            $('#loading').show();
            $('.zheceng2').show();
        },
        success: function(data) {
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
        error: function(data) {
            $('#alert_alert').show();
            $('.zheceng2').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#alert_alert .alert_con_br').html('网络超时!');
        },
        complete: function() {
            $('#loading').hide();
            //$('.zheceng').hide();
        }
    });
}

function get_message_bf() {
    $('.js_dl_message input').val('');
    $.ajax({
        url: '/prepaid/v1/api/c/bind',
        type: 'GET',
        dataType: 'json',
        data: {
            'c': get_hash('c'),
            'h': get_hash('h'),
        },
        beforeSend: function() {
            $('#loading').show();
            $('.zheceng2').show();
        },
        success: function(data) {
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
                if (return_binded == '1') {
                    $('.js_dl_message input.js_input').attr('readonly', 'readonly');
                    $('.js_message_name').val(return_name);
                    $('.js_message_tel').val(return_mobile);
                    if (return_birth.length > 0) {
                        $('.js_message_birth').val(return_birth).attr('disabled', 'true');
                    } else {
                        $('.js_message_birth').removeAttr('disabled');
                    }
                } else {
                    $('.js_dl_message input.js_input').removeAttr('readonly');
                    $('.js_message_birth').removeAttr('disabled');
                }
                $('.zheceng2').hide();
            }
        },
        error: function(data) {
            $('#alert_alert').show();
            $('.zheceng2').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#alert_alert .alert_con_br').html('网络超时!');
        },
        complete: function() {
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
            'birthday': birth,
        },
        beforeSend: function() {
            // $('#loading').show();
            // $('.zheceng').show();
            $('.js_alert_message').hide();
            $('.js_load_message').show().css('display', 'inline-block');
            // $('.js_alert_message').attr('disabled', 'disabled').addClass('disa');
            // $('.js_alert_message').find('i.js_i_sure').hide();
            // $('.js_alert_message').find('i.js_i_load').show().css('display','inline-block');
        },
        success: function(data) {
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
        error: function(data) {
            $('.js_alert_message').show().css('display', 'inline-block');
            $('.js_load_message').hide();
            $('#alert_message').hide();
            $('#passerror_alert').show();
            $('.zheceng').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#passerror_alert .alert_con_br').html('网络超时!');
        },
        complete: function() {
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
            'h': get_hash('h'),
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
                $(return_data).each(function(i, item) {
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
                }else{
                    $('.js_content_sub_disa').hide();
                    $('.js_content_sub').show();
                }
                $(return_data_right).each(function(i, item) {
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
        error: function(data) {
            $('#alert_alert').show();
            $('.zheceng').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#alert_alert .alert_con_br').html('网络超时!');
        },
        complete: function() {
            $('#loading').hide();
            //$('.zheceng').hide();
        }
    });
    //将交易金额填充选择的储值金额-----------------取消
    //recharge_num('li.li_choose');
}
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
//验证中文-----add_new
function china_test(id, num1, num2) {
    var val = $(id).val();
    var val_exp = new RegExp("^[\u4e00-\u9fa5]{" + num1 + "," + num2 + "}$"); // /^[\u4e00-\u9fa5]{num1,num2}$/
    if (!val_exp.test(val)) {
        $(id).addClass('border_red');
    } else {
        $(id).removeClass('border_red');
    }
}
//验证手机号-----add_new
function tel_test(id) {
    var val = $(id).val();
    var val_exp = /^1[0-9]{10}$/;
    if (!val_exp.test(val)) {
        $(id).addClass('border_red');
    } else {
        $(id).removeClass('border_red');
    }
}
//验证生日-----add_new
function birth_test(id, num1, num2) {
    var val = $(id).val();
    var val_l = val.length;
    if (val_l <= num1 || val_l > num2) {
        $(id).addClass('border_red');
    } else {
        $(id).removeClass('border_red');
    }
}
//获取储值结果--商家和总储值余额-----------------不使用-更改了调用功能
function get_rechargedetail() {
    var userid = get_hash('h');
    $.ajax({
        url: '/prepaid/v1/api/c/merchants/' + userid,
        type: 'GET',
        dataType: 'json',
        data: {
            'c': get_hash('c'),
        },
        start: function() {
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
                var return_company = return_data.merchant_name;
                var return_diff = (return_data.balance / 100).toFixed(2);
                $('.js_paycompa').text(return_company);
                $('.js_leftnum').text(return_diff);
            }
        },
        error: function(data) {
            $('#alert_alert').show();
            $('.zheceng').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#alert_alert .alert_con_br').html('网络超时!');
        },
        end: function() {
            $('#loading').hide();
            $('.zheceng').hide();
        }
    });
}
//获取储值余额-----------------取消
function get_rechargediff() {
    $.ajax({
        url: '/prepaid/v1/api/c/recharge/balance',
        type: 'GET',
        dataType: 'json',
        data: {
            'c': get_hash('c'),
            'h': get_hash('h'),
        },
        start: function() {
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
                var return_diff = (return_data.balance / 100).toFixed(2);
                $('.js_paynum').text(return_diff);
            }
        },
        error: function(data) {
            $('#alert_alert').show();
            $('.zheceng').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#alert_alert .alert_con_br').html('网络超时!');
        },
        end: function() {
            $('#loading').hide();
            $('.zheceng').hide();
        }
    });
}
//获取储值协议--todo-----------------取消
function get_protocol_detail() {
    $.ajax({
        url: '/prepaid/v1/api/c/recharge/balance',
        type: 'GET',
        dataType: 'json',
        data: {
            'c': get_hash('c'),
            'h': get_hash('h'),
        },
        start: function() {
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
                var return_detail = return_data.detail;
                $('#js_protocol_detail').html(return_detail);
            }
        },
        error: function(data) {
            $('#alert_alert').show();
            $('.zheceng').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#alert_alert .alert_con_br').html('网络超时!');
        },
        end: function() {
            $('#loading').hide();
            $('.zheceng').hide();
        }
    });
}
//将交易金额填充选择的储值金额-----------------取消
function recharge_num(id) {
    var val = $(id).find('.js_rechar_num').text();
    var val_num = (val - 0).toFixed('2');
    $('.js_paynum').text(val_num);
}
//微信支付-----------------取消
function pay_now() {
    var data = {};
    data.amt = 1;
    data.openid = $('#openid').val();
    data.syssn = $('#syssn').val();
    data.userid = $('#userid').val();
    $.ajax({
        url: location.pathname,
        type: 'post',
        dataType: 'json',
        data: data,
        start: function() {
            $('#loading').show();
            $('.zheceng').show();
        },
        success: function(data) {
            $('#loading').hide();
            $('.zheceng').hide();
            if (data.respcd != '0000') {
                $('.alert_con').show();
                if (!data['respmsg']) {
                    $('.alert_con .alert_con_br').html(data['resperr']);
                } else {
                    $('.alert_con .alert_con_br').html(data['respmsg']);
                }
                $('.zheceng').show();
                WeixinJSBridge.invoke('closeWindow', {}, function(res) {});
            } else {
                pay(data);
            }
        },
        error: function(data) {
            $('#loading').hide();
            $('.alert_con').show();
            $('.zheceng').show();
            if (!data['respmsg']) {
                $('.alert_con .alert_con_br').html(data['resperr']);
            } else {
                $('.alert_con .alert_con_br').html(data['respmsg']);
            }
            WeixinJSBridge.invoke('closeWindow', {}, function(res) {});
        },
        end: function() {
            $('#loading').hide();
            $('.zheceng').hide();
        }
    });
}

function pay(d) {
    var p = d.data.pay_params;
    WeixinJSBridge.invoke('getBrandWCPayRequest', {
        'package': p['package'],
        'timeStamp': p['timeStamp'],
        'signType': p['signType'],
        'paySign': p['paySign'],
        'appId': p['appId'],
        'nonceStr': p['nonceStr']
    }, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
            $.ajax({
                url: '/trade/wechat/v1/set_result',
                data: {
                    "syssn": d.data.syssn,
                    "userid": $('#userid').val()
                },
                type: 'get'
            });
            WeixinJSBridge.invoke('closeWindow', {}, function(res) {});
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {} else {
            WeixinJSBridge.invoke('closeWindow', {}, function(res) {});
        }
    });
}
//通用--------------------------------------------------------------------------------------------------------
//弹框高度定位----add_new
function alert_top(id) {
    var alert_height = $(id).height();
    var mar_t = (alert_height / 2) - 20;
    $(id).css('marginTop', -mar_t + 'px');
}
//关闭弹框
$('.js_alert_con_close').on('click', function() {
    $('.alert_con').hide();
    // $('.alert_con .alert_con_br').html();
    $('.zheceng').hide();
    $('.zheceng1').hide();
    $('.zheceng2').hide();
});
