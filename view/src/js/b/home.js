require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "yanzheng", "date_change", "scroll_more", "if_menu", "native"], function($, ajax_rule, yanzheng, date_change, scroll_more, if_menu, native) {
        $(function() {
            //添加图标和没有更多文字提示
            scroll_more.add_load_img('.section_action');
            var demo = new Vue({
                el: '#wap',
                data: {
                    stored: {
                        "user_num": 0, // 参与过储值活动的 总用户数
                        "total_txamt": 0, // 总充值金额
                        "total_pay_amt": 0, // 总支付金额
                        "total_balances": 0, // 总余额
                    },
                    membershome: [],
                    activities: [],
                    due_fee: 0,
                    action_ing: 1,
                    money_url: location.protocol + '//' + location.host + '/prepaid/v1/api/b/stat/activities',
                    member_url: location.protocol + '//' + location.host + '/prepaid/v1/api/b/members',
                    activity_url: location.protocol + '//' + location.host + '/prepaid/v1/api/b/activity_history',
                    due_url: location.protocol + '//' + location.host + '/prepaid/v1/api/service/info',
                    action_all: '',
                    action_count: 6,
                    action_pos: 6,
                },
                created: function() {
                    this.get_money(); //获取金额数据
                    this.get_member(); //获取会员
                    this.get_activity(); //获取活动列表
                    this.get_due(); //获取续费到期与否
                },
                mounted: function() {
                    scroll_more.scroll_more(this.get_moredata);
                },
                updated: function() {
                    scroll_more.scroll_data.body_height = Math.floor($('body').height()+90).toFixed(0);
                    console.log('AJAX:body_height==' + scroll_more.scroll_data.body_height);
                },
                methods: {
                    //进入全部会员页面
                    goto_members: function() {
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/members/index.html';
                        location.href = url_val;
                        // if_menu.goto_url(url_val);
                    },
                    //进入资料下载界面
                    goto_downpic: function() {
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/show_material.html';
                        location.href = url_val;
                        //if_menu.goto_url(url_val);
                    },
                    //进入活动详情查看界面
                    goto_scandetail: function(activity_id) {
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/activity_detail.html?activity_id=' + activity_id;
                        location.href = url_val;
                        //if_menu.goto_url(url_val);
                    },
                    //进入创建活动界面
                    goto_create_ac: function() {
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/create_activity.html';
                        location.href = url_val;
                        //if_menu.goto_url(url_val);
                    },
                    //进入立即续费界面
                    goto_renew: function() {
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/create_activity.html';
                        location.href = url_val;
                        //if_menu.goto_url(url_val);
                    },
                    //进入指定活动会员列表页
                    goto_now_members: function(activity_id) {
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/members/specifies-activity.html?activity_id=' + activity_id;
                        location.href = url_val;
                        //if_menu.goto_url(url_val);
                    },
                    //进入指定活动会员列表页
                    goto_now_money: function(activity_id) {
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/prepaid_amt_of_activity.html?activity_id=' + activity_id;
                        location.href = url_val;
                        //if_menu.goto_url(url_val);
                    },
                    //获取储值金额信息
                    get_money: function() {
                        var _this = this;
                        // ajax_rule.ajax_rule(_this.money_url, 'get', 'json', '', '.zheceng', function(data_return) {
                        //     _this.stored = data_return;
                        // });
                        _this.stored = {
                            "user_num": 100, // 参与过储值活动的 总用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 4988000, // 总支付金额
                            "total_balances": 99900, // 总余额
                        };
                    },
                    //获取会员
                    get_member: function() {
                        var _this = this;
                        var post_data = {
                            pos: 0,
                            count: 100000,
                            q: '',
                            activity_id: '',
                        };
                        // ajax_rule.ajax_rule(_this.member_url, 'get', 'json', '', '.zheceng1', function(data_return) {
                        //     if(data_return.length==0){
                        //         _this.membershome = [];
                        //     }else{
                        //         _this.membershome = data_return.slice(0,5);
                        //     }
                        // });
                        _this.membershome = [{
                            "c": "abGSv", // hash之后的cid
                            'avatar': "../../static_dest/static/new/img/headimg.png", // 会员头像的URL
                            'recharge_times': 10, // 在该商户下累计充值次数
                            'recharge_amt': 50000, // 该消费者在商户下累计充值的金额
                            'mobile': "13012349876", // 消费者首次在商户下使用储值时,填写的联系方式
                            'name': "昵称", //该消费的昵称, 通过customer获得
                            'balance': 500, // 该消费者当前余额
                        }, {
                            "c": "abGSv", // hash之后的cid
                            'avatar': "../../static_dest/static/new/img/headimg.png", // 会员头像的URL
                            'recharge_times': 10, // 在该商户下累计充值次数
                            'recharge_amt': 50000, // 该消费者在商户下累计充值的金额
                            'mobile': "13012349876", // 消费者首次在商户下使用储值时,填写的联系方式
                            'name': "昵称", //该消费的昵称, 通过customer获得
                            'balance': 500, // 该消费者当前余额
                        }, {
                            "c": "abGSv", // hash之后的cid
                            'avatar': "../../static_dest/static/new/img/headimg.png", // 会员头像的URL
                            'recharge_times': 10, // 在该商户下累计充值次数
                            'recharge_amt': 50000, // 该消费者在商户下累计充值的金额
                            'mobile': "13012349876", // 消费者首次在商户下使用储值时,填写的联系方式
                            'name': "昵称", //该消费的昵称, 通过customer获得
                            'balance': 500, // 该消费者当前余额
                        }];
                    },
                    //获取活动列表
                    get_activity: function() {
                        var _this = this;
                        var post_data = {
                            pos: 0,
                            count: 100000,
                        };
                        // ajax_rule.ajax_rule(_this.activity_url, 'get', 'json', post_data, '.zheceng1', function(data_return) {
                        //     _this.action_all = data_return;
                        //     _this.activities = _this.action_all.slice(0, _this.action_pos);
                        //     _this.action_ing = _this.activities[0].status;
                        //     //判断动画
                        //     if (_this.activities.length == 1) {
                        //         _this.donghua_if(_this.activities[0].activity_id);
                        //     }
                        //     if (_this.action_all.length - _this.action_pos <= 0) {
                        //         scroll_more.nomoredata_show();
                        //         window.setTimeout(scroll_more.nomoredata_hide, 2000);
                        //         scroll_more.scroll_data.nomor_show = false;
                        //         scroll_more.scroll_data.scroll_if = false;
                        //     } else {
                        //         _this.action_pos += _this.action_count;
                        //         scroll_more.scroll_data.scroll_if = true;
                        //     }
                        //     scroll_more.scroll_data.body_height = Math.floor($('body').height()+90).toFixed(0);
                        //     $('.load').hide();
                        //     //console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                        //     //console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                        // });
                        _this.action_all = [{
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2017-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 100, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 149000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 0, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }
                            ],
                        }, {
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 200, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 249000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 1, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 15 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 25 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 3, // 储值格位
                                    "title": "储值150元送15元", // 规则说明
                                    "prepaid_times": 53 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 4, // 储值各位
                                    "title": "储值200元送30元", // 规则说明
                                    "prepaid_times": 55 // 储值次数, 注意是次数
                                }
                            ],
                        }, {
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 300, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 349000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 2, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }
                            ],
                        }, {
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 400, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 449000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 3, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 15 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 25 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 3, // 储值格位
                                    "title": "储值150元送15元", // 规则说明
                                    "prepaid_times": 53 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 4, // 储值各位
                                    "title": "储值200元送30元", // 规则说明
                                    "prepaid_times": 55 // 储值次数, 注意是次数
                                }
                            ],
                        },{
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 300, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 349000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 2, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }
                            ],
                        }, {
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 400, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 449000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 3, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 15 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 25 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 3, // 储值格位
                                    "title": "储值150元送15元", // 规则说明
                                    "prepaid_times": 53 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 4, // 储值各位
                                    "title": "储值200元送30元", // 规则说明
                                    "prepaid_times": 55 // 储值次数, 注意是次数
                                }
                            ],
                        },{
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 300, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 349000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 2, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }
                            ],
                        }, {
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 400, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 449000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 3, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 15 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 25 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 3, // 储值格位
                                    "title": "储值150元送15元", // 规则说明
                                    "prepaid_times": 53 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 4, // 储值各位
                                    "title": "储值200元送30元", // 规则说明
                                    "prepaid_times": 55 // 储值次数, 注意是次数
                                }
                            ],
                        },{
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 300, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 349000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 2, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }
                            ],
                        }, {
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 400, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 449000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 3, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 15 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 25 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 3, // 储值格位
                                    "title": "储值150元送15元", // 规则说明
                                    "prepaid_times": 53 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 4, // 储值各位
                                    "title": "储值200元送30元", // 规则说明
                                    "prepaid_times": 55 // 储值次数, 注意是次数
                                }
                            ],
                        },{
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 300, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 349000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 2, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }
                            ],
                        }, {
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 400, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 449000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 3, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 15 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 25 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 3, // 储值格位
                                    "title": "储值150元送15元", // 规则说明
                                    "prepaid_times": 53 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 4, // 储值各位
                                    "title": "储值200元送30元", // 规则说明
                                    "prepaid_times": 55 // 储值次数, 注意是次数
                                }
                            ],
                        },{
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 300, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 349000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 2, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }
                            ],
                        }, {
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 400, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 449000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 3, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 15 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 25 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 3, // 储值格位
                                    "title": "储值150元送15元", // 规则说明
                                    "prepaid_times": 53 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 4, // 储值各位
                                    "title": "储值200元送30元", // 规则说明
                                    "prepaid_times": 55 // 储值次数, 注意是次数
                                }
                            ],
                        },{
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 300, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 349000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 2, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 5 // 储值次数, 注意是次数
                                }
                            ],
                        }, {
                            "start_time": "2016-09-22 11:22:33", // 活动开始时间
                            "end_time": "2016-10-23 22:22:22", // 活动结束时间
                            "activity_id": 1234, // 活动ID
                            "user_num": 400, // 参与当前活动的用户数
                            "total_txamt": 50000, // 总充值金额
                            "total_pay_amt": 449000, // 总支付金额
                            "countdown_day": 2, // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
                            "active": 1, // 活动是否有效. 1 有效, 0 无效(商户主动停止)
                            "status": 3, // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
                            "detail": [ // 按grid_index排序
                                {
                                    "grid_index": 1, // 储值格位
                                    "title": "储值50元送5元", // 规则说明
                                    "prepaid_times": 15 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 2, // 储值各位
                                    "title": "储值100元送10元", // 规则说明
                                    "prepaid_times": 25 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 3, // 储值格位
                                    "title": "储值150元送15元", // 规则说明
                                    "prepaid_times": 53 // 储值次数, 注意是次数
                                }, {
                                    "grid_index": 4, // 储值各位
                                    "title": "储值200元送30元", // 规则说明
                                    "prepaid_times": 55 // 储值次数, 注意是次数
                                }
                            ],
                        }];
                        _this.activities = _this.action_all.slice(0, _this.action_pos);
                        _this.action_ing = _this.activities[0].status;

                        if (_this.action_all.length - _this.action_pos <= 0) {
                            scroll_more.nomoredata_show();
                            window.setTimeout(scroll_more.nomoredata_hide, 2000);
                            scroll_more.scroll_data.nomor_show = false;
                            scroll_more.scroll_data.scroll_if = false;
                        } else {
                            _this.action_pos += _this.action_count;
                            scroll_more.scroll_data.scroll_if = true;
                        }
                        scroll_more.scroll_data.body_height = Math.floor($('body').height()+90).toFixed(0);
                        $('.load').hide();
                        console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                        console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                    },
                    //获取费用是否到期
                    get_due: function() {
                        var _this = this;
                        var post_data = {
                            h: yanzheng.get_hash('h'),
                        };
                        // ajax_rule.ajax_rule(_this.due_url, 'get', 'json', '', '.zheceng2', function(data_return) {
                        //     _this.due_fee = data_return.expired;
                        // });
                        _this.due_fee = 0;
                    },
                    //获取更多数据
                    get_moredata: function() {
                        this.activities = this.action_all.slice(0, this.action_pos);
                        console.log(this.activities.length);
                        if (this.action_all.length - this.action_pos <= 0) {
                            scroll_more.nomoredata_show();
                            window.setTimeout(scroll_more.nomoredata_hide, 2000);
                            scroll_more.scroll_data.nomor_show = false;
                            scroll_more.scroll_data.scroll_if = false;
                        } else {
                            this.action_pos += this.action_count;
                            scroll_more.scroll_data.scroll_if = true;
                        }
                        $('.load').hide();
                        console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                        console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                    },
                    //判断动画是否出现
                    donghua_if: function(activity_id) {
                        var _this = this;
                        var post_data = {
                            'guide_type': 1,
                            'activity_id': activity_id
                        };
                        ajax_rule.ajax_rule('/prepaid/v1/api/b/guide', 'get', 'json', post_data, '.zheceng2', function(data_return) {
                            var show = data_return.show;
                            if (show == '1') {
                                //发送已调用动画
                                _this.donghua_off(activity_id);
                            }
                        });
                    },
                    //发送已调用动画
                    donghua_off: function(activity_id) {
                        var _this = this;
                        var post_data = {
                            'guide_type': 1,
                            'activity_id': activity_id
                        };
                        ajax_rule.ajax_rule('/prepaid/v1/api/b/guide', 'POST', 'json', post_data, '.zheceng1');
                    },
                    //处理时间格式从2016-09-22 11:22:33到2016.9.18
                    datechange: function(time) {
                        var date_val = time.substr(0, 10);
                        var date_value = date_val.split('-');
                        var year = date_value[0];
                        var month = this.num_change(date_value[1]);
                        var day = this.num_change(date_value[2]);
                        var new_date = year + '.' + month + '.' + day;
                        return new_date;
                    },
                    //处理结束时间格式，如果time2和time1年份相同，则time2只返回月份和日期；否则返回完整的年月日
                    datechange2: function(time1, time2) {
                        var date_val1 = time1.substr(0, 10);
                        var date_val2 = time2.substr(0, 10);
                        var date_value1 = date_val1.split('-');
                        var date_value2 = date_val2.split('-');
                        var year1 = date_value1[0];
                        var year2 = date_value2[0];
                        var month = this.num_change(date_value2[1]);
                        var day = this.num_change(date_value2[2]);
                        var year;
                        if (year1 != year2) {
                            return year2 + '.' + month + '.' + day;
                        } else {
                            return month + '.' + day;
                        }
                    },
                    //处理日期1位数
                    num_change: function(num) {
                        if (num < 10) {
                            return num.substr(-1);
                        } else {
                            return num;
                        }
                    },
                }
            });
        })
    })
})
