// var readyEvent = document.createEvent('Events');
// readyEvent.initEvent('WebViewJavascriptBridgeReady');
// readyEvent.bridge = WebViewJavascriptBridge;
// document.dispatchEvent(readyEvent);
//判断 处置活动首页显示右上角导航
// document.addEventListener('WebViewJavascriptBridgeReady', function() {
//     if (typeof QFPAY !== "undefined") {
//         QFPAY.call('setNavMenu', {
//             menus: [{
//                 type: 'uri',
//                 uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/transactions/consume.html',
//                 icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_mingxi.png',
//                 title: '储值消费',
//             }, {
//                 type: 'uri',
//                 uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/activity_history.html',
//                 icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_history.png',
//                 title: '历史活动',
//             }, {
//                 type: 'uri',
//                 uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/user_guide.html',
//                 icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_jiaocheng.png',
//                 title: '储值教程',
//             }],
//             buttons: [

//             ]
//         }, function(cb) {
//             console.log(cb.ret)
//         })
//     }
// }, false);
require(['../require-config'], function() {
        require(["zepto", "close_tip", "date_change", "scroll_down", "if_menu", "native"], function($, close_tip, date_change, scroll_down, if_menu, native) {
            $(function() {
                var menu_data = {
                    menus: [{
                        type: 'uri',
                        uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/transactions/consume.html',
                        icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_mingxi.png',
                        title: '储值消费',
                    }, {
                        type: 'uri',
                        uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/activity_history.html',
                        icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_history.png',
                        title: '历史活动',
                    }, {
                        type: 'uri',
                        uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/user_guide.html',
                        icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_jiaocheng.png',
                        title: '储值教程',
                    }]
                };
                native.setNavMenu(menu_data, function(cb) {
                    console.log(cb.ret)
                });
                //判断 处置活动首页显示右上角导航
                // document.addEventListener('WebViewJavascriptBridgeReady', function() {
                //         if_menu.if_menu();
                //     },false);
                //储值首页----------------------------------------------------------------------------------------------------------------------------------------------------
                //获取活动id--取消使用，数据合并
                // var homepage_url = location.href;
                // var activity_id;
                // if (homepage_url.indexOf('?') != '-1') {
                //     activity_id = homepage_url.split('?')[1].split('=')[1];
                // }
                //测试--js引入的html文件中单引号变双引号
                var b = 'haha';
                var a = '<a onclick="_hmt.push(["_trackEvent","usercenter","click","index_buy"])" href="#" data-b="' + b + '">立即储值</a>';
                // $('.section_mid').append(a);
                $('.js_activity_index').get(0) && (~ function() {
                    $(document).ready(function() {
                        //获取所有活动信息
                        //get_activities();
                        //获取活动信息todo-show
                        //get_activity();
                        //获取当前活动信息--取消，加载在上一个请求中
                        //get_activitie_now(); 
                    });
                    //点击切换活动详情                
                    var js_h = Math.ceil($('.js_toogle_detail').height());
                    var js_button = Math.ceil($('.js_ul_button').height());
                    var js_body = Math.ceil($('body').height());
                    var js_window = Math.ceil(window.innerHeight);
                    var js_cha = Math.floor(js_body - js_window).toFixed(0);
                    console.log(js_h);
                    console.log(js_button);
                    $('.js_toogle').on('click', function() {
                        var tog_val = $(this).attr('data-toogle');
                        if (tog_val === '1') {
                            $(this).attr('data-toogle', '0');
                            $(this).parents('.section_detail').addClass('arrow_t');
                            //js实现动态效果
                            $('.js_toogle_detail').animate({ opacity: 1, height: js_button + 'px' }, 1000);
                            $('.js_ul_detail').animate({ opacity: 0 }, 1000);
                            $('.js_title_normal').animate({ opacity: 0 }, 1000);
                        } else {
                            $(this).attr('data-toogle', '1');
                            $(this).parents('.section_detail').removeClass('arrow_t');
                            //js实现动态效果
                            $('.js_toogle_detail').animate({ opacity: 1, height: js_h + 'px' }, 800, 'ease-in-out', function() {
                                scroll_down.GoTop();
                            });
                            //$('.js_toogle_detail').animate({ opacity: 1, height: js_h + 'px'}, 600);
                            $('.js_ul_detail').animate({ opacity: 1 }, 1000);
                            $('.js_title_normal').animate({ opacity: 1 }, 1000);
                            //setTimeout(scroll_down.GoTop(),1000)
                            // if (js_cha > 0) {
                            //     console.log(js_cha);
                            //     $('html,body').animate({ scrollTop: js_cha + 'px' }, 1000);
                            // }
                        }
                    });

                    //跳到会员界面
                    $('.js_goto_member').on('click', function() {
                        _hmt.push(['_trackEvent', 'home', 'click', 'member_all']);
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/members/index.html';
                        // location.href = url_val;
                        if_menu.goto_url(url_val);
                    });
                    //跳到总储值流水
                    $('.js_goto_allhistory').on('click', function() {
                        _hmt.push(['_trackEvent', 'home', 'click', 'trade_all']);
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/transactions/recharge.html';
                        if (typeof QFPAY !== "undefined") {
                            QFPAY.call('openUri', {
                                uri: url_val,
                            }, function(cb) {
                                console.log(cb.ret)
                            })
                        } else {
                            location.href = url_val;
                        }
                    });
                    //跳到当前活动流水
                    $('.js_goto_nowhistory').on('click', function() {
                        _hmt.push(['_trackEvent', 'home', 'click', 'activity_now']);
                        var id = $(this).attr('data-id');
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/activity_detail.html/?activity_id=' + id;
                        if (typeof QFPAY !== "undefined") {
                            QFPAY.call('openUri', {
                                uri: url_val,
                            }, function(cb) {
                                console.log(cb.ret)
                            })
                        } else {
                            location.href = url_val;
                        }
                    });
                    //跳到下载宣传物料界面
                    $('.js_loadpic_sub').on('click', function() {
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/show_material.html';
                        if_menu.goto_url(url_val);
                    });
                    //跳到创建储值活动
                    $('.js_content_sub').on('click', function() {
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/create_activity.html';
                        if_menu.goto_url(url_val);
                    });
                    //跳到修改储值活动
                    $('.js_content_mend').on('click', function() {
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/alter_activity.html';
                        if_menu.goto_url(url_val);
                    });
                    //停止活动
                    $('.js_stop_activity').on('click', function() {
                        stop_activity();
                    });
                    //fixed更改成absolute，进行top随滚动的调整-----------------start--暂不需要
                    // var auchorTop = $(".section_footer").css("top");
                    // auchorTop = Number(auchorTop.substring(0, auchorTop.indexOf("p"))); //首先在监听器外部记录某id=anchor的标签的初始位置 
                    // var top = document.documentElement.scrollTop || document.body.scrollTop;
                    // var body_height = $('body').height();
                    // // console.log(auchorTop);
                    // // console.log(top);
                    // // console.log(body_height);
                    // $(".section_footer").css("bottom", "0px");
                    // window.onscroll = function(e) {
                    //     top = document.documentElement.scrollTop || document.body.scrollTop;
                    //     $(".section_footer").css("top", auchorTop + top + "px");
                    // };
                    //fixed更改成absolute，进行top随滚动的调整-------------------end
                }());
                //获取所有活动信息
                function get_activities() {
                    $.ajax({
                        url: '/prepaid/v1/api/b/stat/activities',
                        type: 'GET',
                        dataType: 'json',
                        data: {},
                        beforeSend: function() {
                            $('#loading').show();
                            $('.zheceng1').show();
                        },
                        success: function(data) {
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
                                var total_txamt = (return_data.total_pay_amt / 100).toFixed(0);
                                $('.js_all_person').text(return_data.user_num);
                                $('.js_all_money').text(total_txamt);
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
                        }
                    });
                }
                //获取活动信息
                function get_activity() {
                    $.ajax({
                        url: '/prepaid/v1/api/b/cur_activity',
                        type: 'GET',
                        dataType: 'json',
                        data: {},
                        beforeSend: function() {
                            $('#loading').show();
                            $('.zheceng').show();
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
                                var data_r = data.data.info;
                                //获取活动id--执行获取当前活动数据
                                var return_data_activity_id = data_r.activity_id;
                                $('.js_goto_nowhistory').attr('data-id', return_data_activity_id);
                                if (!return_data_activity_id) {
                                    //没有添加任何活动，返回都为空，则不执行下面事件
                                    $('.js_now_person').text('0');
                                    $('.js_now_money').text('0');
                                    //过期无效--显示 创建活动，显示没有穿件活动,隐藏活动修改停止按钮
                                    $('.js_date_activity').hide(); //隐藏时间
                                    $('.js_activity_detail').hide(); //隐藏活动详情
                                    $('.js_content_sub').show().css('display', 'inline-block');
                                    $('.js_content_sub_disa').hide();
                                    $('.js_loadpic_sub').hide();
                                    $('.js_ac_noac').removeClass('title_none').siblings('.js_ac_date').addClass('title_none');
                                    $('.js_ul_button').hide();
                                    $('.zheceng').hide();
                                    return false;
                                }
                                //获取当前活动人数 金额 规则
                                get_activitie_now(return_data_activity_id);
                                //获取备注
                                var return_data_desc = data_r.desc;
                                $('.js_title_normal').text('备注：' + return_data_desc);
                                //获取时间
                                var start_time = data_r.start_time;
                                var end_time = data_r.end_time;
                                var s_time = date_change.time_change(start_time);
                                var e_time = date_change.time_change2(start_time, end_time);
                                $('.js_start_time').text(s_time);
                                $('.js_end_time').text(e_time);
                                //验证是否过期
                                var return_expired = data_r.active;
                                if (return_expired == '1') {
                                    //未过期--显示下载物料
                                    $('.js_content_sub').hide();
                                    $('.js_content_sub_disa').hide();
                                    $('.js_loadpic_sub').show().css('display', 'inline-block');
                                    $('.js_ul_button').show();
                                } else {
                                    //过期无效--显示 创建活动，显示活动结束,隐藏活动修改停止按钮
                                    $('.js_content_sub').show().css('display', 'inline-block');
                                    $('.js_content_sub_disa').hide();
                                    $('.js_loadpic_sub').hide();
                                    $('.js_ac_dateend').removeClass('title_none').siblings('.js_ac_date').addClass('title_none');
                                    $('.js_ul_button').hide();
                                    $('.zheceng').hide();
                                    return false;
                                }
                                //活动是否开始判断
                                var count_day = data.data.countdown_day - 0;
                                var counting_day = data.data.countdown_end_day - 0;
                                // var now_t=new Date();//todo_需要服务器传值
                                // var start_t=start_time.substr(0,10).replace(/-/g, '/')+' 00:00:00';//更改样式，保证ie及相关浏览器兼容时间格式
                                // var cha_t=now_t-new Date(start_t);
                                if (count_day < 0) {
                                    $('.js_ac_dateend').removeClass('title_none').siblings('.js_ac_date').addClass('title_none');
                                } else if (count_day == 0) {
                                    //活动进行中
                                    $('.js_countdown_end').text(counting_day);
                                    $('.js_ac_dateing').removeClass('title_none').siblings('.js_ac_date').addClass('title_none');
                                } else {
                                    //活动未开始
                                    $('.js_countdown').text(count_day);
                                    $('.js_ac_dateno').removeClass('title_none').siblings('.js_ac_date').addClass('title_none');
                                }
                                $('.zheceng').hide();
                            }
                        },
                        error: function(data) {
                            $('#alert_alert').show();
                            $('.zheceng').show();
                            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                            $('#alert_alert .alert_con_br').html('网络超时!');
                        },
                        complete: function() {
                            $('#loading').hide();
                        }
                    });
                }
                //获取当前活动信息
                function get_activitie_now(activity_id) {
                    $.ajax({
                        url: '/prepaid/v1/api/b/stat/activity/' + activity_id,
                        type: 'GET',
                        dataType: 'json',
                        data: {},
                        beforeSend: function() {
                            $('#loading').show();
                            $('.zheceng2').show();
                        },
                        success: function(data) {
                            if (data.respcd != '0000') {
                                $('#alert_alert').show();
                                $('.zheceng2').show();
                                if (!data['respmsg']) {
                                    $('#alert_alert .alert_con_br').html(data['resperr']);
                                } else {
                                    $('#alert_alert .alert_con_br').html(data['respmsg']);
                                }
                            } else {
                                var return_data = data.data;
                                var total_txamt = (return_data.total_pay_amt / 100).toFixed(0);
                                $('.js_now_person').text(return_data.user_num);
                                $('.js_now_money').text(total_txamt);
                                //获取活动规则
                                var ac_detail = return_data.details;
                                $(ac_detail).each(function(i, item) {
                                    var now_user_num = ac_detail[i].user_num;
                                    var now_title = ac_detail[i].title;
                                    var li_detail = '<li><span class="fr"><i class="i_normal">' + now_user_num + '人</i>已购买</span>' + now_title + '</li>';
                                    $(".js_ul_detail").append(li_detail);
                                });
                                js_h = Math.ceil($('.js_toogle_detail').height());
                                scroll_down.scrolldown_data.body_height = $('body').height();
                                //console.log(scroll_down.scrolldown_data.body_height); 
                                $('.zheceng2').hide();
                                //判断动画是否出现
                                donghua_if(activity_id);
                            }
                        },
                        error: function(data) {
                            $('#alert_alert').show();
                            $('.zheceng2').show();
                            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                            $('#alert_alert .alert_con_br').html('网络超时!');
                        },
                        complete: function() {
                            $('#loading').hide();
                        }
                    });
                }
                //停止活动信息
                function stop_activity() {
                    $.ajax({
                        url: '/prepaid/v1/api/b/activity/stop',
                        type: 'POST',
                        dataType: 'json',
                        data: {},
                        beforeSend: function() {
                            $('#loading').show();
                            $('.zheceng1').show();
                        },
                        success: function(data) {
                            if (data.respcd != '0000') {
                                $('#alert_alert').show();
                                $('.zheceng1').show();
                                if (!data['respmsg']) {
                                    $('#alert_alert .alert_con_br').html(data['resperr']);
                                } else {
                                    $('#alert_alert .alert_con_br').html(data['respmsg']);
                                }
                            } else {
                                //停止活动--显示 创建活动，显示活动结束,隐藏活动修改停止按钮
                                $('.js_content_sub').show().css('display', 'inline-block');
                                $('.js_content_sub_disa').hide();
                                $('.js_loadpic_sub').hide();
                                $('.js_ac_dateend').removeClass('title_none').siblings('.js_ac_date').addClass('title_none');
                                $('.js_ul_button').hide();
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
                        }
                    });
                }
                //判断动画是否出现
                function donghua_if(activity_id) {
                    $.ajax({
                        url: '/prepaid/v1/api/b/guide',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            'guide_type': 1,
                            'activity_id': activity_id
                        },
                        beforeSend: function() {
                            $('#loading').show();
                            $('.zheceng').show();
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
                                //停止活动--显示 创建活动，显示活动结束,隐藏活动修改停止按钮
                                var return_data = data.data;
                                var show = return_data.show;
                                if (show == '1') {
                                    // if (typeof QFPAY !== "undefined") {
                                    //     QFPAY.call('openUri', {
                                    //         uri: 'hjsh://ppay/guide'
                                    //     }, function(cb) {
                                    //         console.log(cb.ret)
                                    //     })
                                    // }
                                    var url_data = { uri: 'hjsh://ppay/guide' };
                                    native.openUri(url_data, function(cb) {
                                        console.log(cb.ret);
                                    });
                                    //发送已调用动画
                                    donghua_off(activity_id);
                                }
                                $('.zheceng').hide();
                            }
                        },
                        error: function(data) {
                            $('#alert_alert').show();
                            $('.zheceng').show();
                            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                            $('#alert_alert .alert_con_br').html('网络超时!');
                        },
                        complete: function() {
                            $('#loading').hide();
                        }
                    });
                }
                //发送已调用动画
                function donghua_off(activity_id) {
                    $.ajax({
                        url: '/prepaid/v1/api/b/guide',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            'guide_type': 1,
                            'activity_id': activity_id
                        },
                        beforeSend: function() {
                            $('#loading').show();
                            $('.zheceng1').show();
                        },
                        success: function(data) {
                            if (data.respcd != '0000') {
                                $('#alert_alert').show();
                                $('.zheceng1').show();
                                if (!data['respmsg']) {
                                    $('#alert_alert .alert_con_br').html(data['resperr']);
                                } else {
                                    $('#alert_alert .alert_con_br').html(data['respmsg']);
                                }
                            } else {

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
                        }
                    });
                }
                //关闭弹框
                close_tip.close_tip();
                //倒计时 --start 
                var start_time = '2016-11-23 09:00:00'.substr(0, 10).replace(/-/g, '/') + ' 00:00:00'; //更改样式，保证ie及相关浏览器兼容时间格式
                var start_date = new Date(start_time);
                var sys_time = '2016-11-21 12:00:00'.replace(/-/g, '/');
                var now_time = new Date(sys_time); //服务器当前时间  
                var timer_rt = null;

                GetRTime();

                function GetRTime() {
                    //计算距离开始天数
                    var t = start_date - now_time;
                    var nD = Math.ceil(t / (1000 * 60 * 60 * 24));
                    //document.getElementsByClassName('js_countdown').innerHTML=nD;
                    $(".js_countdown").text(nD);
                    console.log(t + '---' + nD);
                    //计算距离今天结束剩余时间                
                    var year = now_time.getFullYear();
                    var month = now_time.getMonth() + 1;
                    var day = now_time.getDate();
                    var today = year + '/' + month + '/' + day + ' 23:59:59';
                    var tomorrow = year + '/' + month + '/' + (day + 1) + ' 00:00:00';
                    var today_end = new Date(today) - now_time;
                    console.log(today + '-----' + today_end);
                    console.log(new Date(tomorrow));

                    if (t <= 0) {
                        clearTimeout(timer_rt);
                    } else {
                        now_time = new Date(tomorrow);
                        timer_rt = window.setTimeout(GetRTime, today_end);
                    }
                }

                function native_callback() {
                    console.log();
                }

            })
        })
    })
    //调用菜单
    // if (typeof QFPAY !== "undefined") {  
    //     QFPAY.call('setNavMenu', {
    //         menus: [{
    //             type: 'uri',
    //             uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/transactions/consume.html',
    //             icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_mingxi.png',
    //             title: '储值消费',
    //         },{
    //             type: 'uri',
    //             uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/activity_history.html',
    //             icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_history.png',
    //             title: '历史活动',
    //         },{
    //             type: 'uri',
    //             uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/user_guide.html',
    //             icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_jiaocheng.png',
    //             title: '储值教程',
    //         }],
    //         buttons: [

//         ]
//     }, function(cb) {
//         console.log(cb.ret)
//     })
// }
// if (typeof QFPAY !== "undefined") {  
//     QFPAY.call('setNavMenu', {
//         menus: [{
//             type: 'uri',
//             uri: 'http://192.168.0.7:37013/prepaid/v1/page/b/transactions/consume.html',
//             icon: 'http://192.168.0.7:37013/prepaid/v1/static/new/img/ic_mingxi.png',
//             title: '储值消费',
//         },{
//             type: 'uri',
//             uri: 'http://192.168.0.7:37013/prepaid/v1/page/b/activity_history.html',
//             icon: 'http://192.168.0.7:37013/prepaid/v1/static/new/img/ic_history.png',
//             title: '历史活动',
//         },{
//             type: 'uri',
//             uri: 'http://192.168.0.7:37013/prepaid/v1/page/b/user_guide.html',
//             icon:  'http://192.168.0.7:37013/prepaid/v1/static/new/img/ic_jiaocheng.png',
//             title: '储值教程',
//         }],
//         buttons: [

//         ]
//     }, function(cb) {
//         console.log(cb.ret)
//     })
// }
