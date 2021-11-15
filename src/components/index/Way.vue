<template>
  <Common title="灾害点规模统计">
    <div class="way">
      <div ref="chart" id="chart"></div>
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
import ICountUp from "vue-countup-v2";
import ModalProgress from "@/components/Progress";
export default {
  name: "Way",
  components: {
    Common,
    ICountUp,
    ModalProgress,
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
      jgylNum: 0,
      sqylNum: 0,
      jjylNum: 0,
      total: 0,
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
      // this.drawChart();
    },
  },
  mounted() {
    this.drawChart()
    // this.getData();
  },
  methods: {
    getData() {
      // indexCode: "D001001002"
     this.jgylNum= 1090
      this.jjylNum= 2100
      this.sqylNum = 2400
      this.total = 5000
      // this.$axios({
      //   url: "/screen/pensionWays",
      //   method: "post",
      //   data: {
      //     address: this.name,
      //   },
      // }).then((res) => {
      //   let data = res && res.data.data;
      //   if (data) {
      //     this.jgylNum = parseInt(data.jgylNum);
      //     this.sqylNum = parseInt(data.sqylNum);
      //     this.jjylNum = parseInt(data.jjylNum);
      //     this.total =
      //       parseInt(data.jgylNum) +
      //       parseInt(data.sqylNum) +
      //       parseInt(data.jjylNum);
      //   }
      // });
    },
    drawChart() {
      console.log(222,'我走进来了嘛')
      if (!this.$refs.chart) return;
      console.log(111111,'我走进来了嘛')
      let echarts = this.$echarts.init(this.$refs.chart);
      var dataArry = ['小一', '小二', '小三']
     let option = {
        grid: {
          show:'true',
          borderWidth:'0',
          height:"100%",
          width:"75%",
          top:0,
          left:40,
          right:30
        },
        backgroundColor: '#121B2C',        //背景色
        xAxis: {
          show: false,                //是否显示x轴
          type: 'value'
        },
        yAxis: [{
          type: 'category',
          inverse:true,               //让y轴数据逆向
          axisLabel: {
            show: true,
            textStyle: {
              color: '#D3E3F4'       //y轴字体颜色
            },
            formatter: function(value, index) {
              return [
                '{title|' + value + '} '
              ].join('\n');
            },
            //定义富文本标签
            rich: {
              title: {
                color: '#fff',
                fontWeight: 'lighter'
              }
            }
          },
          splitLine: {show: false},   //横向的线
          axisTick: {show: false},    //y轴的端点
          axisLine: {show: false},    //y轴的线
          data: dataArry
        },{
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            textStyle: {
              fontSize: '12',
              color: '#47D7FF',
              fontWeight: '400',
            },
            formatter: function(value) {
              if (value >= 10000) {
                return (value / 10000).toLocaleString() + '万';
              } else {
                return value.toLocaleString();
              }
            },
          },
          data: [50000000, 22000000, 10000000]
        }],
        series: [
          {
            name: '数据内框',
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                //   offset: 0,
                //   color: 'rgb(57,89,255,1)'
                // }, {
                //   offset: 1,
                //   color: 'rgb(46,200,207,1)'
                // }]),
              }
            },
            barWidth:10,
            data: [11, 33, 77, 39, 55]
          },
          {
            name: '外框',
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: 'rgba(255, 255, 255, 0.14)' //rgba设置透明度0.14
              }
            },
            barGap: '-100%',
            z: 0,
            barWidth: 10,
            data: [100, 100, 100, 100, 100]
          }
        ]
      };
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
.way {
  width: 100%;
  height: 167px;
  padding: 0 17px;
  #chart{
    width: 100%;
    height: 167px;
  }
  &-item {
    margin-top: 34px;
  }
}
</style>
