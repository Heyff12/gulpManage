"use strict";function timeout(o){return new Promise(function(e,n){setTimeout(e,o,"done")})}var _profile=require("./profile.js");console.log(_profile.firstName),timeout(1e3).then(function(o){console.log(o)});var promise=new Promise(function(o,e){console.log("Promise"),o()});promise.then(function(){console.log("Resolved.")}),console.log("Hi!");var p1=new Promise(function(o,e){setTimeout(function(){return e(new Error("fail"))},3e3)}),p2=new Promise(function(o,e){setTimeout(function(){return o(p1)},1e3)});p2.then(function(o){return console.log(o)}).catch(function(o){return console.log(o)}),setTimeout(function(){console.log("three")},0),Promise.resolve().then(function(){console.log("two")}),console.log("one");var arr=["a","b","c","d"];for(var a in arr)console.log(a);var obj=new Proxy({},{get:function(o,e,n){return console.log("getting "+e+"!"),Reflect.get(o,e,n)},set:function(o,e,n,t){return console.log("setting "+e+"!"),Reflect.set(o,e,n,t)}});obj.count=1,++obj.count;
//# sourceMappingURL=../../maps/js/es6/module.js.map