(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f50c96a"],{3032:function(e,t,l){"use strict";l.r(t);var o=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{attrs:{id:"app"}},[l("div",{staticClass:"title"},[l("div",{staticClass:"gotoSy"},[l("div",{staticStyle:{width:"130px"}},[l("router-link",{attrs:{to:"/"}},[l("p",[e._v("返回首页")])])],1)]),l("div",{staticClass:"xiaofangInfo"},[l("p",[e._v("消防管理")]),l("p",[e._v("-"+e._s(e.btnInfo))])]),l("div",{staticClass:"fenbuInfo"},[l("div",{class:"项目管理"==e.btnInfo?"infoBtn infoBtnClick":"infoBtn",on:{click:function(t){return e.getInfo("项目管理")}}},[l("p",[e._v("项目管理")])]),l("div",{class:"设备管理"==e.btnInfo?"infoBtn infoBtnClick":"infoBtn",on:{click:function(t){return e.getInfo("设备管理")}}},[l("p",[e._v("设备管理")])]),l("div",{class:"单位管理"==e.btnInfo?"infoBtn infoBtnClick":"infoBtn",on:{click:function(t){return e.getInfo("单位管理")}}},[l("p",[e._v("单位管理")])]),l("div",{class:"消防新闻"==e.btnInfo?"infoBtn infoBtnClick":"infoBtn",on:{click:function(t){return e.getInfo("消防新闻")}}},[l("p",[e._v("消防新闻")])])])]),l("div",{staticClass:"content_wapper"},["项目管理"==this.btnInfo?[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline,size:"mini"}},[l("el-form-item",{attrs:{label:"项目名称"}},[l("el-input",{attrs:{placeholder:"项目名称"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),l("el-form-item",{attrs:{label:"防火员"}},[l("el-input",{attrs:{placeholder:"防火员"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),l("el-form-item",{attrs:{label:"负责人"}},[l("el-input",{attrs:{placeholder:"负责人"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("新增项目 ")]),l("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("删除责任人和防火员")])],1)],1),l("div",{staticClass:"tabs"},[l("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark"}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),l("el-table-column",{attrs:{type:"index",index:e.indexMethod}}),l("el-table-column",{attrs:{label:"项目名称",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.date))]}}],null,!1,790793193)}),l("el-table-column",{attrs:{prop:"name",label:"项目位置",width:"120"}}),l("el-table-column",{attrs:{prop:"address",label:"防火员","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"防火员电话","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"责任人","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"责任人电话","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"项目介绍","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"备注","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{label:"操作","show-overflow-tooltip":""}},[l("div",{staticClass:"caozuo"},[l("span",{on:{click:function(t){e.dialogVisible=!0}}},[e._v("编辑")]),l("span",{on:{click:e.delClick}},[e._v("删除")]),l("span",{on:{click:e.newClick}},[e._v("新增设备")])])])],1)],1)]:e._e(),"设备管理"==this.btnInfo?[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline,size:"mini"}},[l("el-form-item",{attrs:{label:"设备类型"}},[l("el-input",{attrs:{placeholder:"设备类型"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),l("el-form-item",{attrs:{label:"项目名称"}},[l("el-input",{attrs:{placeholder:"项目名称"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),l("el-form-item",{attrs:{label:"设备号"}},[l("el-input",{attrs:{placeholder:"设备号"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1),l("div",{staticClass:"tabs"},[l("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark"}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),l("el-table-column",{attrs:{type:"index",index:e.indexMethod}}),l("el-table-column",{attrs:{label:"项目名称",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.date))]}}],null,!1,790793193)}),l("el-table-column",{attrs:{prop:"name",label:"项目位置",width:"120"}}),l("el-table-column",{attrs:{prop:"address",label:"设备类型","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"设备号","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"注册时间","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"心跳时间","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"设备厂商","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"是否授权","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"保险单号","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"是否开启流量","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"备注","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{label:"操作","show-overflow-tooltip":""}},[l("div",{staticClass:"caozuo"},[l("span",[e._v("编辑")]),l("span",[e._v("删除")]),l("span",[e._v("设置")])])])],1)],1)]:e._e(),"单位管理"==this.btnInfo?[l("el-row",{attrs:{gutter:20}},[l("el-col",{attrs:{span:4}},[l("div",{staticClass:"danwei_left"},[l("p",{staticClass:"titleP"},[e._v("行政区域")]),l("el-tree",{attrs:{data:e.data,props:e.defaultProps,accordion:""}})],1)]),l("el-col",{attrs:{span:20}},[l("div",{staticClass:"danwei_right"},[l("div",{staticClass:"one"}),l("div",{staticStyle:{padding:"20px 0 0 40px"}},[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline,size:"mini"}},[l("el-form-item",{attrs:{label:"单位名称"}},[l("el-input",{attrs:{placeholder:"单位名称"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),l("el-form-item",{attrs:{label:"防火员"}},[l("el-input",{attrs:{placeholder:"防火员"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),l("el-form-item",{attrs:{label:"项目负责人"}},[l("el-input",{attrs:{placeholder:"项目负责人"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1),l("div",{staticClass:"tabs"},[l("el-table",{ref:"multipleTable",staticStyle:{width:"97%"},attrs:{data:e.tableData,"tooltip-effect":"dark"}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),l("el-table-column",{attrs:{type:"index",index:e.indexMethod}}),l("el-table-column",{attrs:{label:"单位名称",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.date))]}}],null,!1,790793193)}),l("el-table-column",{attrs:{prop:"name",label:"所属区域",width:"120"}}),l("el-table-column",{attrs:{prop:"address",label:"联系电话","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"防火员","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"项目负责人","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"address",label:"巡查点数","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{label:"操作","show-overflow-tooltip":""}},[l("div",{staticClass:"caozuo"},[l("span",{on:{click:function(t){e.dialogVisible_search=!0}}},[e._v("查看")])])])],1)],1)],1)])])],1)]:e._e(),"消防新闻"==this.btnInfo?[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline,size:"mini"}},[l("el-form-item",{attrs:{label:"角色名称"}},[l("el-input",{attrs:{placeholder:"角色名称"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),l("el-form-item",{attrs:{label:"状态"}},[l("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline.region,callback:function(t){e.$set(e.formInline,"region",t)},expression:"formInline.region"}},[l("el-option",{attrs:{label:"启用",value:"shanghai"}}),l("el-option",{attrs:{label:"禁用",value:"beijing"}})],1)],1),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1),l("div",{staticClass:"tabs"},[l("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark"}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),l("el-table-column",{attrs:{type:"index",index:e.indexMethod}}),l("el-table-column",{attrs:{label:"新闻名称",width:"1200"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.date))]}}],null,!1,790793193)}),l("el-table-column",{attrs:{prop:"name",label:"发表时间",width:"400"}}),l("el-table-column",{attrs:{label:"操作","show-overflow-tooltip":""}},[l("div",{staticClass:"caozuo"},[l("span",{on:{click:function(t){e.dialogVisible_search=!0}}},[e._v("查看")])])])],1)],1)]:e._e(),l("div",{staticClass:"block"},[l("span",{staticClass:"demonstration"},[e._v("完整功能")]),l("el-pagination",{attrs:{"current-page":e.currentPage4,"page-sizes":[100,200,300,400],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:400},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],2),l("el-dialog",{attrs:{title:"新增",visible:e.dialogVisible,width:"50%","modal-append-to-body":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},["项目管理"==this.btnInfo?[l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{size:"mini",model:e.ruleForm,rules:e.rules,"label-width":"300px",inline:!0}},[l("el-form-item",{attrs:{label:"项目名称",prop:"name"}},[l("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),l("el-form-item",{attrs:{label:"项目位置",prop:"region"}},[l("el-input",{model:{value:e.ruleForm.region,callback:function(t){e.$set(e.ruleForm,"region",t)},expression:"ruleForm.region"}})],1),l("el-form-item",{attrs:{label:"防火员",prop:"delivery"}},[l("el-autocomplete",{attrs:{placeholder:"请输入内容"}}),l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.outerVisible=!0}}},[e._v("新增")])],1),l("el-form-item",{attrs:{label:"责任人",prop:"type"}},[l("el-autocomplete",{attrs:{placeholder:"请输入内容"}}),l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.outerVisible=!0}}},[e._v("新增")])],1),l("el-form-item",{attrs:{label:"网格员",prop:"name"}},[l("el-autocomplete",{attrs:{placeholder:"请输入内容"}}),l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.outerVisible=!0}}},[e._v("新增")])],1),l("el-form-item",{attrs:{label:"街道负责人",prop:"region"}},[l("el-autocomplete",{attrs:{placeholder:"请输入内容"}}),l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.outerVisible=!0}}},[e._v("新增")])],1),l("el-form-item",{attrs:{label:"应用场所",prop:"name"}},[l("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),l("el-form-item",{attrs:{label:"项目介绍(所属单位)",prop:"region"}},[l("el-input",{model:{value:e.ruleForm.region,callback:function(t){e.$set(e.ruleForm,"region",t)},expression:"ruleForm.region"}})],1),l("el-form-item",{attrs:{label:"备注",prop:"region"}},[l("el-input",{model:{value:e.ruleForm.region,callback:function(t){e.$set(e.ruleForm,"region",t)},expression:"ruleForm.region"}})],1)],1),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)]:e._e(),"设备管理"==this.btnInfo?[l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px",inline:!0}},[l("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[l("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),l("el-form-item",{attrs:{label:"区域权限",prop:"region"}},[l("el-input",{model:{value:e.ruleForm.region,callback:function(t){e.$set(e.ruleForm,"region",t)},expression:"ruleForm.region"}})],1),l("el-form-item",{attrs:{label:"用户管理",prop:"type"}},[l("el-checkbox-group",{model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},[l("el-checkbox",{attrs:{label:"后台技术人员",name:"type"}}),l("el-checkbox",{attrs:{label:"超级管理员",name:"type"}}),l("el-checkbox",{attrs:{label:"一般管理员",name:"type"}}),l("el-checkbox",{attrs:{label:"管理员",name:"type"}})],1)],1),l("el-form-item",{attrs:{label:"项目管理",prop:"type"}},[l("el-checkbox-group",{model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},[l("el-checkbox",{attrs:{label:"后台技术人员",name:"type"}}),l("el-checkbox",{attrs:{label:"超级管理员",name:"type"}}),l("el-checkbox",{attrs:{label:"一般管理员",name:"type"}}),l("el-checkbox",{attrs:{label:"管理员",name:"type"}})],1)],1)],1),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)]:e._e()],2),l("div",{staticClass:"titleWapper"},[l("el-dialog",{attrs:{visible:e.dialogVisible_search,width:"60%"},on:{"update:visible":function(t){e.dialogVisible_search=t}}},[l("p",{staticClass:"title_name"},[e._v("设备名称")]),l("el-row",{attrs:{gutter:20}},[l("el-col",{attrs:{span:8}},[[l("div",{staticClass:"scroll_wapper"},[l("div",{staticClass:"left_one"},[l("ul",[l("li",[e._v("在线监测")]),l("li",[e._v("更新时间")]),l("li",[e._v("报警类型")]),l("li",[e._v("位置")])])])])]],2),l("el-col",{attrs:{span:16}},[l("div",{staticClass:"right_wapper"},[l("el-row",{directives:[{name:"show",rawName:"v-show",value:"KeyParts"!=this.$route.name,expression:"this.$route.name != 'KeyParts'"}],staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[l("el-col",{attrs:{span:8}},[l("div",{class:"police"==e.equipmentColor?"one equipmentColor":"one",on:{click:function(t){return e.equipment("police")}}},[l("div",{staticClass:"one_item"}),l("p",[e._v("1")]),l("p",[e._v("报警设备")])])]),l("el-col",{attrs:{span:8}},[l("div",{class:"onLine"==e.equipmentColor?"two equipmentColor":"two",on:{click:function(t){return e.equipment("onLine")}}},[l("div",{staticClass:"two_item"}),l("p",[e._v("1")]),l("p",[e._v("在线设备")])])]),l("el-col",{attrs:{span:8}},[l("div",{class:"offLine"==e.equipmentColor?"three equipmentColor":"three",on:{click:function(t){return e.equipment("offLine")}}},[l("div",{staticClass:"three_item"}),l("p",[e._v("1")]),l("p",[e._v("离线设备")])])])],1),l("el-row",{attrs:{gutter:20}},[l("el-col",{attrs:{span:12}},[l("div",{staticClass:"four"},[l("p",[e._v("单位简介")]),l("p",[e._v(" 大家看到啦数据库的垃圾的考拉手机打开胜利大街奥斯卡来得及奥斯卡来得及奥斯卡大家可达师姐裸考 ")]),l("p",[e._v(" 大家看到啦数据库的垃圾的考拉手机打开胜利大街奥斯卡来得及奥斯卡来得及奥斯卡大家可达师姐裸考 ")]),l("p",[e._v("大家看到啦数据库")])])]),l("el-col",{attrs:{span:12}},[l("div",{staticClass:"five"},[l("p",[e._v("一周内报警数")]),l("div",{staticClass:"echart_wapper"})])])],1)],1)])],1)],1)],1),l("el-dialog",{attrs:{center:"",width:"30%",title:"新增",visible:e.outerVisible,"modal-append-to-body":!1},on:{"update:visible":function(t){e.outerVisible=t}}},[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[l("el-form-item",{attrs:{label:"姓名"}},[l("el-input",{attrs:{size:"mini"}})],1),l("el-form-item",{attrs:{label:"手机号码"}},[l("el-input",{attrs:{size:"mini"}})],1)],1),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.outerVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.outerVisible=!1}}},[e._v("确 定")])],1)],1)],1)},a=[],r=(l("82a8"),{data:function(){return{outerVisible:!1,equipmentColor:"police",rules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],region:[{required:!0,message:"请选择活动区域",trigger:"change"}],type:[{type:"array",required:!0,message:"请至少选择一个活动性质",trigger:"change"}],resource:[{required:!0,message:"请选择活动资源",trigger:"change"}],desc:[{required:!0,message:"请填写活动形式",trigger:"blur"}]},ruleForm:{name:"",region:"",delivery:12,type:[],resource:"",desc:""},currentPage4:4,dialogVisible_search:!1,dialogVisible:!1,btnInfo:"项目管理",formInline:{user:"",region:""},tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}],data:[{label:"一级 1",children:[{label:"二级 1-1",children:[{label:"三级 1-1-1"}]}]},{label:"一级 2",children:[{label:"二级 2-1",children:[{label:"三级 2-1-1"}]},{label:"二级 2-2",children:[{label:"三级 2-2-1"}]}]},{label:"一级 3",children:[{label:"二级 3-1",children:[{label:"三级 3-1-1"}]},{label:"二级 3-2",children:[{label:"三级 3-2-1"}]}]}],defaultProps:{children:"children",label:"label"}}},methods:{newClick:function(){},delClick:function(){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$message({type:"success",message:"删除成功!"})})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},equipment:function(e){this.equipmentColor=e},getInfo:function(e){this.btnInfo=e,window.name=e},onSubmit:function(){console.log("submit!")},handleSizeChange:function(e){console.log("每页 ".concat(e," 条"))},handleCurrentChange:function(e){console.log("当前页: ".concat(e))},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;t.dialogVisible=!1}))},indexMethod:function(e){return 2*e}},mounted:function(){""==window.name?this.btnInfo="项目管理":""!=window.name&&(this.btnInfo=window.name)},destroyed:function(){window.name=""}}),n=r,i=(l("f872"),l("5d22")),s=Object(i["a"])(n,o,a,!1,null,"00e0953f",null);t["default"]=s.exports},"8a01":function(e,t,l){},f872:function(e,t,l){"use strict";l("8a01")}}]);