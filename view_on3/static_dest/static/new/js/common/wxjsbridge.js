define(["ajax_rule","wx"], function(ajax_rule,wx) {　
    //获取签名
    // var data_sign = {
    //     format: 'jsonp',
    //     url: window.location.href
    // };
    // var wx_data={};
    // ajax_rule.ajax_rule('https://wxmp.qfpay.com/v1/manage/wxjs_conf', 'GET', 'jsonp', data_sign, '.zheceng', function(res){
    //     console.log(res);
    //     wx_data=res;
    //     wx.config({
    //         debug: false,
    //         appId: wx_data.appId,
    //         timestamp: wx_data.timestamp,
    //         nonceStr: wx_data.nonceStr,
    //         signature: wx_data.signature,
    //         jsApiList: [
    //             'checkJsApi',
    //             'onMenuShareTimeline',
    //             'onMenuShareAppMessage',
    //             'onMenuShareQQ',
    //             'onMenuShareWeibo',
    //             'onMenuShareQZone',
    //             'hideMenuItems',
    //             'showMenuItems',
    //             'hideAllNonBaseMenuItem',
    //             'showAllNonBaseMenuItem',
    //             'translateVoice',
    //             'startRecord',
    //             'stopRecord',
    //             'onVoiceRecordEnd',
    //             'playVoice',
    //             'onVoicePlayEnd',
    //             'pauseVoice',
    //             'stopVoice',
    //             'uploadVoice',
    //             'downloadVoice',
    //             'chooseImage',
    //             'previewImage',
    //             'uploadImage',
    //             'downloadImage',
    //             'getNetworkType',
    //             'openLocation',
    //             'getLocation',
    //             'hideOptionMenu',
    //             'showOptionMenu',
    //             'closeWindow',
    //             'scanQRCode',
    //             'chooseWXPay',
    //             'openProductSpecificView',
    //             'addCard',
    //             'chooseCard',
    //             'openCard'
    //         ]
    //     });
    // });  

    
    //隐藏菜单和底部栏
    function hideMenu() {
        WeixinJSBridge.call('hideOptionMenu');
        WeixinJSBridge.call('hideToolbar');
    }


    //隐藏菜单--部分菜单和底部栏
    function hideMenusome() {
        console.log('调用方法');
        wx.ready(function() {
            console.log('开始执行方法');
            wx.hideMenuItems({
                menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'],
                success: function(res) {
                    console.log('已显示“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
                },
                fail: function(res) {
                    console.log(JSON.stringify(res));
                }
            });
        });
        WeixinJSBridge.call('hideToolbar');
    }

    //隐藏菜单和底部栏
    function hide_menu() {
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
    }

    //隐藏菜单--部分菜单和底部栏
    function hide_Menusome() {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', hideMenusome, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', hideMenusome);
                document.attachEvent('onWeixinJSBridgeReady', hideMenusome);
            }
        } else {
            hideMenusome();
        }
    }

    return {
        hide_menu: hide_menu,
        hide_Menusome: hide_Menusome,
    };　
});
