<template>
  <div
    id="app"
    v-loading="loading_map"
    element-loading-text="地图资源加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.4)"
  >
    <div class="title">
      <div class="gotoSy">
        <div style="width: 130px">
          <router-link to="/"> <p>返回首页</p></router-link>
        </div>
      </div>
      <div class="xiaofangInfo">
        <p>智慧安全用系统</p>

        <p>-{{ btnInfo }}</p>
      </div>
      <div class="fenbuInfo">
        <div
          :class="btnInfo == '设备管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'FireInternetOfThings' }">
            <p textInfo="设备管理" @click="getText()">设备管理</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '项目管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'electricalFire' }"
            ><p textInfo="项目管理" @click="getText()">项目管理</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '单位管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'FireWaterSystem' }">
            <p textInfo="单位管理" @click="getText()">单位管理</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '系统设置' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'FireAlarmSystem' }">
            <p textInfo="系统设置" @click="getText()">系统设置</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '报警故障' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'KeyParts' }">
            <p textInfo="报警故障" @click="getText()">报警故障</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '用电规划' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'SmartIndependentSmoke' }">
            <p textInfo="用电规划" @click="getText()">用电规划</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '功率管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'GasDetector' }">
            <p textInfo="功率管理" @click="getText()">功率管理</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '电量统计' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'EmergencyManagement' }">
            <p textInfo="电量统计" @click="getText()">电量统计</p>
          </router-link>
        </div>
        <div
          :class="
            btnInfo == '线路老化预警' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
        >
          <router-link :to="{ name: 'IntelligentFireAlarm' }">
            <p textInfo="线路老化预警" @click="getText()">线路老化预警</p>
          </router-link>
        </div>
        <div
          :class="
            btnInfo == '烟雾火灾预警' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
        >
          <router-link :to="{ name: 'FireExtinguisher' }">
            <p textInfo="烟雾火灾预警" @click="getText()">烟雾火灾预警</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '短路预警' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'PowerDetection' }">
            <p textInfo="短路预警" @click="getText()">短路预警</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '漏电预警' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'Panorama' }">
            <p textInfo="漏电预警" @click="getText()">漏电预警</p>
          </router-link>
        </div>
      </div>
    </div>
    <!-- <div class="title2"></div> -->

    <div
      v-if="btnInfo === '设备管理'"
      style="height: calc(88.35vh); background: #030542"
    >
      <div class="shebeiguanli">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="内容">
            <el-input
              v-model="formInline.user"
              placeholder="搜索内容"
            ></el-input>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="formInline.region" placeholder="类型">
              <el-option label="" value=""></el-option>
              <el-option label="网关" value="0"></el-option>
              <el-option label="烟感" value="2"></el-option>
              <el-option label="电气" value="3"></el-option>
              <el-option label="水压" value="4"></el-option>
              <el-option label="消防主机" value="5"></el-option>
              <el-option label="无线气感" value="6"></el-option>
              <el-option label="粉尘设备" value="7"></el-option>
              <el-option label="液位" value="8"></el-option>
              <el-option label="录像" value="9"></el-option>
              <el-option label="消防门磁" value="10"></el-option>
              <el-option label="工业燃气" value="11"></el-option>
              <el-option label="电力火灾探测器" value="12"></el-option>
              <el-option label="声光报警器" value="15"></el-option>
              <el-option label="手动报警" value="16"></el-option>
              <el-option label="水浸报警器" value="18"></el-option>
              <el-option label="紧急报警" value="19"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <template>
          <el-table :data="tableData" style="width: 100%" height="650">
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="name" label="项目名称" width="180">
            </el-table-column>
            <el-table-column
              prop="installLocation"
              label="项目位置"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="dSName" label="设备类型"> </el-table-column>
            <el-table-column prop="productNumber" label="设备号">
            </el-table-column>
            <el-table-column prop="regdate" label="注册时间"> </el-table-column>
            <el-table-column prop="heartbeatTime" label="心跳时间">
            </el-table-column>
            <el-table-column prop="dVName" label="设备厂商"> </el-table-column>
            <el-table-column prop="address" label="是否授权">
              <template slot-scope="scope">
                <p v-if="scope.row.authorize == '1'">已授权</p>
                <p v-else>未授权</p>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="保险单号">
              <template slot-scope="scope">
                <p v-if="scope.row.policy == '0'">暂无保险单号</p>
                <p v-else>{{ scope.row.policy }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="是否开启流量">
              <template slot-scope="scope">
                <p v-if="scope.row.flow != '0'">已开启流量</p>
                <p v-else>未开启流量</p>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <span
                  @click="
                    (dialogVisible_new = true),
                      init(scope.$index, scope.row.devId)
                  "
                  >编辑</span
                >
                <span @click="open(scope.row.name)">删除</span>
                <span>分配</span>
                <span
                  @click="
                    (innerVisible_shebei = true),
                      setOffFun(scope.row.productNumber)
                  "
                  >设置</span
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.count"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible_new"
      width="50%"
      center
      :modal-append-to-body="false"
    >
      <el-form
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
        :inline="true"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input :disabled="true" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="region">
          <el-input :disabled="true" v-model="ruleForm.dSName"></el-input>
        </el-form-item>

        <el-form-item label="回路号" prop="delivery">
          <el-input :disabled="true" v-model="ruleForm.delivery"></el-input>
        </el-form-item>

        <el-form-item label="设备号" prop="name">
          <el-input
            :disabled="true"
            v-model="ruleForm.productNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="region">
          <el-input :disabled="true" v-model="ruleForm.regdate"></el-input>
        </el-form-item>
        <el-form-item label="心跳时间" prop="heartbeatTime">
          <el-input
            :disabled="true"
            v-model="ruleForm.heartbeatTime"
          ></el-input>
        </el-form-item>

        <el-form-item label="设备厂商" prop="dVName">
          <el-input :disabled="true" v-model="ruleForm.dVName"></el-input>
        </el-form-item>
        <el-form-item label="备注 " prop="region">
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form :inline="true" class="demo-ruleForm" label-width="200px">
          <el-form-item label="安装地址">
            <el-tooltip
              class="item"
              effect="dark"
              :content="this.ruleForm.address"
              placement="right"
            >
              <el-input v-model="ruleForm.address" id="tipinput"></el-input>
            </el-tooltip>
          </el-form-item>
        </el-form>

        <div id="map_new_add"></div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_new = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 内部弹窗->设置设备 -->
    <el-dialog
      width="40%"
      title="设备设置"
      :visible.sync="innerVisible_shebei"
      :modal-append-to-body="false"
    >
      <el-row>
        <el-col :span="24"
          ><div class="shizhi_right">
            <div class="right_one">
              <p class="titleP">设备开关</p>
              <el-row
                :gutter="20"
                type="flex"
                class="row-bg"
                justify="space-around"
              >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('4')"
                    >开启蜂鸣器</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('5')"
                    >关闭蜂鸣器</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('6')"
                    >远程消音</el-button
                  ></el-col
                >
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8">
                  <el-button @click="shebeiBtn('8')"
                    >远程复位</el-button
                  ></el-col
                >
              </el-row>
            </div>
            <div class="right_two">
              <p class="titleP">设置</p>
              <div class="tabs">
                <el-tabs v-model="activeName">
                  <el-tab-pane label="阀值设置" class="tabs_one" name="first">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>剩余电流/mA</p>
                        <el-input
                          v-model="fazhishezhi.SYDL"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>A相温度/℃</p>
                        <el-input
                          v-model="fazhishezhi.AXWD"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>B相温度/℃</p>
                        <el-input
                          v-model="fazhishezhi.BXWD"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>C相温度/℃</p>
                        <el-input
                          v-model="fazhishezhi.CXWD"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>N相温度/℃</p>
                        <el-input
                          v-model="fazhishezhi.NXWD"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>A相电流/A</p>
                        <el-input
                          v-model="fazhishezhi.AXDL"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>B相电流/A</p>
                        <el-input
                          v-model="fazhishezhi.BXDL"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>C相电流/A</p>
                        <el-input
                          v-model="fazhishezhi.CXDL"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>A相电压/V</p>
                        <el-input
                          v-model="fazhishezhi.AXDY"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>B相电压/V</p>
                        <el-input
                          v-model="fazhishezhi.BXDY"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>C相电压/V</p>
                        <el-input
                          v-model="fazhishezhi.CXDY"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                      <el-col :span="4"
                        ><el-button
                          size="mini"
                          @click="innerVisible_shebei = false"
                          >关闭</el-button
                        ></el-col
                      >
                      <el-col :span="4"
                        ><el-button
                          type="primary"
                          size="mini"
                          @click="SetParameterApiFun"
                          >保存</el-button
                        ></el-col
                      >
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane
                    label="报警推送方式"
                    name="second"
                    style="text-align: center"
                  >
                    <p>设备状态</p>
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox label="App">App</el-checkbox>
                      <el-checkbox label="短信">短信</el-checkbox>
                      <el-checkbox label="电话">电话</el-checkbox>
                    </el-checkbox-group>
                    <el-row type="flex" justify="center">
                      <el-col :span="4"
                        ><el-button
                          size="mini"
                          @click="innerVisible_shebei = false"
                          >关闭</el-button
                        ></el-col
                      >
                      <el-col :span="4"
                        ><el-button
                          type="primary"
                          size="mini"
                          @click="baojingtuisong"
                          >确定</el-button
                        ></el-col
                      >
                    </el-row></el-tab-pane
                  >
                  <el-tab-pane label="设备历史故障" name="third">
                    <el-form
                      size="mini"
                      :inline="true"
                      :model="formInline"
                      class="demo-form-inline"
                    >
                      <el-form-item label="日期:">
                        <el-date-picker
                          v-model="DeviceHistory"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          format="yyyy-MM-dd HH:mm:ss"
                        >
                        </el-date-picker>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="deviceHistory"
                          >查询</el-button
                        >
                      </el-form-item>
                    </el-form>
                    <template>
                      <el-table :data="tableData_lishi" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-tab-pane>
                  <el-tab-pane label="设置操作记录" name="fourth">
                    <el-form
                      size="mini"
                      :inline="true"
                      :model="formInline"
                      class="demo-form-inline"
                    >
                      <el-form-item label="日期:">
                        <div class="block">
                          <el-date-picker
                            v-model="DeviceHistory"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                          >
                          </el-date-picker>
                        </div>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="deviceHistory"
                          >查询</el-button
                        >
                      </el-form-item>
                    </el-form>
                    <template>
                      <el-table :data="tableData_lishi" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div></div
        ></el-col>
      </el-row>
    </el-dialog>

    <PublicPopUps ref="publicPopUps" :pagetype="pagetype" />
    <router-view></router-view>
  </div>
</template>

<script>
import {
  getIndexReport,
  putMessToDeviceOn,
  DeviceProjectNew,
  getAllDeviceWeb,
  resetclosefuwei,
  resetclose,
  ReadParameterApi,
  SetParameterApi,
  UpdateDevicePush,
  getHistoryFault,
  updateDeviceSim,
  deleDevice,
} from "@/api/index.js";
import PublicPopUps from "../FireInternetOfThings/translate/publicPopUps.vue";
export default {
  data() {
    return {
      tableData_lishi: [],
      shengyu_loudian: {},

      innerVisible_shebei: false,
      ruleForm: {
        name: "",
        region: "",
        address: "",
        delivery: "",
        type: [],
        resource: "",
        desc: "",
        remark: "",
      },
      dialogVisible_new: false,
      pagetype: "",
      numTwo: "0",
      loading_map: false,
      numOne: "0",
      btnInfo: "设备管理",
      getIndexReportList: "",
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      currentPage4: 1,
      Current: 1,
      SizeChange: 10,
      count: 0,
      baoxiandanhao: "",
      fazhishezhi: {
        SYDL: "",
        AXDL: "",
        BXDL: "",
        CXDL: "",
        AXWD: "",
        BXWD: "",
        CXWD: "",
        NXWD: "",
        AXDY: "",
        BXDY: "",
        CXDY: "",
      },
      DeviceHistory: "",
      checkList: [],
      activeName: "second",
    };
  },
  watch: {
    // $route(to, from) {
    //   if (to.path === "/FireInternetOfThings") {
    //     this.echart();
    //   }
    // },
    //  应急处理组件触发函数
    status() {
      this.mass.setMap(null);
      this.DeviceProjectNewFun(this.$store.state.initStatus); //   需要调用的方法
      // console.log(this.$store.state.initStatus);
    },
  },
  mounted() {
    // console.log(this.$route.path, 999999);
    // switch (this.$route.path) {
    //   case "/FireInternetOfThings":
    //     this.DeviceProjectNewFun("3");
    //     // this.echart();
    this.getAllDeviceWebFun("1", "10");
    //     // this.init();
    //     break;
    //   case "/FireInternetOfThings/electricalFire":
    //     this.btnInfo = "设备管理";
    //     this.pagetype = "2";
    this.DeviceProjectNewFun("3");
    //     break;
    //   case "/FireInternetOfThings/FireWaterSystem":
    //     this.btnInfo = "单位管理";
    //     this.pagetype = "3";
    //     this.DeviceProjectNewFun("4,8");
    //     break;
    //   case "/FireInternetOfThings/FireAlarmSystem":
    //     this.btnInfo = "系统设置";
    //     this.pagetype = "4";
    //     this.DeviceProjectNewFun("0,5,20");
    //     break;
    //   case "/FireInternetOfThings/KeyParts":
    //     this.btnInfo = "报警故障";
    //     this.pagetype = "5";
    //     this.DeviceProjectNewFun("9,13,20");
    //     break;
    //   case "/FireInternetOfThings/SmartIndependentSmoke":
    //     this.btnInfo = "用电规划";
    //     this.pagetype = "6";
    //     this.DeviceProjectNewFun("2");
    //     break;
    //   case "/FireInternetOfThings/GasDetector":
    //     this.btnInfo = "功率管理";
    //     this.pagetype = "7";
    //     this.DeviceProjectNewFun("1,6,11");
    //     break;
    //   case "/FireInternetOfThings/EmergencyManagement":
    //     this.btnInfo = "电量统计";
    //     this.DeviceProjectNewFun("3,4,8");
    //     break;
    //   case "/FireInternetOfThings/IntelligentFireAlarm":
    //     this.btnInfo = "线路老化预警";
    //     this.DeviceProjectNewFun("10,15,16,19,18");
    //     break;
    //   case "/FireInternetOfThings/FireExtinguisher":
    //     this.btnInfo = "烟雾火灾预警";
    //     this.DeviceProjectNewFun("21");
    //     break;
    //   case "/FireInternetOfThings/PowerDetection":
    //     this.btnInfo = "短板预警";
    //     this.DeviceProjectNewFun("12");
    //     break;
    //   case "/FireInternetOfThings/Panorama":
    //     this.btnInfo = "漏电预警";
    //     this.DeviceProjectNewFun("3");
    //     break;
    // }
    // this.init();
  },

  methods: {
    setOffFun(data) {
      this.setOff = data;
      ReadParameterApi(this.setOff).then((res) => {
        // console.log(this.shengyu_loudian);
        // console.log(res.data.row);
        const row = res.data.row;
        this.fazhishezhi.AXWD = row.AWenDu;
        this.fazhishezhi.BXWD = row.BWenDu;
        this.fazhishezhi.CXWD = row.CWenDu;
        this.fazhishezhi.NXWD = row.NWenDu;
        this.fazhishezhi.SYDL = row.SYdianliu;
        this.fazhishezhi.AXDL = row.ADianLiu;
        this.fazhishezhi.BXDL = row.BDianLiu;
        this.fazhishezhi.CXDL = row.CDianLiu;
        this.fazhishezhi.AXDY = row.ADianYa;
        this.fazhishezhi.BXDY = row.BDianYa;
        this.fazhishezhi.CXDY = row.CDianYa;
      });
    },
    //报警推送
    baojingtuisong() {
      console.log(this.checkList);
      let app = 0;
      let sms = 0;
      let phone = 0;
      // if(this.checklist.length==3){
      //   app = 1
      // }
      // if(this.checklist.length==2){
      //   sms = 1
      // }
      this.checkList.forEach((index, element) => {
        console.log(index, element);
        if (index === "短信") {
          sms = 1;
        }
        if (index === "电话") {
          phone = 1;
        }
        if (index === "App") {
          app = 1;
        }
      });
      UpdateDevicePush(
        "undefined",
        app,
        this.utils.userName,
        sms,
        this.setOff,
        phone
      ).then((res) => {
        this.$message.success("修改成功");
      });
    },
    SetParameterApiFun() {
      SetParameterApi(
        this.setOff,
        this.fazhishezhi.SYDL,
        this.fazhishezhi.AXWD,
        this.fazhishezhi.BXWD,
        this.fazhishezhi.CXWD,
        this.fazhishezhi.NXWD,
        this.fazhishezhi.AXDL,
        this.fazhishezhi.BXDL,
        this.fazhishezhi.CXDL,
        this.fazhishezhi.AXDY,
        this.fazhishezhi.BXDY,
        this.fazhishezhi.CXDY
      ).then((res) => {
        if (res.data.status == 1) {
          this.$message.success("参数设置成功");
          // setTimeout(function () {
          //   parent.location.reload();
          // }, 1000);
          this.innerVisible_shebei = false;
        } else {
          this.$message.error("参数设置失败");
        }
      });
    },
    // // TabS 切换函数
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    //设备历史
    deviceHistory() {
      if (this.DeviceHistory == "") {
        return this.$message.error("请选择时间");
      }

      console.log(this.DeviceHistory);
      getHistoryFault(
        this.setOff,
        this.DeviceHistory[0],
        this.DeviceHistory[1]
      ).then((res) => {
        this.tableData_lishi = res.data;
      });
    },
    //设备设置按钮
    shebeiBtn(num) {
      const role = sessionStorage.getItem("role");
      const power = sessionStorage.getItem("power");
      switch (num) {
        //远程断电
        case "1":
          if (role == "1000" || power.indexOf("10003003") != -1) {
            resetclose(this.setOff, 0).then((res) => {
              if (res.data.message == "请求成功") {
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            this.$message.error("暂无权限");
          }

          break;

        //远程开机
        case "2":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(this.setOff, "shutdown").then((res) => {
              if (res.data.message == "请求成功") {
                this.$message.success("远程开机成功");
              } else {
                this.$message.error("请稍后重试");
              }
            });
            break;
          } else {
            this.$message.error("暂无权限");
          }
        //远程关机
        case "3":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(this.setOff, "startup").then((res) => {
              if (res.data.message == "请求成功") {
                this.$message.success("远程关机成功");
              } else {
                this.$message.error("请稍后重试");
              }
            });
            break;
          } else {
            this.message.error("暂无权限");
          }
          break;
        //开启蜂鸣器
        case "4":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(this.setOff, "voiceon").then((res) => {
              console.log(res.data.message);
              if (res.data.message == "请求成功") {
                this.$message.success("开启蜂鸣器成功");
              } else {
                this.$message.error("请稍后重试");
              }
            });
            break;
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //关闭蜂鸣器
        case "5":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(this.setOff, "voiceoff").then((res) => {
              if (res.data.message == "请求成功") {
                this.$message.success("关启蜂鸣器成功");
              } else {
                this.$message.error("请稍后重试");
              }
            });
            break;
          } else {
            this.message.error("暂无权限");
          }
          break;
        //远程消音
        case "6":
          if (role == "1000" || power.indexOf("10003001") != -1) {
            resetclose(this.setOff, 2).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success("远程消音成功");
                } else {
                  this.$message.error("远程消音失败");
                }
              },
              (rej) => {
                this.$message.error("稍后重试");
              }
            );
          } else {
            this.$message.error("暂无权限");
          }

          break;
        //开启流量
        case "7":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(this.setOff, "openflow").then((res) => {
              if (res.data.message == "请求成功") {
                this.$message.success("开启流量成功");
              } else {
                this.$message.error("请稍后重试");
              }
            });
            break;
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //远程复位
        case "8":
          if (role == "1000" || power.indexOf("10003003") != -1) {
            resetclosefuwei(this.setOff, 2).then(
              (res) => {
                if (res.status == "1") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              (rej) => {
                this.$message.error("稍后重试");
              }
            );
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //授权
        case "9":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            insertClouddog(this.setOff).then((res) => {
              if (res.list[0].status == "true") {
                this.$message.success(
                  "授权成功.工作日一天后将授权生效,非工作日将延期"
                );
              } else {
                this.$message.error("授权失败");
              }
            });
          }
          break;
        //开启屏蔽器
        case "10":
          if (role == "1000" || power.indexOf("10003013") != -1) {
            updateShutdown(this.setOff, this.utils, userName).then((res) => {
              if (res.status == "true") {
                layer.open({
                  content: res.mess,
                });
                this.$message.success(res.mess);
              } else {
                this.$message.error(res.mess);
              }
            });
          }
          break;
        //下发保险单
        case "11":
          // console.log(6554654);
          // console.log(this.setOff, 789789);
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDevice(this.setOff, this.baoxiandanhao).then((res) => {
              if (res.data.message == "请求成功") {
                this.$message.success("下发保险单号成功");
              } else {
                this.$message.error("请稍后重试");
              }
            });
          }
          // var res = JSON.parse(result);
          // console.log(res);

          break;
      }
    },
    open(data) {
      this.$confirm(
        `此操作将永久删除  <span style='color:red'> ${data}</span>, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning",
        }
      )
        .then(() => {
          deleDevice(this.devId, this.utils.userName).then((res) => {
            if (res.data.list[0].status == "true") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.SizeChange = val;
      this.getAllDeviceWebFun(this.Current, val);
    },
    handleCurrentChange(val) {
      this.Current = val;
      console.log(`当前页: ${val}`);
      this.getAllDeviceWebFun(val, this.SizeChange);
    },
    //高视达 设备管理接口
    getAllDeviceWebFun(cp, ls) {
      getAllDeviceWeb(
        this.utils.userName,
        cp, //当前页
        "",
        0,
        "",
        ls, //每页显示几行
        this.formInline.user,
        this.formInline.region
      ).then((res) => {
        this.tableData = res.data.list[0].allObj;
        // this.ruleForm.name = res.data.list[0].allObj.name;
        this.count = res.data.list[0].count;
      });
    },
    submitForm() {
      updateDeviceSim(
        this.devId,

        this.ruleForm.remark,
        this.utils.userName,
        this.ruleForm.address
      ).then((res) => {
        console.log(res.data.list[0].status);
        if (res.data.list[0].status == "true") {
          this.$message.success("保存成功");
          return (this.dialogVisible_new = false);
        }
      });
    },
    onSubmit() {
      this.getAllDeviceWebFun(1, 10);
    },
    getText() {
      this.btnInfo = event.currentTarget.getAttribute("textInfo");
      // this.init();
      console.log(this.btnInfo);
      switch (this.btnInfo) {
        case "隐患整改进度":
          this.mass.setMap(null);
          this.DeviceProjectNewFun("3");

          break;
        case "电气火灾隐患":
          this.DeviceProjectNewFun("3");
          this.mass.setMap(null);
          this.pagetype = "2";
          break;
        case "消防水系统":
          this.DeviceProjectNewFun("4,8");
          this.mass.setMap(null);
          this.pagetype = "3";
          break;
        case "火灾报警系统":
          this.DeviceProjectNewFun("0,5,20");
          this.mass.setMap(null);
          this.pagetype = "4";
          break;
        case "重点部位":
          this.DeviceProjectNewFun("9,13,20");
          this.mass.setMap(null);
          this.pagetype = "5";
          break;
        case "智慧型独立烟感":
          this.DeviceProjectNewFun("2");
          this.mass.setMap(null);
          this.pagetype = "6";
          break;
        case "燃气探测器":
          this.DeviceProjectNewFun("1,6,11");
          this.mass.setMap(null);
          break;
        case "应急处理":
          this.DeviceProjectNewFun("3,4,8");
          break;
        case "智慧型消防报警":
          this.DeviceProjectNewFun("10,15,16,19,18");
          this.mass.setMap(null);
          break;
        case "灭火器":
          this.DeviceProjectNewFun("21");
          this.mass.setMap(null);
          break;
        case "电力检测系统":
          this.DeviceProjectNewFun("12");
          this.mass.setMap(null);
          break;
        case "设备全景定位图":
          this.DeviceProjectNewFun("3");
          this.mass.setMap(null);
          break;
      }
    },

    //地图部分
    init(index, devID) {
      this.devId = devID;
      // this.map = new AMap.Map("app", {
      //   center: [116.397428, 39.90923],
      //   resizeEnable: true,
      //   zoom: 10,
      //   mapStyle: "amap://styles/dcb78e5f043e25116ab6bdeaa6813234",
      // });
      // this.map.setZoomAndCenter(4, [116.205467, 39.907761]);

      this.ruleForm.name = this.tableData[index].name;
      this.ruleForm.dSName = this.tableData[index].dSName;
      this.ruleForm.productNumber = this.tableData[index].productNumber;
      this.ruleForm.regdate = this.tableData[index].regdate;
      this.ruleForm.heartbeatTime = this.tableData[index].heartbeatTime;
      this.ruleForm.dVName = this.tableData[index].dVName;
      this.ruleForm.remark = this.tableData[index].remark;

      this.$nextTick(() => {
        this.map2 = new AMap.Map("map_new_add", {
          center: [116.397428, 39.90923],
          resizeEnable: true,
          zoom: 10,
          mapStyle: "amap://styles/dcb78e5f043e25116ab6bdeaa6813234",
        });

        var autoOptions = {
          input: "tipinput",
        };
        var auto = new AMap.Autocomplete(autoOptions);
        this.placeSearch = new AMap.PlaceSearch({
          map: this.map2,
        }); //构造地点查询类
        let _that = this;
        AMap.event.addListener(auto, "select", this.select);
        AMap.event.addListener(this.placeSearch, "markerClick", function (e) {
          // _this.$emit("bMapDate", e.data.location.lng, e.data.location.lat);
          _that.ruleForm.address =
            e.data.cityname + e.data.adname + e.data.address + e.data.name;
          // console.log(e);
          this.lngant = e.data.location.lng + "," + e.data.location.lat;
        });
      });
    },
    select(e) {
      console.log(e);
      this.placeSearch.setCity(e.poi.district);
      this.placeSearch.search(e.poi.district); //关键字查询查询
      this.ruleForm.address = e.poi.district + e.poi.address;
      this.lngant = e.poi.location.lng + "," + e.poi.location.lat;
      // this.$forceUpdate();
    },
    DeviceProjectNewFun(data) {
      // console.log(this.$refs.publicPopUps.initOff());
      // this.loading_map = true;
      DeviceProjectNew(this.utils.userName, data, 1).then((res) => {
        // this.DeviceProjectNewData = res.data.Company;
        let a = [];
        let b = [];
        for (let i = 0; i < res.data.Company.length; i++) {
          if (res.data.Company[i].style == 1) {
            b.push(res.data.Company[i]);
          } else {
            a.push(res.data.Company[i]);
          }
        }

        this.DeviceProjectNewData = [...a, ...b];
        // console.log(c, "我是aa,b");
        this.$nextTick(() => {
          const style = [
            {
              url: "https://a.amap.com/jsapi_demos/static/images/mass2.png",
              anchor: new AMap.Pixel(4, 4),
              size: new AMap.Size(8, 8),
            },
            {
              url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
              anchor: new AMap.Pixel(6, 6),
              size: new AMap.Size(11, 11),
            },
          ];
          // console.log(this.DeviceProjectNewData, 987987);

          this.mass = new AMap.MassMarks(this.DeviceProjectNewData, {
            opacity: 0.8,
            zIndex: 111,
            cursor: "pointer",
            style: style,
          });
          // this.DeviceProjectNewData = [];
          const marker = new AMap.Marker({ content: " ", map: this.map });
          this.mass.setMap(this.map);

          // this.loading_map = false;
          // 保存this
          var _that = this;
          //绑定事件模块
          this.mass.on("click", function (e) {
            // console.log(e);

            // this.$refs.publicPopUps.initOff();

            _that.$refs.publicPopUps.initOff();
            _that.$refs.publicPopUps.echart_wapper(e.data.pid);
          });
        });
      });
    },
  },
  components: {
    PublicPopUps,
  },
  computed: {
    status() {
      //  计算属性
      // console.log(this.$store.state.initStatus);
      return this.$store.state.initStatus; //  Vuex 中定义的属性
    },
  },
};
</script>
<style lang='less' scoped>
/deep/.el-dialog__header {
  background: #1071e2;

  // color:#fff
}
/deep/.el-dialog__title {
  // background: #1071e2;

  color: #fff;
}
/deep/.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
#map_new_add {
  height: 300px;
}
.shizhi_right {
  .right_one {
    margin-left: 20px;
    height: 265px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
    /deep/.el-button {
      width: 100%;
    }
  }
  .right_two {
    margin-top: 20px;
    margin-left: 20px;
    height: 580px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
    .tabs {
      padding: 10px 30px;
      p {
        margin-bottom: 5px;
        // margin-top: 20px;
      }
      .tabs_one {
        /deep/.el-input__inner {
          margin-bottom: 20px;
        }
      }

      /deep/.el-button {
        width: 100%;
      }
    }
  }
}
#app {
  color: #fff;
  width: 100%;
  height: calc(100vh);
  position: relative;
  z-index: 9;
  background: #030542;
  .shebeiguanli {
    margin: 0 30px;
    height: 90%;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    span {
      cursor: pointer;
      color: blue;
      margin-right: 5px;
    }
    .block {
      position: absolute;
      bottom: 50px;
      right: 30px;
    }
  }
  .title {
    display: flex;
    width: 100%;
    height: 108px;
    background: #030542;
    position: relative;
    z-index: 999;
    .gotoSy {
      width: 190px;
      height: 76px;
      background-image: url("../../assets/images/Rectangle 2 copy.png");
      background-size: 100% 100%;
      p {
        font-size: 22px;
        text-align: center;
        line-height: 90px;
      }
    }
    .xiaofangInfo {
      margin-top: 10px;
      width: 325px;
      p {
        font-weight: bold;
        text-align: center;
        &:nth-child(1) {
          font-size: 35px;
        }
        &:nth-child(2) {
          font-size: 26px;
        }
      }
      // background: #fff;
    }
    .fenbuInfo {
      width: 1400px;
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      .infoBtn {
        margin-right: 14px;
        width: 130px;
        height: 30px;
        background: linear-gradient(0deg, #274184, #021132);
        border: 1px solid #3486da;
        border-radius: 6px;
        p {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 30px;
          text-align: center;
        }
      }
      .infoBtnClick {
        background: rgb(48, 148, 213);
      }
    }
  }
  .title2 {
    position: relative;
    z-index: 999;
    width: 100%;
    height: 20px;
    background-image: linear-gradient(to top, rgba(8, 48, 74, 0.5), #030542);
  }
  .yinhanZgLeft {
    left: 20px;
    width: 373px;
    // height: 500px;
    // background: #bfa;
    position: absolute;
    z-index: 999;
    .one {
      height: 300px;
      background-image: url("../../assets/images/juxing5.png");
      background-size: 100% 100%;
      .infoYMR {
        padding-top: 10px;
        margin: 0 auto;
        width: 330px;
        clear: both;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .infoYMRLi {
          text-align: center;
          margin-top: 10px;
          width: 150px;
          height: 50px;
          background: rgb(15, 60, 118);
          position: relative;
          &:nth-child(3) {
            width: 96%;
          }
          .infoYMRLi_item {
            position: absolute;
            bottom: 0;
            width: 100%;
          }
        }
        .infoYMRLi_item::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;

          border-left: 2px solid #00c0ff;
          border-bottom: 2px solid #00c0ff;

          width: 10px;
          height: 10px;
        }
        .infoYMRLi_item::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: 0;

          border-right: 2px solid #00c0ff;
          border-bottom: 2px solid #00c0ff;

          width: 10px;
          height: 10px;
        }
        .infoYMRLi::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;

          border-left: 2px solid #00c0ff;
          border-top: 2px solid #00c0ff;

          width: 10px;
          height: 10px;
        }
        .infoYMRLi::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          border-right: 2px solid #00c0ff;
          border-top: 2px solid #00c0ff;
          width: 10px;
          height: 10px;
        }
      }
      .one_echart_left {
        width: 100%;
        height: 170px;
        // background: #bfa;
      }
    }
    .two {
      width: 510px;
      height: 240px;
      background-image: url("../../assets/images/juxing7.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 50px;
        font-size: 18px;
      }
      .two_echart_left {
        height: 190px;
      }
      // .twoEchart_left {
      //   height: 200px;
      // }
    }
    .three {
      width: 510px;
      height: 240px;
      background-image: url("../../assets/images/juxing7.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 50px;
        font-size: 18px;
      }
      // .twoEchart_right {
      //   height: 200px;
      // }
      .three_echart_left {
        height: 190px;
      }
    }
  }
  .yinhanZgRight {
    right: 20px;
    width: 373px;
    // height: 500px;
    // background: #bfa;
    position: absolute;
    z-index: 999;

    .one {
      // width: 510px;
      height: 350px;
      background-image: url("../../assets/images/zhengchangbili.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 50px;
        font-size: 18px;
      }
      .scroll_wapper {
        overflow-y: auto;
        height: 82%; //高度根据需求自行设定
        overflow-x: hidden;
        ul {
          width: 90%;
          margin: 0 auto;
          li {
            margin-top: 10px;
          }
        }
      }

      .twoEchart_right {
        height: 200px;
      }
    }
    .two {
      // width: 510px;
      // margin-top: 20px;
      height: 350px;
      background-image: url("../../assets/images/zhengchangbili.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 50px;
        font-size: 18px;
      }
      .scroll_wapper {
        overflow-y: auto;
        height: 82%; //高度根据需求自行设定
        overflow-x: hidden;
        ul {
          width: 90%;
          margin: 0 auto;
          li {
            margin-top: 10px;
          }
        }
      }
      .twoEchart_right {
        height: 200px;
      }
    }
  }
}
</style>