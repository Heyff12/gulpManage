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
require(['../require-config'], function() {
    require(["zepto"], function($) {
        $(function() {
            $('.js_result_index').get(0) && (~ function() {
                $(document).ready(function() {
                    //获取储值结果
                    get_recharge_result();
                });
                $('.js_result_recharge').on('click', function() {
                    //open(location, '_self').close();
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
                            var return_pay = (return_data.pay_amt / 100).toFixed(2);
                            var return_recharge = (return_data.txamt / 100).toFixed(2);
                            var return_href = return_data.pay_url;
                            var return_company = return_data.merchant_name;
                            var return_diff = (return_data.balance / 100).toFixed(2);
                            $('.js_paycompa').text(return_company);
                            $('.js_leftnum').text(return_diff);
                            $('.js_paynum').text(return_pay);
                            $('.js_chargenum').text(return_recharge);
                            $('.js_result_buy').attr('href', return_href);
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
        })
    })
})
