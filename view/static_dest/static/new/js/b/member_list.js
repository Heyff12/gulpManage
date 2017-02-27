//点击会员列表
function memberto(obj) {
    _hmt.push(['_trackEvent', 'member', 'click', 'member_detail']);
    var c = $(obj).attr('data-c');
    var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/members/detail.html?c=' + c;
    location.href = url_val;
};
require(['../require-config2'], function() {
    require(["zepto", "yanzheng", "ajax_rule", "scroll_more"], function($, yanzheng, ajax_rule, scroll_more) {
        $(function() {
            //设置菜单空---取消了native的引用
            // var menu_data = { menus: [] };
            // native.setNavMenu(menu_data, function(cb) {
            //     console.log(cb.ret);
            // });
            //添加图标和没有更多文字提示
            scroll_more.add_load_img('.js_member_list');
            //滚动加载-----会员信息----------------------------------------------------------
            var demo = new Vue({
                el: '.js_member_detail',
                data: {
                    searchkey: '',
                    members_all: '',
                    members: '',
                    members_count: 10,
                    members_pos: 10,
                    apiUrl: location.protocol + '//' + location.host + '/prepaid/v1/api/b/members',
                    getdata: {
                        pos: 0,
                        count: 10000,
                    },
                },
                mounted: function() {
                    this.get_members(); //获取网络全部数据数据
                    scroll_more.scroll_more(this.get_moredata);
                },
                updated: function() {
                    scroll_more.scroll_data.body_height = Math.floor($('body').height()).toFixed(0);
                    console.log('AJAX:body_height==' + scroll_more.scroll_data.body_height);
                },
                methods: {
                    member_ser: function(members) {
                        var key = this.searchkey;
                        if (members.length <= 0) {
                            return false;
                        } else {
                            return members.filter(function(member) {
                                return member.name.indexOf(key) != '-1' || member.mobile.indexOf(key) != '-1';
                            })
                        }
                    },
                    get_members: function() {
                        var vm = this;
                        this.$http.get(this.apiUrl, {
                                before: function() {
                                    $('#load_small_bg').show();
                                }
                            })
                            .then(function(response) {
                                $('#load_small_bg').hide();
                                var data_return = JSON.parse(response.data)
                                if (data_return.respcd == '0000') {
                                    vm.members_all = data_return.data;
                                    //console.log(vm.members_all.length);
                                    if (vm.members_all.length == 0) {
                                        $('.js_li_none').show();
                                        $('.js_member_detail').hide();
                                        return false;
                                    }
                                    $('.js_li_none').hide();
                                    $('.js_member_detail').show();
                                    vm.members = vm.members_all.slice(0, vm.members_pos);
                                    if (vm.members_all.length - vm.members_pos <= 0) {
                                        scroll_more.nomoredata_show();
                                        window.setTimeout(scroll_more.nomoredata_hide, 2000);
                                        scroll_more.scroll_data.nomor_show = false;
                                        scroll_more.scroll_data.scroll_if = false;
                                    } else {
                                        vm.members_pos += vm.members_count;
                                        scroll_more.scroll_data.scroll_if = true;
                                    }
                                    scroll_more.scroll_data.body_height = Math.floor($('body').height()).toFixed(0);
                                    $('.load').hide();
                                    //console.log('AJAX:scroll_if==' + scroll_more.scroll_data.scroll_if);
                                    //console.log('AJAX:nomor_show==' + scroll_more.scroll_data.nomor_show);
                                } else {
                                    $('#alert_alert').show();
                                    $('.zheceng').show();
                                    if (data_return.respmsg) {
                                        $('#alert_alert .alert_con_br').html(data_return.respmsg);
                                    } else {
                                        $('#alert_alert .alert_con_br').html(data_return.resperr);
                                    }
                                }
                            }, function(response) {
                                $('#load_small_bg').hide();
                                $('#alert_alert').show();
                                $('.zheceng').show();
                                $('#alert_alert .alert_con_br').html('网络超时!');
                            })
                            .catch(function(response) {
                                $('#load_small_bg').hide();
                                //console.log(response)
                            });
                    },
                    get_moredata: function() {
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
                    },
                }
            })
        })
    })
})
