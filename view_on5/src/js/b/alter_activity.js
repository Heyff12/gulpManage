//删除规则
function delete_rule(obj) {
    var dd_list = $('.js_rule dd').length - 0;
    if (dd_list == 2) {
        //删除第一条数据后面的删除按钮
        $(obj).parents('dd').remove();
        $('.js_rule dd i.js_ruledelete').remove();
    }
    $(obj).parents('dd').remove();
    $('.js_rule_error').removeClass('span_tips');
    $('.js_add_activity').find('.add_rule').css('display', 'inline-block');
    $('.js_add_activity').find('.add_rule_no').css('display', 'none');
}
require(['../require-config'], function() {
    require(["zepto", "yanzheng", "ajax_rule", "localstorage", "iosselect", "date_get", "alert_word","if_menu"], function($, yanzheng, ajax_rule, localstorage, iosselect, date_get, alert_word,if_menu) {
        $(function() {
            //设置菜单空---取消了native的引用0106
            // var menu_data = { menus: [] };
            // native.setNavMenu(menu_data, function(cb) {
            //     console.log(cb.ret);
            // });
            var today_times = date_get.nowYear + '/' + date_get.nowMonth + '/' + date_get.nowDate + ' 00:00:00';
            //设置储值活动----------------------------------------------------------------------------------------------------------------------------------------------------
            $(document).ready(function() {
                //加载提示弹框
                alert_word.toast_data_short('body', '金额需大于0且不超过30000');
                //获取店铺名称
                var data_shopname = {};
                ajax_rule.ajax_rule('/prepaid/v1/api/b/merchant_info', 'GET', 'json', '', '.zheceng', get_shopname);
                //获取初始值todo
                var data = new Object();
                var activityId = getQueryParamString('activity_id');
                if (activityId){
                    data.activity_id = activityId;
                }
                ajax_rule.ajax_rule('/prepaid/v1/api/b/activity_detail', 'GET', 'json', data, '.zheceng1', get_alldata);
                //测试数据--todo--删除
                // return_data = {
                //     "info": {
                //         "start_time": "2016-09-02 11:22:33", // 活动开始时间
                //         "end_time": "2017-07-06 22:22:22", // 活动结束时间
                //         "activity_id": 1234567, // 活动ID,唯一标志一次活动
                //         "mch_mobile": "13012349876", // 商户联系电话
                //         "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                //         "desc": "活动说明" // 活动说明
                //     },
                //     "rules": [ // 最多4条,至少1条
                //         {
                //             "grid_index": 1, // 储值规则格位: 目前可选: 1, 2, 3, 4
                //             "pay_amt": 5000, // 支付金额, 单位: 分
                //             "present_amt": 500, // 赠送金额, 单位: 分
                //         }, {
                //             "grid_index": 1, // 储值规则格位: 目前可选: 1, 2, 3, 4
                //             "pay_amt": 50000, // 支付金额, 单位: 分
                //             "present_amt": 5000, // 赠送金额, 单位: 分
                //         }, {
                //             "grid_index": 1, // 储值规则格位: 目前可选: 1, 2, 3, 4
                //             "pay_amt": 10000, // 支付金额, 单位: 分
                //             "present_amt": 1000, // 赠送金额, 单位: 分
                //         }, 
                //         // {
                //         //     "grid_index": 1, // 储值规则格位: 目前可选: 1, 2, 3, 4
                //         //     "pay_amt": 66000, // 支付金额, 单位: 分
                //         //     "present_amt": 600, // 赠送金额, 单位: 分
                //         // },
                //     ],
                //     "countdown": 172800, // 活动还有多少秒开始, 单位: 秒
                //     "countdown_day": 0, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                // };
                // get_alldata(return_data);
            });
            //点击开始时间
            $('.js_startime').on('click', function() {
                var showDom = document.querySelector('.js_startime');
                var year = showDom.dataset['year'];
                var month = showDom.dataset['month'];
                var day = showDom.dataset['day'];

                var bankSelect = new iosselect(3, [date_get.yearData, date_get.monthData, date_get.dateData], {
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
                        showDom.value = month_data.id + '月' + day_data.id + '日';
                        $('#startime').val(year_data.id + '-' + month_data.id + '-' + day_data.id);
                        //设置结束时间的默认时间--开始时间
                        // $('.js_endtime').attr('data-year', year_data.id);
                        // $('.js_endtime').attr('data-month', month_data.id);
                        // $('.js_endtime').attr('data-day', day_data.id);
                    }
                });
            });
            //点击到期时间
            $('.js_endtime').on('click', function() {
                var showDom = document.querySelector('.js_endtime');
                var year = showDom.dataset['year'];
                var month = showDom.dataset['month'];
                var day = showDom.dataset['day'];

                var bankSelect = new iosselect(3, [date_get.yearData, date_get.monthData, date_get.dateData], {
                    container: '.ios_select_container',
                    title: '选择结束时间',
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
                        showDom.value = month_data.id + '月' + day_data.id + '日';
                        $('#endtime').val(year_data.id + '-' + month_data.id + '-' + day_data.id);
                    }
                });
            });
            //点击增加规则
            $('.js_add_activity').on('click', function() {
                if ($(this).attr('data-click') != '1') {
                    return false;
                }
                var dd_list = $('.js_rule dd').length - 0;
                var dd_detail = '<dd data-index="">储值<input class="text text_short js_chu js_storule" type="tel" value="" name="pay_amt" />元送<input class="text text_short js_song js_storule" type="tel" value="" name="present_amt" />元<i class="delete js_ruledelete" onclick="delete_rule(this)"></i></dd>';
                if (dd_list <= 3) {
                    if (dd_list == 1) {
                        //第一条增加删除按钮
                        $('.js_rule dd').append('<i class="delete js_ruledelete" onclick="delete_rule(this)"></i>');
                    }
                    if (dd_list == 3) {
                        //设置为不可添加的按钮样式
                        $(this).find('.add_rule').css('display', 'none');
                        $(this).find('.add_rule_no').css('display', 'inline-block');
                    }
                    $('.js_rule').append(dd_detail);
                    $('.js_rule_error').removeClass('span_tips');
                } else {
                    $('.js_rule_error').addClass('span_tips');
                }
            });
            //点击删除规则
            // $(document).on('click', '.js_ruledelete', function() {
            //     var dd_list = $('.js_rule dd').length - 0;
            //     if (dd_list == 2) {
            //         //删除第一条数据后面的删除按钮
            //         $(this).parents('dd').remove();
            //         $('.js_rule dd i.js_ruledelete').remove();
            //     }
            //     $(this).parents('dd').remove();
            //     $('.js_rule_error').removeClass('span_tips');
            //     $('.js_add_activity').find('.add_rule').css('display', 'inline-block');
            //     $('.js_add_activity').find('.add_rule_no').css('display', 'none');
            // });
            //填写储值赠送金额
            $(document).on('input', '.js_storule', function() {
                var crash_now_str = $(this).val();
                //将非数字的字符替换为空
                var crash_now_strend = crash_now_str.replace(/[^\d]/g, '');
                //如果输入为空展示全部提现
                if (crash_now_strend.length == 0) {
                    $(this).val('');
                    return false;
                }
                if (crash_now_strend.length == 1 && crash_now_strend == '0') {
                    $(this).val('');
                    return false;
                }
                //整数部分最长4位start，且不大于2000
                var crash_end_z = crash_now_strend.split('.')[0];
                //如果整数部分首位为0，则截取后买的 
                var crash_end_z_first = crash_end_z.substr(0, 1);
                if (crash_end_z_first == '0') {
                    crash_end_z = crash_end_z.substr(1);
                }
                if (crash_end_z.length > 5) {
                    crash_end_z = crash_end_z.substr(0, 5);
                }
                if (crash_now_strend.split('.').length > 1) {
                    var crash_end_l = crash_now_strend.split('.')[1].substr(0, 2);
                    crash_now_strend = (crash_end_z - 0) + '.' + crash_end_l;
                } else {
                    crash_now_strend = crash_end_z - 0;
                }
                //整数部分最长12位end
                //控制输入长度后赋值并将该值转化为字符串格式
                $(this).val(crash_now_strend);
            });
            //填写备注验证
            $('.js_note').on('input', function() {
                var len_val = $(this).val();
                var len = len_val.length - 0;
                if (len <= 40) {
                    $('.js_wordtip').find('span').text(40 - len);
                } else {
                    //$('.js_note').val(len_val.substr(0, 40));
                    return false;
                }
            });
            //测试输入框对浏览器的变化
            if (window.navigator.appVersion.match(/iphone/gi) || (/Mac OS X/i).test(navigator.userAgent)) {
                $('.js_note').on({
                    'focus': function() {
                        $('.section_footer').hide();
                        // console.log('body===' + $('body').height());
                        // console.log('availHeight===' + screen.availHeight);
                        // var a = document.documentElement.scrollTop || document.body.scrollTop;
                        // console.log('top===' + a);
                    },
                    'blur': function() {
                        $('.section_footer').show();
                    }
                });
                $('.js_tel').on({
                    'focus': function() {
                        $('.section_footer').hide();
                    },
                    'blur': function() {
                        $('.section_footer').show();
                    }
                });
                $(document).on('focus', '.js_storule', function() {
                    $('.section_footer').hide();
                });
                $(document).on('blur', '.js_storule', function() {
                    $('.section_footer').show();
                });
            }
            //点击提交预览
            $('.js_addactivity_sub').on('click', function() {
                yanzheng.tel_activity('.js_tel');
                yanzheng.name_test('.js_note', 0, 40);
                time_area();
                $('.js_storule').each(function() {
                    yanzheng.numprice_test(this, 0, 5, 30000);
                });
                $('.js_storule').each(function() {
                    if ($(this).hasClass('error_tips')) {
                        alert_word.alert_word_show_short();
                        return false;
                    }
                });
                var error_len = $('.error_tips').length;
                if (error_len > 0) {
                    return false;
                }
                //存储数据并进入下一步
                localstorage.set_storage();
                //存储储值规则
                var rules = [];
                var chu_len = $('.js_rule dd').length;
                for (var i = 0; i < chu_len; i++) {
                    var chu_html = $('.js_rule dd').eq(i);
                    var chu_key = chu_html.find('.js_chu').attr('name');
                    var chu_val = chu_html.find('.js_chu').val();
                    var song_key = chu_html.find('.js_song').attr('name');
                    var song_val = chu_html.find('.js_song').val();
                    var rule = { grid_index: i + 1, pay_amt: chu_val * 100, present_amt: song_val * 100 };
                    rules.push(rule);
                }
                localstorage.setone_storage('rules', JSON.stringify(rules));
                var url = location.protocol + '//' + location.host + '/prepaid/v1/page/b/activity_preview.html?edit=mend';
                if_menu.goto_url(url);
                // if (typeof QFPAY !== "undefined") {
                //     var go_url = {
                //         uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/activity_preview.html?edit=mend',
                //     };
                //     native.openUri(go_url, function(cb) {
                //         console.log(cb.ret);
                //     });
                // } else {
                //     location.href = location.protocol + '//' + location.host + '/prepaid/v1/page/b/activity_preview.html?edit=mend';
                // }
            });
            //开始时间与结束时间的判断
            function time_area() {
                var startime = $('.js_startime');
                var endtime = $('.js_endtime');
                var tips_pic = '<i class="ic_tips"></i>';
                if (startime.val() && endtime.val()) {
                    var s_year = startime.attr('data-year');
                    var s_month = startime.attr('data-month');
                    var s_day = startime.attr('data-day');
                    var e_year = endtime.attr('data-year');
                    var e_month = endtime.attr('data-month');
                    var e_day = endtime.attr('data-day');
                    var s_time = s_year + '/' + s_month + '/' + s_day + ' 00:00:00';
                    var e_time = e_year + '/' + e_month + '/' + e_day + ' 23:59:59';
                    var s_time_s = new Date(s_time).getTime();
                    var e_time_s = new Date(e_time).getTime();
                    var today_time_s = new Date(today_times).getTime();
                    var s_cha = e_time_s - s_time_s;
                    if (!startime.hasClass('grey')) {
                        //活动开始前，判断开始时间
                        if (s_time_s - today_time_s < 0) {
                            $('.js_timetips').addClass('error_tips').find('span').html(tips_pic + '开始不能比今天早');
                            return false;
                        } else {
                            $('.js_timetips').removeClass('error_tips').find('span').html('');
                        }
                    }
                    if (e_time_s - s_time_s > 365 * 24 * 60 * 60 * 1000) {
                        $('.js_timetips').addClass('error_tips').find('span').html(tips_pic + '时间范围在365天之内');
                    } else if (e_time_s - s_time_s >= 0) {
                        $('.js_timetips').removeClass('error_tips').find('span').html('');
                    } else {
                        $('.js_timetips').addClass('error_tips').find('span').html(tips_pic + '结束时间不能比开始时间早');
                    }
                } else {
                    $('.js_timetips').addClass('error_tips').find('span').html(tips_pic + '时间范围在365天之内');
                }
            }
            //获取所有信息
            function get_alldata(return_data) {
                //判断活动开始前与进行中
                var countdown = return_data.countdown_day;
                if (countdown > 0) {
                    //活动开始前
                    $('.js_startime').removeAttr('disabled').removeClass('grey');
                    $('.js_tel').removeAttr('disabled').removeClass('grey');
                } else {
                    //活动进行中
                    $('.js_startime').attr('disabled', 'disabled').addClass('grey');
                    $('.js_tel').attr('disabled', 'disabled').addClass('grey');
                }
                //数据获取
                var rules = return_data.rules;
                var merchant_name = return_data.merchant_name;
                var info = return_data.info;
                var startime_data = info.start_time;
                var endtime_data = info.end_time;
                var mch_mobile = info.mch_mobile;
                var desc = info.desc;
                //赋值电话和备注、店铺名称
                $('.js_shopname').val(merchant_name);
                $('.js_tel').val(mch_mobile);
                //添加选中事件，以便textarea数值显示               
                $('.js_endtime').focus(); //该输入框input为readonly不会触发输入框事件，开始时间为disabled时失效
                $('.js_note').val(desc);
                // document.getElementById("js_note").value=desc;
                //document.getElementById("js_note").innerText=desc;
                //剩余可输入字数
                var wordtip = desc.length - 0;
                $('.js_wordtip span').text(40 - wordtip);
                //日期
                var startime = startime_data.substr(0, 10);
                var startime_zu = startime.split('-');
                if (startime) {
                    $('.js_startime').data('year', startime_zu[0]);
                    $('.js_startime').data('month', num_change(startime_zu[1]));
                    $('.js_startime').data('day', num_change(startime_zu[2]));
                    $('.js_startime').val(num_change(startime_zu[1]) + '月' + num_change(startime_zu[2]) + '日');
                    $('#startime').val(startime_zu[0] + '-' + num_change(startime_zu[1]) + '-' + num_change(startime_zu[2]));
                }
                var endtime = endtime_data.substr(0, 10);
                var endtime_zu = endtime.split('-');
                if (endtime) {
                    $('.js_endtime').data('year', endtime_zu[0]);
                    $('.js_endtime').data('month', num_change(endtime_zu[1]));
                    $('.js_endtime').data('day', num_change(endtime_zu[2]));
                    $('.js_endtime').val(num_change(endtime_zu[1]) + '月' + num_change(endtime_zu[2]) + '日');
                    $('#endtime').val(endtime_zu[0] + '-' + num_change(endtime_zu[1]) + '-' + num_change(endtime_zu[2]));
                }
                //储值规则--有退出，放置最后
                if (!rules) {
                    return false;
                }
                for (var i = 0; i < rules.length; i++) {
                    var chu_value = (rules[i].pay_amt / 100).toFixed(0);
                    var song_value = (rules[i].present_amt / 100).toFixed(0);
                    var index_value = rules[i].grid_index;
                    var dd_detail;
                    //开始前与进行中判断
                    if (countdown > 0) {
                        dd_detail = '<dd data-index="' + index_value + '">储值<input class="text text_short js_chu js_storule" type="tel" value="' + chu_value + '" name="chu" />元送<input class="text text_short js_song js_storule" type="tel" value="' + song_value + '" name="song" />元<i class="delete js_ruledelete" onclick="delete_rule(this)"></i></dd>';
                    } else {
                        dd_detail = '<dd data-index="' + index_value + '">储值<input class="text text_short js_chu js_storule" type="tel" value="' + chu_value + '" name="chu" />元送<input class="text text_short js_song js_storule" type="tel" value="' + song_value + '" name="song" />元</dd>';
                    }
                    $('.js_rule').append(dd_detail);
                }
                //开始前与进行中判断
                if (countdown > 0) {
                    //活动开始前
                    $('.js_storule').removeAttr('disabled').removeClass('grey');
                    $('.js_add_activity').attr('data-click', '1');
                } else {
                    //活动进行中
                    $('.js_storule').attr('disabled', 'disabled').addClass('grey');
                    //杜绝添加按钮的点击时间
                    $('.js_add_activity').attr('data-click', '0');
                    //显示不可添加的图标
                    $('.js_rule').find('.add_rule').css('display', 'none');
                    $('.js_rule').find('.add_rule_no').css('display', 'inline-block');
                    return false;
                }
                if (rules.length <= 1) {
                    $(document).find('.js_rule dd').eq(0).find('i.js_ruledelete').remove();
                }
                if (rules.length >= 4) {
                    $('.js_rule').find('.add_rule').css('display', 'none');
                    $('.js_rule').find('.add_rule_no').css('display', 'inline-block');
                } else {
                    $('.js_rule').find('.add_rule').css('display', 'inline-block');
                    $('.js_rule').find('.add_rule_no').css('display', 'none');
                }
            }
            //把小于10的数值变成1位数
            function num_change(num) {
                if (num < 10) {
                    return num.substr(-1);
                } else {
                    return num;
                }
            }
            //获取店铺名称
            function get_shopname(return_data) {
                $('.js_shopname').val(return_data.merchant_name);
            }
            //获取查询参数
            function getQueryParamString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)return unescape(r[2]);
                return null;
            }
        });
    });
});
