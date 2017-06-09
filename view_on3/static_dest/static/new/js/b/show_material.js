"use strict";

require(['../require-config'], function () {
    require(["zepto", "ajax_rule", "if_menu"], function ($, ajax_rule, if_menu) {
        $(function () {
            //设置菜单空---取消了native的引用
            // var menu_data = { menus: [] };
            // native.setNavMenu(menu_data, function(cb) {
            //     console.log(cb.ret);
            // });
            //设置储值活动----------------------------------------------------------------------------------------------------------------------------------------------------
            $(document).ready(function () {
                //获取图片
                ajax_rule.ajax_rule('/prepaid/v1/api/b/materials', 'GET', 'json', '', '.zheceng', get_pic);
            });
            //点击切换
            $('.js_section_ul').on('click', 'li', function () {
                var li_index = $(this).index();
                $(this).addClass('tab').siblings('li').removeClass('tab');
                $('.js_section_index').eq(li_index).show().siblings('.js_section_index').hide();
            });
            //点击提交
            $('.js_emailpic_sub').on('click', function () {
                var url = location.protocol + '//' + location.host + '/prepaid/v1/page/b/down_material.html';
                if_menu.goto_url(url);
                // if (typeof QFPAY !== "undefined") {
                //     var go_url = {
                //         uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/down_material.html',
                //     };
                //     native.openUri(go_url, function(cb) {
                //         console.log(cb.ret);
                //     });
                // } else {
                //     location.href = location.protocol + '//' + location.host + '/prepaid/v1/page/b/down_material.html';
                // }
            });
            //获取数据
            function get_pic(return_data) {
                var haibao = return_data.playbill;
                var zhuotie = return_data.tbcard;
                var tbpaster = return_data.tbpaster;
                $('.js_haibao').find('img').attr('src', haibao);
                $('.js_zhuotie').find('img').attr('src', tbpaster);
                $('.js_zhuotieb').find('img').attr('src', zhuotie);
            }
        });
    });
});