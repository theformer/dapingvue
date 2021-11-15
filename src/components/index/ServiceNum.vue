<template>
  <Common title="气象预警信息" direction="left">
    <div class="service-num">
      <div class="chart-value">
        <div class="value-left">今日降雨量(mm)</div>
        <ICountUp
          :start="0"
          :endVal="parseInt(value)"
          :decimals="0"
          :duration="3"
          :options="options"
          class="value-right"
          ref="rate"></ICountUp>
      </div>
      <div ref="chart" id="chart" class="chart"></div>
    </div>


  </Common>
</template>

<script>
import Common from "@/components/Common";
import ICountUp from "vue-countup-v2";

export default {
  name: "ServiceNum",
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
        decimal: ".",
        prefix: "",
        suffix: "",
        decimalPlaces: 1,
      },
      options1: {
        useEasing: true,
        useGrouping: true,
        separator: "",
        decimal: "",
        prefix: "",
        suffix: "",
      },
      value: 0.0,
      olderservicecount: "0",
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
      this.getData();
    },
  },
  mounted() {
    this.getData();
    this.drawChart()
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getData();
    }, 1000 * 60 * 60);
  },
  methods: {
    getData() {
      // activitycount: "80.0"
      // activityoldercount: "500.0"
      // activityrate: "1.2"
      // bedcount: "590.0"
      // bedusedcount: "355.0"
      // bedusedrate: "60.2"
      // oldercount: "500.0"
      // olderservicecount: "400.0" 服务人数
      // olderservicerate: "80.0" // 服务覆盖率
      // vediocount: "920.0"
      // vediohealthrate: "74.6"
      // vediopeoplecount: "545.0"
      this.$axios({
        url: "/screen/getorgindex",
        method: "post",
        data: {
          areaname: this.name,
        },
      }).then((res) => {
        let data = res && res.data.data;
        if (data) {
          function init() {
            this.value = parseFloat(data.olderservicerate).toFixed(1);
            this.olderservicecount = parseInt(data.olderservicecount) + "";
            if (this.olderservicecount.length < 5) {
              this.olderservicecount = this.olderservicecount + "人";
            }
            this.$refs.rate && this.$refs.rate.reset();
            this.$refs.rate && this.$refs.rate.update(
              parseFloat(data.olderservicerate).toFixed(1)
            );
            // for (let i = 0; i < this.olderservicecount.length; i++) {
            //   if (this.olderservicecount[i] != '人') {
            //     this.$refs['value' + i][0].reset()
            //     this.$refs['value' + i][0].update(parseInt(this.olderservicecount[i]))
            //   }
            // }
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
    drawChart() {
      console.log(222,'我走进来了嘛')
      if (!this.$refs.chart) return;
      console.log(111111,'我走进来了嘛')
      let echarts = this.$echarts.init(this.$refs.chart);
      var dataArry = ['小一', '小二', '小三']
      let option = {
        backgroundColor: '#060b18',
        "textStyle": {
          "color": "#c0c3cd",
          "fontSize": 14
        },
        "toolbox": {
          "show": false,
          "feature": {
            "saveAsImage": {
              "backgroundColor": "#060b18"
            },
            "restore": {}
          },
          "iconStyle": {
            "borderColor": "#c0c3cd"
          }
        },
        "legend": {
          "top": 10,
          "itemWidth": 8,
          "itemHeight": 8,
          "icon": "circle",
          "left": "center",
          "padding": 0,
          "textStyle": {
            "color": "#c0c3cd",
            "fontSize": 14,
            "padding": [
              2,
              0,
              0,
              0
            ]
          }
        },
        "color": [
          "#63caff",
          "#49beff",
          "#03387a",
          "#03387a",
          "#03387a",
          "#6c93ee",
          "#a9abff",
          "#f7a23f",
          "#27bae7",
          "#ff6d9d",
          "#cb79ff",
          "#f95b5a",
          "#ccaf27",
          "#38b99c",
          "#93d0ff",
          "#bd74e0",
          "#fd77da",
          "#dea700"
        ],
        "grid": {
          "containLabel": true,
          "left": 0,
          "right": 0,
          "bottom":30,
          "top": 82
        },
        "xAxis": {
          "nameTextStyle": {
            "color": "#c0c3cd",
            "padding": [
              0,
              0,
              -15,
              0
            ],
            "fontSize": 14
          },
          "axisLabel": {
            "color": "#c0c3cd",
            "fontSize": 14,
            "interval": 0
          },
          "axisLine": {
            "lineStyle": {
              "color": "#092442",
              "width": 1,
              "type": "dashed"
            },
            "show": true
          },
          "data": [
            "极高风险",
            "高风险",
            "中风险",
            "低风险",
          ],
          "type": "category"
        },
        "yAxis": {

          "nameTextStyle": {
            "show":false,
            "color": "#c0c3cd",
            "padding": [
              0,
              0,
              -10,
              0
            ],
            "fontSize": 14
          },
          "axisLabel": {
            "show":false,
            "color": "#c0c3cd",
            "fontSize": 14
          },
          "axisTick": {
            "lineStyle": {
              "color": "#092442",
              "width": 1
            },
            "show": true
          },
          "splitLine": {
            "show": true,
            "lineStyle": {
              "color": "#092442",
              "type": "dashed"
            }
          },
          "axisLine": {
            "lineStyle": {
              "color": "#092442",
              "width": 1,
              "type": "dashed"
            },
            "show": false
          },
          "name": ""
        },
        "series": [
          {
            "data": [
              200,
              85,
              112,
              50,
            ],
            "type": "bar",
            "barMaxWidth": "auto",
            "barWidth": 30,
            "itemStyle": {
              "color": {
                "x": 0,
                "y": 0,
                "x2": 0,
                "y2": 1,
                "type": "linear",
                "global": false,
                "colorStops": [
                  {
                    "offset": 0,
                    "color": "#4faef7"
                  },
                  {
                    "offset": 1,
                    "color": "#0f5c85"
                  }
                ]
              }
            },
            "label": {
              "show": true,
              "position": "top",
              "distance": 10,
              "color": "#fff"
            }
          },
          {
            "data": [
              1,
              1,
              1,
              1,
              1,
              1,
              1,
            ],
            "type": "pictorialBar",
            "barMaxWidth": "20",
            "symbol": "diamond",
            "symbolOffset": [
              0,
              "50%"
            ],
            "symbolSize": [
              30,
              15
            ]
          },
          {
            "data": [
              200,
              85,
              112,
              50,
            ],
            "type": "pictorialBar",
            "barMaxWidth": "20",
            "symbolPosition": "end",
            "symbol": "diamond",
            "symbolOffset": [
              0,
              "-50%"
            ],
            "symbolSize": [
              30,
              12
            ],
            "zlevel": 2
          },
          {
            "data": [
              500,
              300,
              600,
              100,
            ],
            "type": "bar",
            "barMaxWidth": "auto",
            "barWidth": 30,
            "barGap": "-100%",
            "label": {
              "show": false,
              "position": "top",
              "distance": 10,
              "color": "#fff"
            },
            "zlevel": -1
          },
          {
            "data": [
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "type": "pictorialBar",
            "barMaxWidth": "20",
            "symbol": "diamond",
            "symbolOffset": [
              0,
              "50%"
            ],
            "symbolSize": [
              30,
              15
            ],
            "zlevel": -2
          },
          {
            "data": [
              500,
              300,
              600,
              100,
              700
            ],
            "type": "pictorialBar",
            "barMaxWidth": "20",
            "symbolPosition": "end",
            "symbol": "diamond",
            "symbolOffset": [
              0,
              "-50%"
            ],
            "symbolSize": [
              30,
              12
            ],
            "zlevel": -1
          }
        ],
        "tooltip": {
          "trigger": "axis",
          "show": false
        }
      }
      echarts.clear();
      echarts.setOption(option, true);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@font-face {
  font-family: "PangMenZhengDao";
  src: url("../../font/PangMenZhengDao.woff2");
}

.service-num {
  width: 100%;
  height: 307px;
  position: relative;
  .chart-value{
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 26px;
    z-index: 10;
    .value-left{
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #D3E3F4;
    }
    .value-right{
      width: 52px;
      height: 22px;
      font-size: 32px;
      font-family: PangMenZhengDao;
      font-weight: 400;
      color: #DFFCFF;
    }
  }
  .chart{
    height: 307px;
    width: 100%;
    z-index: 2;
  }
}
</style>
