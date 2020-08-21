<template>
  <div class="examine">
    <h3 style="text-align: center;">审核意见</h3>
    <el-form ref="form" :model="form">
      <el-form-item label="意见：" label-width="60px">
        <el-input type="textarea" v-model="form.idea"></el-input>
      </el-form-item>

      <el-form-item label-width="90px">
        <el-button @click="$router.push('nopayment')">取消</el-button>
        <el-button type="danger" @click="fail()" :disabled="disabledFail">驳回</el-button>
        <el-button type="primary" @click="success()" :disabled="disabledSuccess">完成任务</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "NoExamine",
  data() {
    return {
      form: {
        resource: "",
        idea: ""
      },
      assignTaskID: "",
      idea: "",
      flowID: "",
      performers: "",
      fromActivityID: "",
      toActivityID: "",
      instanceID: "",
      flagKeepAlive: false,
      disabledFail: false,
      disabledSuccess: false
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
      this.$router.push({ path: "nopayment" });
    },

    success() {
      this.oid = localStorage.getItem("ID");
      this.disabledSuccess = true;
      if (this.form.idea == "") {
        this.form.idea == "同意";
      }
      this.$axios
        .post(this.url + "/api/Payment/FinishTask", {
          strAssignTaskID: this.oid,
          idea: this.form.idea
        })
        .then(res => {
          this.$message({
            message: "审核通过",
            type: "success"
          });
          this.$router.push("nopayment");
          this.disabledSuccess = false;
        })
        .catch(() => {
          alert("此单不能审核");
          this.$router.push("nopayment");
        });
    },
    fail() {
      this.assignTaskID = localStorage.getItem("ID");
      this.flowID = localStorage.getItem("FlowID");
      this.performers = localStorage.getItem("Performers");
      this.fromActivityID = localStorage.getItem("FromActivityID");
      this.toActivityID = localStorage.getItem("ToActivityID");
      this.instanceID = localStorage.getItem("InstanceID");

      this.disabledFail = true;
      if (this.form.idea == "") {
        this.form.idea == "驳回";
      }
      this.$axios
        .post(
          this.url +
            "/api/Payment/NotFinishTaskAsync?FlowID=" +
            this.flowID +
            "&InstanceID=" +
            this.instanceID +
            "&FromActivityID=" +
            this.fromActivityID +
            "&ToActivityID=" +
            this.toActivityID +
            "&Performers=" +
            this.performers +
            "&idea=" +
            this.form.idea +
            "&AssignTaskID=" +
            this.assignTaskID
        )
        .then(res => {
          this.$message({
            message: "退回成功",
            type: "success"
          });

          // this.flagKeepAlive = true
          this.$router.push("nopayment");
          this.disabledFail = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
h3 {
  padding: 10% 0;
  margin: 0 !important;
}

.el-button {
  padding: 2vw 5vw;
}

.el-form-item:last-child {
  text-align: center;
}

.el-form-item {
  padding-left: 5%;
}
</style>
<style lang="scss">
.examine {
  .el-form-item:last-child .el-form-item__content {
    margin-left: 0 !important;
  }

  .el-textarea__inner {
    width: 95%;
    line-height: 4;
  }
}
</style>