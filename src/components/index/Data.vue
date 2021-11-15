<template>
  <Common title="相关数据" direction="right">
    <div class="data">
      <div class="data-item">
        <div class="data-title flex align-center">
          <img
            class="data-title-icon"
            src="@/assets/lc/home_icon_ornament@2x.png"
          />
          <div class="data-title-name">机构床位情况</div>
          <div class="data-title-line flex1"></div>
          <div class="data-title-line-short"></div>
        </div>
        <div
          class="data-content flex align-center flex-between position-relative"
        >
          <div>
            <div class="data-content-value">
              <ICountUp
                :start="0"
                :endVal="0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value1"
              ></ICountUp>
            </div>
            <div class="data-content-dec">床位数</div>
          </div>
          <div class="chart-box">
            <div class="position-relative">
              <div class="chart" ref="chart1"></div>
              <svg class="svg">
                <circle
                  cx="50%"
                  cy="50%"
                  r="39"
                  stroke="rgba(255, 208, 42, 1)"
                  stroke-width="1"
                  fill="none"
                  stroke-dasharray="4, 3"
                />
              </svg>
              <div class="data-content-num flex flex-column align-center">
                <div class="data-content-num-value" style="color: #fccc27">
                  <ICountUp
                    :start="0"
                    :endVal="0.0"
                    :decimals="0"
                    :duration="3"
                    :options="options1"
                    ref="value2"
                  ></ICountUp>
                </div>
                <div class="data-content-num-name">入住率</div>
              </div>
            </div>
          </div>
          <div class="flex flex-column align-end">
            <div class="data-content-value">
              <ICountUp
                :start="0"
                :endVal="parseInt(bedusedcount)"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value3"
              ></ICountUp>
            </div>
            <div class="data-content-dec">入住数</div>
          </div>
        </div>
      </div>
      <div class="data-item">
        <div class="data-title flex align-center">
          <img
            class="data-title-icon"
            src="@/assets/lc/home_icon_ornament@2x.png"
          />
          <div class="data-title-name">老人参与活动</div>
          <div class="data-title-line flex1"></div>
          <div class="data-title-line-short"></div>
        </div>
        <div
          class="data-content flex align-center flex-between position-relative"
        >
          <div>
            <div class="data-content-value">
              <ICountUp
                :start="0"
                :endVal="0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value4"
              ></ICountUp>
            </div>
            <div class="data-content-dec">活动数</div>
          </div>
          <div class="chart-box">
            <div class="position-relative">
              <div class="chart" ref="chart2"></div>
              <svg class="svg">
                <circle
                  cx="50%"
                  cy="50%"
                  r="39"
                  stroke="#08C1FC"
                  stroke-width="1"
                  fill="none"
                  stroke-dasharray="4, 3"
                />
              </svg>
              <div class="data-content-num flex flex-column align-center">
                <div class="data-content-num-value" style="color: #08c1fc">
                  <ICountUp
                    :start="0"
                    :endVal="0.0"
                    :decimals="0"
                    :duration="3"
                    :options="options1"
                    ref="value5"
                  ></ICountUp>
                </div>
                <div class="data-content-num-name">参与率</div>
              </div>
            </div>
          </div>
          <div class="flex flex-column align-end">
            <div class="data-content-value">
              <ICountUp
                :start="0"
                :endVal="0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value6"
              ></ICountUp>
            </div>
            <div class="data-content-dec">参与老人数</div>
          </div>
        </div>
      </div>
      <div class="data-item">
        <div class="data-title flex align-center">
          <img
            class="data-title-icon"
            src="@/assets/lc/home_icon_ornament@2x.png"
          />
          <div class="data-title-name">服务订单</div>
          <div class="data-title-line flex1"></div>
          <div class="data-title-line-short"></div>
        </div>
        <div
          class="data-content flex align-center flex-between position-relative"
        >
          <div>
            <div class="data-content-value">
              <ICountUp
                :start="0"
                :endVal="0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value7"
              ></ICountUp>
            </div>
            <div class="data-content-dec">订单总数</div>
          </div>
          <div class="chart-box">
            <div class="position-relative">
              <div class="chart" ref="chart3"></div>
              <svg class="svg">
                <circle
                  cx="50%"
                  cy="50%"
                  r="39"
                  stroke="#21CB3D"
                  stroke-width="1"
                  fill="none"
                  stroke-dasharray="4, 3"
                />
              </svg>
              <div class="data-content-num flex flex-column align-center">
                <div class="data-content-num-value" style="color: #21cb3d">
                  <ICountUp
                    :start="0"
                    :endVal="0.0"
                    :decimals="0"
                    :duration="3"
                    :options="options1"
                    ref="value8"
                  ></ICountUp>
                </div>
                <div class="data-content-num-name">完成率</div>
              </div>
            </div>
          </div>
          <div class="flex flex-column align-end">
            <div class="data-content-value">
              <ICountUp
                :start="0"
                :endVal="0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value9"
              ></ICountUp>
            </div>
            <div class="data-content-dec">完成订单数</div>
          </div>
        </div>
      </div>
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
import ICountUp from "vue-countup-v2";
export default {
  name: "Data",
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
      options1: {
        useEasing: true,
        useGrouping: true,
        separator: "",
        decimal: ".",
        prefix: "",
        suffix: "%",
        decimalPlaces: 1,
      },
      value: 80,
      activitycount: "0",
      activityoldercount: "0",
      activityrate: "0.0",
      bedcount: "0", // 床位数
      bedusedcount: "0", // 入住数
      bedusedrate: "0.0", // 入住率
      oldercount: "0",
      olderservicecount: "0", // 服务人数
      olderservicerate: "0.0", // 服务覆盖率
      vediocount: "0",
      vediohealthrate: "0.0",
      vediopeoplecount: "0",
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
      // bedcount: "590.0" // 床位数
      // bedusedcount: "355.0" // 入住数
      // bedusedrate: "60.2" // 入住率
      // oldercount: "500.0"
      // olderservicecount: "400.0" // 服务人数
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
            this.$refs.value1 && this.$refs.value1.reset();
            this.$refs.value1 && this.$refs.value1.update(parseInt(data.bedcount));
            this.$refs.value2 && this.$refs.value2.reset();
            this.$refs.value2 && this.$refs.value2.update(parseFloat(data.bedusedrate).toFixed(1));
            this.$refs.value3 && this.$refs.value3.reset();
            this.$refs.value3 && this.$refs.value3.update(parseInt(data.bedusedcount));

            this.$refs.value4 && this.$refs.value4.reset();
            this.$refs.value4 && this.$refs.value4.update(parseInt(data.activitycount));
            this.$refs.value5 && this.$refs.value5.reset();
            this.$refs.value5 && this.$refs.value5.update(parseFloat(data.activityrate).toFixed(1));
            this.$refs.value6 && this.$refs.value6.reset();
            this.$refs.value6 && this.$refs.value6.update(parseInt(data.activityoldercount));

            this.$refs.value7 && this.$refs.value7.reset();
            this.$refs.value7 && this.$refs.value7.update(parseInt(data.ordernum));
            this.$refs.value8 && this.$refs.value8.reset();
            this.$refs.value8 && this.$refs.value8.update(
              parseFloat(data.ordercompleterate).toFixed(1)
            );
            this.$refs.value9 && this.$refs.value9.reset();
            this.$refs.value9 && this.$refs.value9.update(parseInt(data.ordercomplete));
            this.draw(
              this.$refs.chart1,
              data.bedusedrate,
              "rgba(255, 208, 42, 1)",
              "rgba(217, 153, 0, 1)"
            );
            this.draw(
              this.$refs.chart2,
              data.activityrate,
              "rgba(8, 193, 252, 1)",
              "rgba(9, 101, 195, 1)"
            );
            this.draw(
              this.$refs.chart3,
              data.vediohealthrate,
              "rgba(51, 234, 81, 1)",
              "rgba(9, 146, 9, 1)"
            );
          }
          init.call(this);
          clearInterval(this.innertimer);
          this.innertimer = setInterval(() => {
            init.call(this);
          }, 11000);
        }
      });
    },
    draw(obj, value, color1, color2) {
      if (!obj) return
      let echarts = this.$echarts.init(obj);
      let option = {
        series: [
          {
            type: "pie",
            radius: ["86%", "100%"],
            avoidLabelOverlap: false,
            silent: true,
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: value,
                itemStyle: {
                  color: "#092744",
                },
              },
            ],
            animation: false,
            startAngle: -270,
            left: 0,
            right: 0,
          },
          // 实际值
          {
            type: "pie",
            radius: ["86%", "100%"],
            avoidLabelOverlap: false,
            silent: true,
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: value,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: color1, // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: color2, // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
              { value: 100 - value, itemStyle: { color: "rgba(0, 0, 0, 0)" } },
            ],
            animation: true,
            startAngle: -270,
            left: 0,
            right: 0,
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
@keyframes cirlce {
  from {
    stroke-dashoffset: -260;
  }
  to {
    stroke-dashoffset: 0;
  }
}
.data {
  width: 100%;
  height: 505px;
  padding: 17px 25px;
  .chart {
    width: 100%;
    height: 236px;
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
  &-item {
    width: 100%;
    // margin-top: 22px;
    // padding-top: 36px;
    // padding-bottom: 41px;
    margin-bottom: 22px;
  }
  &-title {
    width: 100%;
    &-icon {
      width: 18px;
      height: 24px;
      margin-right: 11px;
    }
    &-name {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-right: 9px;
    }
    &-line {
      height: 1px;
      background: #10243e;
      &-short {
        width: 10px;
        height: 1px;
        background: #1cb5fc;
      }
    }
  }
  .chart {
    width: 102px;
    height: 102px;
    transform: rotateY(180deg);
    &-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &-content {
    width: 90%;
    margin-top: 22px;
    margin-left: 38px;
    height: 89px;
    // margin-left: 38px;
    // margin-right: 20px;
    background: linear-gradient(
      90deg,
      rgba(11, 29, 47, 0) 0%,
      rgba(11, 29, 47, 0.7) 49%,
      rgba(11, 29, 47, 0) 100%
    );
    &-value {
      font-size: 24px;
      font-family: PangMenZhengDao;
      font-weight: 400;
      color: #c8eefb;
      margin-bottom: 6px;
    }
    &-dec {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #85b0c7;
    }
    &-num {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      &-name {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #85b0c7;
      }
      &-value {
        font-size: 20px;
        font-family: PangMenZhengDao;
        font-weight: 400;
      }
    }
  }
  .svg {
    width: 108px;
    height: 108px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // .circle {
    //   stroke-dashoffset: 0;
    //   transition: all .3s ease;
    // }
  }
}
</style>
