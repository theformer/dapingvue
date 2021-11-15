<template>
  <Common title="治理情况统计">
    <div class="way">
      <div class="orChart" id="orChart" ref="orChart"></div>
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
import ICountUp from "vue-countup-v2";
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
// 初始化
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
export default {
  name: "GovernDetail",
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
  },
  watch: {
    name: function (val) {
      /**
       * 重新获取数据
       */
    },
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      if (!this.$refs.orChart) return;
      let echarts = this.$echarts.init(this.$refs.orChart);
      var option = Highcharts.chart("orChart", {
        credits: {
          enabled: false
        },
        tooltip:{
          enabled:false
        },
        chart: {
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 60
          },
          margin:[],
          backgroundColor: "#070F1C"
        },
        title: {
          text: ""
        },
        plotOptions: {
          pie: {
            innerSize: 0,
            depth: 15
          }
        },
        series: [
          {
            name: "货物金额",
            dataLabels: {
              formatter: function() {
                let value = this.point.y;
                let name = this.point.name;
                return `
                  <p style="text-align: right;">
                    <p style="color: #D3E3F4; font-size: 14px;font-family: PingFang SC;">${name}</p>

                    <p style="color: ${this.point.textColor}; font-size: 14px;">${value}</p>
                  </p>
                `;
              },
              color: "#fff",
              distance: 10
            },
            startAngle: -135,
            colors: [
              {
                radialGradient: { cx: 0, cy: 0, r: 1 },
                stops: [
                  [0, "rgba(3, 252, 254, 1)"],
                  [1, "rgba(5, 200, 202, 1)"] // darken
                ]
              },
              {
                radialGradient: { cx: 0, cy: 0, r: 1 },
                stops: [
                  [0, "rgba(4, 137, 246, 1)"],
                  [1, "rgba(5, 96, 188, 1)"] // darken
                ]
              },
              {
                radialGradient: { cx: 0, cy: 0, r: 1 },
                stops: [
                  [0, "rgba(255, 202, 42, 1)"],
                  [1, "rgba(242, 177, 0, 1)"] // darken
                ]
              }
            ],
            data: [
              {
                name: "物业服务费(元)",
                y: 22,
                textColor: "#47D7FF"
              },
              {
                name: "商铺租金(元)",
                y: 11,
                textColor: "#0481EA"
              },
              {
                name: "车位服务费(元)",
                y: 33,
                sliced: true,
                textColor: "#FAC019",
                selected: true,
                className: "propertyservice-parking-space"
              },
            ]
          }
        ]
      });
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
.way {
  width: 100%;
  height: 200px;
  .orChart {
    width: 100%;
    height: 200px;
    &-bg {
      width: 106px;
      height: 106px;
      background: #070f13;
      border: 1px solid #1d5186;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: inset 0 0 50px 2px rgba(76, 149, 217, 0.4);
      // padding: 33px 28px;
      font-size: 24px;
      font-family: PangMenZhengDao;
      font-weight: 400;
      font-style: italic;
      color: #ffffff;
      line-height: 22px;
      // background-image: linear-gradient(0deg, #96c8d7 0%, #cbecf6 100%);
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
    }
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
