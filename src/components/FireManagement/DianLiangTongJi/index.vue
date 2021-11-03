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
        <el-table-column prop="productNumber" label="设备编号">
        </el-table-column>
        <el-table-column prop="installLocation" label="项目位置">
        </el-table-column>
        <!-- <el-table-column prop="policy" label="月用电量"> </el-table-column> -->
        <!-- <el-table-column prop="address" label="事件详情"> </el-table-column> -->
        <el-table-column prop="heartbeatTime" label="计量时间">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="caozuo">
              <span @click="set(scope.row.productNumber)">查看</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <span class="demonstration">完整功能</span>
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
      title="查看"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-date-picker
        v-model="value2"
        type="month"
        value-format="MM"
        placeholder="选择月"
        @change="monthChange"
      >
      </el-date-picker>
      <el-card class="box-card" style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>用电量</span>
        </div>
        <div class="echart"></div>
      </el-card>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDeviceStatus,
  getDevicePowerDian,
  getAllDeviceWeb,
} from "@/api/index.js";
export default {
  data() {
    return {
      formInline: {
        proName: "",
        imei: "",
      },
      value2: "",
      currentPage4: 1,
      checkList: [],
      timeValue: "",
      dialogVisible: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      current: 10,
      size: 1,
      totals: 1,
    };
  },
  mounted() {
    this.getDeviceStatusFun();
  },
  methods: {
    monthChange(e) {
      this.getDevicePowerDianFun();
    },
    onSubmit() {
      this.getDeviceStatusFun();
    },
    handleSizeChange(val) {
      this.current = val;
      // console.log(`每页 ${val} 条`);
      this.getDeviceStatusFun();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.size = val;
      this.getDeviceStatusFun();
    },
    getDeviceStatusFun() {
      // getAllDeviceWeb(
      //   this.utils.userName,
      //   this.size,
      //   "",
      //   this.current,
      //   this.formInline.proName,
      //   3,
      //   this.utils.userName,
      //   "0" //在线:1 离线:0
      // ).then((res) => {
      //   this.tableData = res.data.list;
      //   this.totals = res.data.total * 1;
      // });

      let col = "";
      let kw = "";
      let state = 0;
      // let ls = 10;
      // let cp = 1;
      getAllDeviceWeb(
        this.utils.userName,
        this.size,

        col,
        state,
        kw,
        this.current,
        this.formInline.user,
        this.optionsValue
      ).then((res) => {
        this.tableData = res.data.list[0].allObj;
        console.log(this.getAllDeviceWeb_list);
        this.totals = res.data.list[0].count;
      });
    },
    getDevicePowerDianFun() {
      getDevicePowerDian(this.utils.userName, this.imei, this.value2).then(
        (res) => {
          let time = [];
          let data = [];
          let arr = [];
          console.log(this.value2, "dsadsa");
          if (this.value2 != "" && this.value2 != null) {
            if (res.data.dayData.length == 0) {
              return this.$message.error("设备暂无用电数据");
            } else {
              arr = res.data.dayData;
            }
          } else {
            if (res.data.monthData.length == 0) {
              return this.$message.error("设备暂无用电数据");
            } else {
              arr = res.data.monthData;
            }
          }

          arr.forEach((item, index) => {
            time.push(item.date);
            data.push(item.phasepowerkw);

            this.$nextTick(() => {
              let shui_echart = this.$echarts.init(
                document.querySelector(".echart")
              );
              shui_echart.setOption({
                xAxis: {
                  type: "category",
                  data: time,
                },
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    type: "cross",
                    label: {
                      backgroundColor: "#6a7985",
                    },
                  },
                },
                yAxis: {
                  type: "value",
                },
                series: [
                  {
                    data,
                    type: "line",
                  },
                ],
              });
            });
          });
        }
      );
    },
    set(productNumber) {
      this.dialogVisible = true;
      this.imei = productNumber;
      this.getDevicePowerDianFun();
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
  .echart {
    height: 300px;
  }
}
</style>