require(['../require-config'], function() {
    require(["zepto", "yanzheng", "ajax_rule", "native", "if_menu"], function($, yanzheng, ajax_rule, native, if_menu) {
        $(function() {
            //---取消了native if_menu的引用0106
            //发送物料----------------------------------------------------------------------------------------------------------------------------------------------------
            $(document).ready(function() {

            });
            //点击提交
            $('.js_email_sub').on('click', function() {
                //验证邮箱
                yanzheng.email_test('.js_mail');
                var error_len = $('.error_tips').length;
                if (error_len > 0) {
                    return false;
                }
                var data_mail = { 'mail': $('.js_mail').val() };
                //测试成功后效果
                //send_pic();
                ajax_rule.ajax_rule('/prepaid/v1/api/b/materials/send', 'POST', 'json', data_mail, '.zheceng', send_pic);
            });
            //点击关闭
            $('.js_close_email').on('click', function() {
                //返回储值活动首页
                // location.href = location.protocol + '//' + location.host + '/prepaid/v1/page/b/index.html';
                // var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/index.html';
                // if_menu.goto_url(url_val);
                // if (typeof QFPAY !== "undefined") {
                //     var go_url = {
                //         uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/index.html',
                //     };
                //     native.openUri(go_url, function(cb) {
                //         console.log(cb.ret);
                //     });
                //     //暂时隐藏关闭所有---下次版本更新使用
                //     // var close_url = {};
                //     // native.closeAll(close_url, function(cb) {
                //     //     console.log(cb.ret);
                //     // });
                // } else {
                //     location.href = location.protocol + '//' + location.host + '/prepaid/v1/page/b/index.html';
                // }

                //todo: close all gotourl 首页
                var closeToUri = {
                    uri:location.protocol + '//' + location.host + '/prepaid/v1/page/b/index.html',
                };
                native.navToUri(closeToUri, function (cb) {
                    console.log(cb.ret)
                });

            });
            //提交邮箱
            function send_pic(return_data) {
                // $('.js_down_material_index').hide();
                // $('.js_down_success').show();
                // document.title='发送成功'
                // $('body').addClass('bg_white');
                var url  = location.protocol + '//' + location.host + '/prepaid/v1/page/b/succsend_materials.html';
                if_menu.goto_url(url);
                // if (typeof QFPAY !== "undefined") {
                //     var go_url = {
                //         uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/succsend_materials.html',
                //     };
                //     native.openUri(go_url, function(cb) {
                //         console.log(cb.ret);
                //     });
                // } else {
                //     location.href = location.protocol + '//' + location.host + '/prepaid/v1/page/b/succsend_materials.html';
                // }
            }
        });
    });
});
