<template>
  <div id="dianqiHZ">
    <div class="title2"></div>
    <div class="btnQh">
      <el-button
        type="primary"
        :class="location == '设备点位' ? 'btnRed' : 'btnBlue'"
        @click="locationFun('设备点位')"
        >设备点位</el-button
      >
      <el-button
        type="primary"
        :class="location == '项目点位' ? 'btnRed' : 'btnBlue'"
        @click="locationFun('项目点位')"
        >项目点位</el-button
      >
    </div>
    <div class="leftWapper">
      <div class="left_one" ref="leftOne">
        <p>今日报警项目</p>
        <div class="title">
          <ul v-for="(item, index) in baojingNum" :key="index">
            <li>{{ item }}</li>
          </ul>
        </div>
        <div class="scroll_wapper">
          <ul
            class="ulList"
            v-for="(item, index) in DeviceAlarmList"
            :key="index"
          >
            <li @click="callPolice(item.pid)">
              <span>{{ item.typeName }}</span
              ><span>共{{ item.value }}条未处理></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="left_two">
        <p>接入电气火灾探测器</p>

        <Translate :name="name" />
      </div>
    </div>
    <SearchTranslate
      :SElec_DetailElecDevice_List="SElec_DetailElecDevice_List"
      :pagetype="pagetype"
      :DeviceProjectNewData="DeviceProjectNewData"
      @status="status"
    />
    <PublicPopUps ref="publicPopUps" :pagetype="pagetype" />
  </div>
</template>

<script>
import {
  DeviceAlarm,
  SElec_DetailElecDevice,
  DeviceProjectNew,
  getAllDevicePostion,
} from "@/api/index.js";
import Translate from "../../FireInternetOfThings/translate/baojingTranslate.vue";
import SearchTranslate from "../../FireInternetOfThings/translate/searchTranslate.vue";
import PublicPopUps from "../../FireInternetOfThings/translate/publicPopUps";
export default {
  data() {
    return {
      SElec_DetailElecDevice_List: "",
      location: "设备点位",
      baojingNum: "",
      DeviceAlarmList: "",
      pagetype: 2,
      type: 3,
      name: "电气火灾",
      DeviceProjectNewData: "",
      // DeviceNumList: "",
    };
  },
  watch: {
    contractFile(val, lav) {
      console.log(val);
      // let map;
      // if (lav == null || lav == undefined) {
      //   map = val.split(",");
      // } else {
      //   map = lav.split(",");
      // }

      // console.log(map.reverse());
      this.map.setZoomAndCenter(20, val);
    },
    getStoreItem(val) {
      console.log(val);
      if (val == "开") {
        this.locationFun(this.location);
      }
    },
  },
  computed: {
    contractFile() {
      return this.$store.state.map_lnglat;
    },
    getStoreItem() {
      // console.log(this.$store.state.AlarmStatus);
      return this.$store.state.AlarmStatus;
    },
  },
  mounted() {
    this.DeviceAlarm();
    this.map();
    this.stop();
    this.locationFun("设备点位");
    this.time = setInterval(() => {
      this.DeviceAlarm();
    }, 30000);
  },
  methods: {
    status(data) {
      console.log(data, "我是data");
      // this.mapStaus = data;
      this.locationFun(data);
    },
    //点位切换
    locationFun(type) {
      if (this.mass != undefined) {
        this.mass.setMap(null);
      }

      // console.log(this.mass);
      if (type == "项目点位") {
        this.location = type;
        let region = sessionStorage.getItem("region");
        if (region == "null") {
          region = "";
        }
        DeviceProjectNew(this.utils.userName, "3", region).then((res) => {
          if (res.data.length <= 0) {
            return (this.loading_map = false);
          }
          ////console.log(res);
          const style = [
            {
              url: "http://124.71.11.195/image/点4.png",
              anchor: new AMap.Pixel(4, 4),
              size: new AMap.Size(30, 30),
            },
            {
              url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
              anchor: new AMap.Pixel(6, 6),
              size: new AMap.Size(30, 30),
            },
            {
              url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
              anchor: new AMap.Pixel(6, 6),
              size: new AMap.Size(20, 20),
            },
          ];
          let a = [];
          let b = [];
          // //console.log(res.data.Company.length);
          for (let i = 0; i < res.data.Company.length; i++) {
            if (
              res.data.Company[i].style == 1 ||
              res.data.Company[i].style == 2
            ) {
              b.push(res.data.Company[i]);
            } else {
              a.push(res.data.Company[i]);
            }
          }
          let c = [...a, ...b];
          this.DeviceProjectNewData = [...a, ...b];
          this.mass = new AMap.MassMarks(c, {
            opacity: 0.8,
            zIndex: 111,
            cursor: "pointer",
            style: style,
          });
          //console.log(mass, 999);
          //console.log(this.map, 999);
          const marker = new AMap.Marker({ content: " ", map: this.map });
          this.mass.setMap(this.map);
          let _that = this;
          //绑定事件模块
          this.mass.on("click", function (e) {
            //console.log(e);
            _that.$refs.publicPopUps.initOff();
            _that.$refs.publicPopUps.echart_wapper(e.data.pid);
            _that.map.setZoomAndCenter(20, [
              e.data.lnglat.lng,
              e.data.lnglat.lat,
            ]);
          });
        });
      } else {
        this.location = type;
        getAllDevicePostion(this.utils.userName).then((res) => {
          //console.log(res.data.data);
          const style = [
            {
              url: "http://124.71.11.195/image/点4.png",
              anchor: new AMap.Pixel(4, 4),
              size: new AMap.Size(30, 30),
            },
            {
              url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
              anchor: new AMap.Pixel(6, 6),
              size: new AMap.Size(20, 20),
            },
            {
              url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
              anchor: new AMap.Pixel(6, 6),
              size: new AMap.Size(20, 20),
            },
          ];
          let a = [];
          let b = [];
          // //console.log(res.data.Company.length);
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].style == 1) {
              res.data.data[i].style = res.data.data[i].alarmType * 1;
              b.push(res.data.data[i]);
            } else {
              res.data.data[i].style = res.data.data[i].alarmType * 1;
              a.push(res.data.data[i]);
            }
          }
          for (let i = 0; i < res.data.share.length; i++) {
            if (
              res.data.share[i].alarmType == 1 ||
              res.data.share[i].alarmType == 2
            ) {
              res.data.share[i].lnglat = [
                res.data.share[i].long_lat.split(",")[0],
                res.data.share[i].long_lat.split(",")[1],
              ];
              res.data.share[i].style = res.data.share[i].alarmType * 1;
              b.push(res.data.share[i]);
            } else {
              res.data.share[i].lnglat = [
                res.data.share[i].long_lat.split(",")[0],
                res.data.share[i].long_lat.split(",")[1],
              ];
              res.data.share[i].style = res.data.share[i].alarmType * 1;
              a.push(res.data.share[i]);
            }
          }
          let c = [...a, ...b];
          // console.log(c);
          this.DeviceProjectNewData = [...a, ...b];
          this.mass = new AMap.MassMarks(c, {
            opacity: 0.8,
            zIndex: 111,
            cursor: "pointer",
            style: style,
          });
          //console.log(mass, 999);
          //console.log(this.map, 999);
          const marker = new AMap.Marker({ content: " ", map: this.map });
          this.mass.setMap(this.map);
          let _that = this;
          //绑定事件模块
          this.mass.on("click", function (e) {
            //console.log(e);
            // _that.$refs.publicPopUps.initOff();
            // _that.$refs.publicPopUps.echart_wapper(e.data.pid);
            _that.$refs.publicPopUps.see(e.data.devId, e.data.imei);
            _that.map.setZoomAndCenter(20, [
              e.data.lnglat.lng,
              e.data.lnglat.lat,
            ]);
          });
        });
      }
    },
    stop() {
      var mo = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
    map() {
      this.map = new AMap.Map("dianqiHZ", {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10,
        mapStyle: "amap://styles/dcb78e5f043e25116ab6bdeaa6813234",
      });
      this.map.addControl(
        new AMap.MapType({
          defaultType: 0, //0代表默认，1代表卫星
        })
      );
      this.map.setZoomAndCenter(5, [116.397428, 30.90923]);
      // const region = sessionStorage.getItem("region");
      // DeviceProjectNew(this.utils.userName, "3", region).then((res) => {
      //   // this.DeviceProjectNewData = res.data.Company;

      //   if (res.data == [] || res.data == "") {
      //     return (this.loading_map = false);
      //   }

      //   let a = [];
      //   let b = [];
      //   for (let i = 0; i < res.data.Company.length; i++) {
      //     if (res.data.Company[i].style == 1) {
      //       b.push(res.data.Company[i]);
      //     } else {
      //       a.push(res.data.Company[i]);
      //     }
      //   }

      //   this.DeviceProjectNewData = [...a, ...b];
      //   // [...new Set(this.DeviceProjectNewData)];
      //   // console.log(this.DeviceProjectNewData);

      //   // console.log(c, "我是aa,b");
      //   this.$nextTick(() => {
      //     const style = [
      //       {
      //         url: "http://124.71.11.195/image/点4.png",
      //         anchor: new AMap.Pixel(4, 4),
      //         size: new AMap.Size(30, 30),
      //       },
      //       {
      //         url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
      //         anchor: new AMap.Pixel(6, 6),
      //         size: new AMap.Size(30, 30),
      //       },
      //     ];
      //     // console.log(this.DeviceProjectNewData, 987987);

      //     this.mass = new AMap.MassMarks(this.DeviceProjectNewData, {
      //       opacity: 0.8,
      //       zIndex: 111,
      //       cursor: "pointer",
      //       style: style,
      //     });
      //     // this.DeviceProjectNewData = [];
      //     const marker = new AMap.Marker({ content: " ", map: this.map });
      //     this.mass.setMap(this.map);

      //     this.loading_map = false;
      //     // 保存this
      //     var _that = this;
      //     //绑定事件模块
      //     this.mass.on("click", function (e) {
      //       console.log("asdasd");

      //       // this.$refs.publicPopUps.initOff();

      //       _that.$refs.publicPopUps.initOff();
      //       _that.$refs.publicPopUps.echart_wapper(e.data.pid);
      //     });
      //   });
      // });
    },

    callPolice(pid) {
      SElec_DetailElecDevice(pid).then((res) => {
        this.SElec_DetailElecDevice_List = res.data;
      });
    },

    DeviceAlarm() {
      let region = sessionStorage.getItem("region");
      if (region == "null") {
        region = "";
      }
      DeviceAlarm(this.utils.userName, 3, region).then((res) => {
        this.DeviceAlarmList = res.data;
        let num = 0;
        console.log(res.data, 99);
        if (res.data.length <= 0) {
          // return this.$message.error("今日报警数据丢失");
          this.baojingNum = "000000";

          this.$refs.leftOne.style.height = "140" + "px";
        } else {
          res.data.forEach((element) => {
            num += element.value;
          });
          this.$refs.leftOne.style.height = "2.34375" + "rem";
          // this.baojingNum = str + num;
          let str = "000000" + num;
          this.baojingNum = str.substring(str.length - 6);
        }

        this.$forceUpdate();
      });
    },
  },
  destroyed() {
    clearInterval(this.time);
  },
  components: {
    Translate,
    SearchTranslate,
    PublicPopUps,
  },
  updated() {},
};
</script>
<style lang='less' scoped>
#dianqiHZ {
  /deep/ .amap-maptypecontrol {
    right: 280px;
    top: 30px;
    position: absolute;
  }
  /deep/.btnQh {
    position: absolute;
    z-index: 999;

    width: 58%;
    top: 80px;

    right: -850px;
  }
  .btnRed {
    background: red;
    border: none;
  }
  .btnBlue {
    background: #409eff;
    border: none;
  }
  .scroll_wapper {
    margin-top: 15px;
    // position: relative;
    overflow-y: auto;
    height: 300px; //高度根据需求自行设定
    overflow-x: hidden;
  }
  .scroll_wapper ::-webkit-scrollbar {
    display: none; /*隐藏滚动条*/
  }
  height: 800px;
  .title2 {
    position: relative;
    z-index: 999;
    width: 100%;
    height: 20px;
    background-image: linear-gradient(to top, rgba(8, 48, 74, 0.5), #030542);
  }
  // /deep/.el-input__inner {
  //   background: #021019;
  //   color: #fff;
  //   border: 1px solid #3094d5;
  // }
  ul {
    list-style-type: none;
  }
  // position: relative;
  // z-index: 999;
  // color: #bfa;
  .leftWapper {
    left: 20px;
    position: absolute;
    z-index: 999;
    width: 373px;
    .left_one {
      width: 100%;
      height: 450px;
      background-image: url("../../../assets//images/zhengchangbili.png");

      background-size: 100% 450px;
      p {
        text-align: center;
        line-height: 70px;
        font-size: 18px;
      }
      .title {
        margin-top: 10px;
        margin-left: 30px;
        // width: 200px;
        // padding-bottom: 10px;
        height: 32px;
        font-size: 16px;
        li {
          width: 32px;
          margin-right: 10px;
          height: 32px;
          float: left;
          background: linear-gradient(
            0deg,
            rgba(71, 102, 179, 0.62),
            rgba(23, 47, 107, 0.62)
          );

          font-weight: bold;
          color: #f830af;
          line-height: 32px;
          text-align: center;
        }
      }
      .ulList {
        // padding-bottom: 20px;
        margin-left: 30px;
        li {
          cursor: pointer;
          width: 301px;
          height: 35px;
          background: linear-gradient(-87deg, #3053af, #14295a);
          border: 1px solid #3486da;
          margin: 10px 0;
          padding: 0 10px;
          line-height: 35px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }
      }
    }
    .left_two {
      background-image: url("../../../assets/images/juxing7.png");
      height: 300px;
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 65px;
        font-size: 18px;
      }
      .title {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 30px;
        // width: 200px;
        height: 32px;

        li {
          width: 32px;
          margin-right: 10px;
          height: 32px;
          float: left;
          background: linear-gradient(
            0deg,
            rgba(71, 102, 179, 0.62),
            rgba(23, 47, 107, 0.62)
          );

          font-weight: bold;
          color: #6dff64;
          line-height: 32px;
          text-align: center;
        }
      }
      .ulList {
        margin-left: 30px;
        li {
          width: 301px;
          height: 35px;
          background: linear-gradient(-87deg, #3053af, #14295a);
          border: 1px solid #3486da;
          margin: 10px 0;
          padding: 0 10px;
          line-height: 35px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>