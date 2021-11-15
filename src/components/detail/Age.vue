<template>
  <Common title="老人年龄分布">
    <div class="age position-relative">
      <div class="chart" ref="chart"></div>
      <div class="line-box">
        <div class="line line1"></div>
        <div class="line line2"></div>
        <div class="line line3"></div>
        <div class="line line4"></div>
        <div class="line line5"></div>
      </div>
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
import ICountUp from "vue-countup-v2";
import { chart } from "highcharts";
export default {
  name: "Age",
  components: {
    Common,
    ICountUp,
  },
  data() {
    return {
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: "",
        prefix: "",
        suffix: "",
      },
    };
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    orgname: {
      type: String,
      default: "",
    },
    orgcode: {
      type: String,
      default: "",
    },
  },
  watch: {
    orgname: function (val) {
      /**
       * 重新获取数据
       */
      this.getData()
    },
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios({
        url: "/screen/olderSexAgeCount",
        method: "post",
        data: {
          address: '',
          jg: '',
          orgCode: this.orgcode
        },
      }).then((res) => {
        let data = res && res.data.data;
        // age60Num: 90
        // age60Rate: 18
        // age70Num: 200
        // age70Rate: 40
        // age80Num: 100
        // age80Rate: 20
        // age90Num: 80
        // age90Rate: 16
        // age100Num: 30
        // age100Rate: 6
        // indexCode: "B004001003"
        // manNum: 300
        // manRate: 60
        // olderNum: 500
        // womanNum: 200
        // womanRate: 40
        if (data) {
          function init() {
            let chartData = [];
            chartData.push({
              value: data.age60Rate,
              name: "60-69岁",
            });
            chartData.push({
              value: data.age70Rate,
              name: "70-79岁",
            });
            chartData.push({
              value: data.age80Rate,
              name: "80-89岁",
            });
            chartData.push({
              value: data.age90Rate,
              name: "90-99岁",
            });
            chartData.push({
              value: data.age100Rate,
              name: "100岁以上",
            });
            chartData = chartData.sort((a, b) => a.value - b.value);
            this.chartData = chartData;
            this.draw();
          }
          init.call(this);
          clearInterval(this.innertimer);
          this.innertimer = setInterval(() => {
            init.call(this);
          }, 11000);
        }
      });
    },
    draw() {
      if (!this.$refs.chart) return
      let echarts = this.$echarts.init(this.$refs.chart);
      let chartData = this.chartData;
      let colorList = [
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#1d76da", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#01c6ff", // 100% 处的颜色
            },
          ],
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#ffc21d", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#fcd963", // 100% 处的颜色
            },
          ],
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#ff2b59", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#fe6485", // 100% 处的颜色
            },
          ],
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#15a91c", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#30e34b", // 100% 处的颜色
            },
          ],
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#51a8cf", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#09eded", // 100% 处的颜色
            },
          ],
        },
      ].reverse();
      var option = {
        series: [
          {
            type: "pie",
            radius: [0, 110],
            center: ["50%", "50%"],
            roseType: "area",
            data: chartData,
            labelLine: {
              show: true,
              lineStyle: {
                color: "rgba(0,0,0,0)",
              },
            },
            color: colorList,
            label: {
              show: true,
              formatter: "{name|{b}}\n{value|{c}.0%}{circle|}",
              rich: {
                name: {
                  color: "#6A94AE",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 32,
                  padding: [0, 0, -26, 0],
                },
                value: {
                  color: "#C8EEFB",
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: 32,
                  fontFamily: "PangMenZhengDao",
                },
              },
            },
          },
        ],
      };
      echarts.clear();
      echarts.setOption(option, true);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@font-face {
  font-family: "PangMenZhengDao";
  src: url("../../font/PangMenZhengDao.woff2");
}
.age {
  width: 100%;
  height: 305px;
  .chart {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }
  .line {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .line-box {
    position: relative;
    width: 220px;
    height: 220px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .line1 {
    width: 220px;
    height: 220px;
  }
  .line2 {
    width: 190px;
    height: 190px;
  }
  .line3 {
    width: 160px;
    height: 160px;
  }
  .line4 {
    width: 130px;
    height: 130px;
  }
  .line5 {
    width: 100px;
    height: 100px;
  }
  .circle {
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.3);
    z-index: 2;
  }
  .circle1 {
    width: 60px;
    height: 60px;
  }
  .circle2 {
    width: 30px;
    height: 30px;
  }
  &-data {
    width: 100%;
    &-name {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #6a94ae;
    }
    &-icon {
      width: 22px;
      height: 22px;
      margin-right: 5px;
    }
    &-value {
      font-size: 32px;
      font-family: PangMenZhengDao;
      font-weight: 400;
      color: #c8eefb;
      margin-top: 6px;
    }
  }
}
</style>
