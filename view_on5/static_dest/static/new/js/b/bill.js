"use strict";

require(['../require-config'], function () {
    require(["zepto", "ajax_rule", "scroll_more", "date_change"], function ($, ajax_rule, scroll_more, date_change) {
        $(function () {
            var dataCounts = 10;
            var currentSns = [];
            $(document).ready(function () {
                //获取信息--todo
                scroll_more.add_load_img('.js_member_list');
                scroll_more.scroll_more(transactionsRequest);
                transactionsRequest();
            });
            /*************************************** private func **************************************/
            function transactionsRequest() {
                var data = {
                    'pos': 0,
                    'count': dataCounts
                };
                var activityId = getQueryParamString('activity_id');
                var pos = $('.ul_history').attr('pos');
                data.pos = pos;
                if (activityId) {
                    data.activity_id = activityId;
                }
                ajax_rule.ajax_rule('/prepaid/v1/api/transactions', 'GET', 'json', data, '.zheceng', requestSuccess);
            }
            //请求成功
            function requestSuccess(datas) {
                if ((!datas || datas.length < 1) && parseInt($('.ul_history').attr('pos')) < dataCounts) {
                    $('.js_li_none').show();
                } else {
                    $('.js_li_none').hide();
                }
                console.log(currentSns);
                displayCell(datas);
                setLoadMoerStatus(datas);
            }
            //过滤数据
            function displayCell(datas) {
                $('.load').hide();
                var pos = parseInt($('.ul_history').attr('pos'));
                pos += datas.length;
                $('.ul_history').attr('pos', pos);
                $.each(datas, function (idx, val) {
                    //如果sn已经存在则过滤掉
                    var sn = val.biz_sn;
                    if (currentSns.indexOf(sn) == -1) {
                        var status = val.status;
                        //只显示交易成功的流水
                        if (status == 1) {
                            currentSns.push(sn);
                            var cell = creatCell(val);
                            $('.ul_history').append(cell);
                        }
                    }
                });
            }
            //创建cell
            function creatCell(dict) {
                var type = dict.biz_type;
                var name = dict.name;
                var date = dict.sysdtm;
                var header_url = dict.c_avatar;
                var title = type == 1 ? '储值' : '储值消费';
                title = type == 4 ? '手动储值' : title;
                var cell = '<li class="js_cell"><dl><dt><img src=' + '"' + header_url + '"' + '></dt><dd>' + title + '</dd><dd class="grey">' + name + '</dd><dd class="grey">' + date + '</dd><div class="clearfix"></div></dl>';
                var p;
                if (type == 1) {
                    //充值
                    var pay_amt = parseFloat(dict.pay_amt / 100.0).toFixed(2);
                    var present_amt = parseFloat(dict.present_amt / 100.0).toFixed(2);
                    cell += '<p><span class="orange">+' + pay_amt + '</span><br><span class="grey">赠送¥' + present_amt + '</span></p></li>';
                } else if (type == 2) {
                    //消费
                    var txamt = parseFloat(dict.txamt / 100.0).toFixed(2);
                    cell += '<p><span class="black">-' + txamt + '</span></p></li>';
                } else if (type == 4) {
                    //手动储值
                    var pay_amt = parseFloat(dict.pay_amt / 100.0).toFixed(2);
                    var present_amt = parseFloat(dict.present_amt / 100.0).toFixed(2);
                    if (present_amt > 0) {
                        //有赠送
                        cell += '<p><span class="orange">+' + pay_amt + '</span><br><span class="grey">赠送¥' + present_amt + '</span></p></li>';
                    } else {
                        //没有赠送
                        cell += '<p><span class="orange" style="line-height: 1.2rem">+' + pay_amt + '</span></p></li>';
                    }
                } else {
                    //撤销
                    var txamt = parseFloat(dict.txamt / 100.0).toFixed(2);
                    cell = '<li class="js_cell"><dl><dt><img src=' + '"' + header_url + '"' + '></dt><dd class="lightgrey">' + title + '</dd><dd class="lightgrey lightgrey_font">' + name + '</dd><dd class="lightgrey lightgrey_font">' + date + '</dd><div class="clearfix"></div></dl><p><span class="lightgrey">-' + txamt + '</span><br><span class="lightgrey">已撤销</span></p></li>';
                }
                return cell;
            }
            //检查是否可上拉加载更多
            function setLoadMoerStatus(datas) {
                if (datas.length == dataCounts) {
                    scroll_more.scroll_data.scroll_if = true;
                } else {
                    if (datas.length > 0) {
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