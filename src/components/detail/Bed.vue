<template>
  <Common title="机构床位">
    <div class="total">
      <div class="flex align-center flex-center" style="padding: 36px 0">
        <img src="@/assets/lc/bed.png" class="icon" />
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
        <div class="unit">床</div>
        <!-- <img class="arrow" src="@/assets/lc/home_icon_yanglao_enter.png" /> -->
      </div>
      <div class="flex flex-between" style="padding: 0 80px">
        <div class="flex flex-column align-center">
          <div class="name">床位入住数</div>
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
        <div class="flex flex-column align-center">
          <div class="name">床位入住率</div>
          <div class="value1">
            <ICountUp
              :start="0"
              :endVal="0"
              :decimals="0"
              :duration="3"
              :options="options1"
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
  name: "Bed",
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
    // this.draw();
    this.getData();
  },
  methods: {
    getData() {
      this.$axios({
        url: "/screen/getorgindexbycode",
        method: "post",
        data: {
          orgcode: this.orgcode,
        },
      }).then((res) => {
        let data = res && res.data.data;
      // oldercount	string	老人数量
      // olderservicecount	string	服务人数
      // olderservicerate	string	服务覆盖率
      // bedcount	string	床位数
      // bedusedcount	string	床位入住数
      // bedusedrate	string	床位入住率
      // activitycount	string	组织活动次数
      // activityoldercount	string	参与活动老人数量
      // activityrate	string	老人活动参与率
      // vediopeoplecount	string	视频问诊人数
      // vediocount	string	视频问诊次数
      // vediohealthrate	string	视频问诊健康率
        if (data) {
          function init() {
            this.$refs.value && this.$refs.value.reset();
            this.$refs.value && this.$refs.value.update(parseInt(data.bedcount));
            this.$refs.value1 && this.$refs.value1.reset();
            this.$refs.value1 && this.$refs.value1.update(data.bedusedcount);
            this.$refs.value2 && this.$refs.value2.reset();
            this.$refs.value2 && this.$refs.value2.update(parseFloat(data.bedusedrate).toFixed(1));
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
