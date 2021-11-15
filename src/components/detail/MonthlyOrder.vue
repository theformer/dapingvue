<template>
  <Common title="月度订单">
    <div class="monthlyOrder">
      <div class="chart" ref="chart"></div>
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
export default {
  name: "MonthlyOrder",
  components: { Common },
  data() {
    return {};
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
        url: "/screen/getordermonthbycode",
        method: "post",
        data: {
          orgcode: this.orgcode,
        },
      }).then((res) => {
        console.log(res, "月订单");
        let { data } = res.data;
        if (data) {
          let yue = [];
          let values = [];
          data.forEach((el) => {
            yue.push(el.monthname + "月");
            values.push({ value: parseInt(el.ordercount) });
          });

          function init() {
            this.drawChart(yue, values);
          }
          init.call(this);
          clearInterval(this.innertimer);
          this.innertimer = setInterval(() => {
            init.call(this);
          }, 10000);
        }
      });
    },
    drawChart(yue, values) {
      if (!this.$refs.chart) return
      let echarts = this.$echarts.init(this.$refs.chart);
      let barWidth = 25;
      let normalColor = "#85B0C7";
      let fontSize = 14;
      let option = {
        title: {
          text: "",
          x: "center",
          y: 0,
          textStyle: {
            color: "#B4B4B4",
            fontSize: 16,
            fontWeight: "normal",
          },
        },
        grid: {
          bottom: "15%",
          top: "25%",
          left: "5%",
          right: "1%",
        },
        legend: {
          // 修改legend的高度宽度
          itemHeight: 5,
          itemWidth: 24,
          data: [],
          textStyle: {
            color: "#B4B4B4",
          },
          top: "7%",
        },
        xAxis: [
          {
            name: "",
            nameLocation: "end",
            offset: 5,
            padding: [0, 0],
            nameTextStyle: {
              fontSize: fontSize,
              fontWeight: 500,
              fontFamily: "PingFang SC",
              padding: [60, 0, -60, 0],
              color: normalColor,
            },
            type: "category",
            data: yue,
            boundaryGap: true,
            color: normalColor,
            axisLine: {
              lineStyle: {
                color: normalColor,
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            name: "单数",

            boundaryGap: [0.2, 0.2],
            nameTextStyle: {
              fontSize: fontSize,
              fontWeight: 500,
              fontFamily: "PingFang SC",
              padding: [0, 40, 5, 0],
              color: normalColor,
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: "solid",
                width: 0.5,
                opacity: 0.1,
                color: normalColor,
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: normalColor,
                fontSize: fontSize,
                fontWeight: 500,
                fontFamily: "PingFang SC",
              },
              margin: 10,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "bar",
            animation: true,
            barWidth: barWidth, //柱子宽度
            barGap: 0.5, //柱子之间间距

            label: {
              show: true,
              normal: {
                show: true,
                lineHeight: 18,
                backgroundColor: {
                  image: require("../../assets/lc/numberbox@2x.png"),
                },
                borderRadius: 3,
                position: "top",
                // position: ["-20", "-35"],
                padding: [6, 3, 10, 3],
                symbolSize: [40, 10],
                symbolOffset: [0, -6],
                distance: 1,
                z: 999,
                formatter: ["{d|{c}}"].join(","),
                rich: {
                  d: {
                    color: "#00C6FF",
                    align: "center",
                    fontSize: fontSize,
                    fontWeight: 500,
                    fontFamily: "PingFang SC",
                    padding: [0, 10, 0, 10]
                  },
                  b: {
                    color: "#fff",
                    align: "center",
                    fontSize: fontSize,
                    fontWeight: 500,
                    fontFamily: "PingFang SC",
                  },
                  a: {
                    color: "#FDD10A",
                    align: "center",
                    fontSize: fontSize,
                    fontWeight: 500,
                    fontFamily: "PingFang SC",
                  },
                },
              },
            },
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
            barGap: 0,
            legendHoverLink: false,
            data: values,
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
.monthlyOrder {
  width: 100%;
  padding: 0 33px;
  box-sizing: border-box;
  //   height: 396px;
  .chart {
    width: 100%;
    height: 305px;
  }
}
</style>
