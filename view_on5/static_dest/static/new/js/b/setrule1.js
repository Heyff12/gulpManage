'use strict';

var zepto = require('../plug/zepto.min');
var yanzheng = require('../common/yanzheng');
var add_bounced = require('../common/add_bounced');
var ajax_rule = require('../common/ajax_rule');
var localstorage = require('../common/localstorage');
var iosselect = require('../common/iosselect');
var date_get = require('../common/date_get');
//设置储值活动----------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    //获取店铺名称
    var data_shopname = {};
    //ajax_rule.ajax_rule(url, 'GET', 'json', data_shopname, '.zheceng', get_shopname);
    //获取初始值
    localstorage.get_storage(get_data);
});
//点击开始时间
$('.js_startime').on('click', function () {
    var showDom = document.querySelector('.js_startime');
    var year = showDom.dataset['year'];
    var month = showDom.dataset['month'];
    var day = showDom.dataset['day'];

    var bankSelect = new iosselect(3, [date_get.yearData, date_get.monthData, date_get.dateData], {
        container: '.ios_select_container',
        title: '选择开始时间',
        itemHeight: 50,
        itemShowCount: 3,
        relation: [1, 1, 0, 0],
        oneLevelId: year,
        twoLevelId: month,
        threeLevelId: day,
        //showLoading: true,
        callback: function callback(year_data, month_data, day_data) {
            showDom.dataset['year'] = year_data.id;
            showDom.dataset['month'] = month_data.id;
            showDom.dataset['day'] = day_data.id;
            showDom.value = month_data.id + '月' + day_data.id + '日';
            $('#startime').val(year_data.id + '-' + month_data.id + '-' + day_data.id);
            //设置结束时间的默认时间--开始时间
            $('.js_endtime').attr('data-year', year_data.id);
            $('.js_endtime').attr('data-month', month_data.id);
            $('.js_endtime').attr('data-day', day_data.id);
        }
    });
});
//点击到期时间
$('.js_endtime').on('click', function () {
    var showDom = document.querySelector('.js_endtime');
    var year = showDom.dataset['year'];
    var month = showDom.dataset['month'];
    var day = showDom.dataset['day'];

    var bankSelect = new iosselect(3, [date_get.yearData, date_get.monthData, date_get.dateData], {
        container: '.ios_select_container',
        title: '选择结束时间',
        itemHeight: 50,
        itemShowCount: 3,
        relation: [1, 1, 0, 0],
        oneLevelId: year,
        twoLevelId: month,
        threeLevelId: day,
        //showLoading: true,
        callback: function callback(year_data, month_data, day_data) {
            showDom.dataset['year'] = year_data.id;
            showDom.dataset['month'] = month_data.id;
            showDom.dataset['day'] = day_data.id;
            showDom.value = month_data.id + '月' + day_data.id + '日';
            $('#endtime').val(year_data.id + '-' + month_data.id + '-' + day_data.id);
        }
    });
});
//点击增加规则
$('.js_add_activity').on('click', function () {
    var dd_list = $('.js_rule dd').length - 0;
    var dd_detail = '<dd data-index="">储值<input class="text text_short js_chu js_storule" type="text" value="" name="chu" />元送<input class="text text_short js_song js_storule" type="text" value="" name="song" />元<i class="delete js_ruledelete"></i></dd>';
    if (dd_list <= 3) {
        if (dd_list == 1) {
            //第一条增加删除按钮
            $('.js_rule dd').append('<i class="delete js_ruledelete"></i>');
        }
        if (dd_list == 3) {
            //设置为不可添加的按钮样式
            $(this).find('.add_rule').css('display', 'none');
            $(this).find('.add_rule_no').css('display', 'inline-block');
        }
        $('.js_rule').append(dd_detail);
        $('.js_rule_error').removeClass('span_tips');
    } else {
        $('.js_rule_error').addClass('span_tips');
    }
});
//点击删除规则
$(document).on('click', '.js_ruledelete', function () {
    var dd_list = $('.js_rule dd').length - 0;
    if (dd_list == 2) {
        //删除第一条数据后面的删除按钮
        $(this).parents('dd').remove();
        $('.js_rule dd i.js_ruledelete').remove();
    }
    $(this).parents('dd').remove();
    $('.js_rule_error').removeClass('span_tips');
    $('.js_add_activity').find('.add_rule').css('display', 'inline-block');
    $('.js_add_activity').find('.add_rule_no').css('display', 'none');
});
//填写储值赠送金额
$(document).on('input', '.js_storule', function () {
    var crash_now_str = $(this).val();
    //字符长的时候减小字号
    if (crash_now_str.length <= 10) {
        $(this).css('font-size', '16px');
    } else {
        $(this).css('font-size', '14px');
    }
    //将非数字的字符替换为空
    var crash_now_strend = crash_now_str.replace(/[^\d]/g, '');
    //如果输入为空展示全部提现
    if (crash_now_strend.length == 0) {
        $(this).val('');
        return false;
    }
    if (crash_now_strend.length == 1 && crash_now_strend == '0') {
        $(this).val('');
        return false;
    }
    //整数部分最长12位start
    var crash_end_z = crash_now_strend.split('.')[0];
    //如果整数部分首位为0，则截取后买的 
    var crash_end_z_first = crash_end_z.substr(0, 1);
    if (crash_end_z_first == '0') {
        crash_end_z = crash_end_z.substr(1);
    }
    if (crash_end_z.length > 4) {
        crash_end_z = crash_end_z.substr(0, 4);
    }
    if (crash_now_strend.split('.').length > 1) {
        var crash_end_l = crash_now_strend.split('.')[1].substr(0, 2);
        crash_now_strend = crash_end_z - 0 + '.' + crash_end_l;
    } else {
        crash_now_strend = crash_end_z - 0;
    }
    //整数部分最长12位end
    //控制输入长度后赋值并将该值转化为字符串格式
    $(this).val(crash_now_strend);
});
//填写备注验证
$('.js_note').on('input', function () {
    var len_val = $(this).val();
    var len = len_val.length - 0;
    if (len <= 40) {
        $('.js_wordtip').find('span').text(40 - len);
    } else {
        $('.js_note').val(len_val.substr(0, 40));
    }
});
//点击提交预览
$('.js_addactivity_sub').on('click', function () {
    yanzheng.tel_activity('.js_tel');
    yanzheng.name_test('.js_note', 0, 40);
    time_area();
    $('.js_storule').each(function () {
        yanzheng.numprice_test(this, 0, 4);
    });
    var error_len = $('.error_tips').length;
    if (error_len > 0) {
        return false;
    }
    //存储数据并进入下一步
    localstorage.set_storage();
    //存储储值规则
    var rules = [];
    var chu_len = $('.js_rule dd').length;
    for (var i = 0; i < chu_len; i++) {
        var chu_html = $('.js_rule dd').eq(i);
        var chu_key = chu_html.find('.js_chu').attr('name');
        var chu_val = chu_html.find('.js_chu').val();
        var song_key = chu_html.find('.js_song').attr('name');
        var song_val = chu_html.find('.js_song').val();
        var rule = { index: i + 1, chu_key: chu_val, song_key: song_val };
        rules.push(rule);
    }
    localstorage.setone_storage('rules', JSON.stringify(rules));
    location.href = location.protocol + '//' + location.host + '/Users/yaya/Documents/job/local/储值B端2/store/html/b/preview.html';
});
//开始时间与结束时间的判断
function time_area() {
    var startime = $('.js_startime');
    var endtime = $('.js_endtime');
    if (startime.val() && endtime.val()) {
        var s_year = startime.attr('data-year');
        var s_month = startime.attr('data-month');
        var s_day = startime.attr('data-day');
        var e_year = endtime.attr('data-year');
        var e_month = endtime.attr('data-month');
        var e_day = endtime.attr('data-day');
        var s_time = s_year + '/' + s_month + '/' + s_day + ' 00:00:00';
        var e_time = e_year + '/' + e_month + '/' + e_day + ' 23:59:59';
        var s_time_s = new Date(s_time).getTime();
        var e_time_s = new Date(e_time).getTime();
        var s_cha = e_time_s - s_time_s;
        if (e_time_s - s_time_s > 365 * 24 * 60 * 60 * 1000) {
            $('.js_timetips').addClass('error_tips');
        } else {
            $('.js_timetips').removeClass('error_tips');
        }
    } else {
        $('.js_timetips').addClass('error_tips');
    }
}
//获取时间后设置日期显示
function get_data() {
    //剩余可输入字数
    var wordtip = $('.js_note').val().length - 0;
    $('.js_wordtip span').text(40 - wordtip);
    //日期
    var startime = $('#startime').val();
    var startime_zu = startime.split('-');
    if (startime) {
        $('.js_startime').data('year', startime_zu[0]);
        $('.js_startime').data('month', startime_zu[1]);
        $('.js_startime').data('day', startime_zu[2]);
        $('.js_startime').val(startime_zu[1] + '月' + startime_zu[2] + '日');
    } else {
        $('.js_startime').data('year', date_get.nowYear);
        $('.js_startime').data('month', date_get.nowMonth);
        $('.js_startime').data('day', date_get.nowDate);
        $('#startime').val(date_get.nowYear + '-' + date_get.nowMonth + '-' + date_get.nowDate);
        $('.js_startime').val('今天');
    }
    var endtime = $('#endtime').val();
    var endtime_zu = endtime.split('-');
    if (endtime) {
        $('.js_endtime').data('year', endtime_zu[0]);
        $('.js_endtime').data('month', endtime_zu[1]);
        $('.js_endtime').data('day', endtime_zu[2]);
        $('.js_endtime').val(endtime_zu[1] + '月' + endtime_zu[2] + '日');
    } else {
        $('.js_endtime').data('year', date_get.nowYear);
        $('.js_endtime').data('month', date_get.nowMonth);
        $('.js_endtime').data('day', date_get.nowDate);
        $('#endtime').val(date_get.nowYear + '-' + date_get.nowMonth + '-' + date_get.nowDate);
        $('.js_endtime').val('');
    }
    //储值规则--有退出，放置最后
    var rules = JSON.parse(localstorage.getone_storage('rules'));
    if (!rules) {
        return false;
    }
    if (rules.length > 1) {
        $('.js_rule dd').eq(0).append('<i class="delete js_ruledelete"></i>');
    } else {
        $('.js_rule dd').eq(0).find('i.js_ruledelete').remove();
    }
    if (rules.length >= 4) {
        $('.js_rule').find('.add_rule').css('display', 'none');
        $('.js_rule').find('.add_rule_no').css('display', 'inline-block');
    } else {
        $('.js_rule').find('.add_rule').css('display', 'inline-block');
        $('.js_rule').find('.add_rule_no').css('display', 'none');
    }
    for (var i = 0; i < rules.length; i++) {
        var chu_value = rules[i].chu_key;
        var song_value = rules[i].song_key;
        var index_value = rules[i].index;
        if (i == 0) {
            $('.js_rule dd').eq(0).find('.js_chu').val(chu_value);
            $('.js_rule dd').eq(0).find('.js_song').val(song_value);
            $('.js_rule dd').eq(0).attr('data-index', index_value);
        } else {
            var dd_detail = '<dd data-index="' + index_value + '">储值<input class="text text_short js_chu js_storule" type="text" value="' + chu_value + '" name="chu" />元送<input class="text text_short js_song js_storule" type="text" value="' + song_value + '" name="song" />元<i class="delete js_ruledelete"></i></dd>';
            $('.js_rule').append(dd_detail);
        }
    }
}
//获取店铺名称
function get_shopname(return_data) {
    $('.js_shopname').val(return_data.shopname);
}
//添加弹框
add_bounced.add_bounced();
//关闭弹框
add_bounced.close_tip();