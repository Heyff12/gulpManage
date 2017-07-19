'use strict';

// require(['../require-config'], function() {
//         require(["native"], function(native) {
//             $(function() {
//                 //设置菜单空
//                 var menu_data = { menus: [] };
//                 native.setNavMenu(menu_data, function(cb) {
//                     console.log(cb.ret);
//                 });
//             })
//         })
//     })
/**
 * Created by liteng on 2016/11/14.
 */
require(['../require-config2'], function () {
    require(["zepto"], function ($) {
        $(function () {
            //model
            var itemController = function itemController(type) {
                this.type = type;
            };

            var RefreshManager = function RefreshManager(lastScrollY, loadMoer) {
                this.lastScrollY = lastScrollY;
                this.canLoadMoer = loadMoer;
                this.currentSNs = [];
                this.activity_id = getQueryString('activity_id');
                this.biz_type_l = getBizType();
                this.loading = false;
                this.canScroll = true;
                // this.loadDomain = 'http://192.168.0.7:7013';
            };

            var refreshManager = new RefreshManager(0, false);

            //event

            window.onscroll = function (e) {
                // var e =e || window.event;
                if (refreshManager.canScroll) {
                    var scrollScrrlY = document.documentElement.scrollTop || document.body.scrollTop;
                    var elementMaxY = getElementMaxY();
                    var scrrenH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                    var screenScrollMaxY = scrollScrrlY + scrrenH;
                    if (screenScrollMaxY > elementMaxY && scrollScrrlY > refreshManager.lastScrollY && refreshManager.canLoadMoer && !refreshManager.loading) {
                        refreshManager.canLoadMoer = false;
                        refreshManager.loading = true;
                        loadMoerAnimation();
                        window.setTimeout(function () {
                            requestCumulate('/prepaid/v1/api/transactions', refreshManager.currentSNs.length);
                        }, 3000);
                    } else if (screenScrollMaxY > elementMaxY && scrollScrrlY > refreshManager.lastScrollY && !refreshManager.canLoadMoer && !refreshManager.loading) {
                        $('.load').hide();
                        $("#nomoredata").animate({ opacity: 0.7 }, 500, 'ease-out');
                        window.setTimeout(nomoredata_hide, 2000);
                        refreshManager.canScroll = false;
                    }
                    refreshManager.lastScrollY = scrollScrrlY;
                }
            };

            if (refreshManager.biz_type_l === 1) {
                requestStatistics();
            }
            requestCumulate('/prepaid/v1/api/transactions', refreshManager.currentSNs.length);
            //private func

            //请求累计储值函数
            function requestCumulate(url, page) {
                var data = {
                    pos: page,
                    count: 20
                };
                if (refreshManager.activity_id != 0) {
                    data['activity_id'] = refreshManager.activity_id;
                }
                data['biz_type_l'] = refreshManager.biz_type_l;

                $.ajax({
                    type: 'GET',
                    url: url,
                    // data to be added to query string:
                    data: data,
                    // type of data we are expecting in return:
                    dataType: 'json',
                    beforeSend: function beforeSend() {
                        $('#load_small_bg').show();
                        //$('.zheceng1').show();
                    },
                    context: $('body'),
                    success: function success(respond) {
                        if (respond.respcd !== '0000') {
                            $('#alert_alert').show();
                            $('.zheceng1').show();
                            if (!respond['respmsg']) {
                                $('#alert_alert .alert_con_br').html(respond['resperr']);
                            } else {
                                $('#alert_alert .alert_con_br').html(respond['respmsg']);
                            }
                        } else {
                            parserRequestSuccessData(respond['data']);
                            //$('.zheceng1').hide();
                        }
                    },
                    error: function error(xhr, type) {
                        $('#alert_alert').show();
                        $('.zheceng1').show();
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function complete() {
                        storpLoadMoerAnimation();
                        refreshManager.loading = false;
                        $('#load_small_bg').hide();
                    }
                });
            }

            function requestStatistics() {
                var data = {};
                if (refreshManager.activity_id != 0) {
                    data['activity_id'] = refreshManager.activity_id;
                }
                $.ajax({
                    type: 'GET',
                    url: '/prepaid/v1/api/stat/recharge',
                    // data to be added to query string:
                    data: data,
                    dataType: 'json',
                    context: $('body'),
                    beforeSend: function beforeSend() {
                        $('#load_small_bg').show();
                        //$('.zheceng').show();
                    },
                    success: function success(respond) {
                        if (respond.respcd !== '0000') {
                            $('#alert_alert').show();
                            $('.zheceng').show();
                            if (!respond['respmsg']) {
                                $('#alert_alert .alert_con_br').html(respond['resperr']);
                            } else {
                                $('#alert_alert .alert_con_br').html(respond['respmsg']);
                            }
                        } else {
                            document.getElementsByClassName('js-storedValue')[0].innerText = parseInt(respond.data.pay_amt / 100) + '';
                            document.getElementsByClassName('js-presentValue')[0].innerText = '￥' + parseInt(respond.data.present_amt / 100);
                            //$('.zheceng').hide();
                        }
                    },
                    error: function error(xhr, type) {
                        $('#alert_alert').show();
                        $('.zheceng').show();
                        $('#alert_alert .alert_con_br').html('网络超时!');
                    },
                    complete: function complete() {
                        $('#load_small_bg').hide();
                    }
                });
            }

            //parser成功
            function parserRequestSuccessData(datas) {
                storpLoadMoerAnimation();
                for (var i = 0; i < datas.length; i++) {
                    var itemSource = datas[i];
                    if (refreshManager.currentSNs.indexOf(itemSource.biz_sn) === -1) {
                        refreshManager.currentSNs.push(itemSource.biz_sn);
                        var imgUrl = itemSource['c_avatar'];
                        var sysd = itemSource['sysdtm'];
                        var htmlItem;
                        if (refreshManager.biz_type_l === 1) {
                            var payAmt = parseInt(itemSource['pay_amt'] / 100);
                            var presentAmt = parseInt(itemSource['present_amt'] / 100);
                            htmlItem = createHTMLItem(false, imgUrl, '储值', payAmt, presentAmt, sysd);
                            var htmlPresentItem = createHTMLItem(true, imgUrl, '储值赠送', payAmt, presentAmt, sysd);
                            document.getElementById('content').appendChild(htmlPresentItem);
                        } else {
                            htmlItem = createHTMLItem(false, imgUrl, '储值消费', itemSource['txamt'] / 100, 0, sysd);
                        }
                        document.getElementById('content').appendChild(htmlItem);
                    }
                }
                refreshManager.canLoadMoer = datas.length >= 20;
            }

            function createHTMLItem(isActive, imgUrl, nickName, payAmt, presentAmt, sysd) {
                var htmlItem = document.createElement('div');
                htmlItem.className = 'detail-list';
                var htmlContent = document.createElement('div');
                htmlContent.className = 'list-content';
                htmlItem.appendChild(htmlContent);
                //头像
                var htmlImg = document.createElement('img');
                htmlImg.src = imgUrl;
                //名字和活动类型
                var htmlName = document.createElement('span');
                htmlName.className = 'js-name';
                htmlName.innerText = nickName;
                var htmlAmt2 = document.createElement('span');
                if (isActive) {
                    var temp = document.createElement('span');
                    temp.className = 'js-storedTag box-orange';
                    temp.innerText = '储值' + payAmt + '送' + presentAmt;
                    htmlName.appendChild(temp);
                    htmlAmt2.innerText = presentAmt;
                } else {
                    htmlAmt2.innerText = payAmt;
                }
                var htmlTime = document.createElement('span');
                htmlTime.className = 'js-date';
                htmlTime.innerText = sysd;
                var htmlAmt = document.createElement('span');
                htmlAmt.className = 'amount';
                htmlAmt.innerText = '￥';
                htmlAmt.appendChild(htmlAmt2);

                htmlContent.appendChild(htmlImg);
                htmlContent.appendChild(htmlName);
                htmlContent.appendChild(htmlTime);
                htmlContent.appendChild(htmlAmt);
                var htmlLine = document.createElement('div');
                htmlLine.className = 'footer-line';
                htmlItem.appendChild(htmlLine);
                return htmlItem;
            }

            function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return 0;
            }

            function getBizType() {
                var tempArray = window.location.href.split('/');
                if (tempArray[tempArray.length - 1] === 'consume.html') {
                    return 2;
                }
                return 1;
            }

            function loadMoerAnimation() {
                var refreshElement = document.getElementsByClassName('load')[0];
                refreshElement.style.display = 'block';
            }

            function storpLoadMoerAnimation() {
                var obj = document.getElementsByClassName('load')[0];
                obj.style.display = 'none';
            }

            function getAllItems() {
                return document.getElementsByClassName('footer-line');
            }

            //界面加载完成后删除最后一个item的分割线
            function removeLastItemLine(itemCont) {
                var allItems = getAllItems();
                for (var i = 0; i < allItems.length; i++) {
                    if (i == allItems.length - 1) {
                        allItems[i].style.display = 'none';
                    }
                }
            }

            function getElementMaxY() {
                var allItems = getAllItems();
                for (var i = 0; i < allItems.length; i++) {
                    if (i == allItems.length - 1) {
                        return allItems[i].offsetTop;
                    }
                }
            }

            //关闭弹框
            $('.js_alert_con_close').on('click', function () {
                $('.alert_con').hide();
                // $('.alert_con .alert_con_br').html();
                $('.zheceng').hide();
                $('.zheceng1').hide();
                $('.zheceng2').hide();
            });

            //隐藏没有更多信息了
            function nomoredata_hide() {
                $("#nomoredata").animate({ opacity: 0 }, 500, 'ease-out');
            }
        });
    });
});