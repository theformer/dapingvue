<template>
  <Common title="巡查巡检" direction="right">
    <div class="patrolInspection">
      <div class="patrolInspection-item">
        <div class="patrolInspection-item-left">
          <div class="item-left-top">
            <img src="../../assets/lc/home_icon_ornament@2x.png" alt="" />
            <span>巡检次数</span>
          </div>
          <div class="item-left-btm">
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
        <div class="patrolInspection-item-right">
          <div class="serviceTime">
            <div class="serviceTime-top">
              <div class="serviceTime-top-left">
                <div class="serviceTime-top-left-item">
                  <span
                    ><ICountUp
                      :start="0"
                      :endVal="0.0"
                      :decimals="0"
                      :duration="3"
                      :options="options1"
                      ref="value2"
                    ></ICountUp
                  ></span>
                </div>
              </div>
              <div class="serviceTime-top-right">
                <span
                  ><ICountUp
                    :start="0"
                    :endVal="0.0"
                    :decimals="0"
                    :duration="3"
                    :options="options1"
                    ref="value3"
                  ></ICountUp
                ></span>
              </div>
            </div>
            <div class="serviceTime-center">
              <!-- <div class="chart" ref="chart"></div> -->
              <div class="chart">
                <div class="chart-left" :style="{ width: qualified }"></div>
                <div class="chart-right" :style="{ width: noqualified }"></div>
                <div class="circle-top-left"></div>
                <div class="circle-top-right"></div>
                <div class="circle-btm-left"></div>
                <div class="circle-btm-right"></div>
              </div>
            </div>
            <div class="serviceTime-btm">
              <div class="serviceTime-btm-item">
                <div>合格数</div>
                <div style="color: #18e052">
                  <ICountUp
                    :start="0"
                    :endVal="0.0"
                    :decimals="0"
                    :duration="3"
                    :options="options"
                    ref="value4"
                  ></ICountUp>
                </div>
              </div>
              <div class="serviceTime-btm-item">
                <div>未达标</div>
                <div style="color: #ffd409">
                  <ICountUp
                    :start="0"
                    :endVal="0.0"
                    :decimals="0"
                    :duration="3"
                    :options="options"
                    ref="value5"
                  ></ICountUp>
                </div>
              </div>
            </div>
            <!-- <div class="chart" ref="chart" style="width: 300px; height: 300px"></div> -->
          </div>
        </div>
      </div>
      <div class="patrolInspection-item">
        <div class="patrolInspection-item-left">
          <div class="item-left-top">
            <img src="../../assets/lc/home_icon_ornament@2x.png" alt="" />
            <span>整改数</span>
          </div>
          <div class="item-left-btm">
            <ICountUp
              :start="0"
              :endVal="0.0"
              :decimals="0"
              :duration="3"
              :options="options"
              ref="value6"
            ></ICountUp>
          </div>
        </div>
        <div class="patrolInspection-item-right">
          <div class="serviceTime">
            <div class="serviceTime-top">
              <div class="serviceTime-top-left">
                <div class="serviceTime-top-left-item">
                  <span
                    ><ICountUp
                      :start="0"
                      :endVal="0.0"
                      :decimals="0"
                      :duration="3"
                      :options="options1"
                      ref="value7"
                    ></ICountUp
                  ></span>
                </div>
              </div>
              <div class="serviceTime-top-right">
                <span></span>
              </div>
            </div>
            <div class="serviceTime-center">
              <!-- <div class="chart" ref="chart"></div> -->
              <div class="chart">
                <div
                  class="chart-left2"
                  :style="{ width: rectification }"
                ></div>
                <div
                  class="chart-right2"
                  :style="{ width: norectification }"
                ></div>
                <div class="circle-top-left"></div>
                <div class="circle-top-right"></div>
                <div class="circle-btm-left"></div>
                <div class="circle-btm-right"></div>
              </div>
            </div>
            <div class="serviceTime-btm">
              <div class="serviceTime-btm-item">
                <div>整改率</div>
                <div style="color: #18e052"></div>
              </div>
              <div class="serviceTime-btm-item">
                <div></div>
                <div style="color: #ffd409"></div>
              </div>
            </div>
            <!-- <div class="chart" ref="chart" style="width: 300px; height: 300px"></div> -->
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
  name: "PatrolInspection",
  components: {
    Common,
    ICountUp,
  },
  data() {
    return {
      qualified: "",
      noqualified: "",
      rectification: "",
      norectification: "",
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
      this.$axios({
        url: "/screen/getInspection",
        method: "post",
        data: {
          areaName: this.name,
        },
      }).then((res) => {
        console.log(res, "巡查巡检");
        let { data } = res.data;
        if (data) {
          let zon = parseFloat(data.checkHg) + parseFloat(data.checkBdb);
          this.qualified = (parseFloat(data.checkHg) / zon) * 100 + "%";
          this.noqualified = 100 - (parseFloat(data.checkHg) / zon) * 100 + "%";
          this.rectification = parseFloat(data.checkZgRate) + "%";
          this.norectification = 100 - parseFloat(data.checkZgRate) + "%";

          function init() {
            this.$refs.value1 && this.$refs.value1.reset();
            this.$refs.value1 &&
              this.$refs.value1.update(parseFloat(data.checkNum).toFixed(1));
            this.$refs.value2 && this.$refs.value2.reset();
            this.$refs.value2 &&
              this.$refs.value2.update(parseFloat(data.checkHgRate).toFixed(1));
            this.$refs.value3 && this.$refs.value3.reset();
            this.$refs.value3 &&
              this.$refs.value3.update(
                parseFloat(data.checkBdbRate).toFixed(1)
              );
            this.$refs.value4 && this.$refs.value4.reset();
            this.$refs.value4 &&
              this.$refs.value4.update(parseFloat(data.checkHg).toFixed(1));
            this.$refs.value5 && this.$refs.value5.reset();
            this.$refs.value5 &&
              this.$refs.value5.update(parseFloat(data.checkBdb).toFixed(1));
            this.$refs.value6 && this.$refs.value6.reset();
            this.$refs.value6 &&
              this.$refs.value6.update(parseFloat(data.checkZg).toFixed(1));
            this.$refs.value7 && this.$refs.value7.reset();
            this.$refs.value7 &&
              this.$refs.value7.update(parseFloat(data.checkZgRate).toFixed(1));
          }
          init.call(this);
          clearInterval(this.innertimer);
          this.innertimer = setInterval(() => {
            init.call(this);
          }, 10000);
        }
      });
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
.patrolInspection {
  width: 100%;
  height: 244px;
  padding: 14px 34px;
  box-sizing: border-box;
  .patrolInspection-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 42px;
    .patrolInspection-item-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      min-width: 80px;
      margin-right: 74px;
      .item-left-top {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #6a94ae;
        margin-bottom: 20px;
        img {
          width: 11px;
          height: 11px;
          margin-right: 4px;
        }
      }
      .item-left-btm {
        padding-left: 15px;
        font-size: 36px;
        font-family: PangMenZhengDao;
        font-weight: 400;
        color: #c8eefb;
        line-height: 32px;
      }
    }
    .patrolInspection-item-right {
      flex: 1;
      .serviceTime {
        width: 100%;
        .serviceTime-top {
          margin-bottom: 8px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .serviceTime-top-left {
            display: flex;
            align-items: center;
            .serviceTime-top-left-item {
              margin-right: 19px;
              display: flex;
              align-items: center;

              span {
                font-size: 18px;
                font-family: PangMenZhengDao;
                font-weight: 400;
                color: #dffcff;
              }
            }
          }
          .serviceTime-top-right {
            display: flex;
            align-items: center;
            span:first-child {
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #c8eefb;
              margin-right: 0px;
            }
            span:last-child {
              font-size: 18px;
              font-family: PangMenZhengDao;
              font-weight: 400;
              color: #dffcff;
            }
          }
        }
        .serviceTime-center {
          width: 100%;
          height: 20px;
          margin-bottom: 8px;
          .chart {
            width: 100%;
            // max-height: 12px;
            display: flex;
            border: 5px solid #092948;
            box-sizing: border-box;
            position: relative;

            .chart-left {
              height: 16px;
              background: linear-gradient(90deg, #15A91C 1%, #30E34B 100%);
            }
            .chart-right {
              height: 16px;
              background: linear-gradient(90deg, #FFD40A 0%, #FFE469 100%);
            }
            .chart-left2 {
              height: 16px;
              background: linear-gradient(90deg, #ff2b58 1%, #ff6586 100%);
            }
            .chart-right2 {
              height: 16px;
              background: linear-gradient(90deg, #070e12 0%, #070e12 100%);
            }
          }
        }
        .serviceTime-btm {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .serviceTime-btm-item {
            display: flex;
            align-items: center;

            div:first-child {
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #fff;
              line-height: 24px;
              margin-right: 4px;
            }
            div:last-child {
              font-size: 18px;
              font-family: PangMenZhengDao;
              font-weight: 400;
              color: #fff;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
  .circle-top-left {
    width: 2px;
    height: 2px;
    background: #1ec2ff;
    border-radius: 50%;
    position: absolute;
    top: -5px;
    left: -5px;
    box-shadow: 0 0 8px 1px rgb(79, 220, 255);
  }
  .circle-top-right {
    width: 2px;
    height: 2px;
    background: #1ec2ff;
    border-radius: 50%;
    position: absolute;
    top: -5px;
    right: -5px;
    box-shadow: 0 0 8px 1px rgb(79, 220, 255);
  }
  .circle-btm-left {
    width: 2px;
    height: 2px;
    background: #1ec2ff;
    border-radius: 50%;
    position: absolute;
    left: -5px;
    bottom: -5px;
    box-shadow: 0 0 8px 1px rgb(79, 220, 255);
  }
  .circle-btm-right {
    width: 2px;
    height: 2px;
    background: #1ec2ff;
    border-radius: 50%;
    position: absolute;
    right: -5px;
    bottom: -5px;
    box-shadow: 0 0 8px 1px rgb(79, 220, 255);
  }
}
</style>
