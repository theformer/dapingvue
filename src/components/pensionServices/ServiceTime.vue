<template>
  <div class="serviceTime">
    <div class="serviceTime-top">
      <div class="serviceTime-top-left">
        <div class="serviceTime-top-left-item">
          <div class="serviceTime-top-blue"></div>
          <span>总订单数</span>
        </div>
        <div class="serviceTime-top-left-item">
          <div class="serviceTime-top-yellow"></div>
          <span>投诉订单总数</span>
        </div>
      </div>
      <div class="serviceTime-top-right">
        <span style="margin-right: 8px">投诉率</span>
        <span
          ><ICountUp
            :start="0"
            :endVal="0.0"
            :decimals="0"
            :duration="3"
            :options="options1"
            ref="value1"
          ></ICountUp
        ></span>
      </div>
    </div>
    <div class="serviceTime-center">
      <!-- <div class="chart" ref="chart"></div> -->
      <div class="chart">
        <div class="chart-left" :style="{ width: serviceTime }"></div>
        <div class="chart-right" :style="{ width: serviceTimeTotle }"></div>
        <div class="circle-top-left"></div>
        <div class="circle-top-right"></div>
        <div class="circle-btm-left"></div>
        <div class="circle-btm-right"></div>
      </div>
    </div>
    <div class="serviceTime-btm">
      <div class="serviceTime-btm-item">
        <div>
          <ICountUp
            :start="0"
            :endVal="0"
            :decimals="0"
            :duration="3"
            :options="options"
            ref="value2"
          ></ICountUp>
        </div>
        <div>单</div>
      </div>
      <div class="serviceTime-btm-item item-blue">
        <div>
          <ICountUp
            :start="0"
            :endVal="0"
            :decimals="0"
            :duration="3"
            :options="options"
            ref="value3"
            style="color: #08c1fc"
          ></ICountUp>
        </div>
        <div>单</div>
      </div>
    </div>
    <!-- <div class="chart" ref="chart" style="width: 300px; height: 300px"></div> -->
  </div>
</template>

<script>
import ICountUp from "vue-countup-v2";
export default {
  name: "ServiceTime",
  components: { ICountUp },
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
      serviceTime: "",
      serviceTimeTotle: "",
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
        url: "/screen/getorderinfo",
        method: "post",
        data: {
          areaname: this.name,
        },
      }).then((res) => {
        console.log(res, "服务时长");
        let { data } = res.data;
        if (data) {
          function init() {
            this.serviceTime = parseFloat(data.completerate) + "%";
            this.serviceTimeTotle = 100 - parseFloat(data.completerate) + "%";
            this.$refs.value1 && this.$refs.value1.reset();
            this.$refs.value1 &&
              this.$refs.value1.update(
                parseFloat(data.completerate).toFixed(1)
              );
            this.$refs.value2 && this.$refs.value2.reset();
            this.$refs.value2 &&
              this.$refs.value2.update(
                parseFloat(data.completehours).toFixed(1)
              );
            this.$refs.value3 && this.$refs.value3.reset();
            this.$refs.value3 &&
              this.$refs.value3.update(
                parseFloat(data.servicehours).toFixed(1)
              );
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
.serviceTime {
  width: 100%;
  //   height: 396px;
  padding: 0 33px;
  margin-bottom: 40px;
  .serviceTime-top {
    margin-bottom: 11px;
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
        .serviceTime-top-blue {
          width: 10px;
          height: 4px;
          margin-right: 5px;
          background: linear-gradient(-90deg, #198cfe 0%, #74d6ff 100%);
        }
        .serviceTime-top-yellow {
          width: 10px;
          height: 4px;
          margin-right: 5px;
          background: linear-gradient(-90deg, #ffd307 0%, #ffe570 100%);
        }
        span {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #6a94ae;
        }
      }
    }
    .serviceTime-top-right {
      display: flex;
      align-items: center;
      span:first-child {
        font-size: 14px;
        font-family: PingFang;
        font-weight: 500;
        color: #c8eefb;
        line-height: 24px;
        margin-right: 0;
      }
      span:last-child {
        font-size: 24px;
        font-family: PangMenZhengDao;
        font-weight: 400;
        color: #dffcff;
        margin-right: 0;
      }
    }
  }
  .serviceTime-center {
    width: 100%;
    height: 20px;
    margin-bottom: 11px;
    .chart {
      width: 100%;
      // max-height: 12px;
      display: flex;
      border: 5px solid #092948;
      box-sizing: border-box;
      position: relative;
      .chart-left {
        width: 30%;
        height: 16px;
        background: linear-gradient(90deg, #ffe670 1%, #ffd307 100%);
      }
      .chart-right {
        width: 70%;
        height: 16px;
        background: linear-gradient(90deg, #74d6ff 0%, #198cfe 100%);
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
        margin-right: 2px;
        font-size: 18px;
        font-family: PangMenZhengDao;
        font-weight: 400;
        color: #ffd40a;
        line-height: 24px;
      }
      div:last-child {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #c8eefb;
        line-height: 24px;
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
