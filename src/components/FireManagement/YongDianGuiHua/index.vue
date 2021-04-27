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
      <el-form-item label="设备编号">
        <el-input v-model="formInline.imei" placeholder="设备编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="tableData" style="width: 100%" height="650px" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="项目名称"> </el-table-column>
        <el-table-column prop="location" label="项目位置"> </el-table-column>
        <el-table-column prop="productNumber" label="设备编号">
        </el-table-column>
        <!-- <el-table-column prop="address" label="事件详情"> </el-table-column> -->
        <el-table-column prop="heartbeatTime" label="心跳时间">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="caozuo">
              <span
                @click="set(scope.row.devId, scope.row.productNumber)"
                style="margin-right: 20px"
                >添加计划</span
              >
              <span @click="set(scope.row.devId, scope.row.productNumber)"
                >修改计划</span
              >
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
      width="32%"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="计划名称">
          <el-input v-model="formInline.user" placeholder="计划名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="innerVisible = true"
            >设置时间</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="devVisible = true"
            >选择设备</el-button
          >
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="(dialogVisible = false), setTrue()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      width="32%"
      title="设置时间"
      :visible.sync="innerVisible"
      append-to-body
    >
      <div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="每天"></el-radio-button>
          <el-radio-button label="周一"></el-radio-button>
          <el-radio-button label="周二"></el-radio-button>
          <el-radio-button label="周三"></el-radio-button>
          <el-radio-button label="周四"></el-radio-button>
          <el-radio-button label="周五"></el-radio-button>
          <el-radio-button label="周六"></el-radio-button>
          <el-radio-button label="周日"></el-radio-button>
        </el-radio-group>
      </div>

      <el-row :gutter="20">
        <el-col :span="17">
          <h3 style="margin-top: 30px">时间段选择:</h3>
          <el-time-picker
            is-range
            style="margin-top: 10px"
            v-model="timeValue"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
          <el-time-picker
            style="margin-top: 10px"
            is-range
            v-model="timeValue"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
          <el-time-picker
            is-range
            style="margin-top: 10px"
            v-model="timeValue"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
          <el-time-picker
            is-range
            style="margin-top: 10px"
            v-model="timeValue"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-col>
        <!-- <el-col :span="7">
          <h3 style="margin-top: 30px">模式选择:</h3>

          <el-radio-group v-model="radio1" style="margin-top: 10px">
            <el-radio label="先开后关"></el-radio>
            <el-radio label="先关后开"></el-radio>
          </el-radio-group>
        </el-col> -->
      </el-row>
    </el-dialog>

    <el-dialog
      width="32%"
      title="选择设备"
      :visible.sync="devVisible"
      append-to-body
    >
      <!-- <h3>项目名称:</h3>
      <div>选择设备:</div> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  getDeviceStatus,
  getDevTime,
  delTimerDevice,
  getAllProjecForState,
  getAllTimerDevice,
} from "@/api/index.js";
export default {
  data() {
    return {
      devVisible: false,
      radio1: "每天",
      innerVisible: false,
      formInline: {
        proName: "",
        imei: "",
      },
      DeviceTime: "",
      TypeRadio: "1",
      currentPage4: 1,
      checkList: [],
      timeValue: "",
      dialogVisible: false,
      tableData: [],
      current: 10,
      size: 1,
      totals: 1,
    };
  },
  mounted() {
    this.getAllProjecForStateFun(10,1);
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      // this.getDeviceStatusFun();
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
    // getDeviceStatusFun() {
    //   getDeviceStatus(
    //     this.utils.userName,
    //     this.size,
    //     "",
    //     this.current,
    //     this.formInline.imei || this.formInline.proName,
    //     3,
    //     this.utils.userName,
    //     1 //在线:1 离线:0
    //   ).then((res) => {
    //     this.tableData = res.data.list;
    //     this.totals = res.data.total * 1;
    //   });
    // },

     getAllProjecForStateFun(ls, cp) {
      let col = "";
      let kw = "";
      let state = 0;
      // let ls = 10;
      // let cp = 1;
      getAllProjecForState(
        this.utils.userName,
        cp,
        col,
        state,
        kw,
        ls,
        this.formInline.user
      ).then((res) => {
        this.tableData = res.data.list[0].allObj;
        console.log(this.tableData);
        this.total = res.data.list[0].count;
      });
    },


    set(dev, num) {
      this.timeValue = "";
      this.dialogVisible = true;
      this.productNumber = num;
      getAllTimerDevice(this.utils.userName, num).then((res) => {
        console.log(res.data.data);
        this.DeviceTime = res.data.data[0];
        console.log(this.DeviceTime);
      });
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