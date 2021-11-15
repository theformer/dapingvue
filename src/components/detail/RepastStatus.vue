<template>
  <div class="repastStatus">
    <div class="repastStatus-top">
      <div class="repastStatus-top-left">
        <div class="top-left-left">
          <img src="../../assets/pensionServices/icon_meal@2x.png" alt="" />
        </div>
        <div class="top-left-right">
          <div>订单总数</div>
          <div>
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
      </div>
      <div class="repastStatus-top-center"></div>
      <div class="repastStatus-top-right">
        <div class="top-right-item">
          <div class="top-right-item-left">
            <img src="../../assets/pensionServices/icon_jine@2x.png" alt="" />
            <span>总金额(元)</span>
          </div>
          <div class="top-right-item-right">
            <span
              ><ICountUp
                :start="0"
                :endVal="0.0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value2"
              ></ICountUp
            ></span>
          </div>
        </div>
        <div class="top-right-item">
          <div class="top-right-item-left">
            <img src="../../assets/pensionServices/icon_butie@2x.png" alt="" />
            <span>补贴金额(元)</span>
          </div>
          <div class="top-right-item-right">
            <span
              ><ICountUp
                :start="0"
                :endVal="0.0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value3"
              ></ICountUp
            ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="repastStatus-btm">
      <div class="repastStatus-btm-item">
        <div class="repastStatus-btm-item-left">
          <div class="chart" ref="chartTopLeft"></div>
          <svg
            class="header-svg"
            style="
              font-size: 18px;
              position: absolute;
              left: 20%;
              top: 12%;
              z-index: 999;
              font-family: PangMenZhengDao;
              font-weight: 400;
              font-style: italic;
              line-height: 22px;
              height: 50px;
            "
          >
            <defs>
              <linearGradient
                id="headerTitle"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" style="stop-color: #fff; stop-opacity: 1" />
                <stop
                  offset="0%"
                  style="stop-color: #96c8d7; stop-opacity: 1"
                />
                <stop
                  offset="100%"
                  style="stop-color: #cbecf6; stop-opacity: 1"
                />
              </linearGradient>
            </defs>
            <text x="0" y="40" fill="url(#headerTitle)" class="header-title">
              就餐点
            </text>
          </svg>
        </div>
        <div class="repastStatus-btm-item-right">
          <div class="chart" ref="chartTopRight">
            <div class="way">
              <div class="way-item">
                <ModalProgress
                  name="中心食堂"
                  bgColor="linear-gradient(90deg, #1D76DA 0%, #00C6FF 100%)"
                  color="#00C5FF"
                  outerColor="#5DDBFF"
                  innerColor="#5DDBFF"
                  :value="centerRoom + '%'"
                  :percent="centerRoom"
                />
              </div>
              <div class="way-item">
                <ModalProgress
                  name="助餐点"
                  bgColor="linear-gradient(90deg, #FFC21D 0%, #FCD963 100%)"
                  color="#FFCD22"
                  outerColor="#FFF0A9"
                  innerColor="#FFF0A9"
                  :value="helpMeals + '%'"
                  :percent="(helpMeals / total) * 100"
                />
              </div>
              <div class="way-item">
                <ModalProgress
                  name="送餐上门"
                  bgColor="linear-gradient(90deg, #FF2B58 0%, #FF6586 100%)"
                  color="#FF2C59"
                  outerColor="#FF91A8"
                  innerColor="#FF91A8"
                  :value="delivery + '%'"
                  :percent="(delivery / total) * 100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="repastStatus-btm-item">
        <div class="repastStatus-btm-item-left">
          <!-- <div class="chart" ref="chartBtmLeft"></div> -->
        </div>
        <div class="repastStatus-btm-item-right">
          <!-- <div class="chart" ref="chartTopRight">
              <div class="way">
                <div class="way-item">
                  <ModalProgress
                    name="居家养老"
                    bgColor="linear-gradient(90deg, #2E911B 0%, #5FEA8A 100%)"
                    color="rgba(75, 198, 92, 1)"
                    outerColor="rgba(154, 248, 181, 0.1)"
                    innerColor="rgba(154, 248, 181, 1)"
                    :value="jjylNum + '%'"
                    :percent="(jjylNum / total) * 100"
                  />
                </div>
              </div>
            </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Common from "@/components/Common";
import ModalProgress from "@/components/pensionServices/ProgressService";
import ICountUp from "vue-countup-v2";
export default {
  name: "repastStatus",
  components: {
    Common,
    ModalProgress,
    ICountUp,
  },
  data() {
    return {
      centerRoom: 0,
      helpMeals: 0,
      delivery: 0,
      weChatOrder: 0,
      selfHelp: 0,
      total: 100,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
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
      this.getData();
    },
  },
  mounted() {
    // this.getData(this.orgcode);
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getData(this.orgcode);
    }, 1000 * 60 * 60);
  },
  methods: {
    getData() {
      this.$axios({
        url: "/screen/getRepastSituationByORG",
        method: "post",
        data: {
          organizationCode: this.orgcode,
        },
      }).then((res) => {
        console.log(res, "就餐情况");
        let data = res && res.data && res.data.data;
        // centerRoom	string	中心食堂占比
        // helpMeals	string	助餐点占比
        // delivery	string	送餐上门占比
        // totalOrder	string	订单总数
        // totalFee	string	总金额
        // totalSubsidy	string	补贴金额
        // weChatOrder	string	微信订餐
        // selfHelp	string	现场自助
        if (data) {
          function init() {
            this.$refs.value1 && this.$refs.value1.reset();
            this.$refs.value1 &&
              this.$refs.value1.update(parseInt(data.totalOrder));
            this.$refs.value2 && this.$refs.value2.reset();
            this.$refs.value2 &&
              this.$refs.value2.update(parseInt(data.totalFee));
            this.$refs.value3 && this.$refs.value3.reset();
            this.$refs.value3 &&
              this.$refs.value3.update(parseInt(data.totalSubsidy));
            let dataObj = [
              { value: data.centerRoom },
              { value: data.helpMeals },
              { value: data.delivery },
            ];
            let color = ["#02c0fc", "#ffdf4d", "#ff3560"];
            this.draw(this.$refs.chartTopLeft, dataObj, color);
            // let dataObj2 = [
            //   { value: data.weChatOrder },
            //   { value: data.selfHelp },
            // ];
            // let color2 = ["#FFD30A", "#19EC55"];
            // this.draw(this.$refs.chartBtmLeft, dataObj2, color2);
            this.centerRoom = parseInt(data.centerRoom);
            this.helpMeals = parseInt(data.helpMeals);
            this.delivery = parseInt(data.delivery);
            this.weChatOrder = parseInt(data.weChatOrder);
            this.selfHelp = parseInt(data.selfHelp);
          }
          init.call(this);
          clearInterval(this.innertimer);
          this.innertimer = setInterval(() => {
            init.call(this);
          }, 10000);
        }
      });
    },
    draw(obj, dataObj, color) {
      if (!obj) return;
      let echarts = this.$echarts.init(obj);
      // 最终输出数据
      let result = [];

      // 间隔数据的样式
      let placeHolderStyle = {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          color: "rgba(0, 0, 0, 0)",
          borderColor: "rgba(0, 0, 0, 0)",
          borderWidth: 0,
        },
      };

      // 循环加入间隔数据
      for (let i = 0; i < dataObj.length; i++) {
        result.push(
          {
            value: dataObj[i].value,
            name: dataObj[i].name,
            itemStyle: {
              normal: {
                borderWidth: 2,
              },
            },
          },
          {
            value: 1,
            name: "",
            itemStyle: placeHolderStyle, // 间隔数据
          }
        );
      }

      // 设置字体样式
      let rich = {
        b: {
          // 名字
          fontSize: 18,
          color: "#aae8ff",
          align: "left",
          padding: 2,
        },
        hr: {
          // 分割线
          borderColor: "#00ffff",
          width: "100%",
          borderWidth: 1,
          height: 0,
        },
        w: {
          // 数据存量
          fontSize: 18,
          color: "#aae8ff",
          align: "left",
          padding: 2,
        },
        c: {
          // 数据
          fontSize: 18,
          align: "center",
          padding: 2,
          color: "#53C6F2",
        },
        a: {
          // 单位
          fontSize: 18,
          align: "center",
          padding: 2,
          color: "#53C6F2",
        },
      };

      let option = {
        grid: {
          bottom: "0%",
          top: "0%",
          left: "0%",
        },
        series: [
          {
            type: "pie",
            radius: ["70%", "100%"], //内 外圆半径
            center: ["50%", "50%"],
            color: color, // 色块填充颜色
            hoverAnimation: false,
            data: result,
            labelLine: {
              normal: {
                show: false,
                length: 20,
                length2: 30,
                lineStyle: {
                  color: "#CCCCCC",
                  width: 2,
                },
              },
            },
          },
        ], // series end
      }; // option end
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
.repastStatus {
  width: 420px;
  height: 242px;
  padding: 35px 25px 0 0;
  box-sizing: border-box;
  .repastStatus-top {
    margin-bottom: 35px;
    display: flex;
    align-items: center;
    .repastStatus-top-left {
      display: flex;
      align-items: center;
      .top-left-left {
        width: 45px;
        height: 45px;
        margin-right: 14px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .top-left-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
    .repastStatus-top-center {
      width: 1px;
      height: 53px;
      background: linear-gradient(
        to bottom,
        rgba(5, 49, 106, 0.1),
        #05316a,
        rgba(5, 49, 106, 0.1)
      );
      margin: 0 24px;
    }
    .repastStatus-top-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top-right-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        .top-right-item-left {
          display: flex;
          align-items: center;

          img {
            width: 18px;
            height: 18px;
            margin-right: 5px;
          }
          span {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #6a94ae;
          }
        }
        .top-right-item-right {
          span {
            font-size: 20px;
            font-family: PangMenZhengDao;
            font-weight: 400;
            color: #c8eefb;
          }
        }
      }
    }
  }

  .repastStatus-btm {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .repastStatus-btm-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 26px;
      .repastStatus-btm-item-left {
        flex: 1;
        position: relative;
        margin-right: 26px;
        .chart {
          width: 88px;
          height: 88px;
        }
      }
      .repastStatus-btm-item-right {
        flex: 4;
        .chart {
          width: 100%;
          height: 88px;
          .way {
            width: 100%;
            height: 88px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
        }
      }
    }
    .repastStatus-btm-item:last-chid {
      margin-bottom: 19px;
    }
  }

  //   .chart {
  //     // background-color: #12a3ff;
  //     width: 180px;
  //     height: 180px;
  //   }
}
</style>
