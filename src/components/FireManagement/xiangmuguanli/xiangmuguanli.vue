<template>
  <div id="xiangmuguanli">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <!-- <el-form-item label="项目名称">
        <el-input v-model="formInline.user" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="防火员">
        <el-input v-model="formInline.user" placeholder="防火员"></el-input>
      </el-form-item> -->
      <el-form-item label="内容">
        <el-input v-model="formInline.user" placeholder="负责人"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getAllProjecForStateFun(10,1)">查询</el-button>

        <el-button type="primary" @click="addNewOpenFun('新增')">新增项目 </el-button>
        <el-button type="primary" @click="deletFun"
          >删除责任人和防火员</el-button
        >
      </el-form-item>
    </el-form>
    <div class="tabs">
      <el-table
        ref="multipleTable"
        :data="getAllProjecForState_list"
        tooltip-effect="dark"
        style="width: 100%"
        height="650px"
        border
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="项目名称" width="120">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="location" label="项目位置"> </el-table-column>
        <el-table-column prop="fireman" label="防火员" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="firemanPhone"
          label="防火员电话"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="legalman" label="责任人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="legalmanPhone"
          label="责任人电话"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="项目介绍" show-overflow-tooltip>
          无
        </el-table-column>
        <el-table-column prop="remark" label="说明" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="caozuo">
              <span
                @click="
                  (dialogVisible = true), bj_map(scope.row.devId, scope.$index)
                "
                >编辑</span
              >
              <span @click="open(scope.row.pid, scope.row.name)">删除</span>
              <span @click="newClick">新增设备</span>
            </div></template
          >
        </el-table-column>
      </el-table>
    </div>
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

    <!-- 弹窗部分-------------------------------- -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <el-form :inline="true" class="demo-form-inline" label-width="100px">
        <el-form-item label="项目名称">
          <el-input v-model="mapInfo.name" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="防火员">
          <!-- <el-input v-model="mapInfo.huilu" @focus="inputClick()">
           
            <el-button slot="append">新增</el-button></el-input
          > -->
          <el-select
            @focus="inputClick('防火员')"
            v-model="mapInfo.huilu"
            filterable
            placeholder="请选择"
            @change="setq($event,'防火员')"
            :filter-method="filter_method"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.user_name + item.phone"
              :value="item.pid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="addNew('0')">新增</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="应用场所">
          <el-input v-model="mapInfo.type" placeholder="审批人"></el-input>
        </el-form-item>

        <el-form-item label="责任人">
          <!-- <el-input v-model="mapInfo.shebei" placeholder="审批人">
            <el-button slot="append">新增</el-button></el-input
          > -->
          <el-select
            @focus="inputClick('责任人')"
            v-model="mapInfo.shebei"
            filterable
            placeholder="请选择"
            :loading="loading"
            @change="setq($event,'责任人')"
            :filter-method="filter_method"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.pid"
              :label="item.user_name + item.phone"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="addNew('1')">新增</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="说明">
          <el-input
            v-model="mapInfo.changshan"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="街道负责人">
          <!-- <el-input v-model="mapInfo.xintiao" placeholder="审批人">
            <el-button slot="append">新增</el-button>
          </el-input> -->
          <el-select
            @focus="inputClick('街道')"
            v-model="mapInfo.xintiao"
            filterable
            placeholder="请选择"
            @change="setq($event,'街道')"
            :filter-method="filter_method"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.user_name + item.phone"
              :value="item.pid"
            >
              {{ item.user_name + item.phone }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="addNew('3')">新增</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="介绍">
          <el-input
            v-model="mapInfo.remak"
            :disabled="true"
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
        <el-form-item label="网格员">
          <!-- <el-input v-model="mapInfo.zhuche" placeholder="审批人">
            <el-button slot="append">新增</el-button></el-input
          > -->
          <el-select
            @focus="inputClick('网格员')"
            v-model="mapInfo.zhuche"
            filterable
            placeholder="请选择"
            @change="setq($event,'网格员')"
            :filter-method="filter_method"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.user_name + item.phone"
              :value="item.pid.toString()"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" plain @click="addNew('2')">新增</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="项目位置">
          <el-tooltip
            class="item"
            effect="dark"
            :content="mapInfo.address"
            placement="right"
          >
            <el-input id="tipinput" v-model="mapInfo.address"></el-input>
          </el-tooltip>
        </el-form-item>
        <div id="container"></div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogVisible = false), addProjectFun()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 添加人员弹窗 -->
    <el-dialog title="添加" :visible.sync="outerVisible" width="20%">
      用户名:<el-input v-model="mapInfo.addUser"></el-input> 手机号:<el-input
        v-model="mapInfo.addPhone"
      ></el-input>
      备注 :<el-input v-model="mapInfo.addReamrk"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="(outerVisible = false), addTrue()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 删除防火员弹窗 -->
    <el-dialog title="删除" :visible.sync="deletVisible" width="20%">
      <p>删除责任人/防火员:</p>
      <el-select
        @focus="inputClick('防火员责任人')"
        v-model="mapInfo.delet"
        filterable
        placeholder="请选择"
        @change="setq"
        :filter-method="filter_method"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :value="item.pid"
          :label="item.user_name + item.phone"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(deletVisible = false), deletegalFireManFun()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 新增设备弹窗 -->
    <el-dialog title="新增设备" :visible.sync="addNewSheBeiVisible" width="40%">
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="设备编号">
          <el-input
            v-model="mapInfo.bianhao"
           
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
         <el-select v-model="shebeiListValue" placeholder="请选择">
          <el-option
            v-for="item in shebeiList"
            :key="item.value"
            :label="item.value"
            :value="item.label"
          >
          </el-option>
        </el-select>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="设备名称">
          <el-input
            v-model="mapInfo.name"
           
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input
            v-model="mapInfo.lnglat"
          
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="应用场所">
          <el-input
            v-model="mapInfo.changsuo"
         
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信推送">
          
              <el-radio v-model="mapInfo.duanxin" label="0">开启</el-radio>
              <el-radio v-model="mapInfo.duanxin" label="1">关闭</el-radio>
         
          <!-- <el-input
            v-model="mapInfo.duanxin"
          
            placeholder="请填写备注"
          ></el-input> -->
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="项目位置">
          <el-tooltip
            class="item"
            effect="dark"
            :content="mapInfo.address"
            placement="right"
          >
            <el-input id="tipinput" v-model="mapInfo.address"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="mapInfo.reamrk"
          
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
        <div id="container"></div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNewSheBeiVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewSheBeiVisible = false,addNewSheBeiTrue()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllProjecForState,
  getLegalFireMan,
  addLegalFireMan,
  addProject,
  deleDevice,
  deletegalFireMan,
  addDevice,
  newUpdateProjectSim,
} from "@/api/index.js";
export default {
  data() {
    return {
      addNewSheBeiVisible: false,
      outerVisible: false,
      getAllProjecForState_list: [],
      dialogVisible: false,
      deletVisible: false,
      loading: false,
      formInline: {
        user: "",
        region: "",
      },
      total: 0,
      currentPage4: 1,
      handleSizeChangeValue: 10,
      mapInfo: {
        name: "",
        zeRenRen: "",
        zeRenRenPhone: "",
        wangGeYuan: "",
        wangGeYuanPhone: "",
        jieDao: "",
        jieDaoPhone: "",
        newType: "",
      },
      options: [],
      shebeiListValue: "",
      shebeiList: [
        {
          value: "",
          label: "",
        },
        {
          value: "网关",
          label: "0",
        },
        {
          value: "烟感",
          label: "2",
        },
        {
          value: "电气",
          label: "3",
        },
        {
          value: "水压",
          label: "4",
        },
        {
          value: "消防主机",
          label: "5",
        },
        {
          value: "无线气感",
          label: "6",
        },
        {
          value: "粉尘设备",
          label: "7",
        },
        {
          value: "液位",
          label: "8",
        },
        {
          value: "录像",
          label: "9",
        },
        {
          value: "消防门磁",
          label: "10",
        },
        {
          value: "工业燃气",
          label: "11",
        },
        {
          value: "电气火灾探测器",
          label: "12",
        },
        {
          value: "声光报警器",
          label: "15",
        },
        {
          value: "手动报警",
          label: "16",
        },
        {
          value: "水浸报警",
          label: "18",
        },
        {
          value: "紧急报警",
          label: "19",
        },
      ],
      newType: "",
    };
  },
  mounted() {
    this.getAllProjecForStateFun(10, 1);
  },
  methods: {
    //删除防火员和责任人
    deletegalFireManFun() {
      deletegalFireMan(this.mapInfo.delet).then(
        (res) => {
          if (res.data.list[0].status == "true") {
            this.$message.success("删除成功");
          } else {
            this.$message.error(res.data.list[0].mess);
          }
        },
        (rej) => {
          this.$message.error("请稍后重试或联系管理员");
        }
      );
    },
    //删除防火员和责任人
    deletFun() {
      this.deletVisible = true;
      this.mapInfo.delet = "";
    },
    // 添加项目函数
    addProjectFun() {
      console.log(this.newType);

      if (this.newType == "新增") {
        addProject(
          this.utils.userName,
          this.mapInfo.name, //项目名称
          this.mapInfo.address, //项目地址
          this.mapInfo.huilu, //防火员
          this.mapInfo.shebei, //责任人
          this.mapInfo.remak, //备注
          this.lanlat,
          this.mapInfo.type, //应用场所
          this.mapInfo.xintiao, //街道
          this.mapInfo.zhuche, //网格员
          this.mapInfo.xintiao
        ).then(
          (res) => {
            if (res.data.list[0].status == "true") {
              this.$message.success("添加成功");
            } else {
              this.$message.error(res.data.list[0].mess);
            }
          },
          (rej) => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      } else {
        // this.mapInfo.name = "";

        newUpdateProjectSim(
          this.mapInfo.pid,
          this.mapInfo.address,
          this.utils.userName,
          this.mapInfo.huilu,
          this.mapInfo.zeRenRen,
          this.mapInfo.zeRenRenPhone,
          this.mapInfo.lanlat,
          this.mapInfo.name,
          this.mapInfo.wangGeYuan,
          this.mapInfo.wangGeYuanPhone,
          this.mapInfo.jieDao,
          this.mapInfo.jieDaoPhone,
          this.mapInfo.lanlat
        ).then(
          (res) => {
            if (res.data.status == "true") {
              this.$message.success("添加成功");
            } else {
              this.$message.error(res.data.mess);
            }
          },
          (rej) => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
        this.$forceUpdate();
      }
      // if(this.mapInfo)
      // console.log(this.mapInfo);
    },
    //添加人员打开弹窗
    addNewOpenFun(type) {
      //判断新增还是编辑
      console.log(type);
      this.newType = type;
      // console.log(this.mapInfo.newType);
      this.dialogVisible = true;
      this.mapInfo = [];
      this.mapFun();
    },
    //新增人员
    addNew(state) {
      this.mapInfo = [];
      // console.log(123);
      this.outerVisible = true;

      this.state = state;
    },
    addTrue() {
      let long_lat;
      let long_latbai;
      let ftelephone;

      addLegalFireMan(
        this.state,
        this.mapInfo.addUser,
        this.utils.userName,
        this.mapInfo.addPhone,
        this.mapInfo.addReamrk,
        long_lat,
        long_latbai,
        ftelephone
      ).then(
        (res) => {
          if (res.data.list[0].status == "true") {
            this.$message.success("添加成功");
          } else {
            this.$message.error(res.data.list[0].mess);
          }
        },
        (rej) => {
          this.$message.error("添加失败");
        }
      );
    },

    //搜索功能
    filter_method(val) {
      // console.log(val, "wwwwww");
      let arr = [];
      if (val) {
        this.loading = true;
        //val存在
        // console.log(this.optionsCopy.user_name.indexOf(val) > -1);
        this.options = this.optionsCopy.filter((item) => {
          // console.log(item);
          if (
            item.user_name.indexOf(val) > -1 ||
            item.phone.indexOf(val) > -1
          ) {
            arr.push(item);
            this.loading = false;
            return item;
          } else {
            //val为空时，还原数组
            this.options = this.optionsCopy.slice(0, 250);
            this.loading = false;
          }
        });
      }
    },
    //删除项目
    open(pid, name) {
      const powerId = sessionStorage.getItem("new_role");
      const rid = sessionStorage.getItem("power");
      this.$confirm(
        `此操作将永久删除 <span style='color:red'>${name}</span> 项目, 是否继续?`,

        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning",
        }
      )
        .then(() => {
          if (powerId == 1000 || rid.indexOf("10003005") != -1) {
            deleDevice(pid, this.utils.userName).then((res) => {
              if (res.data.list[0].status == "true") {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getAllProjecForStateFun(
                  this.handleSizeChangeValue,
                  this.handleCurrentChangeValue
                );
              } else {
                this.$message.error(res.data.list[0].mess);
              }
            });
          } else {
            this.$message.error("您的权限不足");
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    setq(value, name) {
      // console.log(value, name);
      let obj = {};
      obj = this.options.find((item) => {
        // console.log(item);
        return item.pid == value;
      });
      if (name == "责任人") {
        this.mapInfo.zeRenRen = obj.user_name;
        this.mapInfo.zeRenRenPhone = obj.phone;
      }
      if (name == "防火员") {
        this.mapInfo.fangHuoYuan = obj.user_name;
        this.mapInfo.fangHuoYuanPhone = obj.phone;
      }
      if (name == "街道") {
        this.mapInfo.jieDao = obj.user_name;
        this.mapInfo.jieDao = obj.phone;
      }
      if (name == "网格员") {
        this.mapInfo.wangGeYuan = obj.user_name;
        this.mapInfo.wangGeYuanPhone = obj.phone;
      }

      // let getName = "";
      // getName = obj.locationName;
      // this.mapInfo
      console.log(obj.phone);

      this.$forceUpdate();
    },

    //获取人员信息
    inputClick(name) {
      let status;
      let obj = "";
      if (name == "防火员") {
        status = 0;
      }
      if (name == "责任人") {
        status = 1;
      }
      if (name == "街道") {
        status = 3;
      }
      if (name == "网格员") {
        status = 2;
      }
      if (name == "防火员责任人") {
        obj = this.mapInfo.delet;
      }
      // console.log(event);
      getLegalFireMan(status, obj).then((res) => {
        // console.log(res.data.mess);
        let arr = JSON.parse(res.data.mess);
        console.log(arr);
        this.optionsCopy = arr;
        this.options = arr.slice(0, 250);
      });
    },
    // 编辑弹窗点击函数
    bj_map(data, index) {
      this.mapInfo.name = this.getAllProjecForState_list[index].name;
      this.mapInfo.pid = this.getAllProjecForState_list[index].pid;
      this.mapInfo.type = this.getAllProjecForState_list[index].dSName;
      this.mapInfo.huilu =
        this.getAllProjecForState_list[index].fireman +
        this.getAllProjecForState_list[index].firemanPhone;
      this.mapInfo.shebei =
        this.getAllProjecForState_list[index].legalman +
        this.getAllProjecForState_list[index].legalmanPhone;
      this.mapInfo.zhuche = this.getAllProjecForState_list[index].regdate;
      this.mapInfo.address = this.getAllProjecForState_list[index].location;
      this.mapInfo.xintiao = this.getAllProjecForState_list[
        index
      ].heartbeatTime;
      this.mapInfo.changshan = this.getAllProjecForState_list[index].dVName;
      this.mapInfo.remak = this.getAllProjecForState_list[index].remark;
      this.devID = data;

      this.mapInfo.zeRenRen = this.getAllProjecForState_list[index].legalman;
      this.mapInfo.zeRenRenPhone = this.getAllProjecForState_list[
        index
      ].legalmanPhone;

      this.mapFun();
    },
    mapFun() {
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
          // console.log(e, 654);
          this.lanlat = e.data.location.lng + "," + e.data.location.lat;
          this.mapInfo.lnglat = this.lanlat;
          this.mapInfo.address = `${e.data.cityname}${e.data.adname}${e.data.address}`;
        });
      });
    },
    select(e) {
      console.log(e);
      this.placeSearch.setCity(e.poi.adcode);
      this.placeSearch.search(e.poi.name); //关键字查询查询
      this.lanlat = e.poi.location.lng + "," + e.poi.location.lat;
      this.mapInfo.lnglat = this.lanlat;
      this.mapInfo.address =
        e.poi.district + "" + e.poi.address + "" + e.poi.name;
    },
    //分页器函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.getAllProjecForStateFun(val, this.handleCurrentChangeValue);
      console.log(this.handleCurrentChangeValue);
      this.handleSizeChangeValue = val;
    },
    //分页器函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.handleCurrentChangeValue = val;
      this.getAllProjecForStateFun(this.handleSizeChangeValue, val);
    },

    //展示数据方法接口
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
        this.getAllProjecForState_list = res.data.list[0].allObj;
        console.log(this.getAllProjecForState_list);
        this.total = res.data.list[0].count;
      });
    },
    // 新增设备
    newClick() {
      this.addNewSheBeiVisible = true;
      this.mapFun();
    },
    //新增设备确定按钮
    addNewSheBeiTrue() {
      let projName = "3881";
      let superiorEquipme = "";
      let loopNumber = "";
      let devId = "";
      let devRemark = "";
      // let sms = "0";
      addDevice(
        projName,
        this.mapInfo.bianhao, //设备编号
        this.utils.userName,
        this.mapInfo.address, //安装地址
        this.mapInfo.lnglat, //经纬度
        this.shebeiListValue, //设备类型
        this.mapInfo.name, //设备名称
        this.mapInfo.changsuo, //应用场所
        superiorEquipme,
        loopNumber,
        devId,
        devRemark,
        this.mapInfo.duanxin //短信推送
      ).then(
        (res) => {
          if (res.data.list[0].status == "true") {
            this.$message.success("添加设备成功");
          } else {
            this.$message.error(res.data.list[0].mess);
          }
        },
        (rej) => {
          this.$message.error("请稍后重试或联系管理员");
        }
      );
    },
  },
};
</script>
<style lang='less' scoped>
#xiangmuguanli {
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
}
</style>