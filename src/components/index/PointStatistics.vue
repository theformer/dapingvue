<template>
  <Common title="监测点统计" direction="left">
    <div class="service-num">
      <div class="chart-value">
        <div class="value-left">共计监测点(个)</div>
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
      var xdata = ['苏州市', '无锡市', '南京市'];
      var data = [70, 60, 80];
      var maxArr = [100, 100, 100];
       let option = {
        backgroundColor: "rgba(7, 15, 28, 0.8)", //背景色
        tooltip: {
          trigger: "axis",
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          // borderRadius: 5,
          // borderColor: "#6baab2",
          // borderWidth: 1,
          formatter: function(params) { // params[0].data.nameCode
            let dot = '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:#02C4DD"></span>';
            return (
              params[0].name +
              "<br>" +
              "杆塔数量 ：" +
              params[0].value
            );
          }
        },
        grid: {
          left: 40,
          right: 40,
          bottom: 57,
          top: 88,
          containLabel: true
        },
        xAxis: {
          data: xdata,
          triggerEvent: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            rotate: 0,
            interval: 0,
            textStyle: {
              padding: [14,0,0,0],
              fontSize: 14,
              color: "rgba(255,255,255,1)"
            }
          }
        },
        yAxis: {
          triggerEvent: true,
          nameTextStyle: {
            color: "rgba(255,255,255,1)",
            fontSize: 16,
            padding: [0,0,10,-20]
          },
          splitLine: {
            show: true,
            lineStyle: {
              type:'dashed',
              color: 'rgba(255,255,255,.1)'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
          }
        },
        // color: ["#e54035"],
        series: [{
          name: "数量",
          barMinHeight: 10,
          type: "pictorialBar",
          barCategoryGap: "60%",
          // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
          symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
          itemStyle: {
            normal: {
              //barBorderRadius: 5,
              //渐变色
              color:'#04F8FB'
            }
          },
          label: {
            normal: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
                fontSize:20
              }
            }
          },
          data: data,
          z: 10
        },
        ]
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
