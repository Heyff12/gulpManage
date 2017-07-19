// 使用 Mock
var Mock = require('mockjs');
//商户流失数据
var lost_merchant = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    'total_cnt': '@natural(10, 100)', // 总条数
    'page': 1,
    'page_size': 10,
    'records|12-30': [{
      'mchnt_uid|+1': 123456,
      'mchnt_name': "@word",
      'legal_name': "@chineseName",
      'mobile': /^1\d{10}$/,
      'slsm_uid|+100': 100000,
      'slsm_name': "@first",
      'last_trade_time': "@datetime('yyyy-MM-dd HH:mm:ss')"
    }]
  }
};
Mock.mock(/qudao\/v1\/api\/statistic\/lost_mchnts/, 'get', lost_merchant);
var data = Mock.mock(lost_merchant);
// 输出结果
console.log(data)
console.log(JSON.stringify(data, null, 4))
