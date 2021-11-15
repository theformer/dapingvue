<template>
  <Common title="服务订单">
    <div class="orderSum">
      <div class="orderSum-top flex align-center flex-center">
        <div class="orderSum-title">总金额(万元)</div>
        <div class="orderSum-value">
          <ICountUp
            :start="0"
            :endVal="0.0"
            :decimals="0"
            :duration="3"
            :options="options"
            ref="value1"
          ></ICountUp>
        </div>
      </div>
      <div class="orderSum-btm">
        <div class="orderSum-btm-item">
          <div class="orderSum-btm-item-wz wz-left">
            <div>
              <ICountUp
                :start="0"
                :endVal="0.0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value3"
              ></ICountUp>
            </div>
            <div>订单总数</div>
          </div>
          <div class="orderSum-btm-item-center">
            <div class="chart" ref="chartTop"></div>
            <svg class="svg">
              <circle
                cx="50%"
                cy="50%"
                r="39"
                stroke="#0965C3"
                stroke-width="1"
                fill="none"
                stroke-dasharray="4, 3"
              />
            </svg>
            <div class="data-content-num flex flex-column align-center">
              <div class="data-content-num-value" style="color: #0965c3">
                <ICountUp
                  :start="0"
                  :endVal="0.0"
                  :decimals="0"
                  :duration="3"
                  :options="options1"
                  ref="value4"
                ></ICountUp>
              </div>
              <div class="data-content-num-name">好评率</div>
            </div>
          </div>
          <div class="orderSum-btm-item-wz wz-right">
            <div>
              <ICountUp
                :start="0"
                :endVal="0.0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value5"
              ></ICountUp>
            </div>
            <div>完成数</div>
          </div>
        </div>
        <div class="orderSum-btm-item">
          <div class="orderSum-btm-item-wz wz-left">
            <div>
              <ICountUp
                :start="0"
                :endVal="0.0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value6"
              ></ICountUp>
            </div>
            <div>评价数</div>
          </div>
          <div class="orderSum-btm-item-center">
            <div class="chart" ref="chartBtm"></div>
            <svg class="svg">
              <circle
                cx="50%"
                cy="50%"
                r="39"
                stroke="#099209"
                stroke-width="1"
                fill="none"
                stroke-dasharray="4, 3"
              />
            </svg>
            <div class="data-content-num flex flex-column align-center">
              <div class="data-content-num-value" style="color: #099209">
                <ICountUp
                  :start="0"
                  :endVal="0.0"
                  :decimals="0"
                  :duration="3"
                  :options="options1"
                  ref="value7"
                ></ICountUp>
              </div>
              <div class="data-content-num-name">完成率</div>
            </div>
          </div>
          <div class="orderSum-btm-item-wz wz-right">
            <div>
              <ICountUp
                :start="0"
                :endVal="0.0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value8"
              ></ICountUp>
            </div>
            <div>问诊次数</div>
          </div>
        </div>
      </div>
      <!-- <div class="chart" ref="chart" style="width: 300px; height: 300px"></div> -->
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
import ICountUp from "vue-countup-v2";
export default {
  name: "OrderSum",
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
      },
      options1: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: "%",
        decimalPlaces: 1,
      },
      value: 80,
    };
  },
  props: {
    name: {
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
      this.getDataData();
    },
  },
  mounted() {
    // this.$refs.value1.reset();
    // this.$refs.value1.update(parseFloat(this.value).toFixed(1));
    // this.draw1();
    // this.draw2();
    this.getData();
    this.getDataData();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getData();
      this.getDataData();
    }, 1000 * 60 * 60);
  },
  methods: {
    getData() {
      this.$axios({
        url: "/screen/getorderinfo",
        method: "post",
        data: {
          areaname: this.name,
        },
      }).then((res) => {
        console.log(res, "服务订单总金额，补贴金额，饼图数据");
        let { data } = res.data;
        if (data) {
          function init() {
            this.$refs.value1 && this.$refs.value1.reset();
            this.$refs.value1 && this.$refs.value1.update(
              parseFloat(data.ordertotalamount).toFixed(1)
            );
            // this.$refs.value2.reset();
            // this.$refs.value2.update(
            //   parseFloat(data.ordersubsidyamount).toFixed(1)
            // );
            this.$refs.value3 && this.$refs.value3.reset();
            this.$refs.value3 && this.$refs.value3.update(parseFloat(data.ordercount).toFixed(1));
            this.$refs.value4 && this.$refs.value4.reset();
            this.$refs.value4 && this.$refs.value4.update(
              parseFloat(data.ordercompleterate).toFixed(1)
            );
            this.draw(
              this.$refs.chartTop,
              data.ordercompleterate,
              "#0965C3",
              "#08C1FC"
            );

            this.$refs.value5 && this.$refs.value5.reset();
            this.$refs.value5 && this.$refs.value5.update(
              parseFloat(data.ordercompletecount).toFixed(1)
            );
            this.$refs.value6 && this.$refs.value6.reset();
            this.$refs.value6 && this.$refs.value6.update(parseFloat(data.pjgoodcount).toFixed(1));
            this.$refs.value7 && this.$refs.value7.reset();
            this.$refs.value7 && this.$refs.value7.update(parseFloat(data.pjgoodrate).toFixed(1));
            this.draw(
              this.$refs.chartBtm,
              data.pjgoodrate,
              "#099209",
              "#33EA51"
            );
          }
          init.call(this);
          clearInterval(timer);
          var timer = setInterval(() => {
            init.call(this);
          }, 10000);
        }
      });
    },
    getDataData() {
      this.$axios({
        url: "/screen/getorgindex",
        method: "post",
        data: {
          areaname: this.name,
        },
      }).then((res) => {
        let { data } = res.data;
        if (data) {
          function init() {
            this.$refs.value8.reset();
            this.$refs.value8.update(parseFloat(data.vediocount).toFixed(1));
          }
          init.call(this);
          clearInterval(this.innertimer);
          this.innertimer = setInterval(() => {
            init.call(this);
          }, 10000);
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
.orderSum {
  width: 100%;
  height: 305px;
  &-title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #6a94ae;
  }
  &-value {
    font-size: 32px;
    font-family: PangMenZhengDao;
    font-weight: 400;
    color: #c8eefb;
  }
  .orderSum-top {
    padding: 29px 0;
    .orderSum-top-item {
      width: 50%;
      display: flex;
      align-content: center;
      .orderSum-top-item-left {
        height: 52px;
        display: flex;
        align-items: center;
        margin-right: 15px;
        img {
          width: 45px;
          height: 45px;
        }
      }
      .orderSum-top-item-right {
        height: 45px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: center;
        div:first-child {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #6a94ae;
        }
        div:last-child {
          font-size: 32px;
          font-family: PangMenZhengDao;
          font-weight: 400;
          color: #c8eefb;
        }
      }
    }
  }
  .orderSum-btm {
    .orderSum-btm-item {
      width: 100%;
      height: 89px;
      padding: 0 33px;
      // background: linear-gradient(
      //   90deg,
      //   rgba(11, 29, 47, 0) 0%,
      //   rgba(12, 33, 54, 0.7) 49%,
      //   rgba(11, 29, 47, 0) 100%
      // );
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      .orderSum-btm-item-wz {
        width: 100px;
        div:first-child {
          font-size: 24px;
          font-family: PangMenZhengDao;
          font-weight: 400;
          color: #c8eefb;
          margin-bottom: 10px;
        }
        div:last-child {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #85b0c7;
        }
      }
      .wz-right {
        text-align: right;
      }
      .wz-left {
        text-align: left;
      }

      .orderSum-btm-item-center {
        width: 102px;
        height: 102px;
        position: relative;

        .chart {
          width: 102px;
          height: 102px;
          -webkit-transform: rotateY(180deg);
          transform: rotateY(180deg);
        }
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
  .data-content-num {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    .data-content-num-value {
      font-size: 20px;
      font-family: PangMenZhengDao;
      font-weight: 400;
    }
    .data-content-num-name {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #85b0c7;
    }
  }
}
</style>
