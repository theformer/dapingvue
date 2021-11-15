<template>
  <Common title="下单类型" direction="right">
    <div class="orderType">
      <div class="orderType-left">
        <div class="orderType-left-item">
          <div class="orderType-left-item-title">线上订单</div>
          <div class="orderType-left-item-num">
            <div
              v-for="(item, index) in onlineOrder"
              :key="index"
              :class="[item == '.' ? 'point' : 'num-item']"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="orderType-left-item">
          <div class="orderType-left-item-title">线下订单</div>
          <div class="orderType-left-item-num">
            <div v-for="(item, index) in offlineOrder" :key="index">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="chart" ref="chart" style="width: 180px; height: 180px"></div>
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
export default {
  name: "OrderType",
  components: {
    Common,
  },
  data() {
    return {
      options: {},
      onlineOrder: "",
      offlineOrder: "",
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
      this.getDataData();
    },
  },
  mounted() {
    this.getDataData();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getDataData();
    }, 1000 * 60 * 60);
  },
  methods: {
    getDataData() {
      console.log(this.name, "下单类型里面的name");
      this.$axios({
        url: "/screen/getOrderType",
        method: "post",
        data: {
          areaName: this.name,
        },
      }).then((res) => {
        console.log(res, "下单类型");
        let { data } = res.data;
        if (data) {
          this.onlineOrder = data.onlineOrder + "%";
          this.offlineOrder = data.offlineOrder + "%";
          function init() {
            this.draw(data);
          }
          init.call(this);
          clearInterval(this.innertimer);
          this.innertimer = setInterval(() => {
            init.call(this);
          }, 10000);
        }
      });
    },
    getArrayValue(array, key) {
      var key = key || "value";
      var res = [];
      if (array) {
        array.forEach((t) => {
          res.push(t[key]);
        });
      }
      return res;
    },

    array2obj(array, key) {
      var resObj = {};
      for (var i = 0; i < array.length; i++) {
        resObj[array[i][key]] = array[i];
      }
      return resObj;
    },

    getData(data, sumValue) {
      var res = {
        series: [],
        yAxis: [],
      };
      for (let i = 0; i < data.length; i++) {
        // console.log([70 - i * 15 + '%', 67 - i * 15 + '%']);
        res.series.push({
          name: "",
          type: "pie",
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [73 - i * 14 + "%", 68 - i * 14 + "%"],
          center: ["40%", "55%"],
          label: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 3,
          },
          data: [
            {
              value: data[i].value,
              name: data[i].name,
            },
            {
              value: sumValue - data[i].value,
              name: "",
              itemStyle: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        });
        res.series.push({
          name: "",
          type: "pie",
          silent: true,
          z: 1,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [73 - i * 14 + "%", 68 - i * 14 + "%"],
          center: ["40%", "55%"],
          label: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 3,
          },
          data: [
            {
              value: 7.5,
              itemStyle: {
                color: "rgb(3, 31, 62)",
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
            {
              value: 2.5,
              name: "",
              itemStyle: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        });
        res.yAxis.push((data[i].value / sumValue).toFixed(2) + "%");
      }
      return res;
    },
    draw(dataObj) {
      if (!this.$refs.chart) return;
      let echarts = this.$echarts.init(this.$refs.chart);
      let data = [
        {
          name: "支付宝支付",
          value: parseFloat(dataObj.alipay),
        },
        {
          name: "微信支付",
          value: parseFloat(dataObj.weChat),
        },
        {
          name: "现金支付",
          value: parseFloat(dataObj.cash),
        },
        {
          name: "账户余额支付",
          value: parseFloat(dataObj.balance),
        },
        {
          name: "银行卡支付",
          value: parseFloat(dataObj.bankCard),
        },
      ];
      let arrName = this.getArrayValue(data, "name");
      let arrValue = this.getArrayValue(data, "value");
      let sumValue = eval(arrValue.join("+"));
      let objData = this.array2obj(data, "name");
      let optionData = this.getData(data, sumValue);

      let colorList = ["#1aa8ff", "#36bb0f", "#ffca11", "#fe3761", "#783cfc"];
      let option = {
        // backgroundColor: "#000",
        grid: {
          left: "1%",
          right: "1%",
          bottom: "1%",
          top: "1%",
        },
        legend: {
          show: true,
          icon: "none",
          top: "center",
          top: "15%",
          bottom: "53%",
          right: "0%",
          data: arrName,
          //   width: 200,
          padding: [0, 0, 0, 0],
          itemGap: 0,
          formatter: (name) => {
            return "{title|" + name + "}{value|" + objData[name].value + "%}";
          },

          textStyle: {
            rich: {
              title: {
                fontSize: 12,
                lineHeight: 30,
                width: 73,
                color: colorList.map((el) => {
                  return el;
                }),
              },
              value: {
                fontSize: 14,
                lineHeight: 20,
                fontWeight: 400,
                fontFamily: "PangMenZhengDao",
                color: "#DFFCFF",
              },
            },
          },
        },
        // tooltip: {
        //     show: true,
        //     trigger: "item",
        //     formatter: "{a}<br>{b}:{c}({d}%)"
        // },
        color: colorList,
        xAxis: [
          {
            show: false,
          },
        ],
        series: optionData.series,
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
.orderType {
  width: 100%;
  height: 208px;
  padding: 14px 34px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .orderType-left {
    display: flex;
    flex-direction: column;
    .orderType-left-item:first-child {
      margin-bottom: 13px;
      .orderType-left-item-title {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #d7fbff;
        margin-bottom: 9px;
      }
      .orderType-left-item-num {
        display: flex;
        align-items: center;
        div {
          width: 45px;
          font-size: 42px;
          font-family: PangMenZhengDao;
          font-weight: 400;
          color: #12a3ff;
          margin-right: 5px;
          padding: 5px;
          height: 56px;
          background-image: url("../../assets/lc/home_numberbox@2x.png");
          background-size: 100% 100%;
          text-align: center;
        }
        div:last-child {
          width: 45px;
          font-size: 30px;
          font-family: PangMenZhengDao;
          font-weight: 400;
          color: #12a3ff;
          padding-top: 15px;
          text-align: center;
        }
        div:nth-last-child(3) {
          background-image: url();
          width: 10px;
          text-align: center;
          padding: 4px 0 0 0;
        }
      }
    }

    .orderType-left-item:last-child {
      margin-bottom: 11px;
      .orderType-left-item-title {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #d7fbff;
        margin-bottom: 9px;
      }
      .orderType-left-item-num {
        display: flex;
        align-items: center;
        div {
          width: 45px;
          font-size: 42px;
          font-family: PangMenZhengDao;
          font-weight: 400;
          color: #fc4676;
          margin-right: 5px;
          padding: 5px;
          height: 56px;
          background-image: url("../../assets/lc/home_numberbox@2x.png");
          background-size: 100% 100%;
          text-align: center;
        }
        div:last-child {
          width: 45px;
          font-size: 30px;
          font-family: PangMenZhengDao;
          font-weight: 400;
          color: #fc4676;
          padding-top: 15px;
          text-align: center;
        }
        div:nth-last-child(3) {
          background-image: url();
          width: 10px;
          text-align: center;
          padding: 4px 0 0 0;
        }
      }
    }
  }
  .chart {
    // background-color: #12a3ff;
    width: 200px;
    height: 200px;
  }
}
</style>
