<template>
  <Common title="服务人员">
    <div class="total" @click="servePersonClick()">
      <div class="flex align-center flex-center" style="padding: 36px 0">
        <img src="@/assets/lc/service_personal.png" class="icon" />
        <div class="value">
          <ICountUp
            :start="0"
            :endVal="0"
            :decimals="0"
            :duration="3"
            :options="options"
            ref="value"
          ></ICountUp>
        </div>
        <div class="unit">人</div>
        <img class="arrow" src="@/assets/lc/home_icon_yanglao_enter.png" />
      </div>
      <div class="flex flex-between">
        <div class="flex flex-column align-center flex-center flex1">
          <div class="name">服务总时长(小时)</div>
          <div class="value1">
            <ICountUp
              :start="0"
              :endVal="0"
              :decimals="0"
              :duration="3"
              :options="options"
              ref="value1"
            ></ICountUp>
          </div>
        </div>
        <div class="flex flex-column align-center flex-center flex1">
          <div class="name">已服务时长(小时)</div>
          <div class="value1">
            <ICountUp
              :start="0"
              :endVal="0"
              :decimals="0"
              :duration="3"
              :options="options"
              ref="value2"
            ></ICountUp>
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
  name: "Service",
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
      this.getTotal()
    },
  },
  mounted() {
    // this.draw();
    this.getData();
    this.getTotal()
  },
  methods: {
    getData() {
      this.$axios({
        url: "/screen/getorderbycode",
        method: "post",
        data: {
          orgcode: this.orgcode,
        },
      }).then((res) => {
        let data = res && res.data.data;
        // ordercount	string	服务订单总数
        // ordercompletecount	string	订单完成数
        // ordercompleterate	string	订单完成率
        // pjcount	string	订单评价数
        // pjgoodcount	string	订单好评数
        // pjgoodrate	string	订单好评率
        // servicehours	string	服务总时长
        // completehours	string	已服务时长
        // completerate	string	服务时长占比
        // ordertotalamount	string	订单总金额
        // ordersubsidyamount	string	订单补贴金额
        if (data) {
          function init() {
            // this.$refs.value.reset();
            // this.$refs.value.update(parseInt(data.manNum) + parseInt(data.womanNum));
            this.$refs.value1 && this.$refs.value1.reset();
            this.$refs.value1 && this.$refs.value1.update(data.servicehours);
            this.$refs.value2 && this.$refs.value2.reset();
            this.$refs.value2 && this.$refs.value2.update(data.completehours);
          }
          init.call(this);
          clearInterval(this.timer1);
          this.timer1 = setInterval(() => {
            init.call(this);
          }, 11000);
        }
      });
    },
    getTotal() {
      this.$axios({
        url: "/screen/getorgindexbycode",
        method: "post",
        data: {
          orgcode: this.orgcode
        },
      }).then((res) => {
        let data = res && res.data.data;
        // ordercount	string	服务订单总数
        // ordercompletecount	string	订单完成数
        // ordercompleterate	string	订单完成率
        // pjcount	string	订单评价数
        // pjgoodcount	string	订单好评数
        // pjgoodrate	string	订单好评率
        // servicehours	string	服务总时长
        // completehours	string	已服务时长
        // completerate	string	服务时长占比
        // ordertotalamount	string	订单总金额
        // ordersubsidyamount	string	订单补贴金额
        if (data) {
          function init() {
            this.$refs.value && this.$refs.value.reset();
            this.$refs.value && this.$refs.value.update(parseInt(data.waitercount));
          }
          init.call(this);
          clearInterval(this.innertimer);
          this.innertimer = setInterval(() => {
            init.call(this);
          }, 11000);
        }
      });
    },
    servePersonClick() {
      let orgcode = this.orgcode
      this.$router.push(`/servePerson/${orgcode}`)
    },
    draw() {
      if (!this.$refs.chart) return
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
              color: "rgba(251, 116, 154, 1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(252, 51, 103, 1)", // 100% 处的颜色
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
              color: "rgba(12, 126, 255, 1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(86, 156, 250, 1)", // 100% 处的颜色
            },
          ],
        },
      ];
      var option = {
        series: [
          {
            silent: true,
            name: "性别分布",
            type: "pie",
            roseType: "radius",
            radius: ["50%", "66%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
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
              length: 30,
              length2: 114,
            },
            labelLayout: {
              // x: '10%'
            },
            data: [
              {
                name: "占比",
                value: 20,
                label: {
                  show: true,
                  alignTo: "labelLine",
                  formatter: "{name|{b}}{value|{c}.00%}{circle|}",
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
                      padding: [4, 6, 72, -114],
                    },
                    value: {
                      color: "rgba(252, 63, 113, 1)",
                      fontSize: 20,
                      fontWeight: 400,
                      lineHeight: 32,
                      fontFamily: "PangMenZhengDao",
                      padding: [0, -126, 72, 0],
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
                          color: "rgba(252, 80, 125, 1)", // 0% 处的颜色
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
                name: "占比",
                value: 80,
                label: {
                  show: true,
                  alignTo: "labelLine",
                  formatter: "{name|{b}}{value|{c}.00%}{circle|}",
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
                      padding: [4, 15, 72, -114],
                    },
                    value: {
                      color: "rgba(29, 133, 254, 1)",
                      fontSize: 20,
                      fontWeight: 400,
                      lineHeight: 32,
                      fontFamily: "PangMenZhengDao",
                      padding: [0, -126, 72, 0],
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
.total {
  width: 432px;
  height: 192px;
  cursor: pointer;
  pointer-events: initial;
  .icon {
    width: 36px;
    height: 36px;
    margin-right: 11px;
  }
  .value {
    font-size: 40px;
    font-family: PangMenZhengDao;
    font-weight: 400;
    color: #dffcff;
    text-shadow: 0 0 10px rgba(155, 255, 237, 0.5);
  }
  .unit {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #6a94ae;
    margin-top: 8px;
    margin-left: 9px;
  }
  .arrow {
    width: 20px;
    height: 28px;
    margin-left: 8px;
  }
  .name {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #6a94ae;
    margin-bottom: 5px;
  }
  .value1 {
    font-size: 24px;
    font-family: PangMenZhengDao;
    font-weight: 400;
    color: #c8eefb;
  }
}
</style>
