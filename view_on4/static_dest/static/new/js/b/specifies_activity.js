"use strict";

require(['../require-config2'], function () {
    require(["zepto", "ajax_rule", "scroll_more", "date_change", "if_menu"], function ($, ajax_rule, scroll_more, date_change, if_menu) {
        $(function () {

            var dataManager = {
                'dataSource': [],
                'displayDatas': [],
                'searchDatas': [],
                'canLoadMoer': false
            };
            var dataCount = 10;
            $(document).ready(function () {
                $('.js_searchbox').on('input', function (value) {
                    var value = $('.js_searchbox').val();
                    if (value.length > 0) {
                        filterData(value);
                    } else {
                        creatCell(dataManager.displayDatas);
                        setLoadMoerState();
                    }
                });
                //获取信息--todo
                scroll_more.add_load_img('.js_member_list');
                scroll_more.scroll_more(loadMoerAction);
                requestActivityMemenberList();
            });
            /*************************************** private func **************************************/
            function requestActivityMemenberList() {
                var data = {
                    'pos': 0,
                    'count': 999
                };
                var activityId = getQueryParamString('activity_id');
                if (activityId) {
                    data.activity_id = activityId;
                }
                ajax_rule.ajax_rule('/prepaid/v1/api/b/members', 'GET', 'json', data, '.zheceng', requestSuccess);
            }

            function requestSuccess(data) {
                if (!data || data.length < 1) {
                    $('.js_li_none').show();
                } else {
                    $('.js_li_none').hide();
                }
                dataManager.dataSource = data;
                reloadDisplayDatas(false);
                creatCell(dataManager.displayDatas);
                setLoadMoerState();
            }

            function loadMoerAction() {
                reloadDisplayDatas(true);
                creatCell(dataManager.displayDatas);
                $('.load').hide();
                setLoadMoerState();
            }

            function filterData(key) {
                scroll_more.scroll_data.body_height = $('body').height() + 1;
                dataManager.searchDatas.splice(0, dataManager.searchDatas.length);
                var reg = new RegExp(key);
                $.each(dataManager.dataSource, function (idx, val) {
                    if (reg.test(val.mobile) || reg.test(val.name)) {
                        dataManager.searchDatas.push(val);
                    }
                });
                creatCell(dataManager.searchDatas);
            }

            //创建cell
            function creatCell(displayDatas) {
                $('.ul_history').empty();
                $.each(displayDatas, function (idx, val) {
                    var cid = val.c;
                    var header_img_url = val.avatar;
                    var mobile = val.mobile;
                    var name = val.name;
                    var times = val.recharge_times + '次';
                    var amount = parseFloat(val.recharge_amt / 100.0).toFixed(2);
                    var balance = parseFloat(val.balance / 100.0).toFixed(2);
                    var cell = '<li class="js_cell"' + ' user_c=' + '"' + val.c + '"' + '><dl><dt><img src=' + '"' + header_img_url + '"' + '></dt><dd>' + name + '</dd><dd class="grey"><i class="icon_tel"></i>' + mobile + '</dd><dd class="grey">储值 <span class="orange">' + times + '</span></dd><div class="clearfix"></div></dl><p><span class="grey">余额</span><br/><span class="orange">￥<i class="i_normal">' + balance + '</i></span></p></li>';
                    $('.ul_history').append(cell);
                });
                $('.js_cell').on('click', function () {
                    var c = $(this).attr('user_c');
                    if (c) {
                        var url_val = location.protocol + '//' + location.host + '/prepaid/v1/page/b/members/detail.html?c=' + c;
                        if_menu.goto_url(url_val);
                    }
                });
            }

            //显示加载更多
            function setLoadMoerState() {
                if (dataManager.canLoadMoer) {
                    scroll_more.scroll_data.scroll_if = true;
                } else {
                    if (dataManager.displayDatas.length > 0) {
                        scroll_more.scroll_data.nomor_show = true;
                    } else {
                        scroll_more.nomoredata_show();
                        window.setTimeout(scroll_more.nomoredata_hide, 2000);
                        scroll_more.scroll_data.nomor_show = false;
                    }
                    scroll_more.scroll_data.scroll_if = false;
                }
                scroll_more.scroll_data.body_height = $('body').height() - 1;
            }

            //更新显示数据源
            function reloadDisplayDatas(isLoadMoer) {
                if (!isLoadMoer) {
                    if (dataManager.dataSource.length < dataCount) {
                        $.each(dataManager.dataSource, function (idx, val) {
                            dataManager.displayDatas.push(val);
                        });
                    } else {
                        dataManager.canLoadMoer = true;
                        $.each(dataManager.dataSource, function (idx, val) {
                            if (idx < dataCount) {
                                dataManager.displayDatas.push(val);
                            }
                        });
                    }
                } else {
                    //上拉加载
                    var currentCounts = dataManager.displayDatas.length;
                    $.each(dataManager.dataSource, function (idx, val) {
                        if (idx >= dataManager.displayDatas.length && idx < currentCounts + dataCount) {
                            dataManager.displayDatas.push(val);
                        }
                    });
                    if (dataManager.displayDatas.length % dataCount != 0) {
                        //已经没有更多数据了
                        scroll_more.nomor_show = true;
                        dataManager.canLoadMoer = false;
                    } else {
                        scroll_more.nomor_show = false;
                        dataManager.canLoadMoer = true;
                    }
                }
            }

            //获取查询参数
            function getQueryParamString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
        });
    });
});