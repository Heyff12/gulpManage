"use strict";

define(["mock"], function (mock) {
    //测试时，在主文件引入该js，打包上线时，删除引入代码；mock里面的文件名字最好与主文件名字保持一致，便于查找
    var activities = {
        "respcd": "0000",
        "respmsg": "OK",
        "resperr": "",
        "data": {
            "user_num": '@natural(10, 100)', // 参与过储值活动的 总用户数
            "total_txamt": '@natural(9000000, 9900000)', // 总充值金额
            "total_pay_amt": '@natural(1000000, 2000000)', // 总支付金额
            "total_balances": '@natural(7000000, 8000000)' }
    };
    var get_activities = function get_activities() {
        console.log(mock.mock(activities)); //打印生成的数据
        mock.mock(/prepaid\/v1\/api\/b\/stat\/activities/, 'get', activities);
    };
    get_activities(); //直接执行，避免在正式文件中进行调用，便器上线时减少代码屏蔽量


    var members = {
        "respcd": "0000",
        "respmsg": "OK",
        "resperr": "",
        "data|3-5": [{
            "c": "@character('lower',7)", // hash之后的cid
            "avatar": "@image('200x200', '#ffcc33', '#FFF', '头像')", // 会员头像的URL
            "recharge_times": '@integer(12,60)', // 在该商户下累计充值次数
            "recharge_amt": '@natural(2000000, 8000000)', // 该消费者在商户下累计充值的金额
            "mobile": "13012349876", // 消费者首次在商户下使用储值时,填写的联系方式
            "name": "@chineseName()", //该消费的昵称, 通过customer获得
            "balance": '@natural(20000, 80000)' }]
    };
    var get_members = function get_members() {
        console.log(mock.mock(members));
        mock.mock(/prepaid\/v1\/api\/b\/members/, 'get', members);
    };
    get_members();

    var activity_history = {
        "respcd": "0000",
        "respmsg": "OK",
        "resperr": "",
        "data|3-8": [{
            "start_time": "@datetime('yyyy-MM-dd HH:mm:ss')", // 活动开始时间
            "end_time": "@datetime('yyyy-MM-dd HH:mm:ss')", // 活动结束时间
            "activity_id": '@natural(5000,60000)', // 活动ID
            "user_num": '@natural(100,600)', // 参与当前活动的用户数
            "total_txamt": '@natural(1000000,6000000)', // 总充值金额
            "total_pay_amt": '@natural(120000,600000)', // 总支付金额
            "countdown_day": '@natural(0,6)', // 活动还有多少天开始, 单位: 天. 向上取整, 如1.5天 -> 2天
            "active": '@natural(0,1)', // 活动是否有效. 1 有效, 0 无效(商户主动停止)
            "status": '@natural(0,3)', // 0: x天后开始, 天数从countdown_day中取, 1: 进行中, 2: 已结束, 3: 已终止
            "detail|1-4": [// 按grid_index排序
            {
                "grid_index|+1": 1, // 储值格位
                "title": "@string( 'lower', 14 )", // 规则说明
                "prepaid_times": '@natural(5,60)' // 储值次数, 注意是次数
            }]
        }]
    };
    var get_activity_history = function get_activity_history() {
        console.log(mock.mock(activity_history));
        mock.mock(/prepaid\/v1\/api\/b\/activity_history/, 'get', activity_history);
    };
    get_activity_history(); //直接执行，避免在正式文件中进行调用，便器上线时减少代码屏蔽量


    var service_info = {
        "respcd": "0000",
        "respmsg": "OK",
        "resperr": "",
        "data": [{
            "expired": '@natural(0,1)', // 储值服务是否过期, 1 已过期, 0未过期
            "is_qfgroup": '@natural(0,1)' }]
    };
    var get_service_info = function get_service_info() {
        console.log(mock.mock(service_info));
        mock.mock(/prepaid\/v1\/api\/service\/info/, 'get', service_info);
    };
    get_service_info();

    return {};
});