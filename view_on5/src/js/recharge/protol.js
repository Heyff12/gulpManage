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
    require(["zepto", "ajax_rule"], function($, ajax_rule) {
        $(function() {
            //储值协议----------------------------------------------------------------------------------------------------------------------------------------------------           
            $(document).ready(function() {                
                //获取商家名称
                var data_merchant = {
                    'h': get_hash('h'),
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/merchant_info', 'GET', 'json', data_merchant, '.zheceng', get_merchant);

                //获取储值账户       
                var data_before = {
                    'c': get_hash('c'),
                    'h': get_hash('h'),
                    'o': get_hash('o'),
                    'grid_index': '1',
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/recharge/before', 'GET', 'json', data_before, '.zheceng2', get_bindinfo_if);       
            });
            //获取商家名称
            function get_merchant(return_data) {
                var shopname = return_data.shopname;
                $('.js_shopname').text(shopname);
            }
            //判断是否调用--储值账户
            function get_bindinfo_if(return_data) {
                var recharge_num = return_data.recharge;
                if (recharge_num == '0') {
                    
                } else {
                    var data_bindinfo = {
                        'c': get_hash('c'),
                    };
                    ajax_rule.ajax_rule(' /prepaid/v1/api/c/bindinfo', 'GET', 'json', data_bindinfo, '.zheceng1', get_bindinfo);
                }

            }
            //获取储值账户
            function get_bindinfo(return_data) {
                var mobile = return_data.mobile;
                $('.js_mobile').text(mobile);              
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
        })
    });
});
