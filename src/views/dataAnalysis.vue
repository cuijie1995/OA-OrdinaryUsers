<template>
  <div class="data_analysis">
    <div class="top">
      <Header title="数据分析"></Header>
    </div>

    <div id="main1" style="float:left;width:100%;height: 350px"></div>
    <!-- <div id="main2" style="float:left;width:100%;height: 300px"></div> -->
    <div id="main3" style="float:left;width:100%;height: 300px"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import Header from "../components/Header";

let self;

export default {
  name: "DataAnalysis",
  data: function () {
    return {
      pieChartData: [],
      pieChartName: [],
      barChartData: [],
      minData: "",
      maxData: "",
      arrTitle: "",
    };
  },
  components: {
    Header,
  },
  mounted() {
    self = this;

    self.getPieChartData();
    self.getPieChart();
  },
  methods: {
    getPieChartData() {
      let token = localStorage.getItem("token");
      self.$axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .get(self.url + "/api/ErpApi/GetAllProbjectTypes")
        .then((res) => {
          self.pieChartData = res.data;
          self.pieChartData.forEach((element) => {
            element.name = element.probjecttype;
            element.value = element.ncontractamt;
            self.pieChartName.push(element.probjecttype);
            // self.arrTitle.push(element.name);
          });
          // var object1 = {
          //   name: "纸浆项目三部",
          //   ncompleteamt: 0,
          //   ncompleteratio: 0,
          //   ncontractamt: 434.11,
          //   probjecttype: "纸浆项目三部",
          //   value: 434.11,
          //   vieW_APP_PROBJECTTYPEOID: "0d084ddd-5ff1-4ede-9183-24beaae79847",
          // };
          // var object2 = {
          //   name: "援外项目",
          //   ncompleteamt: 0,
          //   ncompleteratio: 0,
          //   ncontractamt: 7.07,
          //   probjecttype: "援外项目",
          //   value: 7.07,
          //   vieW_APP_PROBJECTTYPEOID: "0d084ddd-5ff1-4ede-9183-24beaae79847",
          // };
          // var object3 = {
          //   name: "纸浆项目",
          //   ncompleteamt: 0,
          //   ncompleteratio: 0,
          //   ncontractamt: 0.03,
          //   probjecttype: "纸浆项目",
          //   value: 0.03,
          //   vieW_APP_PROBJECTTYPEOID: "0d084ddd-5ff1-4ede-9183-24beaae79847",
          // };
          // self.pieChartName.push(object1.probjecttype);
          // self.pieChartName.push(object2.probjecttype);
          // self.pieChartName.push(object3.probjecttype);

          // self.pieChartData.push(object1);
          // self.pieChartData.push(object2);
          // self.pieChartData.push(object3);

          console.log(self.pieChartData);

          self.getPieChart();
        });
    },
    getPieChart() {
      var myChart = echarts.init(document.getElementById("main1"));
      myChart.setOption({
        title: {
          text: "项目情况",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ",
        },
        legend: {
          left: "left",
          top: "bottom",
          data: self.pieChartName,
        },

        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "45%"],
            label: { formatter: "{b}：{c}" },
            data: self.pieChartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });

      myChart.on("click", "series.pie", function (param) {
        var id = param.data.vieW_APP_PROBJECTTYPEOID;

        let token = localStorage.getItem("token");
        self.$axios.defaults.headers.common["Authorization"] =
          "Bearer " + token;

        self.$axios
          .get(self.url + "/api/ErpApi/GetProbjectDetail?id=" + id)
          .then((res) => {
            var object = res.data;

            self.arrTitle = object.probjecttype;
            self.barChartData = [];
            for (const key in object) {
              if (
                key != "vieW_APP_PROBJECTTYPEDETAILOID" &&
                key != "probjecttype"
              ) {
                self.barChartData.push(object[key]);
              }
            }
            self.minData = self.barChartData.sort()[0];
            self.maxData = self.barChartData.sort()[5];
            self.getBarChart();
          });

        // if (id == "0d084ddd-5ff1-4ede-9183-24beaae79847") {
        //   var object = {
        //     vieW_APP_PROBJECTTYPEDETAILOID:
        //       "0d084ddd-5ff1-4ede-9183-24beaae79847",
        //     probjecttype: "河沙项目",
        //     ncontractamt: 2000,
        //     ndeclamt: 10351.96,
        //     npayedamt: 10620.07,
        //     nforeignrmbamt: 1077.33,
        //     ncompleteamt: 0,
        //     nprofitsamt: -9542.74,
        //   };
        //   self.barChartData = [];
        //   for (const key in object) {
        //     // console.log(key);
        //     if (
        //       key != "vieW_APP_PROBJECTTYPEDETAILOID" &&
        //       key != "probjecttype"
        //     ) {
        //       self.barChartData.push(object[key]);
        //     }
        //   }
        //   self.minData = self.barChartData.sort()[0];
        //   self.maxData = self.barChartData.sort()[5];
        //   self.getBarChart();
        // }
        // if (id == "66bcdfd0-3771-49df-8f2a-3d11d81b01ed") {
        //   var object = {
        //     vieW_APP_PROBJECTTYPEDETAILOID:
        //       "66bcdfd0-3771-49df-8f2a-3d11d81b01ed",
        //     probjecttype: "塑胶粒项目",
        //     ncontractamt: 111.11,
        //     ndeclamt: 0,
        //     npayedamt: 0,
        //     nforeignrmbamt: 0,
        //     ncompleteamt: 0,
        //     nprofitsamt: 0,
        //   };
        //   self.barChartData = [];
        //   for (const key in object) {
        //     self.barChartData.push(object[key]);
        //   }
        //   self.barChartData.splice(0, 2);
        //   console.log(self.barChartData);

        //   self.minData = self.barChartData.sort().shift();
        //   self.maxData = self.barChartData.sort().pop();

        //   // console.log(self.minData);
        //   // console.log(self.maxData);

        //   self.getBarChart();
        // }
        if (param.seriesName.indexOf("innnerPie") !== -1) {
          store.commit(Types.M_MOD_SET, {
            // 触发数据的变化--自定义相应的方法
            path: "doublePieName",
            operate: "set",
            value(dd) {
              return {
                seriesName: param.seriesName,
                pieName: param.name,
                data: param.data.children,
              };
            },
          });
        }
      });
    },
    // getDoubleBarChart() {
    //   var myChart = echarts.init(document.getElementById("main2"));

    //   myChart.setOption({
    //     title: {
    //       text: "项目进度",
    //       left: "center",
    //     },
    //     color: ["#5b9bd5", "#ed7d31"],
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         type: "shadow",
    //       },
    //     },
    //     legend: {
    //       orient: "vertical",
    //       left: "left",
    //       data: ["签约金额", "完成金额"],
    //     },
    //     xAxis: [
    //       {
    //         type: "category",
    //         axisTick: { show: false },
    //         data: ["塑胶粒", "芯片", "木材", "纸浆"],
    //       },
    //     ],
    //     yAxis: [
    //       {
    //         type: "value",
    //         min: 100,
    //         max: 400,
    //       },
    //     ],
    //     series: [
    //       {
    //         name: "签约金额",
    //         type: "bar",
    //         barGap: 0,
    //         data: [320, 332, 301, 334],
    //         barWidth: 20,
    //         itemStyle: {
    //           normal: {
    //             label: {
    //               show: true,
    //               position: "top",
    //               textStyle: {
    //                 color: "#615a5a",
    //               },
    //             },
    //           },
    //         },
    //       },
    //       {
    //         name: "完成金额",
    //         type: "bar",
    //         data: [220, 182, 191, 234],
    //         barWidth: 20,
    //         itemStyle: {
    //           normal: {
    //             label: {
    //               show: true,
    //               position: "top",
    //               textStyle: {
    //                 color: "#615a5a",
    //               },
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   });
    // },
    getBarChart() {
      var myChart = echarts.init(document.getElementById("main3"));

      myChart.setOption({
        title: {
          text: self.arrTitle,
          left: "center",
        },
        xAxis: {
          type: "category",
          data: ["签约", "报关", "付款", "收款", "开票", "利润"],
        },
        yAxis: {
          type: "value",
          min: self.minData,
          max: self.maxData,
        },

        series: [
          {
            data: self.barChartData,
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#5b9bd5",
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#615a5a",
                  },
                },
              },
            },
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
.top {
  width: 100%;
  height: 50px;
}

span {
  display: block;
  padding-top: 10px;
}

.data_analysis {
  height: calc(100% - 55px) !important;
}

#main1 {
  margin-top: 30px;
  margin-bottom: 40px;
  border-bottom: 1px #a5a5a5 dashed;
}
#main2 {
  /* margin-top: 30px; */
  margin-bottom: 40px;
  border-bottom: 1px #a5a5a5 dashed;
}
#main3 {
  margin-bottom: 50px;
}
</style>