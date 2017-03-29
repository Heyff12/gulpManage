'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

function multiply(x, y) {
    return x * y;
};
exports.firstName = firstName;
exports.lastName = lastName;
exports.year = year;
exports.multiply = multiply;
var foo = exports.foo = 'bar';
setTimeout(function () {
    return exports.foo = foo = 'baz';
}, 500);