/**
 * Created by mac on 17/2/10.
 */


require(['../require-config2'], function() {
    require(["zepto", "ajax_rule"], function($, ajax_rule) {
        //付费开通储值服务
        $(function() {
            //$(document).ready(function(){}) DOM加载完成后执行一系列预定义好的函数

            function check_service_status() {
                //使用默认的错误处理
                ajax_rule.ajax_rule('/prepaid/v1/api/service/info', 'GET', 'json', '', '.zheceng', create_activity_success);
            }

            function create_activity_success(return_data) {//请求成功的回调
                    var feesExpire = return_data.expired;
                    if (feesExpire == 1){
                        //费用过期显示续费按钮
                        $('.section_footer_pay').show();
                        $('.section_footer_create').hide();
                    }else {
                        //费用没有过期显示创建活动
                        $('.section_footer_create').show();
                        $('.section_footer_pay').hide();
                    }
            }

            check_service_status();

            //页面加载完成就发送请求，通过返回判断是立即续费和创建活动
            $('.js_create_activity').on('click', function() {
                alert('创建会员储值活动');
                var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/create_activity.html';
                location.href = url_val;

            });

            $('.js_pay_fees').on('click', function() {
                alert('调到立即续费的页面');
                var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/xufei.html';
                location.href = url_val;

            });


        });


    });
});