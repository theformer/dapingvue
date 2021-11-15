<template>
  <div class="orderLine">
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
export default {
  name: "OrderLine",
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
        url: "/screen/getordermonthinfo",
        method: "post",
        data: {
          areaname: this.name,
        },
      }).then((res) => {
        console.log(res, "月订单");
        let { data } = res.data;
        if (data) {
          let yue = [];
          let values = [];
          data.forEach((el) => {
            yue.push(el.monthname);
            values.push({ value: Number(el.ordercount) });
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
      let fontSize = 14;
      let normalColor = "#85B0C7";
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
          bottom: "12%",
          top: "40%",
          left: "20%",
          right: "10%",
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
        tooltip: {
          trigger: "axis",
          position: function (point, params, dom) {
            // 固定在顶部
            return [point[0], "10%"];
          },
          formatter: (params, ticket, callback) => {
            return `
                <div style="
                background: url(${require("../../assets/pensionServices/databox1@2x.png")});
                background-size: 100% 100%;
                width: 40px;
                height: 20px;
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
        xAxis: [
          {
            name: "月份",
            nameLocation: "end",
            padding: [0, 0],
            nameTextStyle: {
              fontSize: fontSize,
              fontWeight: 500,
              fontFamily: "PingFang SC",
              padding: [60, 0, 0, 0],
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
            name: "月度订单数",
            splitNumber: 3,
            // boundaryGap: [0.2, 0.2],
            min: 0,
            // max: 15000,
            nameTextStyle: {
              fontSize: fontSize,
              fontWeight: 500,
              fontFamily: "PingFang SC",
              padding: [0, 80, 5, 0],
              color: normalColor,
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
            type: "line",
            smooth: true,
            showSymbol: true,
            symbolSize: 3,
            yAxisIndex: 0,
            // symbol: "none",
            areaStyle: {
              normal: {
                color: this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#136089",
                    },
                    {
                      offset: 1,
                      color: "#0a202f",
                    },
                  ],
                  false
                ),
              },
            },
            itemStyle: {
              normal: {
                color: "#20B2FE",
              },
            },
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
.orderLine {
  width: 100%;
  padding: 0 33px 0 0;
  box-sizing: border-box;
  //   height: 396px;
  .chart {
    width: 100%;
    height: 170px;
  }
}
</style>
