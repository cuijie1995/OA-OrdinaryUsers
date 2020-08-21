<template>
  <div class="contact">
    <el-form ref="form" :model="form">
      <el-form-item label="单号：">
        <el-input v-model="form.contactNo"></el-input>
      </el-form-item>
      <el-form-item label="主题：">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="外出地址：">
        <el-input v-model="form.unitAddress"></el-input>
      </el-form-item>
      <el-form-item label="联系人职务：">
        <el-input v-model="form.unitPost"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：">
        <el-date-picker v-model="form.beginDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="计划结束时间：">
        <el-date-picker v-model="form.planEndDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="实际结束时间：">
        <el-date-picker v-model="form.factEndDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="联系耗时：">
        <el-input v-model="form.timeConsuming"></el-input>
      </el-form-item>
      <el-form-item label="联系目的：">
        <el-input v-model="form.purpose"></el-input>
      </el-form-item>
      <el-form-item label="联系进展：">
        <el-input v-model="form.progress"></el-input>
      </el-form-item>
      <el-form-item label="下次联系时间：">
        <el-date-picker v-model="form.nextTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="是否遵守贸易安全：">
        <el-input v-model="form.isSafe"></el-input>
      </el-form-item>
      <el-form-item label="联系状态：">
        <el-input v-model="form.state"></el-input>
      </el-form-item>
      <el-form-item label="单据状态：">
        <el-input v-model="form.pageState"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" autosize v-model="form.remark"></el-input>
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
export default {
  name: "AddContact",
  data() {
    return {
      form: {
        contactNo: "",
        title: "",
        unitAddress: "",
        unitPost: "",
        beginDate: "",
        planEndDate: "",
        factEndDate: "",
        timeConsuming: 0,
        purpose: "",
        progress: "",
        nextTime: "",
        isSafe: "",
        remark: "",
        state: "",
        pageState: "",
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
      this.$router.push({ path: "contactrecord" });
    },
    onSubmit() {
      this.form.zrBasContactFk = localStorage.getItem("id");

      let token = localStorage.getItem("token");
      this.$axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      this.$axios
        .post(this.url + "/api/Payment/AddUpdateContactRecordList", this.form, {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
        })
        .then((res) => {
          this.$message({
            message: "联系记录添加成功",
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
.el-textarea {
  width: 70%;
}

.el-form-item {
  margin-bottom: 1.2vw;
}

.el-input {
  height: 7vw;
  width: 70%;
}

.contact {
  padding: 7vw 3.7vw 3.7vw 3.7vw;
}

.el-button {
  padding: 1.5vw 3vw;
}

.button {
  text-align: center;
}
</style>
<style lang="scss">
.contact {
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
    min-height: 7vw;
    height: 7vw;
  }
}
</style>