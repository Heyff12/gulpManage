/**
 * Created by mac on 17/2/10.
 */
require(['../require-config2'], function() {
    require(["zepto", "ajax_rule", "localstorage", "if_menu"], function($, ajax_rule, localstorage, if_menu) {
        //付费开通储值服务
        $(function() {//$(document).ready(function(){}) DOM加载完成后执行一系列预定义好的函数

            var hasReadProtocol = false;

            function pay_use_recharge_service() {
                //原生调用开启服务

                // var data = {
                //     'pos': $('#js_pos').val(),
                //     'count': 10,
                // };
                // ajax_rule.ajax_rule('/prepaid/v1/api/b/activity_history', 'GET', 'json', data, '.zheceng', get_list);
            }

            $('.js_has_read').on('click', function() {
                if (hasReadProtocol == false){
                    hasReadProtocol = true;
                    $('.js_has_read')[0].src="../../static_dest/static/new/img/ic_selected.png";
                }else {
                    hasReadProtocol = false;
                    $('.js_has_read')[0].src="../../static_dest/static/new/img/ic_unselect.png";
                }

            });

            $('.content_protocol_title').on('click', function() {
                alert("查看协议");
            });

            $('.js_pay_use').on('click', function() {
                if (hasReadProtocol == false){//还没有选择阅读协议,弹提示
                    alert("还没有阅读协议");
                } else {//已经于都协议，跳付费开通服务
                    alert("已经阅读协议");
                    // var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/???.html';
                    // location.href = url_val;
                }
            });

            $('.js_see_other').on('click', function() {
                alert("查看其他案例");
            });

        });


    });
});

