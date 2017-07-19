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

function to_detail(obj) {
    _hmt.push(['_trackEvent', 'usercenter', 'click', 'index_detail']);
    var url_detail = $(obj).parents('li').attr('data-url');
    location.href = url_detail;
}
require(['../require-config'], function() {
    require(["jquery"], function($) {
        $(function() {
            //个人中心首页----------------------------------------------------------------------------------------------------------------------------------------------------
            $('.js_usercenter_index').get(0) && (~ function() {
                $(document).ready(function() {
                    //获取储值列表
                    get_rechargeli_c();
                    //点击进入储值详情
                    // $('.js_usercenter_ul li .zhe').live('click', function() {
                    //     var url_detail = $(this).parents('li').attr('data-url');
                    //     alert(url_detail);
                    //     console.log(url_detail);
                    //     location.href = url_detail;
                    // });
                    // $(document).on('click', '.js_usercenter_ul li .zhe', function() {
                    //     var url_detail = $(this).parents('li').attr('data-url');
                    //     location.href = url_detail;
                    // });
                });
            }());
            //获取储值首页列表
            function get_rechargeli_c() {
                //alert('获取列表');
                $.ajax({
                    url: '/prepaid/v1/api/c/merchants',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'c': get_hash('c'),
                    },
                    beforeSend: function() {
                        $('#load_small_bg').show();
                        //$('.zheceng').show();
                    },
                    success: function(data) {
                        //alert('获取列表success');
                        if (data.respcd != '0000') {
                            //alert('获取列表success-error');
                            $('#alert_alert').show();
                            $('.zheceng').show();
                            if (!data['respmsg']) {
                                $('#alert_alert .alert_con_br').html(data['resperr']);
                            } else {
                                $('#alert_alert .alert_con_br').html(data['respmsg']);
                            }
                        } else {
                            //alert('获取列表success-in');
                            var return_data = data.data;
                            var data_length = return_data.length;
                            $('.js_company_num').text(data_length);
                            if (data_length == '0') {
                                //$('.zheceng').hide();
                                return false;
                            }
                            $(return_data).each(function(i, item) {
                                var tx_fee = (return_data[i].max_present_amt / 100).toFixed(0); //返现最高金额
                                var tx_txamt = (return_data[i].balance / 100).toFixed(2);
                                var tx_name = return_data[i].merchant_name;
                                var tx_merchant_url = return_data[i].merchant_url;
                                var tx_recharge_url = return_data[i].recharge_url;
                                var tx_url_pay = return_data[i].pay_url;
                                var tx_url = return_data[i].prepaid_detail;
                                var tx_overtime = return_data[i].expired;
                                var li_detail, li_detail_l, li_detail_r;
                                if (return_data[i].bigmchnt == true) {
                                    //大商户 需要隐藏立即储值按钮
                                    li_detail_l = '<li class="overtime" ';
                                } else {
                                    if (tx_overtime == '1') {
                                        //活动过期
                                        li_detail_l = '<li class="overtime" ';
                                    } else {
                                        li_detail_l = '<li ';
                                    }
                                }

                                li_detail_r = 'data-url="' + tx_merchant_url + '"><header><span class="js_company_name">' + tx_name + '</span></header><p class="grey">储值余额</p><p class="price orange">￥<span class="js_company_diff">' + tx_txamt + '</span></p><dl class="company_dl"><dt><i class="sale"></i>最高返现金额达<span class="js_company_sale">' + tx_fee + '</span>元</dt><dd class="js_recharge_now"><a onclick="_hmt.push(["_trackEvent","usercenter","click","index_buy"])" href="' + tx_recharge_url + '">立即储值</a></dd><div class="clearfix"></div></dl><span class="bg_img"></span><span class="zhe" onclick="to_detail(this)"></span></li>';
                                li_detail = li_detail_l + li_detail_r;
                                $(".js_usercenter_ul").append(li_detail);
                            });
                            //$('.zheceng').hide();
                        }
                    },
                    error: function(data) {
                        //alert('获取列表error');
                        $('#alert_alert').show();
                        $('.zheceng').show();
                        //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function() {
                        $('#load_small_bg').hide();
                        //$('.zheceng').hide();
                    }
                });
            }
            //个人中心详情----------------------------------------------------------------------------------------------------------------------------------------------------
            $('.js_usercenter_detail').get(0) && (~ function() {
                $(document).ready(function() {
                    //获取储值详情todo-show
                    merchantinfo_request();
                    get_rechargedetail();
                    //获取储值说明---取消使用
                    //get_rule_detail();
                });
            }());
            // var dl_data = $(".js_datadl").map(function() {
            //     return $(this).attr('data-bizsn');
            // }).get();
            //var dl_data_set = new Set(dl_data);
            //商户信息
            function merchantinfo_request() {
                $.ajax({
                    url: '/prepaid/v1/api/c/merchant_info',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'bigmchnt_value': '',
                        h: get_hash('h')
                    },
                    beforeSend: function() {
                        $('#load_small_bg').show();
                        //$('.zheceng').show();
                    },
                    success: function(data) {
                        //alert('获取列表success');
                        if (data.respcd != '0000') {
                            //alert('获取列表success-error');
                            $('#alert_alert').show();
                            $('.zheceng').show();
                            if (!data['respmsg']) {
                                $('#alert_alert .alert_con_br').html(data['resperr']);
                            } else {
                                $('#alert_alert .alert_con_br').html(data['respmsg']);
                            }
                        } else {
                            if (data.data.bigmchnt == true) {
                                //是大商户需要隐藏
                                $('footer').hide();
                            }
                        }
                    },
                    error: function(data) {
                        $('#alert_alert').show();
                        $('.zheceng').show();
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function() {
                        $('#load_small_bg').hide();
                    }
                });
            }
            //获取储值详情
            function get_rechargedetail() {
                var userid = get_hash('h');
                $.ajax({
                    url: '/prepaid/v1/api/c/merchants/' + userid,
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'c': get_hash('c'),
                    },
                    beforeSend: function() {
                        $('#load_small_bg').show();
                        //$('.zheceng').show();
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
                            var tx_fee = (return_data.balance / 100).toFixed(2);
                            var tx_url_pay = return_data.pay_url;
                            var tx_url_add = return_data.recharge_url;
                            var tx_url_list = return_data.prepaid_detail;
                            var tx_merchant_name = return_data.merchant_name;
                            var tx_expired = return_data.expired;
                            var tx_rule_detail = return_data.rule_detail;
                            document.title = tx_merchant_name;
                            $('.js_detail_price').text(tx_fee);
                            $('.js_charge_list').attr('href', tx_url_list);
                            $('.js_detail_buy').attr('href', tx_url_add);
                            $('.js_detail_pay').attr('href', tx_url_pay);
                            var return_data_l = tx_rule_detail.length;
                            for (var i = 0; i < return_data_l; i++) {
                                var li_detail = '<li><span>' + tx_rule_detail[i] + '</span></li>';
                                $(".js_ul_rules").append(li_detail);
                            }
                            if (tx_expired != '0') {
                                $('.js_detail_buy').hide();
                            } else {
                                $('.js_detail_buy').show();
                            }
                            //$('.zheceng').hide();
                        }
                    },
                    error: function(data) {
                        $('#alert_alert').show();
                        $('.zheceng').show();
                        //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function() {
                        $('#load_small_bg').hide();
                        //$('.zheceng').hide();
                    }
                });
            }
            //个人中心列表----------------------------------------------------------------------------------------------------------------------------------------------------
            //滚动下拉-------start--------------------------------------------------------
            var timer_rt = null;
            var scroll_if = false;
            var nomor_show = false;
            // console.log(scroll_if);
            var window_height = window.innerHeight;
            var body_height = $('body').height();
            // console.log(window_height);
            // console.log(body_height);   
            $('.js_usercenter_list').get(0) && (~ function() {
                $(document).ready(function() {
                    //获取储值列表todo-show
                    get_rechargelist();
                });
                $(window).on('scroll', function(e) {
                    //var history_top = $(document).scrollTop();
                    var history_top = document.documentElement.scrollTop || document.body.scrollTop;
                    // console.log('document.documentElement.scrollTop--'+document.documentElement.scrollTop);
                    // console.log('document.body.scrollTop--'+document.body.scrollTop);
                    // console.log(body_height - window_height);
                    // console.log(history_top);
                    if (history_top < body_height - window_height) {
                        clearTimeout(timer_rt);
                    } else {
                        e.stopPropagation();
                        if (scroll_if) {
                            $('.load').show();
                            scroll_if = false;
                            timer_rt = window.setTimeout(get_rechargelist, 2000);
                        }
                        if (nomor_show) {
                            $("#nomoredata").animate({ opacity: 0.7, }, 500);
                            window.setTimeout(nomoredata_hide, 2000);
                            nomor_show = false;
                        }
                        // console.log('scroll:scroll_if=='+scroll_if);
                        // console.log('scroll:nomor_show=='+nomor_show);
                    }
                });
                //点击查看更多
                // $('.js_click_more').on('click', function() {
                //     get_rechargelist();
                // });
            }());
            //获取储值列表
            function get_rechargelist() {
                $.ajax({
                    url: '/prepaid/v1/api/c/transactions',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'c': get_hash('c'),
                        'h': get_hash('h'),
                        'pos': $('#js_pos').val(),
                        'count': 20,
                    },
                    beforeSend: function() {
                        $('#load_small_bg').show();
                        //$('.zheceng').show();
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
                            var last_len = 0;
                            $(return_data).each(function(i, item) {
                                var dl_data = $(".js_datadl").map(function() {
                                    return $(this).attr('data-bizsn');
                                }).get();
                                var dl_data_set_l = dl_data.length;
                                var tx_txamt = (return_data[i].txamt / 100).toFixed(2);
                                var tx_pay_amt = (return_data[i].pay_amt / 100).toFixed(2);
                                var tx_present_amt = (return_data[i].present_amt / 100).toFixed(2);
                                var tx_pay_amt0 = (return_data[i].pay_amt / 100).toFixed(0);
                                var tx_present_amt0 = (return_data[i].present_amt / 100).toFixed(0);
                                var tx_time = return_data[i].sysdtm;
                                var tx_status_status = return_data[i].status;
                                var tx_status = return_data[i].biz_type;
                                var biz_sn = return_data[i].biz_sn;
                                var tx_name, tx_price;
                                var li_detail;
                                //判断流水号是否重复
                                var bizn_has = '0';
                                for (var i = dl_data_set_l - 1; i > 0; i--) {
                                    if (dl_data[i] == biz_sn) {
                                        bizn_has = '1';
                                        break;
                                    }
                                }
                                if (bizn_has == '1') {
                                    return true;
                                }
                                last_len++;
                                if (tx_status == '1') {
                                    tx_name = '储值';
                                    tx_price = '+' + tx_pay_amt;
                                    li_detail = '<dl class="js_datadl" data-bizsn="' + biz_sn + '"><dt class="orange">+' + tx_present_amt + '</dt><dd>储值赠送<span class="buy_back orange">储值' + tx_pay_amt0 + '送' + tx_present_amt0 + '</span></dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><dl><dt class="orange">' + tx_price + '</dt><dd>' + tx_name + '</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl>';
                                } else if (tx_status == '2') {
                                    tx_price = '-' + tx_txamt;
                                    if (tx_status_status == '4') {
                                        //消费退款
                                        tx_name = '储值消费(已撤销)';
                                        li_detail = '<dl class="js_datadl grey" data-bizsn="' + biz_sn + '"><dt>' + tx_price + '</dt><dd>' + tx_name + '</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl>';
                                    } else {
                                        tx_name = '储值消费';
                                        li_detail = '<dl class="js_datadl" data-bizsn="' + biz_sn + '"><dt>' + tx_price + '</dt><dd>' + tx_name + '</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl>';
                                    }
                                } else if (tx_status == '3') {
                                    tx_name = '消费退款';
                                    tx_price = '+' + tx_txamt;
                                    li_detail = '<dl class="js_datadl" data-bizsn="' + biz_sn + '"><dt>' + tx_price + '</dt><dd>' + tx_name + '</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl>';
                                } else if (tx_status == '4') {
                                    tx_name = '手动储值';
                                    tx_price = '+' + tx_pay_amt;
                                    if (tx_present_amt0 > 0) {
                                        //有赠送
                                        li_detail = '<dl class="js_datadl" data-bizsn="' + biz_sn + '"><dt class="orange">+' + tx_present_amt + '</dt><dd>储值赠送<span class="buy_back orange">储值' + tx_pay_amt0 + '送' + tx_present_amt0 + '</span></dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><dl><dt class="orange">' + tx_price + '</dt><dd>' + tx_name + '</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl>';
                                    } else {
                                        //没有赠送
                                        li_detail = '<dl class="js_datadl" data-bizsn="' + biz_sn + '"><dt class="orange">' + tx_price + '</dt><dd>' + tx_name + '</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl>';
                                    }
                                }
                                $("#js_diff_get").append(li_detail);
                            });
                            var pos_val = $('#js_pos').val() - 0;
                            if (return_data.length < 20) {
                                // $('#alert_alert').show();
                                // $('#alert_alert .alert_con_br').html('数据已加载完毕');
                                // $('.zheceng1').show();
                                if (last_len > 0) {
                                    nomor_show = true;
                                } else {
                                    $("#nomoredata").animate({ opacity: 0.7, }, 500);
                                    window.setTimeout(nomoredata_hide, 3000);
                                    nomor_show = false;
                                }
                                scroll_if = false;
                                //$('.js_click_more').hide();
                            } else {
                                //$('.js_click_more').show();
                                pos_val += 20;
                                $('#js_pos').val(pos_val);
                                scroll_if = true;
                            }
                            //$('.zheceng').hide();
                            $('.load').hide();
                            body_height = Math.floor($('body').height()).toFixed(0);
                        }
                    },
                    error: function(data) {
                        $('#alert_alert').show();
                        $('.zheceng').show();
                        //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function() {
                        $('#load_small_bg').hide();
                        //$('.zheceng').hide();
                    }
                });
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
            //弹框高度定位
            function alert_top(id) {
                var alert_height = $(id).height();
                var mar_t = alert_height / 2;
                $(id).css('marginTop', -mar_t + 'px');
            }
            //关闭弹框
            $('.js_alert_con_close').on('click', function() {
                $('.alert_con').hide();
                // $('.alert_con .alert_con_br').html();
                $('.zheceng').hide();
                $('.zheceng1').hide();
            });
            //隐藏没有更多信息了
            function nomoredata_hide() {
                $("#nomoredata").animate({ opacity: 0, }, 500);
            }

        })
    })
});



//获取余额提列表页详情-向上滑动刷新---取消使用
function get_history_touch() {
    $.ajax({
        url: '/prepaid/v1/api/c/transactions',
        type: 'GET',
        dataType: 'json',
        data: {
            'c': get_hash('c'),
            'h': get_hash('h'),
            'pos': $('.js_diff_get dl').length,
            'count': 20,
        },
        beforeSend: function() {
            $('#load_small_bg').show();
            //$('.zheceng').show();
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
                //$('.zheceng').hide();
                var return_data = data.data;
                $(return_data).each(function(i, item) {
                    var tx_txamt = (return_data[i].txamt / 100).toFixed(2);
                    var tx_pay_amt = (return_data[i].pay_amt / 100).toFixed(2);
                    var tx_present_amt = (return_data[i].present_amt / 100).toFixed(2);
                    var tx_time = return_data[i].sysdtm;
                    var tx_status = return_data[i].biz_type;
                    var tx_name, tx_price;
                    var li_detail;
                    if (tx_status == '1') {
                        tx_name = '储值';
                        tx_price = '+' + tx_pay_amt;
                        li_detail = '<dl><dt class="orange">+' + tx_present_amt + '</dt><dd>储值赠送<span class="buy_back orange">储值' + tx_pay_amt + '送' + tx_present_amt + '</span></dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><dl><dt class="orange">' + tx_price + '</dt><dd>' + tx_name + '</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl>';
                    } else {
                        tx_name = '储值消费';
                        tx_price = '-' + tx_pay_amt;
                        li_detail = '<dl><dt>' + tx_price + '</dt><dd>' + tx_name + '</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl>';
                    }
                    $("#js_diff_get").append(li_detail);
                });
                if (return_data.length < 20) {
                    $('#alert_alert').show();
                    $('#alert_alert .alert_con_br').html('数据已加载完毕');
                    $('.zheceng').show();
                    $('.js_click_more').hide();
                } else {
                    $('.js_click_more').show();
                }
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
            $('#load_small_bg').hide();
            //$('.zheceng').hide();
        }
    });
}
//获取储值规则---取消使用
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
            $('#load_small_bg').show();
            //$('.zheceng1').show();
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
                    $(".js_ul_rules").append(li_detail);
                }
                //$('.zheceng1').hide();
            }
        },
        error: function(data) {
            $('#alert_alert').show();
            $('.zheceng1').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#alert_alert .alert_con_br').html('网络超时!');
        },
        complete: function() {
            $('#load_small_bg').hide();
            //$('.zheceng').hide();
        }
    });
}


//获取当前时间
function now_date() {
    var n_date = new Date();
    var n_date_year = n_date.getFullYear();
    var n_date_mon = tow_num(n_date.getMonth() + 1);
    var n_date_day = tow_num(n_date.getDate());
    var n_date_h = tow_num(n_date.getHours());
    var n_date_m = tow_num(n_date.getMinutes());
    var n_date_mm = tow_num(n_date.getSeconds());
    var n_date_end = n_date_year + "-" + n_date_mon + "-" + n_date_day + " " + n_date_h + ":" + n_date_m + ":" + n_date_mm;
    return n_date_end;
}
//如果小于10，则十位显示0
function tow_num(arm) {
    var arm_num = "0" + arm;
    var arm_num_end = arm_num.substr(-2, 2);
    return arm_num_end;
}
