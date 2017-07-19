//点击储值项
function click_chulist(obj) {
    $(obj).addClass('li_choose').siblings('li').removeClass('li_choose');
};
require(['../require-config'], function() {
    require(["zepto", "yanzheng", "close_tip", "jsonp","if_menu","native"], function($, yanzheng, close_tip, jsonp,if_menu,native) {
        $(function() {
            //测试过期显示--不需要，进行测试
            // var return_expired = $('#hidden').val();
            // if (return_expired == '1') {
            //     $('.js_content_sub').show().css('display', 'inline-block');
            //     $('.js_content_sub_disa').hide();
            // } else {
            //     $('.js_content_sub').hide();
            //     $('.js_content_sub_disa').show().css('display', 'inline-block');
            // }
            //储值首页----------------------------------------------------------------------------------------------------------------------------------------------------
            $('.js_recharge_index').get(0) && (~ function() {
                $(document).ready(function() {
                    //获取信息todo-show
                    //get_activity_pre();
                    //获取储值规则
                    //get_rule_detail();
                });
                //点击确定进入home页
                // $('.js_content_sub').on('click', function() {
                //     var home_url = $(this).attr('data-url');
                //     location.href = home_url;
                // });
                $('.js_content_sub').on('click', function() {
                    //todo: close all gotourl 首页
                    var closeToUri = {
                        uri:location.protocol + '//' + location.host + '/prepaid/v1/page/b/index.html',
                    };
                    native.navToUri(closeToUri, function (cb) {
                        console.log(cb.ret)
                    });
                });
                //选择储值项——————--不需要，进行测试
                // $(document).on('click', '.js_rechage_ul li', function() {
                //     $(this).addClass('li_choose').siblings('li').removeClass('li_choose');
                // });
            }());
            //获取储值规则
            function get_rule_detail() {
                $.ajax({
                    url: 'http://192.168.0.7:7013/prepaid/v1/api/c/rulexplain',
                    type: 'GET',
                    dataType: 'jsonp',
                    //jsonp:"callback",
                    //jsonpCallback:"success_jsonpCallback",
                    data: {
                        'c': yanzheng.get_hash('c'),
                        'h': yanzheng.get_hash('h'),
                    },
                    beforeSend: function() {
                        $('#loading').show();
                    },
                    success: function(data) {
                        for (var i in data) {
                            alert(i + ":" + data[i]); //循环输出a:1,b:2,etc.  
                        }
                        if (data.respcd != '0000') {
                            $('#alert_alert').show();
                            $('.zheceng1').show();
                            if (!data['respmsg']) {
                                $('#alert_alert .alert_con_br').html(data['resperr']);
                            } else {
                                $('#alert_alert .alert_con_br').html(data['respmsg']);
                            }
                        } else {
                            var return_data = data.data;
                            var return_data_l = return_data.length;
                            for (var i = 0; i < return_data_l; i++) {
                                var li_detail = '<li><span>' + return_data[i] + '</span></li>';
                                $(".js_note_ul_detail").append(li_detail);
                            }
                            $('.zheceng1').hide();
                        }
                    },
                    error: function(data) {
                        $('#alert_alert').show();
                        $('.zheceng1').show();
                        //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function() {
                        $('#loading').hide();
                        //$('.zheceng').hide();
                    }
                });
                // $.jsonp({
                //     url: 'http://192.168.0.7:7013/prepaid/v1/api/c/rulexplain',
                //     data: { 'c': yanzheng.get_hash('c'),
                //         'h': yanzheng.get_hash('h'), },
                //     callbackParameter: "callback",
                //     timeout: 3000,
                //     dataFilter: function(json) {
                //         console.log("jsonp.filter:" + json.name);
                //         json.name = "测试123435";
                //         return json;
                //     },
                //     success: function(json, textStatus, xOptions) {
                //         console.log("jsonp.success:" + json.name);
                //     },
                //     error: function(xOptions, textStatus) {
                //         console.log("jsonp.error:" + textStatus + ", rel=" + xOptions.data.rel);
                //     }
                // });
            }
            //获取信息
            function get_activity_pre() {
                $.ajax({
                    url: 'http://192.168.0.7:7013/prepaid/v1/api/b/cur_activity',
                    type: 'GET',
                    dataType: 'jsonp',
                    //jsonp:"callback",
                    //jsonpCallback:"success_jsonpCallback",
                    data: {
                        // 'c': yanzheng.get_hash('c'),
                        // 'h': yanzheng.get_hash('h'),
                    },
                    beforeSend: function(request) {
                        $('#loading').show();
                        $('.zheceng').show();
                        //request.setRequestHeader("sessionid", "feff17fc-c223-4a05-9ce8-0c17418c0603");
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
                            //获取活动id
                            var activity_id = data.data.info.activity_id;
                            var home_url = 'http://' + location.host + '/prepaid/v1/page/b/index.html?activity_id=' + activity_id;
                            $('.js_content_sub').attr('data-url', home_url);
                            var return_data = data.data.rules;
                            //获取规则当中储值可用的规则
                            var return_data_right = [];
                            $(return_data).each(function(i, item) {
                                var tx_fee = return_data[i].present_amt / 100;
                                var tx_txamt = return_data[i].pay_amt / 100;
                                var tx_fee1 = tx_fee.toString().indexOf('.');
                                var tx_txamt1 = tx_txamt.toString().indexOf('.');
                                if (tx_fee >= 1 && tx_txamt >= 1 && tx_fee1 == '-1' && tx_txamt1 == '-1') {
                                    return_data_right.push(item);
                                }
                            });
                            var data_length = return_data_right.length;
                            if (data_length == '0') {
                                $('.js_content_sub').hide();
                                $('.js_content_sub_disa').show().css('display', 'inline-block');
                                $('.zheceng').hide();
                                return false;
                            } else {
                                $('.js_content_sub').show().css('display', 'inline-block');
                                $('.js_content_sub_disa').hide();
                            }
                            $(return_data_right).each(function(i, item) {
                                var tx_fee = (return_data_right[i].present_amt / 100).toFixed(0);
                                var tx_txamt = (return_data_right[i].pay_amt / 100).toFixed(0);
                                var tx_index = return_data_right[i].grid_index;
                                var li_detail;
                                if (data_length == '1') {
                                    li_detail = '<li class="li_one" onclick="click_chulist(this)" data-index="' + tx_index + '"><p class="font_17">储值<span class="js_rechar_num">' + tx_txamt + '</span>元</p><p>送<span class="js_rechar_sendnum">' + tx_fee + '</span>元</p><span class="choose"><i class="choose_i"></i></span></li>';
                                } else if (data_length == '2') {
                                    li_detail = '<li class="li_two" onclick="click_chulist(this)" data-index="' + tx_index + '"><p class="font_17">储值<span class="js_rechar_num">' + tx_txamt + '</span>元</p><p>送<span class="js_rechar_sendnum">' + tx_fee + '</span>元</p><span class="choose"><i class="choose_i"></i></span></li>';
                                } else {
                                    li_detail = '<li onclick="click_chulist(this)" data-index="' + tx_index + '"><p class="font_17">储值<span class="js_rechar_num">' + tx_txamt + '</span>元</p><p>送<span class="js_rechar_sendnum">' + tx_fee + '</span>元</p><span class="choose"><i class="choose_i"></i></span></li>';
                                }
                                $(".js_rechage_ul").append(li_detail);
                            });
                            $(".js_rechage_ul li").eq(0).addClass('li_choose');
                            //获取活动信息--该信息只有备注，取消不用
                            // var return_data_desc = data.data.info.desc;
                            // var return_data_l = return_data_desc.length;
                            // for (var i = 0; i < return_data_l; i++) {
                            //     var li_detail = '<li><span>' + return_data[i] + '</span></li>';
                            //     $(".js_note_ul_detail").append(li_detail);
                            // }
                            //验证是否过期
                            var return_expired = data.data.info.active;
                            if (return_expired == '1') {
                                $('.js_content_sub').show().css('display', 'inline-block');
                                $('.js_content_sub_disa').hide();
                            } else {
                                //过期无效
                                $('.js_content_sub').hide();
                                $('.js_content_sub_disa').show().css('display', 'inline-block');
                                $('.zheceng').hide();
                                return false;
                            }
                            $('.zheceng').hide();
                        }
                    },
                    error: function() {
                        $('#alert_alert').show();
                        $('.zheceng').show();
                        $('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:' + XMLHttpRequest.readyState + ',XMLHttpRequest.status:' + XMLHttpRequest.status + ',textStatus:' + textStatus + '!');
                        //$('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function() {
                        $('#loading').hide();
                    }
                });
            }
            //关闭弹框
            close_tip.close_tip();

        })
    })
})
