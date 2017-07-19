/**
 * Created by liteng on 2017/5/16.
 */
//手动储值 绑定会员信息页
require(['../require-config2'], function () {
    require(["zepto", "ajax_rule","if_menu","native","date_day","iosselect"], function ($, ajax_rule,if_menu,native,date_day,iosselect) {
        $(function () {
            $(document).ready(function () {
                //获取信息--todo

                //手机号输入框改变事件
                $('.js_message_tel').on('input',function () {
                    var val = $(this).val();
                    if (val && val.length == 11){
                        //输入框刚好输入11位
                       verifyPhoneNum(val);
                    }else {
                        if (val && val.length > 11){
                            $(this).val(val.substring(0,11));
                            verifyPhoneNum(val.substring(0,11));
                        }else {
                            disableVerifyCode();
                            $('.js_nextBut').addClass('disa');
                            $('.js_message_tel').parents('dl').addClass('error_data');
                        }
                    }
                });

                //获取验证码点击事件
                $('.entycode').on('click',function () {
                   var clicked = $(this).attr('data-clicked');
                   var idName  = $(this).attr('id');
                    if (clicked == 'true' ||
                        idName.indexOf('disable') != -1){
                        //验证码已经点击过 || 验证码按钮为灰色则不可用
                        return false;
                    }
                    // $('.entycode').attr('data-clicked','true');
                    // $('.entycode').attr('data-haveClick','true');
                    // disableVerifyCode();
                    // $('.js_get_entycode').hide();
                    // $('.js_show_entycode').show();
                    // countdownFunc();
                    verifyCodeRequest($('.js_message_tel').val());
                });
            });

            //验证码输入框事件
            $('.js_code').on('input',function () {
                highlightNextBut();
                if ($(this).val().length > 6){
                    $(this).val($(this).val().substring(0,6));
                }
            });

            //姓名输入框改变事件
            $('.js_message_name').on('input',function () {
                var name = $(this).val();
                if (name.length >= 2){
                    if (/^([\u4e00-\u9fa5]|[a-zA-Z0-9]){2,10}$/.test(name)){
                        //无特殊字符
                        $('.js_message_name').parents('dl').removeClass('error_data');
                        highlightNextBut();
                    }else {
                        $('.js_message_name').parents('dl').addClass('error_data');
                        $('.js_nextBut').addClass('disa');
                    }
                }else if (name.length == 0) {
                    $('.js_message_name').parents('dl').removeClass('error_data');
                    highlightNextBut();
                }
            });

            //点击生日
            $('.js_message_birth').on('click', function() {
                var showDom = document.querySelector('.js_message_birth');
                var year = showDom.dataset['year'];
                var month = showDom.dataset['month'];
                var day = showDom.dataset['day'];
                //设置开始和结束的年份
                date_day.time_free.start_year = 1960;
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
                        $('#birthday').val(year_data.id + '-' + num_change_long(month_data.id) + '-' + num_change_long(day_data.id));
                    }
                });
            });

            //下一步
            $('.js_nextBut').on('click',function () {
               var phoneNum = $('.js_message_tel').val();
               var code = $('.js_code').val();
               if (verifyPhoneNum(phoneNum) &&
                   code.length > 2){
                   ajax_rule.ajax_rule(' /prepaid/v1/api/c/captcha','POST','json',{mobile:phoneNum,captcha:code},'.zheceng',function () {
                       var bindModel = {
                           c :getQueryParamString('c'),
                           mobile: phoneNum,
                           captcha: code,
                           name: '',
                           birthday: ''
                       };
                       if ($('.js_message_name').val()){
                           bindModel.name = $('.js_message_name').val();
                       }
                       if ($('.js_message_birth').val()){
                           bindModel.birthday = $('#birthday').val();
                       }
                       ajax_rule.ajax_rule('/prepaid/v1/api/c/bindinfo','POST','json',bindModel,'.zheceng',function () {
                           var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/mrecharge/index.html?c=' + getQueryParamString('c');
                           if_menu.goto_url(url_val);
                       })
                   });
               }
            });

            /*************************************** private func **************************************/

            //获取验证码
            function verifyCodeRequest(phoneNum) {
                var verifyCodeModel = {
                     c: getQueryParamString('c'), //userid
                mobile: phoneNum
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/c/captcha','GET','json',verifyCodeModel,'.zheceng',function () {
                    $('.entycode').attr('data-clicked','true');
                    $('.entycode').attr('data-haveClick','true');
                    disableVerifyCode();
                    $('.js_get_entycode').hide();
                    $('.js_show_entycode').show();
                    countdownFunc();
                })
            }

            //验证手机号
            function verifyPhoneNum(num) {
                if (/^1[3|4|5|6|7|8][0-9]{9}$/.test(num)){
                    //手机号可用
                    highlightVerifyCode();
                    highlightNextBut();
                    return true;
                }else {
                    //手机号错误
                    disableVerifyCode();
                    native.toast({msg:'请输入正确的手机号'});
                    $('.js_nextBut').addClass('disa');
                    $('.js_message_tel').parents('dl').addClass('error_data');
                    return false;
                }
            }

            function highlightNextBut() {
                var haveSendCode = $('.entycode').attr('data-haveClick');
                if (haveSendCode == 'true' &&
                    !$('.js_message_tel').parents('dl').hasClass('error_data') &&
                    !$('.js_message_name').parents('dl').hasClass('error_data') &&
                    $('.js_code').val() &&
                    $('.js_code').val().length > 2) {
                    $('.js_nextBut').removeClass('disa');
                }
            }

            //验证码按钮高亮
            function highlightVerifyCode() {
                $('.js_message_tel').parents('dl').removeClass('error_data');
                var clicked = $('.entycode').attr('data-clicked');
                if (clicked == 'false'){
                    //验证码要处于未发送状态才可以高亮
                    $('.entycode').attr('id','get_entycode');
                }
            }
            //验证码按钮置灰
            function disableVerifyCode() {
                $('.entycode').attr('id','get_entycode_disable');
            }

            //倒计时
            function countdownFunc() {
                var time0 = $('.js_show_entycode i').text();
                $('.js_show_entycode i').text(time0 - 1);
                t = setTimeout(function () {
                    countdownFunc();
                }, 1000);
                if (time0 == 0) {
                    clearTimeout(t);
                    $('.entycode').attr('data-clicked','false');
                    verifyPhoneNum($('.js_message_tel').val());
                    $('.js_get_entycode').show();
                    $('.js_show_entycode').hide();
                    $('.js_show_entycode i').text(61);
                }
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
