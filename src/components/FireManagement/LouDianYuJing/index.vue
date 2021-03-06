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
        <el-table-column prop="date" label="项目名称" width="180">
        </el-table-column>
        <el-table-column prop="name" label="项目位置" width="180">
        </el-table-column>
        <el-table-column prop="address" label="设备编号"> </el-table-column>
        <el-table-column prop="address" label="事件详情"> </el-table-column>
        <el-table-column prop="address" label="事件时间"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="caozuo">
              <span>查看</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { getAllAlarmOrFault } from "@/api/index.js";
export default {
  data() {
    return {
      formInline: {
        proName: "",
        imei: "",
      },
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
    };
  },
  mounted() {},
  methods: {
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