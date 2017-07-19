/**
 * Created by liteng on 2017/5/18.
 */
require(['../require-config2'], function () {
    require(["zepto", "ajax_rule","if_menu","native","date_day","iosselect"], function ($, ajax_rule,if_menu,native,date_day,iosselect) {
        $(function () {
            var rule_index = 0;

            $(document).ready(function () {
                //获取信息--todo
                // $('.js_recharge_rulediv').hide();
                get_baseinfo();
                recharge_rules_request();
                //点击活动储值
                $(document).on('touchstart','.js_rules_title',function () {
                    //取消自定义金额选中状态
                    $('.s_custom_amount').removeClass('selected');
                    $('.js_custom_amount').attr('readOnly','readOnly');
                    //清除自定义金额输入框
                    $('.js_custom_amount').val('');
                    //选中活动储值
                    $('.s_rules_amount').addClass('selected');
                });
                // $('.js_rules_title').live('click',function () {
                //
                // });
                //点击自定义储值金额
                $('.js_custom_title').on('click',function () {
                    rule_index = 0;
                    //取消活动金额选中状态
                    $('.s_rules_amount').removeClass('selected');
                    //清除活动金额子选项
                    $('li').removeClass('li_choose');
                    //选中活动储值
                    $('.s_custom_amount').addClass('selected');
                    $('.js_custom_amount').removeAttr('readOnly');
                });
                //活动储值子选项点击事件
                $(document).on('touchstart','li',function () {
                    if ( !$('.s_rules_amount').hasClass('selected')){
                        return false;
                    }
                    $('li').removeClass('li_choose');
                    $(this).addClass('li_choose');
                    rule_index = $(this).attr('data-index');
                });
                // $('li').live('click',function () {
                //
                // });
            });

            $('.js_custom_amount').on('input',function () {
                var val = $(this).val();
                if (val.length > 0){
                    //不是正整数
                    val = val.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : '';
                    $(this).val(val);
                }
                if (val.length > 1 &&
                    val.substring(0,1) == '0' &&
                    val.substring(0,2) != '0.'){
                    //错误格式  比如001 00.2
                    native.toast({msg:'请输入正确的金额'});
                    $(this).val('');
                }else if (val.length > 3 && parseFloat(val) < 0.01){
                    //错误金额 0.00
                    native.toast({msg:'请输入正确的金额'});
                    $(this).val('');
                }
            });

            //点击下一步
            $('.js_content_sub').on('click',function () {
                // if ($(this).attr('submiting') == 'true'){
                //     return false;
                // }
                recharge_request();
            });
            /*************************************** private func **************************************/
            function get_baseinfo() {
                merchantinfo_request();
                balance_request();
                userInfo_request();
            }

            function recharge_request() {
                var recharge_model = {
                    c: getQueryParamString('c')
                };
                if (rule_index == 0){
                    //没有或者未选择活动储值金额
                    var pay_amt = $('.js_custom_amount').val();
                    if (pay_amt){
                        if (parseFloat(pay_amt) > 0 &&
                            parseFloat(pay_amt) <= 30000){
                            recharge_model.pay_amt = (parseFloat(pay_amt) * 100.0).toFixed(0);
                        }else {
                            if (parseFloat(pay_amt) > 30000){
                                native.toast({msg:'目前只能输入30000以内的金额哦~'});
                                //console.log('目前只能输入30000以内的金额哦~');
                            }else {
                                native.toast({msg:'请输入正确的金额'});
                                //console.log('请输入正确的金额');
                            }
                            return false;
                        }

                    }else {
                        native.toast({msg:'请选择或输入储值金额'});
                        //console.log('请选择或输入储值金额');
                        return false;
                    }
                }else {
                    recharge_model.grid_index = rule_index;
                }
                var password = $('.js_password').val();
                if (password && password.length > 0){
                    recharge_model.passwd = password;
                }else {
                    native.toast({msg:'请输入密码'});
                    return false;
                }
                $('.js_content_sub').attr('submiting','true');

                $.ajax({
                    url: '/prepaid/v1/api/b/mrecharge',
                    type: 'POST',
                    dataType: 'json',
                    contentType:'application/json; charset=utf-8',
                    data: JSON.stringify(recharge_model),
                    beforeSend: function(XMLHttpRequest) {
                        $('#load_small_bg').show();
                    },
                    success: function(data) {
                        if (data.respcd != '0000') {
                            $('#alert_alert').show();
                            $('.zheceng').show();
                            if (!data['respmsg']) {
                                $('#alert_alert .alert_con_br').html(data['resperr']);
                            } else {
                                $('#alert_alert .alert_con_br').html(data['respmsg']);
                            }
                        } else {
                            native.toast({msg:'储值成功'});
                            var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/members/detail.html?c=' + getQueryParamString('c');
                            if_menu.goto_url(url_val);
                            $('.js_password').val('');
                        }
                    },
                    error: function(data) {
                        $('#alert_alert').show();
                        $('.zheceng').show();
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function() {
                        $('#load_small_bg').hide();
                    }
                });
            }

            function merchantinfo_request() {
                ajax_rule.ajax_rule('/prepaid/v1/api/b/merchant_info', 'GET', 'json', '', '.zheceng2', function (respond) {
                    $('.js_shopname').html(respond.merchant_name);
                });
            }
            
            function balance_request() {
                ajax_rule.ajax_rule('/prepaid/v1/api/b/balance', 'GET', 'json', {c:getQueryParamString('c')}, '.zheceng2', function (respond) {
                    $('.js_balance').html((parseFloat(respond.balance) / 100.0).toFixed(2));
                });
            }

            function userInfo_request() {
                ajax_rule.ajax_rule('/prepaid/v1/api/c/bindinfo', 'GET', 'json', {c:getQueryParamString('c')}, '.zheceng2', function (respond) {
                    $('.js_mobile').html(respond.mobile);
                });
            }
            
            function recharge_rules_request() {
                ajax_rule.ajax_rule('/prepaid/v1/api/b/activity_detail', 'GET', 'json', {c:getQueryParamString('c'),noact_noerr:''}, '.zheceng', function (respond) {
                    if (!(respond.status == 1 && respond.rules.length > 0)){
                        //没有储值活动
                        $('.s_custom_amount').addClass('selected');
                        $('.js_custom_amount').removeAttr('readOnly');
                    }else {
                        //有储值活动
                        $('.s_rules_amount').addClass('selected');
                        var rules_dom = '<p class="title_a js_rules_title"><i class="icon_select icon_selected"></i> 请选择储值金额</p><ul class="rechage_ul js_rechage_ul">';
                        $.each(respond.rules,function (idx,rule) {
                            var pay_amt = parseInt(rule.pay_amt)/100;
                            var present_amt =  parseInt(rule.present_amt)/100;
                            var ruleindex = rule.grid_index;
                            var li_dom;
                            if (idx == 0){
                                rule_index = ruleindex;
                                li_dom = '<li class="li_choose" data-index="'+ ruleindex + '"><p class="font_17">储值' + pay_amt + '元</p><p>送'+present_amt +'元</p><span class="choose"><i class="choose_i"></i></span></li>';
                            }else {
                                li_dom = '<li data-index="'+ ruleindex + '"><p class="font_17">储值' + pay_amt + '元</p><p>送'+present_amt +'元</p><span class="choose"><i class="choose_i"></i></span></li>';

                            }
                            rules_dom += li_dom;
                        });
                        rules_dom += '</ul>';
                        $('.js_recharge_rulediv').append(rules_dom);
                    }
                });

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