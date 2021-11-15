<template>
  <div class="sex">
    <div class="chart-box position-relative">
      <div class="chart" ref="chart"></div>
      <!-- <div class="chart-bg flex align-center flex-center">
        </div> -->
    </div>
    <div class="sex-data">
      <div class="flex align-center">
        <div class="sex-data-item" style="width: 271px; margin-left: 49px">
          <div class="sex-data-name flex align-center">
            <!-- <img
                class="sex-data-icon"
                src="@/assets/lc/home_icon_men@2x.png"
              /> -->
            <div class="dit"></div>
            <div>线下支付</div>
          </div>
        </div>
        <div class="sex-data-item" style="width: 271px">
          <div class="sex-data-name flex align-center">
            <!-- <img
                class="sex-data-icon"
                src="@/assets/lc/home_icon_women@2x.png"
              /> -->
            <div class="dit-two"></div>
            <div>微信订餐</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Common from "@/components/Common";
import ICountUp from "vue-countup-v2";
export default {
  name: "Repast",
  components: {
    Common,
    ICountUp,
  },
  data() {
    return {
      organizationCode: "001001",
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: "",
        prefix: "",
        suffix: "",
      },
      selfHelp: 0,
      manRate: 0,
      weChatOrder: 0,
      womanRate: 0,
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
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getData();
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
        let data = res && res.data && res.data.data;
        // age60Num: 90
        // age60Rate: 18
        // age70Num: 200
        // age70Rate: 40
        // age80Num: 100
        // age80Rate: 20
        // age90Num: 80
        // age90Rate: 16
        // age100Num: 30
        // age100Rate: 6
        // indexCode: "B004001003"
        // manNum: 300
        // manRate: 60
        // olderNum: 500
        // womanNum: 200
        // womanRate: 40
        if (data) {
          function init() {
            this.selfHelp = parseInt(data.selfHelp);
            this.weChatOrder = parseInt(data.weChatOrder);
            // this.$refs.man.reset();
            // this.$refs.man.update(data.manNum);
            // this.$refs.woman.reset();
            // this.$refs.woman.update(data.womanNum);
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
    draw() {
      if (!this.$refs.chart) return;
      let echarts = this.$echarts.init(this.$refs.chart);
      let colorList = [
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(21, 169, 28, 1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(48, 227, 75, 1)", // 100% 处的颜色
            },
          ],
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(8, 119, 201, 1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(8, 186, 248, 1)", // 100% 处的颜色
            },
          ],
        },
      ];
      let option = {
        series: [
          {
            silent: true,
            name: "性别分布",
            type: "pie",
            // roseType: "radius",
            radius: ["46%", "60%"],
            avoidLabelOverlap: false,
            // label: {
            //   show: false,
            //   position: "center",
            // },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: "40",
            //     fontWeight: "bold",
            //   },
            // },
            itemStyle: {
              color: function (params) {
                return colorList[params.dataIndex];
              },
            },
            minAngle: 20,
            label: {
              show: true,
            },
            labelLine: {
              length: 12,
              length2: 84,
            },
            labelLayout: {
              // x: '10%'
            },
            data: [
              {
                value: this.selfHelp,
                label: {
                  show: true,
                  alignTo: "labelLine",
                  formatter: "{name|{b}}{value|{c}.0%}{circle|}",
                  width: 0,
                  height: 0,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: "rgba(181, 212, 255, 1)",
                  padding: [3, -3, 3, -3],
                  rich: {
                    name: {
                      color: "rgba(204, 242, 255, 1)",
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: 32,
                      padding: [4, 45, 65, -114],
                    },
                    value: {
                      color: "rgba(204, 242, 255, 1)",
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: 32,
                      fontFamily: "PangMenZhengDao",
                      padding: [0, -126, 65, 0],
                    },
                  },
                },
                labelLine: {
                  lineStyle: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(26, 180, 36, 1)", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgba(181, 212, 255, 1)", // 100% 处的颜色
                        },
                      ],
                    },
                  },
                },
              },
              {
                value: this.weChatOrder,
                label: {
                  show: true,
                  alignTo: "labelLine",
                  formatter: "{name|{b}}{value|{c}.0%}{circle|}",
                  width: 0,
                  height: 0,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: "rgba(181, 212, 255, 1)",
                  padding: [3, -3, 3, -3],
                  rich: {
                    name: {
                      color: "rgba(204, 242, 255, 1)",
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: 32,
                      padding: [4, 0, 65, -114],
                    },
                    value: {
                      color: "rgba(204, 242, 255, 1)",
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: 32,
                      fontFamily: "PangMenZhengDao",
                      padding: [0, -70, 65, 0],
                    },
                  },
                },
                labelLine: {
                  lineStyle: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(181, 212, 255, 1)", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgba(47, 140, 253, 1)", // 100% 处的颜色
                        },
                      ],
                    },
                  },
                },
              },
            ],
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
.sex {
  width: 360px;
  // height: 242px;
  padding: 35px 0 0 0;
  .chart {
    width: 260px;
    height: 155px;
    margin: 0 auto;
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
    // margin-top: -25px;
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
  .dit {
    width: 10px;
    height: 10px;
    background: linear-gradient(0deg, #0877c9, #08baf8);
    border-radius: 50%;
    margin-right: 8px;
  }
  .dit-two {
    width: 10px;
    height: 10px;
    background: linear-gradient(0deg, #15a91c, #30e34b);
    border-radius: 50%;
    margin-right: 8px;
  }
}
</style>
