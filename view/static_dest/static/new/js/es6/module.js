'use strict';

require('babel-polyfill');

var _profile = require('./profile.js');

console.log(_profile.firstName);
function timeout(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms, 'done');
  });
}
timeout(1000).then(function (value) {
  console.log(value);
});
var promise = new Promise(function (resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function () {
  console.log('Resolved.');
});

console.log('Hi!');
var p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    return reject(new Error('fail'));
  }, 3000);
});

var p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    return resolve(p1);
  }, 1000);
});

p2.then(function (result) {
  return console.log(result);
}).catch(function (error) {
  return console.log(error);
});

setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');
var arr = ['a', 'b', 'c', 'd'];

for (var a in arr) {
  console.log(a); // 0 1 2 3
}
var obj = new Proxy({}, {
  get: function get(target, key, receiver) {
    console.log('getting ' + key + '!');
    return Reflect.get(target, key, receiver);
  },
  set: function set(target, key, value, receiver) {
    console.log('setting ' + key + '!');
    return Reflect.set(target, key, value, receiver);
  }
});
obj.count = 1;
++obj.count;