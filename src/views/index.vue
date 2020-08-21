<template>
  <div class="index">
    <router-view></router-view>
    <TabBar :data="tabbarData" />
  </div>
</template>
<script>
import TabBar from "../components/TabBar";
export default {
  name: "index",
  data() {
    return {
      tabbarData: [
        { title: "统计分析", icon: "pie-chart", path: "/home" },
        { title: "数据分析", icon: "bar-chart", path: "/dataAnalysis" },
        { title: "工作台", icon: "qrcode", path: "/workbench" },
        { title: "我的", icon: "user", path: "/me" }
      ]
    };
  },
  components: { TabBar }
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
}
</style>