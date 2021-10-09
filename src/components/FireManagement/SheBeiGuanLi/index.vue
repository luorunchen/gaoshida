<template>
  <div id="SheBeiGuanLi">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="内容">
        <el-input v-model="formInline.user" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="optionsValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <!-- <el-button
          type="primary"
          @click="(batch_Visible = true), batchFun('分配')"
          >批量分配</el-button
        > -->
        <el-button
          v-if="
            this.utils.userName == '13076920054' ||
            this.utils.userName == '13632766009'
          "
          type="primary"
          @click="(batch_Visible = true), batchFun('导入')"
          >批量导入</el-button
        >
      </el-form-item>
    </el-form>
    <div class="tabs">
      <el-table
        ref="multipleTable"
        :data="getAllDeviceWeb_list"
        tooltip-effect="dark"
        style="width: 100%"
        height="650px"
        border
      >
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="项目名称" width="120">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="installLocation" label="设备位置">
          <template slot-scope="scope">
            <!-- <p v-if="scope.row.dSName == '智能重合闸'">智能重合闸</p>
            <p v-else>{{ scope.row.installLocation }}</p> -->
            <p>{{ scope.row.installLocation }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="dSName" label="设备类型"> </el-table-column>
        <el-table-column prop="productNumber" label="设备号"> </el-table-column>
        <el-table-column prop="regdate" label="注册时间"> </el-table-column>
        <el-table-column prop="heartbeatTime" label="心跳时间">
        </el-table-column>
        <el-table-column prop="dVName456456" label="设备厂商">
        </el-table-column>
        <el-table-column prop="address" label="是否授权">
          <template slot-scope="scope">
            <p v-if="scope.row.authorize == 1">已授权</p>
            <p v-else>未授权</p>
          </template></el-table-column
        >
        <el-table-column prop="address" label="保险单号">
          <template slot-scope="scope">
            <p v-if="scope.row.policy == 0">暂无保险单号</p>
            <p v-else>{{ scope.row.policy }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="是否开启流量">
          <template slot-scope="scope">
            <p v-if="scope.row.flow == 0">未开启流量</p>
            <p v-else>已开启流量</p></template
          >
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <div class="caozuo">
              <span @click="bj_map(scope.row.devId, scope.$index, scope.row)"
                >编辑</span
              >
              <span @click="open(scope.row.name, scope.row.devId, scope.row)"
                >删除</span
              >
              <!-- <span @click="fenPei(scope.row.pid)">分配</span> -->
              <span @click="set(scope.row.productNumber, scope.row.devId)"
                >设置</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹窗---------------------------------------------- -->
    <el-dialog
      title="编辑"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :inline="true" class="demo-form-inline" label-width="100px">
        <el-form-item label="项目名称">
          <el-input
            v-model="mapInfo.name"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-input
            v-model="mapInfo.type"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="回路号">
          <el-input v-model="mapInfo.huilu" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设备号">
          <el-input
            v-model="mapInfo.shebei"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="注册时间">
          <el-input
            v-model="mapInfo.zhuche"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="心跳时间">
          <el-input
            v-model="mapInfo.xintiao"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="备注">
          <el-input v-model="mapInfo.remak" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="设备厂商">
          <el-input
            v-model="mapInfo.changshan"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="安装地址">
          <el-tooltip
            class="item"
            effect="dark"
            :content="mapInfo.address"
            placement="bottom-start"
          >
            <el-input id="tipinput" v-model="mapInfo.address"></el-input>
          </el-tooltip>
        </el-form-item>
        <div id="container"></div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="(dialogVisible = false), trueON()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 设置弹窗------------------------------------------------ -->
    <el-dialog
      :close-on-click-modal="false"
      title="设置"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible_set"
      width="40%"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>设备开关</span>
        </div>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="7">
            <el-button @click="shebeiBtn('1')">远程分闸</el-button></el-col
          >
          <el-col :span="7">
            <el-button @click="shebeiBtn('2')">远程合闸</el-button></el-col
          >
          <el-col :span="7">
            <el-button @click="shebeiBtn('8')">远程复位</el-button></el-col
          >
        </el-row>
        <el-row
          type="flex"
          class="row-bg"
          justify="space-around"
          style="margin-top: 10px"
        >
          <el-col :span="7">
            <el-button @click="shebeiBtn('4')">开启蜂鸣器</el-button></el-col
          >
          <el-col :span="7">
            <el-button @click="shebeiBtn('5')">关闭蜂鸣器</el-button></el-col
          >
          <el-col :span="7">
            <el-button @click="shebeiBtn('6')">远程消音</el-button></el-col
          >
        </el-row>
      </el-card>
      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header" class="clearfix">
          <span>设备状态</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="8">
            <div
              v-if="
                (ParaState.devstatus == 1 && ParaState.dSid == '3') ||
                (ParaState.start == 0 && ParaState.dSid == '22')
              "
              style="
                background: #5f5b5b;

                height: 30px;
                margin: 10px;
                line-height: 30px;
                text-align: center;
                color: #fff;
              "
            >
              当前状态：分闸
            </div>
            <div
              v-else
              style="
                background: #3694e4;
                height: 30px;
                margin: 10px;
                line-height: 30px;
                text-align: center;
                color: #fff;
              "
            >
              当前状态：合闸
            </div>
          </el-col>
          <el-col :span="8">
            <div v-for="(item, index) in ElecDataList.DevData" :key="index">
              <div
                v-if="item.status == '离线'"
                style="
                  background: red;
                  height: 30px;
                  margin: 10px;
                  line-height: 30px;
                  text-align: center;
                  color: #fff;
                "
              >
                设备离线
              </div>
              <div
                v-else
                style="
                  background: #2ace2a;
                  height: 30px;
                  margin: 10px;
                  line-height: 30px;
                  text-align: center;
                  color: #fff;
                "
              >
                设备在线
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header" class="clearfix">
          <span>设备设置</span>
        </div>
        <div class="tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <template v-if="ParaState.dSid == 3">
              <el-tab-pane label="阀值设置" class="tabs_one" name="first">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <!-- <p>剩余电流/mA</p> -->
                    <p>漏电电流/mA</p>
                    <el-input
                      v-model="fazhishezhi.SYDL"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-col>
                  <el-col :span="12">
                    <!-- <p>A相电流/A</p> -->
                    <p>电流过流/A</p>
                    <el-input
                      v-model="fazhishezhi.AXDL"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-col>
                  <!-- <el-col :span="12"
                  ><p>A相温度/℃</p>
                  <el-input
                    v-model="fazhishezhi.AXWD"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input
                ></el-col> -->
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <p>L温度/℃</p>
                    <el-input
                      v-model="fazhishezhi.AXWD"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-col>
                  <el-col :span="12"
                    ><p>N温度/℃</p>
                    <el-input
                      v-model="fazhishezhi.NXWD"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input
                  ></el-col>
                </el-row>
                <el-row :gutter="20">
                  <!-- <el-col :span="12">
                  <p>N相温度/℃</p>
                  <el-input
                    v-model="fazhishezhi.NXWD"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                </el-col> -->
                  <!-- <el-col :span="12">
                 
                  <p>电流过流/A</p>
                  <el-input
                    v-model="fazhishezhi.AXDL"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                </el-col> -->
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <!-- <p>B相电流/A</p> -->
                    <p>电压过压/V</p>
                    <el-input
                      v-model="fazhishezhi.BXDL"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-col>
                  <el-col :span="12">
                    <!-- <p>C相电流/A</p> -->
                    <p>电压欠压/V</p>
                    <el-input
                      v-model="fazhishezhi.CXDL"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input
                  ></el-col>
                </el-row>
                <!-- <el-row :gutter="20">
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
              </el-row> -->
                <!-- <el-row :gutter="20">
                <el-col :span="12">
                  <p>C相电压/V</p>
                  <el-input
                    v-model="fazhishezhi.CXDY"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                </el-col>
              </el-row> -->
                <el-row type="flex" justify="center" style="margin-top: 20px">
                  <el-col :span="4"
                    ><el-button size="mini" @click="offInfo"
                      >取消</el-button
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
            </template>
            <template v-else>
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
                    ><el-button size="mini">取消</el-button></el-col
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
            </template>
            <el-tab-pane
              label="报警推送方式"
              name="second"
              style="text-align: center"
            >
              <p>设备状态</p>
              <el-checkbox-group
                v-model="checkList"
                style="margin-bottom: 30px"
              >
                <el-checkbox label="App">App</el-checkbox>
                <el-checkbox label="短信">短信</el-checkbox>
                <el-checkbox label="电话">电话</el-checkbox>
              </el-checkbox-group>
              <el-row type="flex" justify="center">
                <el-col :span="4"
                  ><el-button size="mini">取消</el-button></el-col
                >
                <el-col :span="4"
                  ><el-button type="primary" size="mini" @click="baojingtuisong"
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
                <el-table :data="tableData" style="width: 100%">
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
                <el-table :data="caozuojilv" style="width: 100%">
                  <el-table-column type="index" width="50"> </el-table-column>
                  <el-table-column prop="user_name" label="用户账号">
                  </el-table-column>
                  <el-table-column prop="date" label="操作时间">
                  </el-table-column>
                  <el-table-column prop="info" label="操作内容">
                  </el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_set = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_set = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- //分页器-------------------------------------- -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 批量导入弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="batch_type == '分配' ? '批量分配' : '批量导入'"
      :visible.sync="batch_Visible"
      width="45%"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-upload
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="importQuestion"
          >
            <el-button size="small" type="success">导入Excel表</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="分配下级手机号" v-if="batch_type == '分配'">
          <el-select
            v-model="batch_phone_value"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in batch_phone_list"
              :key="item.value"
              :label="item.user_name"
              :value="item.role + ',' + item.user_name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单个设备导入" v-if="batch_type == '分配'">
          <el-input v-model="bacth_value_one"></el-input>
        </el-form-item>
        <el-form-item label="单个设备导入" v-else>
          <el-input v-model="SingleDevice"></el-input>
        </el-form-item>
      </el-form>
      <template>
        <el-table :data="batch_list" height="300">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="设备号" label="设备号"> </el-table-column>
        </el-table>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batch_Visible = false">取 消</el-button>
        <el-button type="primary" @click="batchFunTrue()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllDeviceWeb,
  updateDeviceSim,
  deleDevice,
  ReadParameterApi,
  getHistoryFault,
  putMessToDeviceOn,
  resetclose,
  resetclosefuwei,
  UpdateDevicePush,
  SetParameterApi,
  addRegisterDevice,
  getUserInfo,
  getSlave,
  shareDevice,
  saveDevice,
  getParaState,
  upSwitch,
  ElecData,
  SetParameterApi_three,
  getDevicePush,
  getDevicePower,
} from "@/api/index.js";
export default {
  data() {
    return {
      ElecDataList: "",
      ParaState: "",
      SingleDevice: "",
      batch_phone_value: "",
      bacth_value_one: "",
      batch_type: "",
      batch_list: [],
      batch_phone_list: [],
      batch_Visible: false,
      caozuojilv: [],
      handleSizeChangeValue: 10,
      activeName: "second",
      DeviceHistory: "",
      dialogVisible_set: false,
      currentPage4: 1,
      dialogVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      options: [
        {
          value: "",
          label: "",
        },
        {
          value: "网关",
          label: "1",
        },
        {
          value: "智慧用电保护器",
          label: "3",
        },
      ],
      optionsValue: "",
      getAllDeviceWeb_list: [],
      total: 1,
      mapInfo: {
        name: "",
        type: "",
        huilu: "",
        shebei: "",
        zhuche: "",
        xintiao: "",
        remak: "",
        changshan: "",
        address: "",
      },
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
      checkList: [],
    };
  },
  mounted() {
    // console.log(123123);
    this.getAllDeviceWebFun(10, 1);
    // this.bj_map();
    this.getDevicePowerFun();
  },
  methods: {
    //设备是否有权限打开设备设置
    async getDevicePowerFun() {
      await getDevicePower(this.utils.userName, this.setValue).then((res) => {
        console.log(res.data.power, 6666666);
        this.powerState = res.data.power;
      });
    },
    //报警推送回显
    getDevicePushFun() {
      this.checkList = [];
      getDevicePush(this.utils.userName, this.setValue).then((res) => {
        res.data.data.forEach((el) => {
          if (el.app == "1") {
            this.checkList.push("App");
          }
          if (el.phone == "1") {
            this.checkList.push("电话");
          }
          if (el.sms == "1") {
            this.checkList.push("短信");
          }
        });
        console.log(this.checkList);
      });
    },
    //阀值设置取消按钮
    offInfo() {
      ReadParameterApi(this.setValue).then((res) => {
        console.log(res.data.row);
        const row = res.data.row;
        this.fazhishezhi.AXWD = row.AWenDu;
        this.fazhishezhi.BXWD = row.BWenDu;
        this.fazhishezhi.CXWD = row.CWenDu;
        this.fazhishezhi.NXWD = row.NWenDu;
        this.fazhishezhi.SYDL = row.SYdianliu;
        this.fazhishezhi.AXDL = row.ADianLiu;
        this.fazhishezhi.BXDL = row.BDianLiu;
        this.fazhishezhi.CXDL = row.BDianYa;
        this.fazhishezhi.AXDY = row.ADianYa;
        this.fazhishezhi.BXDY = row.BDianYa;
        this.fazhishezhi.CXDY = row.CDianYa;
      });
    },
    //批量分配确定按钮
    batchFunTrue() {
      let Equipment_number = [];
      this.batch_list.forEach((el) => {
        Equipment_number.push(el["设备号"]);
      });

      if (this.batch_type == "分配") {
        if (Equipment_number.length <= 0 && this.bacth_value_one == "") {
          return this.$message.error("请导入设备号");
        }
        let data;
        if (Equipment_number.length <= 0) {
          data = this.bacth_value_one;
        } else {
          data = Equipment_number.toString();
        }

        if (this.batch_phone_value == "") {
          return this.$message.error("请选择下级手机号");
        }
        const phone = this.batch_phone_value.split(",");

        shareDevice(this.utils.userName, data, phone[0], phone[1]).then(
          (res) => {
            // console.log(res);
            if (res.data.code == 200 || res.data.code == 501) {
              this.$message.success("分配成功");
              this.batch_Visible = false;
            } else {
              this.$message.error(res.data.msg);
            }
          },
          () => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      } else {
        if (Equipment_number.length <= 0 && this.SingleDevice == "") {
          return this.$message.error("请导入设备号");
        }
        let data;
        if (Equipment_number.length > 0 && this.SingleDevice == "") {
          data = Equipment_number.toString();
        }

        if (Equipment_number.length <= 0 && this.SingleDevice != "") {
          data = this.SingleDevice;
        }
        if (Equipment_number.length > 0 && this.SingleDevice != "") {
          // this.batch_Visible = false;
          return this.$message.error("只能选择一种模式导入");
        }
        console.log(data, 66666);
        saveDevice(this.utils.userName, data).then(
          (res) => {
            if (res.data.code == 200) {
              this.$message.success("导入成功");
              this.batch_Visible = false;
            } else {
              this.$message.error("导入失败");
            }
          },
          () => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      }
    },
    //获取下级手机号
    batchFun(type) {
      this.batch_type = type;
      this.batch_list = [];
      getSlave(this.utils.userName).then((res) => {
        console.log(res);
        this.batch_phone_list = res.data.data;
      });
    },
    //批量分配-导入elx表
    importQuestion(file, fileList) {
      var that = this;
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file.raw);
      fileReader.onload = (event) => {
        try {
          console.log(event, 9);
          const data = event.target.result;
          const infor = this.XLSX.read(data, { type: "binary" });
          console.log(infor);

          let sheet = Object.keys(infor.Sheets)[0];
          const arr = this.XLSX.utils.sheet_to_json(infor.Sheets[sheet]); //第一列为键名的数组对象
          console.log(arr);
          this.batch_list = arr;
          // console.log(this.tableData);
          // if (arr.length) {
          //   arr.map((item) => {
          //     that.questionAddList.push({
          //       //数据拼接 根据Excel表格定义好的sheet title
          //       content: item["题目"],
          //       rightAnswer: item["正确选项"] == "对" ? 1 : 0,
          //       hardLevel: item["难度级别"],
          //       isOnline: item["是否上线"] == "上线" ? true : false,
          //     });
          //   });
          // }
        } catch (e) {
          console.log(e);
        }
      };
    },
    fenPei(pid) {
      this.$prompt("请输入分配的账号", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确",
      })
        .then(({ value }) => {
          addRegisterDevice(pid, this.utils.userName, value).then(
            (res) => {
              if (res.data.list[0].status == "true") {
                this.$message.success(res.data.list[0].mess);
              } else {
                this.$message.error(res.data.list[0].mess);
              }
            },
            () => {
              this.$message.error("请稍后重试或联系管理员");
            }
          );
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    trueON() {
      console.log(this.lanlat, 69696969696969696);
      if (
        this.lanlat.split(",")[0] == "undefined" ||
        this.lanlat == "undefined"
      ) {
        return this.$message.error("获取不到修改设备经纬度,请重新选择");
      }
      updateDeviceSim(
        this.devID,
        this.mapInfo.remak,
        this.lanlat,
        this.utils.userName,
        this.mapInfo.address,
        this.mapInfo.pids
      ).then((res) => {
        if (res.data.list[0].status == "true") {
          this.$message.success("设备更新成功");
          this.dialogVisible = false;
          this.getAllDeviceWebFun(
            this.handleSizeChangeValue,
            this.handleCurrentChangeValue
          );
        } else {
          this.$message.error(res.data.list[0].mess);
        }
      });
    },
    async set(data, devId) {
      this.setValue = data;
      await this.getDevicePowerFun();
      if (this.powerState == "1") {
        //获取设备号
        this.dialogVisible_set = true;

        // console.log(this.setValue);
        ReadParameterApi(this.setValue).then((res) => {
          console.log(res.data.row);
          const row = res.data.row;
          this.fazhishezhi.AXWD = row.AWenDu;
          this.fazhishezhi.BXWD = row.BWenDu;
          this.fazhishezhi.CXWD = row.CWenDu;
          this.fazhishezhi.NXWD = row.NWenDu;
          this.fazhishezhi.SYDL = row.SYdianliu;
          this.fazhishezhi.AXDL = row.ADianLiu;
          this.fazhishezhi.BXDL = row.ADianYa;
          this.fazhishezhi.CXDL = row.u_voltage;
          this.fazhishezhi.AXDY = row.ADianYa;
          this.fazhishezhi.BXDY = row.BDianYa;
          this.fazhishezhi.CXDY = row.CDianYa;
        });
        getParaState(this.utils.userName, this.setValue).then((res) => {
          this.ParaState = res.data.data;
          console.log(this.ParaState, "==============");
        });
        ElecData(devId, "").then((res) => {
          this.ElecDataList = res.data;
        });
      } else {
        this.$message.error("暂无权限,请向上级申请");
      }
    },

    //设备设置按钮
    shebeiBtn(num) {
      const role = sessionStorage.getItem("role");
      const power = sessionStorage.getItem("power");
      switch (num) {
        //远程断电
        case "1":
          if (role == "1000" || power.indexOf("10003003") != -1) {
            if (this.ParaState.dSid == 3) {
              putMessToDeviceOn(
                this.utils.userName,
                this.setValue,
                "poweroff"
              ).then(
                (res) => {
                  if (res.data.message == "请求成功") {
                    getParaState(this.utils.userName, this.setValue).then(
                      (res) => {
                        this.ParaState = res.data.data;
                        console.log(this.ParaState, "==============");
                      }
                    );
                    this.$message.success(res.data.message);
                  } else {
                    this.$message.error(res.data.message);
                  }
                },
                () => {
                  this.$message.error("请稍后重试或联系管理员");
                }
              );
            } else {
              upSwitch(this.setValue, 1, "").then(
                (res) => {
                  if (res.data.code == "200") {
                    getParaState(this.utils.userName, this.setValue).then(
                      (res) => {
                        this.ParaState = res.data.data;
                        console.log(this.ParaState, "==============");
                      }
                    );
                    this.$message.success("请求成功");
                  } else {
                    this.$message.error("请求失败");
                  }
                },
                () => {
                  this.$message.error("请稍后重试或联系管理员");
                }
              );
            }
          } else {
            this.$message.error("暂无权限");
          }

          break;

        //远程开机
        case "2":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            if (this.ParaState.dSid == "3") {
              putMessToDeviceOn(
                this.utils.userName,
                this.setValue,
                "poweron"
              ).then(
                (res) => {
                  if (res.data.message == "请求成功") {
                    getParaState(this.utils.userName, this.setValue).then(
                      (res) => {
                        this.ParaState = res.data.data;
                        console.log(this.ParaState, "==============");
                      }
                    );
                    this.$message.success(res.data.message);
                  } else {
                    this.$message.error(res.data.message);
                  }
                },
                () => {
                  this.$message.error("请稍后重试或联系管理员");
                }
              );
            } else {
              upSwitch(this.setValue, 2, "").then(
                (res) => {
                  if (res.data.code == "200") {
                    getParaState(this.utils.userName, this.setValue).then(
                      (res) => {
                        this.ParaState = res.data.data;
                        console.log(this.ParaState, "==============");
                      }
                    );
                    this.$message.success("请求成功");
                  } else {
                    this.$message.error("请求失败");
                  }
                },
                () => {
                  this.$message.error("请稍后重试或联系管理员");
                }
              );
            }
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //远程关机
        case "3":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.utils.userName,
              this.setValue,
              "startup"
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
            break;
          } else {
            this.message.error("暂无权限");
          }
          break;
        //开启蜂鸣器
        case "4":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.utils.userName,
              this.setValue,
              "voiceon"
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
            break;
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //关闭蜂鸣器
        case "5":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.utils.userName,
              this.setValue,
              "voiceoff"
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
            break;
          } else {
            this.message.error("暂无权限");
          }
          break;
        //远程消音
        case "6":
          if (role == "1000" || power.indexOf("10003001") != -1) {
            putMessToDeviceOn(this.utils.userName, this.setValue, "mute").then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          } else {
            this.$message.error("暂无权限");
          }

          break;
        //开启流量
        case "7":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.utils.userName,
              this.setValue,
              "openflow"
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
            break;
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //远程复位
        case "8":
          if (role == "1000" || power.indexOf("10003003") != -1) {
            putMessToDeviceOn(this.utils.userName, this.setValue, "reset").then(
              (res) => {
                if (res.data.status == "1" || res.data.message != "暂无权限") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //授权
        case "9":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            insertClouddog(this.setValue).then(
              (res) => {
                if (res.data.list[0].status == "true") {
                  this.$message.success(
                    "授权成功.工作日一天后将授权生效,非工作日将延期"
                  );
                } else {
                  this.$message.error("授权失败");
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          }
          break;
        //开启屏蔽器
        case "10":
          if (role == "1000" || power.indexOf("10003013") != -1) {
            updateShutdown(this.setValue, this.utils, userName).then(
              (res) => {
                if (res.data.status == "true") {
                  layer.open({
                    content: res.mess,
                  });
                  this.$message.success(res.data.mess);
                } else {
                  this.$message.error(res.data.mess);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          }
          break;
        //下发保险单
        case "11":
          // console.log(6554654);
          // console.log(this.setValue, 789789);
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDevice(
              this.utils.userName,
              this.setValue,
              this.baoxiandanhao
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  alert("下发保险单号成功");
                } else {
                  this.$message.error("请稍后重试");
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          }
          // var res = JSON.parse(result);
          // console.log(res);

          break;
      }
    },

    bj_map(data, index, row) {
      if (
        this.utils.powerId == 1000 ||
        this.utils.rid.indexOf("10003005") != -1
      ) {
        this.dialogVisible = true;
        this.mapInfo.name = this.getAllDeviceWeb_list[index].name;
        this.mapInfo.type = this.getAllDeviceWeb_list[index].dSName;
        this.mapInfo.shebei = this.getAllDeviceWeb_list[index].productNumber;
        this.mapInfo.zhuche = this.getAllDeviceWeb_list[index].regdate;
        this.mapInfo.xintiao = this.getAllDeviceWeb_list[index].heartbeatTime;
        this.mapInfo.changshan = this.getAllDeviceWeb_list[index].dVName;
        this.mapInfo.remak = this.getAllDeviceWeb_list[index].remark;
        this.mapInfo.address = this.getAllDeviceWeb_list[index].installLocation;
        this.lanlat = this.getAllDeviceWeb_list[index].loopNumber;
        this.devID = data;
        this.mapInfo.pids = row.pid;
        // console.log(this.getAllDeviceWeb_list);
        this.$nextTick(() => {
          this.map = new AMap.Map("container", {
            center: [116.397428, 39.90923],
            resizeEnable: true,
            zoom: 10,
            mapStyle: "amap://styles/dcb78e5f043e25116ab6bdeaa6813234",
          });
          //输入提示
          var autoOptions = {
            input: "tipinput",
          };
          var auto = new AMap.Autocomplete(autoOptions);
          this.placeSearch = new AMap.PlaceSearch({
            map: this.map,
          }); //构造地点查询类

          AMap.event.addListener(auto, "select", this.select); //注册监听，当选中某条记录时会触发
          AMap.event.addListener(this.placeSearch, "markerClick", (e) => {
            // console.log(e.data.location.lng, e.data.location.lat); // 经纬度
            this.lanlat = e.data.location.lng + "," + e.data.location.lat;
            // console.log(e, 654);
            this.mapInfo.address = `${e.data.cityname}${e.data.adname}${e.data.address}`;
          });
        });
      } else {
        this.$message.error("暂无权限,请向上级申请");
      }
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
        this.setValue,
        phone
      ).then((res) => {
        this.$message.success("修改成功");
      });
    },
    SetParameterApiFun() {
      if (this.ParaState.dSid == "3") {
        SetParameterApi(
          this.setValue,
          this.fazhishezhi.SYDL,
          this.fazhishezhi.AXDL,
          this.fazhishezhi.BXDL,
          this.fazhishezhi.AXWD,
          this.fazhishezhi.NXWD,
          this.fazhishezhi.CXDL
          // this.fazhishezhi.AXDL,
          // this.fazhishezhi.BXDL,
          // this.fazhishezhi.CXDL,
          // this.fazhishezhi.AXDY,
          // this.fazhishezhi.BXDY,
          // this.fazhishezhi.CXDY
        ).then((res) => {
          if (res.data.status == 1) {
            this.$message.success("设置成功");
          } else {
            this.$message.error("设置失败");
          }
        });
      } else {
        SetParameterApi_three(
          this.ElecDataList.DevData[0].productNumber,
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
        ).then(
          (res) => {
            if (res.data.status == 1) {
              this.$message.success("设置成功");
            } else {
              this.$message.error("设置失败");
            }
          },
          () => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      }
    },
    //设备历史
    deviceHistory() {
      console.log(this.DeviceHistory);
      getHistoryFault(
        this.setValue,
        this.DeviceHistory[0],
        this.DeviceHistory[1]
      ).then((res) => {
        if (res.data.length <= 0) {
          return this.$message.error("暂无历史数据");
        }
      });
    },

    select(e) {
      console.log(e);
      this.placeSearch.setCity(e.poi.adcode);
      this.placeSearch.search(e.poi.name); //关键字查询查询
      this.lanlat = e.poi.location.lng + "," + e.poi.location.lat;
      this.mapInfo.address =
        e.poi.district + "" + e.poi.address + "" + e.poi.name;
    },
    //分页器函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.getAllDeviceWebFun(val, this.handleCurrentChangeValue);
      console.log(this.handleCurrentChangeValue);
      this.handleSizeChangeValue = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.handleCurrentChangeValue = val;
      this.getAllDeviceWebFun(this.handleSizeChangeValue, val);
    },

    handleClick(tab, event) {
      // console.log(tab.label);
      if (tab.label === "设置操作记录") {
        // console.log(123);
        getUserInfo("", "", this.setValue, "", "").then((res) => {
          this.caozuojilv = res.data;
        });
      }
      if (tab.label === "报警推送方式") {
        this.getDevicePushFun();
      }
    },

    //展示数据方法接口
    getAllDeviceWebFun(ls, cp) {
      let col = "";
      let kw = "";
      let state = 0;
      // let ls = 10;
      // let cp = 1;
      getAllDeviceWeb(
        this.utils.userName,
        cp,
        col,
        state,
        kw,
        ls,
        this.formInline.user,
        this.optionsValue
      ).then((res) => {
        this.getAllDeviceWeb_list = res.data.list[0].allObj;
        console.log(this.getAllDeviceWeb_list);
        this.total = res.data.list[0].count;
      });
    },
    newClick() {},
    // 项目管理删除
    delClick() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onSubmit() {
      this.getAllDeviceWebFun(
        this.handleSizeChangeValue,
        this.handleCurrentChangeValue
      );
    },
    open(name, devID, row) {
      const powerId = sessionStorage.getItem("new_role");
      const rid = sessionStorage.getItem("power");
      if (powerId == 1000 || rid.indexOf("10003006") != -1) {
        this.$confirm(
          `此操作将永久删除 <span style='color:red'>${name}</span> 设备, 是否继续?`,

          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            dangerouslyUseHTMLString: true,
            type: "warning",
          }
        )
          .then(() => {
            deleDevice(devID, this.utils.userName, row.pid).then((res) => {
              if (res.data.list[0].status == "true") {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getAllDeviceWebFun(
                  this.handleSizeChangeValue,
                  this.handleCurrentChangeValue
                );
              } else {
                this.$message.error(res.data.list[0].mess);
              }
            });
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message.error("暂无权限,请向上级申请");
      }
    },
    indexMethod() {},
  },
};
</script>
<style lang='less' scoped>
#SheBeiGuanLi {
  .caozuo {
    span {
      color: blue;
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .block {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
  #container {
    height: 300px;
  }
  .amap-sug-result {
    z-index: 99999999999999999;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 100%;
  }
  /deep/.el-card__body {
    /deep/.el-button {
      width: 100%;
    }
  }
}
</style>