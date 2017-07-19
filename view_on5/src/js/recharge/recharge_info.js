require(['../require-config'], function() {
    require(["zepto", "yanzheng", "add_bounced", "ajax_rule", "iosselect", "date_day", "wxjsbridge"], function($, yanzheng, add_bounced, ajax_rule, iosselect, date_day, wxjsbridge) {
        $(function() { 
            //隐藏微信菜单           
            wxjsbridge.hide_menu();
            //填写信息----------------------------------------------------------------------------------------------------------------------------------------------------
            $('.js_bindinfo').get(0) && (~ function() {
                $(document).ready(function() {
                    //设置默认生日
                    $('#birthday').val('1980-1-1');
                    $('.js_message_birth').attr('data-year', '1980');
                    $('.js_message_birth').attr('data-month', '1');
                    $('.js_message_birth').attr('data-day', '1');
                    //获取店铺名称--需要增加
                    var data_name = {
                        'h': yanzheng.get_hash('h'),
                    };
                    ajax_rule.ajax_rule('/prepaid/v1/api/c/merchant_info', 'GET', 'json', data_name, '.zheceng', get_shopname);
                });
            }());
            //信息确认----------------------------------------------------------------------------------------------------------------------------------------------------
            $('.js_bindinfo_confirm').get(0) && (~ function() {
                $(document).ready(function() {
                    //获取店铺名称--需要增加
                    var data_name = {
                        'h': yanzheng.get_hash('h'),
                    };
                    ajax_rule.ajax_rule('/prepaid/v1/api/c/merchant_info', 'GET', 'json', data_name, '.zheceng', get_shopname);
                    //获取储值账户
                    var data_tel = {
                        'c': yanzheng.get_hash('c'),
                    };
                    ajax_rule.ajax_rule('/prepaid/v1/api/c/bindinfo', 'GET', 'json', data_tel, '.zheceng1', get_tel);
                });
                $('.js_alert_message2').on('click', function() {
                    get_rechargesub();
                });
            }());

            //获取验证码
            $('.js_get_entycode').on('click', function() {
                //验证
                yanzheng.tel_test_all('.js_message_tel', error_yz, seccuss_yz);
                if ($('.js_message_tel').parents('dl').hasClass('error_data')) {
                    return false;
                } else {
                    //获取值
                    var mobile_val = $('.js_message_tel').val();
                    var url = '/prepaid/v1/api/c/captcha';
                    var data = {
                        'c': yanzheng.get_hash('c'),
                        'h': yanzheng.get_hash('h'),
                        'mobile': mobile_val,
                    };
                    //获取验证码--todo--show
                    ajax_rule.ajax_rule(url, 'GET', 'json', data, '.zheceng', get_code);
                    //get_code(); //测试倒计时
                }
            });
            //倒计时不可点击
            $('.js_show_entycode').on('click', function() {
                $('.alert_con').show();
                $('.alert_con .alert_con_br').html("一分钟后再次获取！");
                $('.zheceng').show();
            });
            //点击生日
            $('.js_message_birth').on('click', function() {
                var showDom = document.querySelector('.js_message_birth');
                var year = showDom.dataset['year'];
                var month = showDom.dataset['month'];
                var day = showDom.dataset['day'];
                //设置开始和结束的年份
                date_day.time_free.start_year = 1947;
                date_day.time_free.end_year = date_day.nowYear;
                var bankSelect = new iosselect(3, [date_day.yearData, date_day.monthData, date_day.dateData], {
                    container: '.ios_select_container',
                    title: '选择生日日期',
                    itemHeight: 50,
                    itemShowCount: 3,
                    relation: [1, 1, 0, 0],
                    oneLevelId: year,
                    twoLevelId: month,
                    threeLevelId: day,
                    //showLoading: true,
                    callback: function(year_data, month_data, day_data) {
                        showDom.dataset['year'] = year_data.id;
                        showDom.dataset['month'] = month_data.id;
                        showDom.dataset['day'] = day_data.id;
                        showDom.value = year_data.id + '年' + month_data.id + '月' + day_data.id + '日';
                        $('#birthday').val(year_data.id + '-' + month_data.id + '-' + day_data.id);
                    }
                });
            });
            //点击填写信息确定按钮
            $('.js_alert_message').on('click', function() {
                //验证输入
                var name = $('.js_message_name').val();
                var birth = $('.js_message_birth').val();
                var tel = $('.js_message_tel').val();
                var code = $('.js_code').val();
                yanzheng.tel_test_all('.js_message_tel', error_yz, seccuss_yz);
                yanzheng.china_test_all('.js_message_name', 0, 4, error_yz, seccuss_yz);
                yanzheng.detail_test_all('.js_message_birth', -1, 20, error_yz, seccuss_yz);
                if (birth) {
                    var bir = $('#birthday').val().split('-');
                    var bir_y = bir[0];
                    var bir_m = num_change_long(bir[1]);
                    var bir_d = num_change_long(bir[2]);
                    birth = bir_y + '-' + bir_m + '-' + bir_d;
                    $('#birthday').val(bir_y + '-' + bir_m + '-' + bir_d);
                }
                //校验验证码
                yanzheng.code_test_all('.js_code', error_yz, seccuss_yz);
                var bor_red_num = $('.error_data').length;
                if (bor_red_num > 0) {
                    return false;
                }
                // //获取验证码--todo--show---取消
                // var data_code = {
                //     'captcha': code,
                //     'mobile': tel,
                // };
                // ajax_rule.ajax_rule('/prepaid/v1/api/c/captcha', 'POST', 'json', data_code, '.zheceng', get_code_succ,get_codeerror); 
                var data_cz = {
                    'c': yanzheng.get_hash('c'),
                    'grid_index': yanzheng.get_hash('grid_index'),
                    'name': name,
                    'mobile': tel,
                    'birthday': birth,
                    'captcha': code,
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/bindinfo', 'POST', 'json', data_cz, '.zheceng1', get_rechargesub);
            });
            //校验验证码
            $('.js_code').on('input', function() {
                //验证必须填写了手机号
                var tel = $('.js_message_tel').val();
                yanzheng.tel_test_all('.js_message_tel', error_yz, seccuss_yz);
                if ($('.js_message_tel').parents('dl').hasClass('error_data')) {
                    $(this).val('');
                    return false;
                }
                //验证验证码
                var code = $(this).val();
                //将非数字的字符替换为空
                var crash_now_strend = code.replace(/[^\d]/g, '');
                //如果输入长度为6
                if (crash_now_strend.length < 6) {
                    $(this).val(crash_now_strend);
                    return false;
                }
                $(this).val(crash_now_strend.substr(0, 6));
                if_code($(this).val());
            });
            //输入过程中校验验证码
            function if_code(code) {
                //获取验证码--todo--show---取消
                var data_code = {
                    'captcha': code,
                    'mobile': $('.js_message_tel').val(),
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/captcha', 'POST', 'json', data_code, '.zheceng', get_code_succ, get_codeerror);
            }
            //验证码验证正确
            function get_code_succ() {
                $('.js_code').parents('dl').removeClass('error_data');
                $('.js_alert_message_disa').hide();
                $('.js_alert_message').show();
            }
            //验证码验证错误
            function get_codeerror() {
                $('.js_code').parents('dl').addClass('error_data');
                $('.js_alert_message_disa').show();
                $('.js_alert_message').hide();
            }
            //获取验证码-时候等待
            function get_code(return_data) {
                $('.js_get_entycode').hide();
                $('.js_show_entycode').show();
                timedCount();
            }
            //获取店铺名称
            function get_shopname(return_data) {
                $('.js_shopname').text(return_data.shopname);
            }
            //获取储值账号
            function get_tel(return_data) {
                $('.js_message_tel').val(return_data.mobile);
            }
            //验证码验证正确--取消
            function get_code_succ_lost() {
                $('.js_code').parents('dl').removeClass('error_data');
                //提交充值  
                var name = $('.js_message_name').val();
                var birth = $('#birthday').val();
                var tel = $('.js_message_tel').val();
                var code = $('.js_code').val();
                var data_cz = {
                    'c': yanzheng.get_hash('c'),
                    'grid_index': yanzheng.get_hash('grid_index'),
                    'name': name,
                    'mobile': tel,
                    'birthday': birth,
                    'captcha': code,
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/bindinfo', 'POST', 'json', data_cz, '.zheceng1', get_rechargesub);
            }
            //点击购买
            function get_rechargesub() {
                var data_cz = {
                    'c': yanzheng.get_hash('c'),
                    'h': yanzheng.get_hash('h'),
                    'o': yanzheng.get_hash('o'),
                    'grid_index': yanzheng.get_hash('grid_index'),
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/recharge', 'POST', 'json', data_cz, '.zheceng2', recharge_su);
            }
            //验证码输入错误
            function recharge_su(return_data) {
                window.location.href = return_data.url;
            }
            //验证错误
            function error_yz(id) {
                $(id).parents('dl').addClass('error_data');
            }
            //验证错误
            function error_yz(id) {
                $(id).parents('dl').addClass('error_data');
            }
            //验证正确
            function seccuss_yz(id) {
                $(id).parents('dl').removeClass('error_data');
            }
            //提起补全
            function num_change_long(num) {
                var num = num - 0;
                if (num < 10) {
                    return '0' + num;
                } else {
                    return num;
                }
            }
            //添加弹框
            add_bounced.add_bounced();
            //关闭弹框
            add_bounced.close_tip();

        })
    });
});
//倒计时60s
function timedCount() {
    var time0 = $('.js_show_entycode i').text();
    $('.js_show_entycode i').text(time0 - 1);
    t = setTimeout("timedCount()", 1000);
    if (time0 == 0) {
        clearTimeout(t);
        $('.js_get_entycode').show();
        $('.js_show_entycode i').text(61);
        $('.js_show_entycode').hide();
    }
}
