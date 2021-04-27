<template>
  <div id="app">
    <div class="title">
      <img class="titleIMG" src="../../assets/images/juxing4.png" alt="" />
    </div>
    <div class="titleFZ">智慧安全系统平台</div>

    <!-- <el-upload
      ref="upload"
      class="upload-demo"
      action="/earlyWarn/upload.action?user_name=13076920054"
      list-type="picture"
    > -->
    <div class="loginIMGLeft">
      <img
        src="@/assets/images/fengmian.png"
        width="100%"
        height="100%"
        alt=""
      />
    </div>
    <!-- <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div> -->
    <!-- </el-upload> -->
    <div class="loginImg">
      <img
        src="@/assets/images/juxing5.png"
        width="100%"
        height="100%"
        alt=""
      />

      <div class="formLI">
        <p>欢迎登录</p>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="pass">
            <el-input
              placeholder="请输入登录ID"
              prefix-icon="el-icon-user"
              v-model="ruleForm.pass"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              placeholder="请输入登录密码"
              prefix-icon="el-icon-goods"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <!-- <el-form-item prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/index.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      // alert("22");

      // let username = JSON.parse(this.ruleForm.pass);
      // let password = JSON.parse(this.ruleForm.checkPass);
      let username = this.ruleForm.pass;
      let password = this.ruleForm.checkPass;

      login(username, password).then((res) => {
        console.log(res);
        if (res.data.status === true) {
          var role = res.data.role[0]; //权限
          // console.log(this.utils.userName, 666);
          if (res.data.region == "null") {
            res.data.region = "";
          }
          sessionStorage.setItem("role_copy", res.data.role[0]);
          if (res.data.role[0] == 2000) {
            res.data.role[0] = 1000;
          }
          sessionStorage.setItem("userName", username);
          sessionStorage.setItem("role", res.data.role[0]);

          sessionStorage.setItem("new_role", res.data.new_role);
          sessionStorage.setItem("region", res.data.region);
          sessionStorage.setItem("power", res.data.power);
          this.utils.userName = username;
          this.utils.powerId = res.data.new_role;
          if (this.utils.powerId == 2000) {
            this.utils.powerId = 1000;
          }
          this.utils.rid = res.data.power;
          console.log(this.utils.rid);
          // console.log(this.utils.userName, 666);
          this.$router.push({ path: "/" });
          return this.$message({
            message: "登录成功",
            type: "success",
          });
        } else {
          return this.$message({
            message: "账号或密码不正确",
            type: "error",
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
  // mounted() {
  //   this.$message.warning("您还未登录");
  // },
};
</script>

<style lang='less' scoped>
#app {
  // width: 1920px;
  height: calc(100vh);
  background: rgb(3, 5, 66);
  .title {
    transform: translateX(-50%);
    margin: 0 auto;
    width: 240px;
    .titleIMG {
      width: 478px;
      height: 68px;
    }
    // height: 34px;
  }
  .titleFZ {
    font-size: 30px;
    color: #fff;
    /* margin: 0 auto; */
    text-align: center;
    position: relative;
    /* margin: -26px; */
    top: -60px;
  }
  .loginIMGLeft {
    top: 20%;
    left: 20%;
    width: 500px;
    height: 500px;
    position: absolute;
  }
  .loginImg {
    width: 440px;
    height: 400px;
    position: relative;
    /* bottom: 53%; */
    margin-top: 130px;
    left: 59%;
    p {
      color: #fff;
      /* margin: 0 auto; */
      text-align: center;
      margin: -51px 0 20px 85px;

      font-size: 30px;
    }
    .formLI {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 25%;
      left: -11%;
      /deep/.el-button--primary {
        width: 100%;
      }
      /deep/.el-input__inner {
        background: rgb(9, 58, 114);
        color: #fff;
        border: 1px solid #0ba1f8;
      }
    }
  }
}
</style>