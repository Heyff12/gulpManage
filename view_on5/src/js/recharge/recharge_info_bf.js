require(['../require-config'], function() {
    require(["zepto", "yanzheng", "add_bounced", "ajax_rule", "iosselect", "date_day"], function($, yanzheng, add_bounced, ajax_rule, iosselect, date_day) {
        $(function() {
            $('.js_bindinfo').get(0) && (~ function() {
                $(document).ready(function() {
                    //获取 grid_index-----需要增加
                    //获取店铺名称--需要增加
                    var data_name = {
                        'h': yanzheng.get_hash('h'),
                    };
                    //ajax_rule.ajax_rule('/prepaid/v1/api/c/merchant_info', 'GET', 'json', data_name, '.zheceng', get_shopname);                
                    //获取当前用户个人信息-show
                    var data_message = {
                        'c': yanzheng.get_hash('c'),
                        'h': yanzheng.get_hash('h'),
                    };
                    //ajax_rule.ajax_rule('/prepaid/v1/api/c/bind', 'GET', 'json', data_message, '.zheceng1', get_message);
                });
            }());
            $('.js_bindinfo_confirm').get(0) && (~ function() {
                $(document).ready(function() {
                    //获取 grid_index-----需要增加
                    //获取店铺名称--需要增加
                    var data_name = {
                        'h': yanzheng.get_hash('h'),
                    };
                    //ajax_rule.ajax_rule('/prepaid/v1/api/b/merchant_info', 'GET', 'json', data_name, '.zheceng', get_shopname);                
                    //获取储值账户
                    var data_tel = {
                        'c': yanzheng.get_hash('c'),
                    };
                    //ajax_rule.ajax_rule('/prepaid/v1/api/c/bindinfo', 'GET', 'json', data_tel, '.zheceng1', get_tel);                
                    //获取当前用户个人信息-show
                    var data_message = {
                        'c': yanzheng.get_hash('c'),
                        'h': yanzheng.get_hash('h'),
                    };
                    //ajax_rule.ajax_rule('/prepaid/v1/api/c/bind', 'GET', 'json', data_message, '.zheceng', get_message);
                });
            }());
            //填写信息----------------------------------------------------------------------------------------------------------------------------------------------------

            //获取验证码
            $('#get_identyCode').on('click', function() {
                //验证
                yanzheng.tel_test('.js_phone');
                if ($('.js_phone').parents('dl').hasClass('error_data')) {
                    return false;
                } else {
                    //获取值
                    var mobile_val = $('.js_phone').val();
                    var url = '/prepaid/v1/api/c/captcha';
                    var data = {
                        'c': yanzheng.get_hash('c'),
                        'mobile': mobile_val,
                    };
                    //获取验证码--todo--show
                    //ajax_rule.ajax_rule(url, 'GET', 'json', data, '.zheceng', get_code);
                    get_code(); //测试倒计时
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

                var bankSelect = new iosselect(3, [date_day.yearData, date_day.monthData, date_day.dateData], {
                    container: '.ios_select_container',
                    title: '选择开始时间',
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
                var first = $('.js_hidden_first').val();
                var name = $('.js_message_name').val();
                var tel = $('.js_message_tel').val();
                var birth = $('.js_message_birth').val();
                var code = $('.js_code').val();
                //校验验证码
                var url = '/prepaid/v1/api/c/captcha';
                var data_code = {
                    'captcha': code,
                    'mobile': tel,
                };
                //获取验证码--todo--show
                //ajax_rule.ajax_rule(url, 'POST', 'json', data_code, '.zheceng', get_code_succ,get_codeerror);

                if (first == '0') {
                    yanzheng.tel_test_all('.js_message_tel', error_yz, seccuss_yz);
                    yanzheng.code_test_all('.js_code', error_yz, seccuss_yz);
                    yanzheng.china_test_all('.js_message_name', 0, 4, error_yz, seccuss_yz);
                    yanzheng.detail_test_all('.js_message_birth', -1, 20, error_yz, seccuss_yz);
                }
                if (birth) {
                    var bir = $('#birthday').val().split('-');
                    var bir_y = bir[0];
                    var bir_m = num_change_long(bir[1]);
                    var bir_d = num_change_long(bir[2]);
                    birth = bir_y + '-' + bir_m + '-' + bir_d;
                }
                var bor_red_num = $('.error_data').length;
                if (bor_red_num > 0) {
                    return false;
                }
                //提交充值   
                var data_cz = {
                    'c': yanzheng.get_hash('c'),
                    'h': yanzheng.get_hash('h'),
                    'o': yanzheng.get_hash('o'),
                    'grid_index': $('.js_grid_index').val(),
                    'name': name,
                    'mobile': tel,
                    'birthday': birth,
                };
                //ajax_rule.ajax_rule('/prepaid/v1/api/c/recharge', 'POST', 'json', data_cz, '.zheceng1', get_rechargesub);
            });
            //获取个人信息
            function get_message(return_data) {
                var return_binded = return_data.binded;
                var return_name = return_data.name;
                var return_mobile = return_data.mobile;
                var return_birth = return_data.birthday;
                $('.js_hidden_first').val(return_binded);
                $('.js_message_name').val(return_name);
                $('.js_message_tel').val(return_mobile);
                $('.js_message_birth').val(return_birth);
                if (return_binded == '1') {
                    $('.js_first_bind').hide();
                    $('.js_secondshop').show();
                    return false;
                    // $('.js_dl_message input.js_input').attr('readonly', 'readonly').addClass('grey');
                    // if (return_birth.length > 0) {
                    //     $('.js_message_birth').attr('disabled', 'disabled').addClass('grey');
                    // } else {
                    //     $('.js_message_birth').removeAttr('disabled').removeClass('grey');
                    // }
                }
                $('.js_first_bind').show();
                $('.js_secondshop').hide();
                //日期
                if (return_birth) {
                    var startime_zu = return_birth.split('-');
                    var bir_y = startime_zu[0] - 0;
                    var bir_m = startime_zu[1] - 0;
                    var bir_d = startime_zu[2] - 0;
                    $('.js_message_birth').data('year', bir_y);
                    $('.js_message_birth').data('month', bir_m);
                    $('.js_message_birth').data('day', bir_d);
                    $('#birthday').val(bir_y + '-' + bir_m + '-' + bir_d);
                    $('.js_message_birth').val(bir_y + '年' + bir_m + '月' + bir_d + '日');
                    $('.js_message_birth').attr('disabled', 'disabled');
                } else {
                    $('.js_message_birth').data('year', date_day.nowYear);
                    $('.js_message_birth').data('month', date_day.nowMonth);
                    $('.js_message_birth').data('day', date_day.nowDate);
                    $('#birthday').val(date_day.nowYear + '-' + date_day.nowMonth + '-' + date_day.nowDate);
                    $('.js_message_birth').val('');
                    $('.js_message_birth').removeAttr('disabled');
                }
                // $('.js_dl_message input.js_input').removeAttr('readonly').removeClass('grey');
            }
            //点击购买
            function get_rechargesub(return_data) {
                window.location.href = return_data.url;
            }
            //获取验证码-时候等待
            function get_code(return_data) {
                $('.js_get_entycode').hide();
                $('.js_show_entycode').show();
                timedCount();
            }
            //获取店铺名称
            function get_shopname(return_data) {
                $('.js_shopname').val(return_data.shopname);
            }
            //获取储值账号
            function get_shopname(return_data) {
                $('.js_message_tel').val(return_data.mobile);
            }
            //验证码验证正确
            function get_code_succ() {

            }
            //验证码输入错误
            function get_codeerror() {
                $(id).parents('dl').addClass('error_data');
            }
            //验证错误
            function error_yz(id) {
                $('.js_code').parents('dl').addClass('error_data');
            }
            //验证正确
            function seccuss_yz(id) {
                $(id).parents('dl').removeClass('error_data');
            }
            //提起补全
            function num_change_long(num) {
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
