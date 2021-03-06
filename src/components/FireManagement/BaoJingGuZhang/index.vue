<template>
  <div id="BaoJingGuZhang">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="事件状态:">
        <el-button-group>
          <el-button>全部</el-button>
          <el-button>报警</el-button>
          <el-button>故障</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="项目名称">
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="pname" label="项目名称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="项目位置" width="180">
        </el-table-column>
        <el-table-column prop="devno" label="设备编号"> </el-table-column>
        <el-table-column prop="type" label="事件详情"> </el-table-column>
        <el-table-column prop="regdate" label="事件时间"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="caozuo">
              <span @click="see(scope.row.devId)">查看</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <baojingTranslate ref="baojingTranslate" />
  </div>
</template>

<script>
import baojingTranslate from "../../FireInternetOfThings/translate/baojingTranslate";
import { getAlarmDevice } from "@/api/index.js";
export default {
  data() {
    return {
      formInline: {
        proName: "",
        imei: "",
      },
      tableData: [],
    };
  },
  mounted() {
    this.DeviceAlarmFun();
  },
  components: {
    baojingTranslate,
  },
  methods: {
    see(data) {
      this.$refs.baojingTranslate.see(264224);
    },
    DeviceAlarmFun() {
      getAlarmDevice(this.utils.userName, 1, "", 10, "").then((res) => {
        this.tableData = res.data.list;
      });
    },
    onSubmit() {
      console.log("submit!");
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
}
</style>