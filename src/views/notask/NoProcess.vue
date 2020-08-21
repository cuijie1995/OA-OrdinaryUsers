<template>
  <div class="noprocess">
    <div class="title">
      <!-- <van-icon name="arrow-left" @click="$router.push('nopayment')" />
      <h5>{{name}}</h5>-->

      <van-nav-bar :title="name" left-arrow @click-left="$router.push('nopayment')" />
    </div>
    <div class="content">
      <div class="name">{{name}}</div>
      <el-timeline>
        <el-timeline-item
          v-for="(item,index) in datas"
          :key="index"
          :timestamp="item.flowdata"
          placement="top"
        >
          <el-card>
            <p>{{item.activityChineseName}}</p>
            <p>{{item.personName}}</p>
            <p>{{item.busiField1}}</p>
            <p>{{item.flowdata}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
export default {
  name: "noProcess",
  data() {
    return {
      datas: [],
      oid: "",
      name: ""
    };
  },
  mounted() {
    this.oid = localStorage.getItem("id");
    this.name = localStorage.getItem("title");
    this.$axios
      .get(this.url + "/api/Payment/GetPayprocess", {
        params: {
          InstanceID: this.oid
        }
      })
      .then(res => {
        this.datas = res.data;
      })
      .catch(() => {});
  }
};
</script>
<style scoped>
.title {
  padding: 0 0 20px 0;
  position: fixed;
  width: 100%;
  z-index: 10;
  background: #ffffff;
}

.el-timeline {
  width: 94%;
  margin: 0 3%;
}
.content {
  padding-top: 66px;
}
</style>
<style lang="scss">
.noprocess {
  .el-card__body {
    padding: 0 20px;
  }

  .van-ellipsis {
    font-size: 13px;
    font-weight: 700;
    width: 260px !important;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .name {
    width: 90%;
    padding: 0 5% 5% 5%;
    font-size: 10px;
    text-align: center;
    font-weight: 600;
  }
}
</style>