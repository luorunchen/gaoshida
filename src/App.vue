<template>
  <div id="baoj">
    <div class="weiyi">
      <el-dialog
        title="报警信息"
        :visible.sync="dialogVisible"
        width="20%"
        :modal="false"
      >
        <p>项目名称:{{ arlme.name }}</p>
        <p>报警内容: {{ arlme.type }}</p>
        <p>报警地址:{{ arlme.address }}</p>
        <p>设备号:{{ arlme.imei }}</p>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span> -->
      </el-dialog>
    </div>

    <!-- <p @click="www">12321</p> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "@/components/FireInternetOfThings";
export default {
  data() {
    return {
      dialogVisible: false,

      arlme: { name: "", type: "", address: "", imei: "" },
    };
  },
  components: {
    Home,
  },
  mounted() {
    // this.dialogVisible = true;
    let goEasy = GoEasy.getInstance({
      host: "hangzhou.goeasy.io", //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
      appkey: "BC-e7642099b1ac4eedbabd867f4eff1330", //替换为您的应用appkey
    });

    goEasy.connect({
      onSuccess: function () {
        //连接成功
        console.log("GoEasy connect successfully."); //连接成功
      },
      onFailed: function (error) {
        //连接失败
        console.log(
          "Failed to connect GoEasy, code:" +
            error.code +
            ",error:" +
            error.content
        );
      },
      onProgress: function (attempts) {
        //连接或自动重连中
        console.log("GoEasy is connecting", attempts);
      },
    });
    const _that = this;
    goEasy.subscribe({
      channel: this.utils.userName, //替换为您自己的channel
      onMessage: function (message) {
        const res = message.content;
        const arr = res.split(",");

        _that.arlme.name = arr[0];
        _that.arlme.imei = arr[1];
        _that.arlme.type = arr[2];
        _that.arlme.address = arr[3];
        _that.dialogVisible = true;
      },
      onSuccess: function (message) {
        console.log("Channel订阅成功。");
        this.dialogVisible = true;
      },
      onFailed: function (error) {
        console.log(
          "Channel订阅失败, 错误编码：" +
            error.code +
            " 错误信息：" +
            error.content
        );
      },
    });
  },
};
</script>
<style lang='less'>
* {
  padding: 0;
  margin: 0;
}
#baoj {
  .weiyi {
    /deep/.el-dialog__header {
      padding: 0;
      background: #4c0e25;
    }
    /deep/.el-dialog__body {
      background: #4c0e25;
      color: #fff;
      padding: 10px 20px;
      p {
        margin-bottom: 10px;
      }
    }
    /deep/.el-dialog__title {
      width: 255px;
      height: 30px;
      background: linear-gradient(90deg, #812145, #4c0e25);
      color: #fff;
      margin: 15px 0 0 15px;
      display: inline-block;
      padding-left: 10px;
      line-height: 30px;
    }
  }
}
/*去除a标签下划线*/
a {
  color: #fff;
  text-decoration: none;
}
/*去除未被访问的a标签的下划线*/
a:link {
  text-decoration: none;
}
/*去除已经被访问过的a标签的下划线*/
a:visited {
  text-decoration: none;
}
/*去除鼠标悬停时的a标签的下划线*/
a:hover {
  text-decoration: none;
}
/*去除正在点击的a标签的下划线（鼠标按下，尚未松开）*/
a:active {
  text-decoration: none;
}
/*去除获得焦点的a标签的下划线（被鼠标点击过）*/
a:focus {
  text-decoration: none;
}
ul {
  li {
    list-style: none;
  }
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  // background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background-color: rgb(13, 30, 77);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px #1b6c89;
  background-color: #1b6c89;
}
</style>