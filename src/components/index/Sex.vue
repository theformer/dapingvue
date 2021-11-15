<template>
  <Common title="道路等级统计">
    <div class="sex">
      <div class="chart-box position-relative">
        <!--        <div class="chart" ref="chart"></div>-->
        <div v-for="item in gradeList" :key="item.val" class="flex flex-column flex-center align-center">
          <div class="box-image image-val flex align-center flex-center" :class="item.val==1?'color1':item.val==5?'color2':'color3'">
            {{ item.val }}
          </div>
          <div class="image-label">
            {{item.label}}
          </div>
        </div>

        <!--        <div class="chart-bg flex align-center flex-center">-->
        <!--          <svg style="width: 106px; height: 106px">-->
        <!--            <defs>-->
        <!--              <linearGradient id="grad" x1="50%" y1="0%" x2="50%" y2="100%">-->
        <!--                <stop-->
        <!--                  offset="0%"-->
        <!--                  style="stop-color: #96c8d7; stop-opacity: 1"-->
        <!--                />-->
        <!--                <stop-->
        <!--                  offset="100%"-->
        <!--                  style="stop-color: #cbecf6; stop-opacity: 1"-->
        <!--                />-->
        <!--              </linearGradient>-->
        <!--            </defs>-->
        <!--            <text-->
        <!--              x="25"-->
        <!--              y="50"-->
        <!--              fill="url(#grad)"-->
        <!--              style="font-size: 24px; letter-spacing: 2px"-->
        <!--            >-->
        <!--              性别-->
        <!--            </text>-->
        <!--            <text-->
        <!--              x="25"-->
        <!--              y="72"-->
        <!--              fill="url(#grad)"-->
        <!--              style="font-size: 24px; letter-spacing: 2px"-->
        <!--            >-->
        <!--              分布-->
        <!--            </text>-->
        <!--          </svg>-->
        <!--        </div>-->
      </div>
      <!--      <div class="sex-data">-->
      <!--        <div class="flex align-center">-->
      <!--          <div class="sex-data-item" style="width: 300px; margin-left: 49px">-->
      <!--            <div class="sex-data-name flex align-center">-->
      <!--              <img-->
      <!--                class="sex-data-icon"-->
      <!--                src="@/assets/lc/home_icon_men@2x.png"-->
      <!--              />-->
      <!--              <div>男性人数</div>-->
      <!--            </div>-->
      <!--            <div class="sex-data-value">-->
      <!--              <ICountUp-->
      <!--                :start="0"-->
      <!--                :endVal="manNum"-->
      <!--                :decimals="0"-->
      <!--                :duration="3"-->
      <!--                :options="options"-->
      <!--                ref="man"-->
      <!--              ></ICountUp>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="sex-data-item" style="width: 300px">-->
      <!--            <div class="sex-data-name flex align-center">-->
      <!--              <img-->
      <!--                class="sex-data-icon"-->
      <!--                src="@/assets/lc/home_icon_women@2x.png"-->
      <!--              />-->
      <!--              <div>女性人数</div>-->
      <!--            </div>-->
      <!--            <div class="sex-data-value">-->
      <!--              <ICountUp-->
      <!--                :start="0"-->
      <!--                :endVal="womanNum"-->
      <!--                :decimals="0"-->
      <!--                :duration="3"-->
      <!--                :options="options"-->
      <!--                ref="woman"-->
      <!--              ></ICountUp>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
import ICountUp from "vue-countup-v2";

export default {
  name: "Sex",
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
      manNum: 0,
      manRate: 0,
      womanNum: 0,
      womanRate: 0,
      gradeList: [
        {
          val: 1,
          label:'省道'
        },
        {
          val: 5,
          label:'三级道路'
        },
        {
          val: 3,
          label:'四级道路'
        }
      ]
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
      // this.getData();
    },
  },
  mounted() {
    // this.getData();
    // this.draw()
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      // this.getData();
    }, 1000 * 60 * 60);
  },
  methods: {
    getData() {
      this.$axios({
        url: "/screen/olderSexAgeCount",
        method: "post",
        data: {
          address: this.name,
          jg: "",
          orgCode: ''
        },
      }).then((res) => {
        let data = res && res.data.data;
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
            this.manNum = parseInt(data.manNum);
            this.manRate = parseInt(data.manRate);
            this.womanNum = parseInt(data.womanNum);
            this.womanRate = parseInt(data.womanRate);
            this.$refs.man && this.$refs.man.reset();
            this.$refs.man && this.$refs.man.update(data.manNum);
            this.$refs.woman && this.$refs.woman.reset();
            this.$refs.woman && this.$refs.woman.update(data.womanNum);
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
  width: 100%;
  height: 170px;

  .chart-box {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-around;
  }

  .chart {
    //width: 100%;
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

  .box-image {
    background-image: url(../../assets/index/road_number_bg.png);
    width: 83px;
    height: 56px;
    background-repeat: no-repeat;
    background-size: 100% auto;
  }
  .image-val{
    font-size: 26px;
    font-family: PangMenZhengDao;
    font-weight: 400;
  }
  .image-label{
    margin-top: 11px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #D3E3F4;
  }
  .color1{
    color: #FFCD22;
  }
  .color2{
    color: #47D7FF;
  }
  .color3{
    color: #5FEA8A;;
  }
  &-data {
    width: 100%;

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
}
</style>
