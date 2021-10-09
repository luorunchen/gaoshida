<template>
  <div id="BaoJingGuZhang">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <!-- <el-form-item label="事件状态:">
        <el-button-group>
          <el-button>全部</el-button>
          <el-button>报警</el-button>
          <el-button>故障</el-button>
        </el-button-group>
      </el-form-item> -->
      <el-form-item label="内容">
        <el-input
          v-model="formInline.proName"
          placeholder="项目名称"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="设备编号">
        <el-input v-model="formInline.imei" placeholder="设备编号"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="tableData" style="width: 100%" height="650px" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="项目名称"> </el-table-column>
        <el-table-column prop="location" label="项目位置"> </el-table-column>
        <el-table-column prop="legalman" label="责任人"> </el-table-column>
        <!-- <el-table-column prop="address" label="事件详情"> </el-table-column> -->
        <el-table-column prop="legalmanPhone" label="责任人电话">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="caozuo">
              <span
                @click="
                  set(
                    scope.row.devId,
                    scope.row.productNumber,
                    scope.row.pid,
                    'add'
                  )
                "
                style="margin-right: 20px"
                >添加计划</span
              >
              <span @click="modifyPlan(scope.row.pid, 'modify')">修改计划</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="定时设置"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="45%"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="计划名称" v-if="tableStatus == 'add'">
          <el-input
            v-model="formInline.user"
            placeholder="计划名称"
            @change="addTitleName"
          ></el-input>
        </el-form-item>

        <el-form-item v-if="tableStatus == 'add'">
          <el-button type="primary" @click="addTaskFun">确定计划名称</el-button>
        </el-form-item>
        <el-form-item v-if="tableStatus == 'add'">
          <el-button type="primary" @click="setTime('time')"
            >设置时间</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectDevice('device')">
            {{ tableStatus == "add" ? "选择设备" : "添加设备" }}
          </el-button>
        </el-form-item>
        <el-form-item v-if="tableStatus != 'add'">
          <el-button
            type="primary"
            @click="(deleteDeviceVisible = true), deleteDevice()"
            >删除设备</el-button
          >
        </el-form-item>
      </el-form>
      <template v-if="tableStatus == 'modify'">
        <el-table
          :data="PowerOn"
          style="width: 100%"
          height="500px"
          :span-method="objectSpanMethod"
        >
          <el-table-column prop="name" label="定时时间" align="center">
          </el-table-column>
          <el-table-column prop="on" label="功率时间" align="center">
            <template slot-scope="scope">
              <p>{{ scope.row.on }}-{{ scope.row.off }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="off" label="最小功率" align="center">
            <template slot-scope="scope">
              <p>
                {{ scope.row.min }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="off" label="最大功率" align="center">
            <template slot-scope="scope">
              <p>
                {{ scope.row.max }}
              </p>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span style="color: blue" @click="ModificationTime(scope.row)"
                >修改时间</span
              >
            </template>
            <!-- <el-button type="primary" @click="setTime('time')"
              >设置时间</el-button
            > -->

            <!-- <el-button type="primary" @click="selectDevice('device')">
              {{ tableStatus == "add" ? "选择设备" : "添加设备" }}
            </el-button> -->
          </el-table-column>
        </el-table>
      </template>

      <el-steps :active="4" align-center v-if="tableStatus == 'add'">
        <el-step title="步骤1" description="确定计划名称"></el-step>
        <el-step title="步骤2" description="选择设备"></el-step>
        <el-step title="步骤3" description="设置时间"></el-step>
        <el-step title="步骤4" description="点击确定"></el-step>
      </el-steps>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setTrue()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="35%"
      title="设置时间"
      :visible.sync="innerVisible"
      append-to-body
      :close-on-click-modal="false"
    >
      <div v-if="tableStatus == 'add'">
        <el-radio-group v-model="radio1">
          <el-radio-button label="10000000">每天</el-radio-button>
          <el-radio-button label="1">周一</el-radio-button>
          <el-radio-button label="10">周二</el-radio-button>
          <el-radio-button label="100">周三</el-radio-button>
          <el-radio-button label="1000">周四</el-radio-button>
          <el-radio-button label="10000">周五</el-radio-button>
          <el-radio-button label="100000">周六</el-radio-button>
          <el-radio-button label="1000000">周日</el-radio-button>
        </el-radio-group>
      </div>

      <el-row :gutter="20">
        <h3 style="margin-top: 30px">时间段选择:</h3>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-col :span="12" style="margin-bottom: 10px">
              <el-time-picker
                v-model="timeValue_left.one"
                placeholder="合闸时间点"
                style="width: 100%"
                value-format="HHmmss"
              >
              </el-time-picker>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px"
              ><el-time-picker
                v-model="timeValue_right.one"
                placeholder="分闸时间点"
                style="width: 100%"
                value-format="HHmmss"
              >
              </el-time-picker
            ></el-col>
            <el-col :span="12" style="margin-bottom: 10px">
              <el-time-picker
                v-model="timeValue_left.two"
                placeholder="合闸时间点"
                style="width: 100%"
                value-format="HHmmss"
              >
              </el-time-picker>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px"
              ><el-time-picker
                v-model="timeValue_right.two"
                placeholder="分闸时间点"
                style="width: 100%"
                value-format="HHmmss"
              >
              </el-time-picker
            ></el-col>
            <el-col :span="12" style="margin-bottom: 10px">
              <el-time-picker
                v-model="timeValue_left.three"
                placeholder="合闸时间点"
                style="width: 100%"
                value-format="HHmmss"
              >
              </el-time-picker>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px"
              ><el-time-picker
                v-model="timeValue_right.three"
                placeholder="分闸时间点"
                style="width: 100%"
                value-format="HHmmss"
              >
              </el-time-picker
            ></el-col>
            <el-col :span="12" style="margin-bottom: 10px">
              <el-time-picker
                v-model="timeValue_left.four"
                placeholder="合闸时间点"
                style="width: 100%"
                value-format="HHmmss"
              >
              </el-time-picker>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px"
              ><el-time-picker
                v-model="timeValue_right.four"
                placeholder="分闸时间点"
                style="width: 100%"
                value-format="HHmmss"
              >
              </el-time-picker
            ></el-col>
          </el-col>
          <el-col :span="10">
            <el-col :span="12" style="margin-bottom: 10px">
              <el-input placeholder="最小功率" v-model="power.minPower_one" />
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px">
              <el-input placeholder="最大功率" v-model="power.maxPower_one" />
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px">
              <el-input placeholder="最小功率" v-model="power.minPower_two" />
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px">
              <el-input placeholder="最大功率" v-model="power.maxPower_two" />
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px">
              <el-input placeholder="最小功率" v-model="power.minPower_three" />
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px">
              <el-input placeholder="最大功率" v-model="power.maxPower_three" />
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px">
              <el-input placeholder="最小功率" v-model="power.minPower_four" />
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px">
              <el-input placeholder="最大功率" v-model="power.maxPower_four" />
            </el-col>
          </el-col>
        </el-row>

        <el-button type="primary" style="margin-top: 10px" @click="timeTrueBtn"
          >保存</el-button
        >
      </el-row>
    </el-dialog>

    <el-dialog
      width="32%"
      title="选择设备"
      :visible.sync="devVisible"
      append-to-body
      :close-on-click-modal="false"
    >
      {{ getAllDeviceWapper.length == 0 ? "暂无设备" : "" }}
      <template>
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="item in getAllDeviceWapper"
            :label="item.productNumber"
            :key="item.productNumber"
            >{{ item.productNumber }}</el-checkbox
          >
        </el-checkbox-group>
      </template>
      <el-button type="primary" @click="(devVisible = false), addDevice()"
        >确定</el-button
      >
    </el-dialog>

    <el-dialog
      width="32%"
      title="修改计划"
      :visible.sync="modifyPlanVisible"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-table border :data="getTaskWapper" style="width: 100%" height="400px">
        <el-table-column prop="task_name" label="计划名称" width="380">
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <span
              style="margin-right: 20px; color: blue"
              @click="getTaskTimeFun(scope.row.tid)"
              >修改</span
            >
            <span style="color: blue" @click="deletTask(scope.row.tid)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      width="32%"
      title="删除设备"
      :visible.sync="deleteDeviceVisible"
      append-to-body
      :close-on-click-modal="false"
    >
      <template>
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="item in deleteDeviceArr"
            :label="item.id.toString()"
            :key="item.imei"
            >{{ item.imei }}</el-checkbox
          >
        </el-checkbox-group>

        <el-button type="primary" @click="deleteTrueBtn">确定删除</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDeviceStatus,
  getDevTime,
  delTimerDevice,
  addTask,
  getAllDevice,
  getAllProjecForState,
  getAllTimerDevice,
  addTaskTime,
  getTaskName,
  getTaskTime,
  sendTime,
  deleteTask,
  addDeviceTask,
  updateTask,
  delTaskDevice,
} from "@/api/index.js";

export default {
  data() {
    return {
      tableStatus: "",
      getTaskWapper: [],
      devVisible: false,
      radio1: "10000000",
      innerVisible: false,
      deleteDeviceVisible: false,
      modifyPlanVisible: false,
      formInline: {
        proName: "",
        imei: "",
      },
      DeviceTime: "",
      TypeRadio: "1",
      currentPage4: 1,
      checkList: [],
      timeValue_left: {
        one: "000000",
        two: "000000",
        three: "000000",
        four: "000000",
      },
      timeValue_right: {
        one: "000000",
        two: "000000",
        three: "000000",
        four: "000000",
      },
      power: {
        minPower_one: "",
        maxPower_one: "",
        minPower_two: "",
        maxPower_two: "",
        minPower_three: "",
        maxPower_three: "",
        minPower_four: "",
        maxPower_four: "",
      },
      dialogVisible: false,
      tableData: [],
      current: 10,
      size: 1,
      totals: 1,
      checkAll: false,
      checkedCities: [],

      isIndeterminate: true,
      getAllDeviceWapper: [],
      PowerOn: [],
      PowerOff: [],
      deleteDeviceArr: [],
    };
  },

  mounted() {
    this.getAllProjecForStateFun(1000, 1);
    let num = 158;
    let str = num.toString(16);
    //console.log(str, "str");
  },
  methods: {
    deleteTrueBtn() {
      delTaskDevice(this.handleCheckedCitiesChangeValue, 2).then((res) => {
        if (res.data.code == 200) {
          this.getTaskTimeFun_action(this.setTiemData);
          this.deleteDeviceVisible = false;
          this.$message.success("删除设备成功");
        }
      });
    },
    //删除设备
    deleteDevice() {
      this.deleteDeviceArr = [];
      this.getTaskTimeWapper.device.forEach((el, index) => {
        this.deleteDeviceArr.push({ imei: el.imei, id: el.id });
      });
    },
    setTrue() {
      this.dialogVisible = false;
      sendTime(this.setTiemData).then((res) => {});
    },
    // 设置时间保存按钮
    timeTrueBtn() {
      // this.innerVisible = false;
      let leftArr = [];
      let rightArr = [];
      let num_one =
        this.timeValue_left.one +
        this.timeValue_right.one +
        this.power.minPower_one * 1 +
        ":" +
        this.power.maxPower_one * 1;
      let num_two =
        this.timeValue_left.two +
        this.timeValue_right.two +
        this.power.minPower_two * 1 +
        ":" +
        this.power.maxPower_two * 1;
      let num_three =
        this.timeValue_left.three +
        this.timeValue_right.three +
        this.power.minPower_three * 1 +
        ":" +
        this.power.maxPower_three * 1;
      let num_four =
        this.timeValue_left.four +
        this.timeValue_right.four +
        this.power.minPower_four * 1 +
        ":" +
        this.power.maxPower_four * 1;
      //console.log(num_one, num_two, num_three, num_four);
      for (let key in this.timeValue_left) {
        leftArr.push(this.timeValue_left[key]);
        if (this.timeValue_left[key] == null) {
          return this.$message.error("请选择时间或默认00:00:00");
        }
      }
      for (let key in this.timeValue_right) {
        rightArr.push(this.timeValue_right[key]);
        if (this.timeValue_right[key] == null) {
          return this.$message.error("请选择时间或默认00:00:00");
        }
      }
      if (this.tableStatus == "add") {
        addTaskTime(
          this.handleCheckedCitiesChangeValue,
          `${num_one},${num_two},${num_three},${num_four}`,
          this.radio1,
          this.setTiemData
        ).then((res) => {
          // //console.log(res, 3218390217389127);
          if (res.data.code == 401) {
            return this.$message.error(res.data.msg);
            // this.dialogVisible = false;
          }
          if (res.data.code == 200) {
            this.$message.success("已保存当前设置");
          }
        });
      } else {
        updateTask(
          this.row.ids,
          `${num_one},${num_two},${num_three},${num_four}`,
          this.row.week
        ).then((res) => {
          if (res.data.code == 200) {
            this.$message.success("修改成功");
            this.getTaskTimeFun_action(this.setTiemData);
            this.innerVisible = false;
          }
        });
      }
    },

    //全选按钮函数
    handleCheckAllChange(val) {
      // this.checkedCities = val ? this.getAllDeviceWapper : [];
      // //console.log((this.checkedCities = val), this.checkedCities);
      this.isIndeterminate = false;
      //console.log(val, "我是VAL");
    },
    //单选按钮函数
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.getAllDeviceWapper.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.getAllDeviceWapper.length;
      //console.log(value, "我是VALUE");
      this.handleCheckedCitiesChangeValue = value.toString();
    },
    //选择设备函数
    selectDevice() {
      this.checkedCities = [];
      this.getAllDeviceWapper = [];
      if (this.tableStatus == "add") {
        if (this.setTiemData == undefined) {
          return this.$message.error("请先添加计划名称");
        }
      }
      this.devVisible = true;
      getAllDevice(this.pid, this.setTiemData).then((res) => {
        //console.log(res.data);
        this.getAllDeviceWapper = res.data.data;
      });
    },
    //选择时间函数
    setTime() {
      // //console.log(this.handleCheckedCitiesChangeValue, 31280198);
      if (this.tableStatus == "add") {
        if (this.setTiemData == undefined) {
          return this.$message.error("请先添加计划名称");
        }
        if (this.handleCheckedCitiesChangeValue == undefined) {
          return this.$message.error("请先选择设备");
        }
      }

      // this.addTaskFun(num);
      this.innerVisible = true;
    },
    //修复时间函数
    ModificationTime(row) {
      this.innerVisible = true;

      this.row = row;

      //清空输入框
      this.timeValue_left = {
        one: "000000",
        two: "000000",
        three: "000000",
        four: "000000",
      };
      this.timeValue_right = {
        one: "000000",
        two: "000000",
        three: "000000",
        four: "000000",
      };
      this.power = {
        minPower_one: "",
        maxPower_one: "",
        minPower_two: "",
        maxPower_two: "",
        minPower_three: "",
        maxPower_three: "",
        minPower_four: "",
        maxPower_four: "",
      };
    },
    addTaskFun() {
      // //console.log(this.addTitleNameData, 66);
      if (this.addTitleNameData == undefined) {
        return this.$message.error("请先输入计划名称");
      }
      addTask(this.utils.userName, this.addTitleNameData, this.pid, 2).then(
        (res) => {
          if (res.data.code == 401) {
            return this.$message.error(res.data.msg);
          } else {
            this.$message.success("添加成功");
          }

          // if (num == "device") {
          //   this.devVisible = true;
          // } else {
          //   this.innerVisible = true;
          // }
          this.setTiemData = res.data.data;
        }
      );
    },
    addTitleName(data) {
      this.addTitleNameData = data;
      //console.log(data, 46546);
    },
    onSubmit() {
      //console.log("submit!");
      // this.getDeviceStatusFun();
      this.getAllProjecForStateFun(1000, 1);
    },
    handleSizeChange(val) {
      this.current = val;
      // //console.log(`每页 ${val} 条`);
      this.getAllProjecForStateFun();
    },
    handleCurrentChange(val) {
      // //console.log(`当前页: ${val}`);
      this.size = val;
      this.getAllProjecForStateFun();
    },

    getAllProjecForStateFun(ls, cp) {
      let col = "";
      let kw = "";
      let state = 0;
      // let ls = 10;
      // let cp = 1;
      getAllProjecForState(
        this.utils.userName,
        this.size,
        col,
        state,
        kw,
        this.current,
        this.formInline.proName
      ).then((res) => {
        this.tableData = res.data.list[0].allObj;
        //console.log(this.tableData);
        this.totals = res.data.list[0].count;
      });
    },

    set(dev, num, pid, stauts) {
      this.tableStatus = stauts;
      this.timeValue = "";
      this.dialogVisible = true;
      this.productNumber = num;
      this.pid = pid;
      this.setTiemData = undefined;
      getAllTimerDevice(this.utils.userName, num).then((res) => {
        //console.log(res.data.data);
        this.DeviceTime = res.data.data[0];
        //console.log(this.DeviceTime);
      });
    },
    modifyPlan(pid, stauts) {
      this.pid = pid;
      this.tableStatus = stauts;
      this.modifyPlanVisible = true;
      getTaskName(pid, 2).then((res) => {
        this.getTaskWapper = res.data.data;
      });
    },
    getTaskTimeFun(tid) {
      this.setTiemData = tid;
      this.dialogVisible = true;

      this.getTaskTimeFun_action(tid);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
      if (columnIndex === 4) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    getTaskTimeFun_action(tid) {
      this.PowerOn = [];
      getTaskTime(tid).then((res) => {
        if (res.data.code != 200) {
          return this.$message.error(res.data.msg);
        }
        this.getTaskTimeWapper = res.data.data;

        this.getTaskTimeWapper.data.forEach((el, index) => {
          //console.log(el.ids, 21312);
          switch (el.week) {
            case "10000000":
              const arrWapper8 = [];
              const timeArr8 = el.time.split(",");

              timeArr8.forEach((e, i) => {
                e.substring(0, 6);
                e.substring(6, 12);
                console.log(
                  e.substring(0, 6),
                  e.substring(6, 12),
                  e.substring(12)
                );
                arrWapper8.push({
                  minPower: e.substring(12).split(":")[0],
                  maxPower: e.substring(12).split(":")[1],
                  startTime: e.substring(0, 6),
                  endTime: e.substring(6, 12),
                });
              });

              arrWapper8.forEach((item, index2) => {
                let reg = new RegExp("\\d{1," + 2 + "}", "g");
                let start = item.startTime.substring(0, 6).match(reg);
                let end = item.endTime.substring(0, 6).match(reg);
                if (index2 <= 3) {
                  this.PowerOn.push({
                    name: "每天",
                    on: start.join(":"),
                    off: end.join(":"),
                    ids: el.ids.toString(),
                    min: item.minPower,
                    max: item.maxPower,
                    week: el.week,
                  });
                }
              });

              break;
            case "1":
              const arrWapper = [];
              const timeArr = el.time.split(",");

              timeArr.forEach((e, i) => {
                e.substring(0, 6);
                e.substring(6, 12);
                console.log(
                  e.substring(0, 6),
                  e.substring(6, 12),
                  e.substring(12)
                );
                arrWapper.push({
                  minPower: e.substring(12).split(":")[0],
                  maxPower: e.substring(12).split(":")[1],
                  startTime: e.substring(0, 6),
                  endTime: e.substring(6, 12),
                });
              });
              console.log(arrWapper, 66987);
              arrWapper.forEach((item, index2) => {
                if (index2 <= 3) {
                  let reg = new RegExp("\\d{1," + 2 + "}", "g");
                  let start = item.startTime.substring(0, 6).match(reg);
                  let end = item.endTime.substring(0, 6).match(reg);
                  this.PowerOn.push({
                    name: "周一",
                    on: start.join(":"),
                    off: end.join(":"),
                    ids: el.ids.toString(),
                    min: item.minPower,
                    max: item.maxPower,
                    week: el.week,
                  });
                }
              });

              break;
            case "10":
              const arrWapper2 = [];
              const timeArr2 = el.time.split(",");

              timeArr2.forEach((e, i) => {
                e.substring(0, 6);
                e.substring(6, 12);
                console.log(
                  e.substring(0, 6),
                  e.substring(6, 12),
                  e.substring(12)
                );
                arrWapper2.push({
                  minPower: e.substring(12).split(":")[0],
                  maxPower: e.substring(12).split(":")[1],
                  startTime: e.substring(0, 6),
                  endTime: e.substring(6, 12),
                });
              });
              arrWapper2.forEach((item, index2) => {
                let reg = new RegExp("\\d{1," + 2 + "}", "g");
                let start = item.startTime.substring(0, 6).match(reg);
                let end = item.endTime.substring(0, 6).match(reg);
                if (index2 <= 3) {
                  this.PowerOn.push({
                    name: "周二",
                    on: start.join(":"),
                    off: end.join(":"),
                    ids: el.ids.toString(),
                    min: parseInt(item.minPower, 16),
                    max: parseInt(item.maxPower, 16),
                    week: el.week,
                  });
                }
              });

              break;
            case "100":
              const arrWapper3 = [];
              const timeArr3 = el.time.split(",");

              timeArr3.forEach((e, i) => {
                e.substring(0, 6);
                e.substring(6, 12);
                console.log(
                  e.substring(0, 6),
                  e.substring(6, 12),
                  e.substring(12)
                );
                arrWapper3.push({
                  minPower: e.substring(12).split(":")[0],
                  maxPower: e.substring(12).split(":")[1],
                  startTime: e.substring(0, 6),
                  endTime: e.substring(6, 12),
                });
              });
              arrWapper3.forEach((item, index2) => {
                let reg = new RegExp("\\d{1," + 2 + "}", "g");
                let start = item.startTime.substring(0, 6).match(reg);
                let end = item.endTime.substring(0, 6).match(reg);
                if (index2 <= 3) {
                  this.PowerOn.push({
                    name: "周三",
                    on: start.join(":"),
                    off: end.join(":"),
                    ids: el.ids.toString(),
                    min: parseInt(item.minPower, 16),
                    max: parseInt(item.maxPower, 16),
                    week: el.week,
                  });
                }
              });

              break;
            case "1000":
              const arrWapper4 = [];
              const timeArr4 = el.time.split(",");

              timeArr4.forEach((e, i) => {
                e.substring(0, 6);
                e.substring(6, 12);
                console.log(
                  e.substring(0, 6),
                  e.substring(6, 12),
                  e.substring(12)
                );
                arrWapper4.push({
                  minPower: e.substring(12).split(":")[0],
                  maxPower: e.substring(12).split(":")[1],
                  startTime: e.substring(0, 6),
                  endTime: e.substring(6, 12),
                });
              });
              arrWapper4.forEach((item, index2) => {
                let reg = new RegExp("\\d{1," + 2 + "}", "g");
                let start = item.startTime.substring(0, 6).match(reg);
                let end = item.endTime.substring(0, 6).match(reg);
                if (index2 <= 3) {
                  this.PowerOn.push({
                    name: "周四",
                    on: start.join(":"),
                    off: end.join(":"),
                    ids: el.ids.toString(),
                    min: parseInt(item.minPower, 16),
                    max: parseInt(item.maxPower, 16),
                    week: el.week,
                  });
                }
              });

              break;
            case "10000":
              const arrWapper5 = [];
              const timeArr5 = el.time.split(",");

              timeArr5.forEach((e, i) => {
                e.substring(0, 6);
                e.substring(6, 12);
                console.log(
                  e.substring(0, 6),
                  e.substring(6, 12),
                  e.substring(12)
                );
                arrWapper5.push({
                  minPower: e.substring(12).split(":")[0],
                  maxPower: e.substring(12).split(":")[1],
                  startTime: e.substring(0, 6),
                  endTime: e.substring(6, 12),
                });
              });
              arrWapper5.forEach((item, index2) => {
                let reg = new RegExp("\\d{1," + 2 + "}", "g");
                let start = item.startTime.substring(0, 6).match(reg);
                let end = item.endTime.substring(0, 6).match(reg);
                if (index2 <= 3) {
                  this.PowerOn.push({
                    name: "周五",
                    on: start.join(":"),
                    off: end.join(":"),
                    ids: el.ids.toString(),
                    min: parseInt(item.minPower, 16),
                    max: parseInt(item.maxPower, 16),
                    week: el.week,
                  });
                }
              });

              break;
            case "100000":
              const arrWapper6 = [];
              const timeArr6 = el.time.split(",");

              timeArr6.forEach((e, i) => {
                e.substring(0, 6);
                e.substring(6, 12);
                console.log(
                  e.substring(0, 6),
                  e.substring(6, 12),
                  e.substring(12)
                );
                arrWapper6.push({
                  minPower: e.substring(12).split(":")[0],
                  maxPower: e.substring(12).split(":")[1],
                  startTime: e.substring(0, 6),
                  endTime: e.substring(6, 12),
                });
              });
              arrWapper6.forEach((item, index2) => {
                let reg = new RegExp("\\d{1," + 2 + "}", "g");
                let start = item.startTime.substring(0, 6).match(reg);
                let end = item.endTime.substring(0, 6).match(reg);
                if (index2 <= 3) {
                  this.PowerOn.push({
                    name: "周六",
                    on: start.join(":"),
                    off: end.join(":"),
                    ids: el.ids.toString(),
                    min: parseInt(item.minPower, 16),
                    max: parseInt(item.maxPower, 16),
                    week: el.week,
                  });
                }
              });

              break;
            case "1000000":
              const arrWapper7 = [];
              const timeArr7 = el.time.split(",");

              timeArr7.forEach((e, i) => {
                e.substring(0, 6);
                e.substring(6, 12);
                console.log(
                  e.substring(0, 6),
                  e.substring(6, 12),
                  e.substring(12)
                );
                arrWapper7.push({
                  minPower: e.substring(12).split(":")[0],
                  maxPower: e.substring(12).split(":")[1],
                  startTime: e.substring(0, 6),
                  endTime: e.substring(6, 12),
                });
              });
              arrWapper7.forEach((item, index2) => {
                if (index2 <= 3) {
                  let reg = new RegExp("\\d{1," + 2 + "}", "g");
                  let start = item.startTime.substring(0, 6).match(reg);
                  let end = item.endTime.substring(0, 6).match(reg);

                  this.PowerOn.push({
                    name: "周日",
                    on: start.join(":"),
                    off: end.join(":"),
                    ids: el.ids.toString(),
                    min: parseInt(item.minPower, 16),
                    max: parseInt(item.maxPower, 16),
                    week: el.week,
                  });
                }
              });

              break;
          }
          //console.log(this.PowerOn, 6487);
        });
      });
    },
    deletTask(tid) {
      this.$confirm("此操作将永久删除该计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteTask(tid).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              getTaskName(this.pid, 2).then((res) => {
                this.getTaskWapper = res.data.data;
              });
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
    addDevice() {
      addDeviceTask(this.handleCheckedCitiesChangeValue, this.setTiemData).then(
        (res) => {
          if (res.data.code == 200) {
            this.$message.success("添加成功");
            this.getTaskTimeFun_action(this.setTiemData);
          }
        }
      );
    },
  },
};
</script>
<style lang='less' scoped>
#BaoJingGuZhang {
  .caozuo {
    cursor: pointer;
    color: blue;
  }
  .block {
    position: absolute;
    bottom: 30px;
    right: 50px;
  }

  h3 {
    margin-top: 20px;
  }
}

/deep/.el-dialog__header {
  background: #1071e2;
}
/deep/.el-dialog__title {
  color: #fff;
}
</style>