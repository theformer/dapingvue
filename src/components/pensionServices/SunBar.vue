<template>
  <div class="sunBar">
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
export default {
  name: "SunBar",
  components: {},
  data() {
    return {};
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
      this.getData();
    },
  },
  mounted() {
    this.getData();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getData();
    }, 1000 * 60 * 60);
  },
  methods: {
    getData() {
      this.$axios({
        url: "/screen/getordertypeinfo",
        method: "post",
        data: {
          areaname: this.name,
        },
      }).then((res) => {
        console.log(res, "月订单");
        let { data } = res.data;
        if (data) {
          function init() {
            let xdata = [];
            let yData1 = [];
            let yData2 = [];
            data.forEach((el) => {
              xdata.push(el.typename);
              yData1.push(Number(el.orderamount));
              yData2.push(Number(el.ordercount));
            });
            this.drawChart(xdata, yData1, yData2);
          }
          init.call(this);
          clearInterval(this.innertimer);
          this.innertimer = setInterval(() => {
            init.call(this);
          }, 10000);
        }
      });
    },
    drawChart(xdata, yData1, yData2) {
      if (!this.$refs.chart) return;
      let echarts = this.$echarts.init(this.$refs.chart);

      let barWidth = 25;
      let normalColor = "#85B0C7";
      let fontSize = 14;
      let datas = {
        xdata: xdata,
        yData1: yData1,
        yData2: yData2,
      };
      let option = {
        grid: {
          bottom: "15%",
          top: "20%",
          left: "15%",
          right: "10%",
        },
        legend: {
          show: false,
          selectedMode: false, //取消图例上的点击事件
        },
        tooltip: {
          trigger: "axis",
          position: function (point, params, dom) {
            // 固定在顶部
            return [point[0], "10%"];
          },
          formatter: (params, ticket, callback) => {
            return `
                <div style="
                background: url(${require("../../assets/pensionServices/databox@2x.png")});
                background-size: 100% 100%;
                width: 72px;
                height: 42px;
                padding: 2px 5px 10px;
                box-sizing: content-box;
                font-size: 14px;
                font-weight: 500;
                text-align: center;
                font-family: "PingFang SC";

                ">
                <div style="
                    margin: 0;
                    padding: 0;
                ">
                  <span style="color: #00C6FF;">${params[0].value}</span>
                  <span style="color: #fff;">单</span>
                </div>
                <div style="
                    margin: 0;
                    padding: 0;
                  ">
                  <span style="color: #FDD10A;">${params[1].value}</span>
                  <span style="color: #fff;">万元</span>
                </div>
              </div>
            `;
          },
          padding: [0, 0],
          margin: [0, 0],
          backgroundColor: "",
          borderColor: "",
          borderWidth: 0,
          show: true,
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: normalColor,
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: normalColor,
              fontSize: fontSize,
              fontWeight: 500,
              fontFamily: "PingFang SC",
            },
            margin: 10,
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "solid",
              color: normalColor,
            },
          },
          data: datas.xdata,
        },
        yAxis: [
          {
            type: "value",
            name: "单数",
            splitNumber: 5,
            boundaryGap: [2, 2],
            // max: 100000,
            min: 0,
            nameTextStyle: {
              fontSize: fontSize,
              fontWeight: 500,
              fontFamily: "PingFang SC",
              padding: [0, 40, 5, 0],
            },
            color: normalColor,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "solid",
                width: 0.5,
                opacity: 0.2,
                color: normalColor,
              },
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: normalColor,
                fontSize: fontSize,
                fontWeight: 500,
                fontFamily: "PingFang SC",
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: normalColor,
              },
            },
          },
          {
            type: "value",
            name: "万元",
            splitNumber: 5,
            boundaryGap: [2, 2],
            // max: 1000,
            min: 0,
            nameTextStyle: {
              fontSize: fontSize,
              fontWeight: 500,
              fontFamily: "PingFang SC",
              padding: [20, 0, 5, 45],
            },
            color: normalColor,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              color: "#fff",
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: normalColor,
                fontSize: fontSize,
                fontWeight: 500,
                fontFamily: "PingFang SC",
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: normalColor,
              },
            },
          },
        ],
        series: [
          {
            // 绿色柱子
            name: "",
            type: "bar",
            animation: true,
            barWidth: barWidth, //柱子宽度
            barGap: 0.5, //柱子之间间距
            symbolSize: 3,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0.1,
                    color: "#80CBE7",
                  },
                  {
                    offset: 1,
                    color: "#3B687F",
                  },
                ]),
              },
            },

            data: datas.yData1,
            barGap: 0,
            legendHoverLink: false,
          },
          {
            name: "",
            type: "line",
            smooth: true,
            animation: true,
            showSymbol: true,
            yAxisIndex: 1,
            z: 22,
            symbolSize: 3,
            itemStyle: {
              normal: {
                color: "#FFD30A",
              },
            },
            // label: {
            //   normal: {
            //     show: false,
            //     position: "top",
            //     formatter: "C",
            //     textStyle: {
            //       color: "#fff",
            //       fontSize: 16,
            //     },
            //   },
            // },
            lineStyle: {
              width: 2,
              color: "#FFCE59",
            },
            data: datas.yData2,
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
.sunBar {
  width: 100%;
  padding: 0 33px;
  box-sizing: border-box;
  // margin-bottom: 20px;
  //   height: 396px;
  .chart {
    width: 100%;
    height: 200px;
  }
}
</style>
