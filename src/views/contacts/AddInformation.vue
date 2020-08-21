<template>
  <div class="info">
    <el-form ref="form" :model="form">
      <el-form-item label="联系人编号：">
        <el-input v-model="form.cdocno"></el-input>
      </el-form-item>
      <el-form-item label="客户联系人：">
        <el-input v-model="form.ccontacts"></el-input>
      </el-form-item>
      <el-form-item label="简称：">
        <el-input v-model="form.cshortname"></el-input>
      </el-form-item>
      <el-form-item label="主要联系方式：">
        <el-input v-model="form.cmaimcw"></el-input>
      </el-form-item>
      <el-form-item label="联系人任职：">
        <el-input v-model="form.cduty"></el-input>
      </el-form-item>
      <el-form-item label="部门：">
        <el-input v-model="form.cdapartment"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-input v-model="form.csex"></el-input>
      </el-form-item>
      <el-form-item label="固定电话：">
        <el-input v-model="form.ctel"></el-input>
      </el-form-item>
      <el-form-item label="移动电话1：">
        <el-input v-model="form.cmobilephone1"></el-input>
      </el-form-item>
      <el-form-item label="移动电话2：">
        <el-input v-model="form.cmobilephone2"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：">
        <el-input v-model="form.cemail"></el-input>
      </el-form-item>
      <el-form-item label="QQ：">
        <el-input v-model="form.cqq"></el-input>
      </el-form-item>
      <el-form-item label="微信：">
        <el-input v-model="form.cwechat"></el-input>
      </el-form-item>
      <el-form-item label="Skype号码：">
        <el-input v-model="form.cskype"></el-input>
      </el-form-item>
      <el-form-item label="兴趣：">
        <el-input v-model="form.cinterest"></el-input>
      </el-form-item>
      <el-form-item label="家庭地址：">
        <el-input v-model="form.caddress"></el-input>
      </el-form-item>
      <el-form-item label="籍贯：">
        <el-input v-model="form.cnativeplace"></el-input>
      </el-form-item>
      <el-form-item label="生日：">
        <el-date-picker v-model="form.dbirthday" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="农历生日：">
        <el-radio-group v-model="form.blunar">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="介绍人/公司：">
        <el-input v-model="form.cintroducar"></el-input>
      </el-form-item>
      <el-form-item label="相互关系：">
        <el-input v-model="form.cinterrelation"></el-input>
      </el-form-item>
      <el-form-item label="介绍人意见：">
        <el-input v-model="form.copinion"></el-input>
      </el-form-item>
      <el-form-item label="法人姓名：">
        <el-input v-model="form.clegalperson"></el-input>
      </el-form-item>
      <el-form-item label="法人年龄：">
        <el-input v-model="form.nlegalpersonage"></el-input>
      </el-form-item>
      <el-form-item label="法人户籍：">
        <el-input v-model="form.clegalpersondomicile"></el-input>
      </el-form-item>
      <el-form-item label="入行时间：">
        <el-date-picker v-model="form.dentrydate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="房屋状况：">
        <el-input v-model="form.chousingsituation"></el-input>
      </el-form-item>
      <el-form-item label="车辆状况：">
        <el-input v-model="form.cvahiclecondition"></el-input>
      </el-form-item>
      <el-form-item label="车辆/房产信息：">
        <el-input v-model="form.cinformation"></el-input>
      </el-form-item>
      <el-form-item label="家庭具体信息：">
        <el-input v-model="form.cfamilyinformation"></el-input>
      </el-form-item>
      <el-form-item label="对客户的描述：">
        <el-input type="textarea" autosize v-model="form.cclinetremark"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="button">
          <el-button @click="$router.push('customer')">返回</el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AddInformation",
  data() {
    return {
      form: {
        cdocno: "",
        ccontacts: "",
        cshortname: "",
        cmaimcw: "",
        cduty: "",
        cdapartment: "",
        csex: "",
        ctel: "",
        cmobilephone1: "",
        cmobilephone2: "",
        cemail: "",
        cqq: "",
        cwechat: "",
        cskype: "",
        cinterest: "",
        caddress: "",
        cnativeplace: "",
        dbirthday: "",
        blunar: false,
        cintroducar: "",
        cinterrelation: "",
        cdapartment: "",
        copinion: "",
        clegalperson: "",
        nlegalpersonage: "",
        clegalpersondomicile: "",
        dentrydate: "",
        chousingsituation: "",
        cvahiclecondition: "",
        cinformation: "",
        cfamilyinformation: "",
        cclinetremark: "",
        zrBasContactFk: "",
      },
    };
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false); //false阻止默认事件    this.fun是指返回按建实际要执行的方法
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false); //false阻止默认事件
  },
  methods: {
    goBack() {
      this.$router.push({ path: "contactinformation" });
    },
    onSubmit() {
      this.form.zrBasContactFk = localStorage.getItem("id");
      let token = localStorage.getItem("token");
      this.$axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      this.$axios
        .post(this.url + "/api/Payment/AddupdateContactPesson", this.form, {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
        })
        .then((res) => {
          this.$message({
            message: "联系人信息添加成功",
            type: "success",
          });
          this.$router.push("customer");

          localStorage.removeItem("id");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.el-input,
.el-textarea {
  width: 70%;
}

.el-form-item {
  margin-bottom: 1.2vw;
}

.el-input {
  height: 7vw;
}

.info {
  padding: 7vw 3.7vw 3.7vw 3.7vw;
}

.el-button {
  padding: 1.5vw 3vw;
  font-size: 3vw;
}

.button {
  text-align: center;
}
</style>
<style lang="scss">
.info {
  .el-form-item__label {
    font-size: 3vw;
    line-height: 10vw;
    width: 30%;
  }

  .el-form-item__content {
    margin-left: 0 !important;
    line-height: 10vw;
  }

  .el-input__inner {
    height: 7vw;
    line-height: 7vw;
    font-size: 3vw;
  }

  textarea.el-textarea__inner {
    min-height: 7vw !important;
    height: 7vw !important;
  }
}
</style>