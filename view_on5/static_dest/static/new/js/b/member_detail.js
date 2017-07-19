"use strict";

require(['../require-config2'], function () {
    require(["zepto", "yanzheng", "close_tip", "if_menu"], function ($, yanzheng, close_tip, if_menu) {
        $(function () {
            //流水号
            var trade_listnum = new Array();
            //滚动下拉-------start--------------------------------------------------------
            var timer_rt = null;
            var scroll_if = false;
            var nomor_show = false;
            var window_height = window.innerHeight;
            var body_height = $('body').height();
            //手动储值
            $('.manual_but').on('click', function () {
                var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/mrecharge/index.html?c=' + yanzheng.get_hash('c');
                if_menu.goto_url(url_val);
            });
            //活动储值详情----------------------------------------------------------------------------------------------------------------------------------------------------
            $('.js_member_detail').get(0) && ~function () {
                $(document).ready(function () {
                    //获取会员信息todo-show
                    get_member();
                    //获取会员消费储值列表todo-show
                    get_rechargeli();
                });
            }();
            $(window).on('scroll', function (e) {
                //var history_top = $(document).scrollTop();
                var history_top = document.documentElement.scrollTop || document.body.scrollTop;
                // console.log('document.documentElement.scrollTop--'+document.documentElement.scrollTop);
                // console.log('document.body.scrollTop--'+document.body.scrollTop);
                // console.log(body_height - window_height);
                // console.log(history_top);
                if (history_top < body_height - window_height) {
                    clearTimeout(timer_rt);
                } else {
                    e.stopPropagation();
                    if (scroll_if) {
                        $('.load').show();
                        scroll_if = false;
                        timer_rt = window.setTimeout(get_rechargeli, 2000);
                    }
                    if (nomor_show) {
                        $("#nomoredata").animate({ opacity: 0.7 }, 500, 'ease-out');
                        window.setTimeout(nomoredata_hide, 2000);
                        nomor_show = false;
                    }
                    // console.log('scroll:scroll_if=='+scroll_if);
                    // console.log('scroll:nomor_show=='+nomor_show);
                }
            });
            //获取会员信息
            function get_member() {
                var id = yanzheng.get_hash('c');
                $.ajax({
                    url: '/prepaid/v1/api/b/member/' + id,
                    type: 'GET',
                    dataType: 'json',
                    data: {},
                    beforeSend: function beforeSend() {
                        $('#load_small_bg').show();
                    },
                    success: function success(data) {
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
                            var m_img = return_data.avatar;
                            var m_mobile = return_data.mobile;
                            var m_name = return_data.name;
                            var m_times = return_data.recharge_times;
                            var m_amt = (return_data.recharge_amt / 100).toFixed(0);
                            var m_balance = (return_data.balance / 100).toFixed(2);
                            $('.js_m_img').attr('src', m_img);
                            $('.js_m_tel').text(m_mobile);
                            $('.js_m_name').text(m_name);
                            $('.js_m_times').text(m_times);
                            $('.js_m_all').text(m_amt);
                            $('.js_m_loft').text(m_balance);
                        }
                    },
                    error: function error(data) {
                        $('#alert_alert').show();
                        $('.zheceng1').show();
                        //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function complete() {
                        $('#load_small_bg').hide();
                    }
                });
            }
            //获取会员消费储值列表
            function get_rechargeli() {
                $.ajax({
                    url: '/prepaid/v1/api/transactions',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        'c': yanzheng.get_hash('c'),
                        'pos': $('#js_pos').val(),
                        'count': 20
                    },
                    beforeSend: function beforeSend() {
                        $('#load_small_bg').show();
                    },
                    success: function success(data) {
                        if (data.respcd != '0000') {
                            $('#alert_alert').show();
                            $('.zheceng').show();
                            if (!data['respmsg']) {
                                $('#alert_alert .alert_con_br').html(data['resperr']);
                            } else {
                                $('#alert_alert .alert_con_br').html(data['respmsg']);
                            }
                        } else {
                            var return_data = data.data;
                            var last_len = 0;
                            if (!return_data || return_data.length < 1) {
                                $('.js_empty').show();
                            } else {
                                $('.js_empty').hide();
                            }
                            $(return_data).each(function (i, item) {
                                var dl_data_set_l = trade_listnum.length;

                                var tx_txamt = (return_data[i].txamt / 100).toFixed(2);
                                var tx_pay_amt = (return_data[i].pay_amt / 100).toFixed(2);
                                var tx_present_amt = (return_data[i].present_amt / 100).toFixed(2);
                                var tx_pay_amt0 = (return_data[i].pay_amt / 100).toFixed(0);
                                var tx_present_amt0 = (return_data[i].present_amt / 100).toFixed(0);
                                var tx_time = return_data[i].sysdtm;
                                var tx_status_status = return_data[i].status;
                                var tx_status = return_data[i].biz_type;
                                var biz_sn = return_data[i].biz_sn;
                                var li_detail;
                                //判断流水号是否重复
                                var bizn_has = '0';
                                for (var i = dl_data_set_l - 1; i > 0; i--) {
                                    if (trade_listnum[i] == biz_sn) {
                                        bizn_has = '1';
                                        break;
                                    }
                                }
                                if (bizn_has == '1') {
                                    //流水号存在则退出
                                    return true;
                                } else {
                                    trade_listnum.push(biz_sn);
                                    last_len++;
                                }
                                if (tx_status == '1') {
                                    //储值
                                    //li_detail = '<li><dl><dd>储值赠送<span class="buy_back orange">储值' + tx_pay_amt0 + '送' + tx_present_amt0 + '</span></dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><span class="history_num orange">+<i class="i_normal">' + tx_present_amt + '</i></span><div class="clearfix"></div></li> <li><dl><dd>储值</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><span class="history_num orange">+<i class="i_normal">' + tx_pay_amt + '</i></span><div class="clearfix"></div></li>';

                                    li_detail = '<li><dl><dd>储值</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><span class="history_num zeng orange">+<i class="i_normal">' + tx_pay_amt + '</i><br/><i class="i_normal grey">赠送￥' + tx_present_amt + '</i></span><div class="clearfix"></div></li>';
                                } else if (tx_status == '2') {
                                    //消费
                                    if (tx_status_status == '4') {
                                        //消费退款
                                        li_detail = '<li class="grey"><dl><dd>储值消费(已撤销)</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><span class="history_num">-<i class="i_normal">' + tx_txamt + '</i></span><div class="clearfix"></div></li>';
                                    } else {
                                        li_detail = '<li><dl><dd>储值消费</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><span class="history_num">-<i class="i_normal">' + tx_txamt + '</i></span><div class="clearfix"></div></li>';
                                    }
                                } else if (tx_status == '4') {
                                    //手动储值
                                    if (tx_present_amt0 > 0) {
                                        //有赠送
                                        li_detail = '<li><dl><dd>手动储值</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><span class="history_num zeng orange">+<i class="i_normal">' + tx_pay_amt + '</i><br/><i class="i_normal grey">赠送￥' + tx_present_amt + '</i></span><div class="clearfix"></div></li>';
                                    } else {
                                        //没有赠送
                                        li_detail = '<li><dl><dd>手动储值</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><span class="history_num orange">+<i class="i_normal">' + tx_txamt + '</i></span><div class="clearfix"></div></li>';
                                    }
                                } else {
                                    //退款
                                    li_detail = '<li><dl><dd>消费退款</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><span class="history_num">+<i class="i_normal">' + tx_txamt + '</i></span><div class="clearfix"></div></li>';
                                }
                                $(".js_ul_history").append(li_detail);
                            });
                            var pos_val = $('#js_pos').val() - 0;
                            if (return_data.length < 20) {
                                // if(pos_val>0){
                                //     $('.load').hide();
                                //     $("#nomoredata").animate({opacity: 0.7,}, 500,'ease-out');
                                //     window.setTimeout(nomoredata_hide, 2000);
                                // }  
                                // if(pos_val>0 && last_len<=0){
                                //     $("#nomoredata").animate({opacity: 0.7,   }, 500,'ease-out');
                                //     window.setTimeout(nomoredata_hide, 3000);                
                                //     nomor_show=false;
                                // }
                                if (last_len > 0) {
                                    nomor_show = true;
                                } else {
                                    $("#nomoredata").animate({ opacity: 0.7 }, 500, 'ease-out');
                                    window.setTimeout(nomoredata_hide, 3000);
                                    nomor_show = false;
                                }
                                scroll_if = false;
                            } else {
                                pos_val += 20;
                                $('#js_pos').val(pos_val);
                                scroll_if = true;
                            }
                            $('.zheceng').hide();
                            $('.load').hide();
                            body_height = Math.floor($('body').height()).toFixed(0);
                            // console.log('AJAX:body_height=='+body_height);
                            // console.log('AJAX:scroll_if=='+scroll_if);
                            // console.log('AJAX:nomor_show=='+nomor_show);
                        }
                    },
                    error: function error(data) {
                        $('#alert_alert').show();
                        $('.zheceng').show();
                        //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function complete() {
                        $('#load_small_bg').hide();
                    }
                });
            }
            //关闭弹框
            close_tip.close_tip();
            //隐藏没有更多信息了
            function nomoredata_hide() {
                $("#nomoredata").animate({ opacity: 0 }, 500, 'ease-out');
            }
        });
    });
});