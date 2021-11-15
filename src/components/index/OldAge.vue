<template>
  <Common title="道路风险性统计">
    <div class="oldAge">
<!--      <div class="tag">-->
<!--        <div class="tag-item">-->
<!--          <div class="item-left blue"></div>-->
<!--          <div class="item-right">男性</div>-->
<!--        </div>-->
<!--        <div class="tag-item">-->
<!--          <div class="item-left"></div>-->
<!--          <div class="item-right">女性</div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="chart" ref="chart"></div>
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
export default {
  name: "OldAge",
  components: { Common },
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
    this.drawChart()
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getData();
    }, 1000 * 60 * 60);
  },
  methods: {
    getData() {
      this.$axios({
        url: "/screen/olderSexAgeCount",
        method: "post",
        data: {
          address: this.name,
          jg: "",
          orgCode: "",
        },
      }).then((res) => {
        console.log(res, "老人年龄分布");
        let { data } = res.data;
        if (data) {
          let ageValue = [
            data.age60Num,
            data.age70Num,
            data.age80Num,
            data.age90Num,
            data.age100Num,
          ];
          let manValue = [
            data.age60Mnum,
            data.age70Mnum,
            data.age80Mnum,
            data.age90Mnum,
            data.age100Mnum,
          ];
          let womanValue = [
            data.age60Wnum,
            data.age70Wnum,
            data.age80Wnum,
            data.age90Wnum,
            data.age100Wnum,
          ];
          // console.log(ageValue, "年龄总数");
          // console.log(manValue, "男性年龄总数");
          // console.log(womanValue, "女性年龄总数");
          function init() {
            this.drawChart(ageValue, manValue, womanValue);
          }
          init.call(this);
          clearInterval(this.innertimer);
          this.innertimer = setInterval(() => {
            init.call(this);
          }, 10000);
        }
      });
    },
    drawChart() {
      if (!this.$refs.chart) return;
      let echarts = this.$echarts.init(this.$refs.chart);
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
          "left": 20,
          "right": 20,
          "bottom": 10,
          "top": 40
        },
        "xAxis": {
          "nameTextStyle": {
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
.oldAge {
  width: 100%;
  //   padding: 0 33px;
  box-sizing: border-box;
  height: 220px;
  position: relative;
  .tag {
    position: absolute;
    right: 22px;
    top: 22px;
    display: flex;
    align-items: center;
    .tag-item {
      display: flex;
      align-items: center;
      margin-left: 23px;
      .item-left {
        width: 10px;
        height: 4px;
        background: #fc3d6f;
        margin-right: 8px;
      }
      .item-right {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #6a94ae;
      }
      .blue {
        background: #1381ff;
      }
    }
  }
  .chart {
    width: 100%;
    height: 220px;
  }
}
</style>
