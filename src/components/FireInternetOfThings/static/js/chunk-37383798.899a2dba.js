(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37383798"],{"02d2":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"huozaibaojing"}},[a("div",{staticClass:"leftWapper"},[a("div",{ref:"leftOne",staticClass:"left_one"},[a("p",[e._v("今日报警项目")]),a("div",{staticClass:"title"},e._l(e.baojingNum,(function(t,i){return a("ul",{key:i},[a("li",[e._v(e._s(t))])])})),0),a("div",{staticClass:"scroll_wapper"},e._l(e.DeviceAlarmList,(function(t,i){return a("ul",{key:i,staticClass:"ulList"},[a("li",{on:{click:function(a){return e.callPolice(t.pid)}}},[a("span",[e._v(e._s(t.typeName))]),a("span",[e._v("共"+e._s(t.value)+"条未处理>")])])])})),0)]),a("div",{staticClass:"left_two"},[a("p",[e._v("接入烟感设备")]),a("Translate")],1)]),a("SearchTranslate",{attrs:{SElec_DetailElecDevice_List:e.SElec_DetailElecDevice_List,pagetype:e.pagetype}})],1)},n=[],l=(a("96f8"),a("365c")),s=a("a178"),c=a("6fd7"),r={data:function(){return{SElec_DetailElecDevice_List:"",baojingNum:"",DeviceAlarmList:"",pagetype:"7"}},mounted:function(){this.DeviceAlarm()},methods:{callPolice:function(e){var t=this;Object(l["j"])(e).then((function(e){t.SElec_DetailElecDevice_List=e.data}))},DeviceAlarm:function(){var e=this;Object(l["b"])(this.utils.userName,"1,6,11",1).then((function(t){e.DeviceAlarmList=t.data;var a=0;if(t.data.length<=0)e.baojingNum="000000",e.$refs.leftOne.style.height="140px";else{t.data.forEach((function(e){a+=e.value}));var i="000000"+a;e.baojingNum=i.substring(i.length-6)}}))}},components:{Translate:s["a"],SearchTranslate:c["a"]}},u=r,o=(a("dae8"),a("5d22")),v=Object(o["a"])(u,i,n,!1,null,"5cd55d04",null);t["default"]=v.exports},"74e7":function(e,t,a){},dae8:function(e,t,a){"use strict";a("74e7")}}]);