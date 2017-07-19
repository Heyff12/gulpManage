"use strict";

require(['../require-config2'], function () {
    require(["zepto", "yanzheng", "ajax_rule", "scroll_more", "if_menu"], function ($, yanzheng, ajax_rule, scroll_more, if_menu) {
        $(function () {
            //点击会员列表
            function memberto(obj) {
                _hmt.push(['_trackEvent', 'member', 'click', 'member_detail']);
                var c = $(obj).attr('data-c');
                var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/members/detail.html?c=' + c;
                if_menu.goto_url(url_val);
            };
            //判断 处置活动首页显示右上角导航
            if_menu.if_menu();
            //滚动加载---------------------------------------------------------------   
            var b = 1,
                //测试专用--变更加载数据
            times_add = 0; //测试专用--控制停止加载数据判断依据  
            //添加图标和没有更多文字提示
            scroll_more.add_load_img('.js_member_list');
            var demo = new Vue({
                el: '.js_member_detail',
                data: {
                    searchkey: '',
                    members_all: '',
                    members: '',
                    members_count: 10,
                    members_pos: 10,
                    apiUrl: 'http://192.168.0.7:37013/prepaid/v1/api/b/members',
                    getdata: {
                        pos: 0,
                        count: 10000
                    }
                },
                mounted: function mounted() {
                    this.get_members(); //获取网络全部数据数据
                    scroll_more.scroll_more(this.get_moredata);
                },
                updated: function updated() {
                    scroll_more.scroll_data.body_height = Math.floor($('body').height()).toFixed(0);
                    console.log('AJAX:body_height==' + scroll_more.scroll_data.body_height);
                },
                methods: {
                    member_ser: function member_ser(members) {
                        var key = this.searchkey;
                        if (members.length <= 0) {
                            return false;
                        } else {
                            return members.filter(function (member) {
                                return member.name.indexOf(key) != '-1' || member.mobile.indexOf(key) != '-1';
                            });
                        }
                    },
                    get_members: function get_members() {
                        var vm = this;
                        // this.$http.get(this.apiUrl, {
                        //         before: function() {
                        //             $('#loading').show();
                        //             $('.zheceng').show();
                        //         }
                        //     })
                        //     .then(function(response) {
                        //         $('#loading').hide();
                        //         $('.zheceng').hide();
                        //         var data_return = JSON.parse(response.data)
                        //         if (data_return.respcd == '0000') {
                        //             vm.members_all = data_return.data;
                        //             console.log(vm.members_all.length);
                        //             if (vm.members_all.length == 0) {
                        //                 $('.js_li_none').show();
                        //                 $('.js_member_detail').hide();
                        //                 return false;
                        //             }
                        //             $('.js_li_none').hide();
                        //             $('.js_member_detail').show();
                        //             vm.members = vm.members_all.slice(0, vm.members_pos);
                        //             if (vm.members_all.length - vm.members_pos <= 0) {
                        //                 scroll_more.nomoredata_show();
                        //                 window.setTimeout(scroll_more.nomoredata_hide, 2000);
                        //                 scroll_more.scroll_data.nomor_show = false;
                        //                 scroll_more.scroll_data.scroll_if = false;
                        //             } else {
                        //                 vm.members_pos += vm.members_count;
                        //                 scroll_more.scroll_data.scroll_if = true;
                        //             }
                        //             scroll_more.scroll_data.body_height = Math.floor($('body').height()).toFixed(0);
                        //             $('.load').hide();
                        //             console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                        //             console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                        //         } else {
                        //             $('#alert_alert').show();
                        //             $('.zheceng').show();
                        //             if (data_return.respmsg) {
                        //                 $('#alert_alert .alert_con_br').html(data_return.respmsg);
                        //             } else {
                        //                 $('#alert_alert .alert_con_br').html(data_return.resperr);
                        //             }
                        //         }
                        //     }, function(response) {
                        //         $('#loading').hide();
                        //         $('#alert_alert').show();
                        //         $('.zheceng').show();
                        //         $('#alert_alert .alert_con_br').html('网络超时!');
                        //     })
                        //     .catch(function(response) {
                        //         $('#loading').hide();
                        //         $('.zheceng').hide();
                        //         console.log(response)
                        //     });
                        var aaa = [{
                            name: '韩梅梅',
                            tel: '12345678909',
                            tiems: 3,
                            prize: 30,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 1
                        }, {
                            name: '李磊',
                            tel: '15555255555',
                            tiems: 1,
                            prize: 300,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 2
                        }, {
                            name: '李春丽',
                            tel: '1666665666',
                            tiems: 5,
                            prize: 8000,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 3
                        }, {
                            name: '韩青山',
                            tel: '1999659999',
                            tiems: 3,
                            prize: 308,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 4
                        }, {
                            name: '李流水',
                            tel: '16688998888',
                            tiems: 8,
                            prize: 1256,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 5
                        }, {
                            name: '韩梅梅',
                            tel: '12345678909',
                            tiems: 3,
                            prize: 30,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 1
                        }, {
                            name: '李磊',
                            tel: '15555255555',
                            tiems: 1,
                            prize: 300,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 2
                        }, {
                            name: '李春丽',
                            tel: '1666665666',
                            tiems: 5,
                            prize: 8000,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 3
                        }, {
                            name: '韩青山',
                            tel: '1999659999',
                            tiems: 3,
                            prize: 308,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 4
                        }, {
                            name: '李流水',
                            tel: '16688998888',
                            tiems: 8,
                            prize: 1256,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 5
                        }, {
                            name: '韩梅梅',
                            tel: '12345678909',
                            tiems: 3,
                            prize: 30,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 1
                        }, {
                            name: '李磊',
                            tel: '15555255555',
                            tiems: 1,
                            prize: 300,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 2
                        }, {
                            name: '李春丽',
                            tel: '1666665666',
                            tiems: 5,
                            prize: 8000,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 3
                        }, {
                            name: '韩青山',
                            tel: '1999659999',
                            tiems: 3,
                            prize: 308,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 4
                        }, {
                            name: '李流水',
                            tel: '16688998888',
                            tiems: 8,
                            prize: 1256,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 5
                        }, {
                            name: '韩梅梅',
                            tel: '12345678909',
                            tiems: 3,
                            prize: 30,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 1
                        }, {
                            name: '李磊',
                            tel: '15555255555',
                            tiems: 1,
                            prize: 300,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 2
                        }, {
                            name: '李春丽',
                            tel: '1666665666',
                            tiems: 5,
                            prize: 8000,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 3
                        }, {
                            name: '韩青山',
                            tel: '1999659999',
                            tiems: 3,
                            prize: 308,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 4
                        }, {
                            name: '李流水',
                            tel: '16688998888',
                            tiems: 8,
                            prize: 1256,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 5
                        }, {
                            name: '韩梅梅',
                            tel: '12345678909',
                            tiems: 3,
                            prize: 30,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 1
                        }, {
                            name: '李磊',
                            tel: '15555255555',
                            tiems: 1,
                            prize: 300,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 2
                        }, {
                            name: '李春丽',
                            tel: '1666665666',
                            tiems: 5,
                            prize: 8000,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 3
                        }, {
                            name: '韩青山',
                            tel: '1999659999',
                            tiems: 3,
                            prize: 308,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 4
                        }, {
                            name: '李流水',
                            tel: '16688998888',
                            tiems: 8,
                            prize: 1256,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 5
                        }, {
                            name: '韩梅梅',
                            tel: '12345678909',
                            tiems: 3,
                            prize: 30,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 1
                        }, {
                            name: '李磊',
                            tel: '15555255555',
                            tiems: 1,
                            prize: 300,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 2
                        }, {
                            name: '李春丽',
                            tel: '1666665666',
                            tiems: 5,
                            prize: 8000,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 3
                        }, {
                            name: '韩青山',
                            tel: '1999659999',
                            tiems: 3,
                            prize: 308,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 4
                        }, {
                            name: '李流水',
                            tel: '16688998888',
                            tiems: 8,
                            prize: 1256,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 5
                        }, {
                            name: '韩梅梅',
                            tel: '12345678909',
                            tiems: 3,
                            prize: 30,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 1
                        }, {
                            name: '李磊',
                            tel: '15555255555',
                            tiems: 1,
                            prize: 300,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 2
                        }, {
                            name: '李春丽',
                            tel: '1666665666',
                            tiems: 5,
                            prize: 8000,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 3
                        }, {
                            name: '韩青山',
                            tel: '1999659999',
                            tiems: 3,
                            prize: 308,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 4
                        }, {
                            name: '李流水',
                            tel: '16688998888',
                            tiems: 8,
                            prize: 1256,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 5
                        }, {
                            name: '韩梅梅',
                            tel: '12345678909',
                            tiems: 3,
                            prize: 30,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 1
                        }, {
                            name: '李磊',
                            tel: '15555255555',
                            tiems: 1,
                            prize: 300,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 2
                        }, {
                            name: '李春丽',
                            tel: '1666665666',
                            tiems: 5,
                            prize: 8000,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 3
                        }, {
                            name: '韩青山',
                            tel: '1999659999',
                            tiems: 3,
                            prize: 308,
                            img: '../../../static_dest/static/new/img/ic_shop_round@3x.png',
                            id: 4
                        }, {
                            name: '李流水',
                            tel: '16688998888',
                            tiems: 8,
                            prize: 1256,
                            img: '../../../static_dest/static/new/img/wxchar.png',
                            id: 5
                        }];
                        this.members_all = aaa;
                        console.log(this.members_all.length);
                        if (this.members_all.length == 0) {
                            $('.js_li_none').show();
                            $('.js_member_detail').hide();
                            return false;
                        }
                        $('.js_li_none').hide();
                        $('.js_member_detail').show();
                        this.members = this.members_all.slice(0, this.members_pos);
                        if (this.members_all.length - this.members_pos <= 0) {
                            scroll_more.nomoredata_show();
                            window.setTimeout(scroll_more.nomoredata_hide, 2000);
                            scroll_more.scroll_data.nomor_show = false;
                            scroll_more.scroll_data.scroll_if = false;
                        } else {
                            this.members_pos += this.members_count;
                            scroll_more.scroll_data.scroll_if = true;
                        }
                        scroll_more.scroll_data.body_height = Math.floor($('body').height()).toFixed(0);
                        $('.load').hide();
                        console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                        console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                    },
                    get_moredata: function get_moredata() {
                        this.members = this.members_all.slice(0, this.members_pos);
                        console.log(this.members.length);
                        if (this.members_all.length - this.members_pos <= 0) {
                            scroll_more.nomoredata_show();
                            window.setTimeout(scroll_more.nomoredata_hide, 2000);
                            scroll_more.scroll_data.nomor_show = false;
                            scroll_more.scroll_data.scroll_if = false;
                        } else {
                            this.members_pos += this.members_count;
                            scroll_more.scroll_data.scroll_if = true;
                        }
                        $('.load').hide();
                        console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                        console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                    }
                }
            });
            //默认执行--测试专用  
            console.log(demo);
            //scroll_more.scroll_more(append_ul);
            //活动储值详情----------------------------------------------------------------------------------------------------------------------------------------------------
            $('.js_member_list').get(0) && ~function () {
                $(document).ready(function () {
                    //获取会员列表todo-show
                    //get_rechargeli();
                    //append_ul();
                });
            }();
            //测试
            function append_ul() {
                var con_list = '<li><dl><dt><img src="../../../bin/static/img/wxchar.png"></dt><dd>韩梅梅</dd><dd class="grey"><i class="icon_tel"></i>13189569856</dd><dd class="grey">储值<span class="orange">2次</span></dd><div class="clearfix"></div></dl><p><span class="grey">余额</span><br/><span class="orange">￥<i class="i_normal">35.26</i></span></p></li>';
                var con_list1 = '<li><dl><dt><img src="../../../bin/static/img/ic_shop_round@3x.png"></dt><dd>韩梅梅</dd><dd class="grey"><i class="icon_tel"></i>13189569856</dd><dd class="grey">储值<span class="orange">2次</span></dd><div class="clearfix"></div></dl><p><span class="grey">余额</span><br/><span class="orange">￥<i class="i_normal">35.26</i></span></p></li>';

                var list;
                if (b == '1') {
                    list = con_list1;
                    b = 0;
                } else {
                    list = con_list;
                    b = 1;
                }
                //判断终止添加数据
                times_add++;
                if (times_add > 3) {
                    $('.load').hide();
                    //最后添加的数据
                    var last_len = 5;
                    for (var i = 0; i < last_len; i++) {
                        $('.js_ul_members').append(list);
                    }
                    scroll_more.scroll_data.body_height = Math.floor($('body').height()).toFixed(0);
                    if (last_len <= 0) {
                        scroll_more.nomoredata_show();
                        window.setTimeout(scroll_more.nomoredata_hide, 2000);
                        scroll_more.scroll_data.nomor_show = false;
                    } else {
                        scroll_more.scroll_data.nomor_show = true;
                    }
                    scroll_more.scroll_data.scroll_if = false;
                    console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                    console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                    return false;
                }
                //正常添加数据
                for (var i = 0; i < 20; i++) {
                    $('.js_ul_members').append(list);
                }
                $('.load').hide();
                scroll_more.scroll_data.scroll_if = true;
                scroll_more.scroll_data.body_height = Math.floor($('body').height()).toFixed(0);
                console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                // console.log(body_height); 
            }
            //获取会员列表
            function get_rechargeli() {
                var data = {
                    'pos': $('#js_pos').val(),
                    'count': 20
                };
                ajax_rule.ajax_rule('/prepaid/v1/api/b/members', 'GET', 'json', data, '.zheceng', get_list);
            }
            //获取会员列表成功函数
            function get_list(return_data) {
                if ($('#js_pos').val() == '0' && return_data.length == 0) {
                    $('.js_li_none').show();
                    $('.js_member_detail').hide();
                    $('.zheceng').hide();
                    $('.load').hide();
                    return false;
                }
                $('.js_li_none').hide();
                $('.js_member_detail').show();
                $(return_data).each(function (i, item) {
                    var cz_avatar = return_data[i].avatar;
                    var cz_recharge_times = return_data[i].recharge_times;
                    var cz_mobile = return_data[i].mobile;
                    var cz_name = return_data[i].name;
                    var cz_balance = (return_data[i].balance / 100).toFixed(2);
                    var cz_c = return_data[i].c;
                    var li_detail = '<li data-c="' + cz_c + '" onclick="memberto(this)"><dl><dt><img src="' + cz_avatar + '"></dt><dd>' + cz_name + '</dd><dd class="grey"><i class="icon_tel"></i>' + cz_mobile + '</dd><dd class="grey">储值<span class="orange">' + cz_recharge_times + '次</span></dd><div class="clearfix"></div></dl><p><span class="grey">余额</span><br/><span class="orange">￥<i class="i_normal">' + cz_balance + '</i></span></p></li>';
                    $(".js_ul_members").append(li_detail);
                });
                var pos_val = $('#js_pos').val() - 0;
                if (return_data.length < 20) {
                    if (return_data.length > 0) {
                        scroll_more.scroll_data.nomor_show = true;
                    } else {
                        scroll_more.nomoredata_show();
                        window.setTimeout(scroll_more.nomoredata_hide, 2000);
                        scroll_more.scroll_data.nomor_show = false;
                    }
                    scroll_more.scroll_data.scroll_if = false;
                } else {
                    pos_val += 20;
                    $('#js_pos').val(pos_val);
                    scroll_more.scroll_data.scroll_if = true;
                }
                scroll_more.scroll_data.body_height = $('body').height();
            }
        });
    });
});