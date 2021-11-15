<template>
  <div class="index flex flex-column">
    <Map class="map" :areaname="name"></Map>
    <div class="header position-relative">
      <img class="header-bg" src="../assets/lc/home_bg_title@2x.png" />
      <svg class="header-svg">
        <defs>
          <linearGradient id="headerTitle" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: #fff; stop-opacity: 1" />
            <stop offset="40%" style="stop-color: #fff; stop-opacity: 1" />
            <stop
              offset="100%"
              style="stop-color: rgb(12, 59, 88); stop-opacity: 1"
            />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="36"
          fill="url(#headerTitle)"
          style="font-size: 42px"
          class="header-title"
        >
          养老服务运营
        </text>
      </svg>
      <div class="header-options flex flex-between">
        <div
          class="header-select position-relative"
          :class="showSelect ? 'header-select-active' : ''"
          @mouseover="showSelect = true"
          @mouseleave="showSelect = false"
        >
          <div class="header-select-box flex align-center">
            <div class="header-select-value flex1 word-space-one">
              {{ name }}
            </div>
            <img
              class="header-select-icon"
              src="../assets/lc/home_combo_click@2x.png"
            />
          </div>
          <div class="header-select-list" v-show="showSelect">
            <div
              class="header-select-item"
              :class="name == item.areaname ? 'header-select-item-active' : ''"
              @click="setName(item.areaname)"
              v-for="(item, index) in areaList"
              :key="index"
            >
              {{ item.areaname }}
            </div>
          </div>
          <div class="header-select-line header-select-line1"></div>
          <div class="header-select-line header-select-line2"></div>
        </div>
        <div class="header-time flex align-center">
          <div class="header-hour"></div>
          <div class="header-year" @click="back">
            <img src="../assets/pensionServices/back.png" alt="" />
            <span>返回</span>
          </div>
        </div>
      </div>
    </div>
    <div class="body flex flex-between flex1">
      <div class="body-left">
        <!-- 服务订单 -->
        <div class="service-order">
          <ServiceOrder :name="name" />
        </div>
      </div>
      <div class="body-middle">
        <!-- 中间的数据统计 -->
        <div class="flex align-center flex-between" style="padding: 0 0">
          <div class="flex flex-column align-center">
            <div class="data-value">
              <ICountUp
                :start="0"
                :endVal="0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value1"
              ></ICountUp>
            </div>
            <div
              class="data-name flex align-center flex-center"
              style="cursor: pointer; pointer-events: initial"
              @click="toDetail"
            >
              <div>养老机构(家)</div>
              <img
                src="@/assets/lc/home_icon_yanglao_enter.png"
                style="width: 20px; height: 28px; margin-top: 4px"
              />
            </div>
          </div>
          <div class="flex flex-column align-center">
            <div class="data-value">
              <ICountUp
                :start="0"
                :endVal="0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value2"
              ></ICountUp>
            </div>
            <div
              class="data-name flex align-center flex-center"
              style="cursor: pointer"
              @click="toDetail"
            >
              <div>服务订单(单)</div>
              <!-- <img
                src="@/assets/lc/home_icon_yanglao_enter.png"
                style="width: 20px; height: 28px; margin-top: 4px"
              /> -->
            </div>
          </div>
          <div class="flex flex-column align-center">
            <div class="data-value">
              <ICountUp
                :start="0"
                :endVal="0"
                :decimals="0"
                :duration="3"
                :options="options"
                ref="value3"
              ></ICountUp>
            </div>
            <div
              class="data-name flex align-center flex-center"
              style="cursor: pointer"
              @click="toDetail"
            >
              <div>服务人数(人)</div>
              <!-- <img
                src="@/assets/lc/home_icon_yanglao_enter.png"
                style="width: 20px; height: 28px; margin-top: 4px"
              /> -->
            </div>
          </div>
        </div>
        <div class="service-record">
          <!-- 最新服务记录 -->
          <ServiceRecord :name="name" />
        </div>
      </div>
      <div class="body-right">
        <div class="order-type">
          <OrderType :name="name" />
        </div>

        <div class="dining-status">
          <DiningStatus :name="name" />
        </div>

        <div class="patrol-inspection">
          <PatrolInspection :name="name" />
        </div>
      </div>
    </div>
    <div class="mask"></div>
    <div class="mask-middle"></div>
    <div class="mask-left"></div>
    <div class="mask-right"></div>
    <div class="mask-bottom"></div>
  </div>
</template>

<script>
import ServiceOrder from "@/components/pensionServices/ServiceOrder";
import OrderType from "@/components/pensionServices/OrderType";
import DiningStatus from "@/components/pensionServices/DiningStatus";
import PatrolInspection from "@/components/pensionServices/PatrolInspection";
import ServiceRecord from "@/components/pensionServices/ServiceRecord";
import ICountUp from "vue-countup-v2";
import Map from "@/components/Map";
export default {
  name: "PensionServices",
  components: {
    ServiceOrder,
    OrderType,
    DiningStatus,
    PatrolInspection,
    ServiceRecord,
    ICountUp,
    Map
  },
  data() {
    return {
      day: "",
      year: "",
      hour: "",
      complexName: "",
      showSelect: false,
      name: "鹿城区", // 当前区域名称 每个组件的数据都根据name获取
      areaList: [],
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: ""
      }
    };
  },
  beforeMount() {},
  mounted() {
    let that = this;
    this.getDay();
    this.setTime();
    this.getOrg();
    this.getServiceOrderNum();
    this.getServicePeopleNum();
    var timer = setInterval(() => {
      that.setTime();
    }, 1000);
    // this.test()
    // this.$axios({
    //   url: '/api/chargingPile/getDeviceListBySiteId?siteId=1265',
    //   method: 'post',
    //   headers: {
    //     Twi_Client: 'miniProgram',
    //     TwiAuth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjE1OTU3MTM0NDY1Iiwicm9sZSI6IltcclxuICBcIkVzdGF0ZVwiLFxyXG4gIFwiSE93bmVyXCJcclxuXSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2hvbWVwaG9uZSI6IjE1OTU3MTM0NDY1IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjAxOS8xMS8xOSAxMjoxNTo1OCIsIm5iZiI6MTU3NDEyOTc1OCwiZXhwIjoxNTc0MTY1NzU4LCJpYXQiOjE1NzQxMjk3NTgsImlzcyI6Imh0dHA6Ly93d3cudHlpbmd0ZWNoLmNvbSIsImF1ZCI6ImV2ZXJ5b25lIn0.HXC3qJEpF7LOemVDpH00KPIGyoLhvZqMt_Q530ji-us'
    //   }
    // }).then(res => {
    //   console.log(res)
    // })
    // this.getComplexInfo();
    this.getAreaList();
  },
  methods: {
    getOrg() {
      this.$axios({
        url: "/screen/organizationNum",
        method: "post",
        data: {
          areaname: this.name
        }
      }).then(res => {
        let data = res && res.data.data;
        if (data) {
          this.$refs.value1 && this.$refs.value1.reset();
          this.$refs.value1 && this.$refs.value1.update(data.orgNum);
          clearInterval(this.timer1);
          this.timer1 = setInterval(() => {
            this.$refs.value1 && this.$refs.value1.reset();
            this.$refs.value1 && this.$refs.value1.update(data.orgNum);
          }, 10000);
        }
      });
    },
    getServiceOrderNum() {
      this.$axios({
        url: "/screen/getorderinfo",
        method: "post",
        data: {
          areaname: this.name
        }
      }).then(res => {
        let { data } = res.data;
        if (data) {
          this.$refs.value2 && this.$refs.value2.reset();
          this.$refs.value2 && this.$refs.value2.update(data.ordercount);
          clearInterval(this.timer2);
          this.timer2 = setInterval(() => {
            this.$refs.value2 && this.$refs.value2.reset();
            this.$refs.value2 && this.$refs.value2.update(data.ordercount);
          }, 10000);
        }
      });
    },
    getServicePeopleNum() {
      this.$axios({
        url: "/screen/getorgindex",
        method: "post",
        data: {
          areaname: this.name
        }
      }).then(res => {
        let { data } = res.data;
        if (data) {
          this.$refs.value3 && this.$refs.value3.reset();
          this.$refs.value3 && this.$refs.value3.update(data.olderservicecount);
          clearInterval(this.timer3);
          this.timer3 = setInterval(() => {
            this.$refs.value3 && this.$refs.value3.reset();
            this.$refs.value3 &&
              this.$refs.value3.update(data.olderservicecount);
          }, 10000);
        }
      });
    },
    toDetail() {
      let name = this.name;
      this.$router.push(`/ProvideOrganization/${name}`);
    },
    getAreaList() {
      this.$axios({
        url: "/screen/getorgs",
        method: "post"
      }).then(res => {
        let { data } = res.data;
        this.areaList = data;
      });
    },
    toggleSelect() {
      this.showSelect = !this.showSelect;
    },
    setName(name) {
      this.name = name;
      this.showSelect = false;
      this.getServicePeopleNum();
      this.getServiceOrderNum();
      this.getOrg();
    },
    getDay() {
      let day = "";
      let date = new Date();
      switch (date.getDay()) {
        case 0:
          day = "星期日";
          break;
        case 1:
          day = "星期一";
          break;
        case 2:
          day = "星期二";
          break;
        case 3:
          day = "星期三";
          break;
        case 4:
          day = "星期四";
          break;
        case 5:
          day = "星期五";
          break;
        case 6:
          day = "星期六";
          break;
      }
      this.day = day;
    },
    setTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      if (second < 10) {
        second = `0${second}`;
      }
      this.year = `${year}-${month}-${day}`;
      this.hour = `${hour}:${minute}:${second}`;
    },
    loginOut() {
      this.$modal
        .confirm({
          content: "确定退出登录吗？"
        })
        .then(res => {
          localStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    getComplexInfo() {
      this.$axios
        .post("/SafetySubject/Shelters/GetScreenComplexInfo")
        .then(res => {
          let data = res && res.data && res.data.data;
          if (data) {
            this.complexName = data.complexName;
          } else {
            this.$notify({
              message:
                (res && res.data && res.data.errors) || "获取小区信息失败",
              type: "fail"
            });
          }
        })
        .catch(err => {
          this.$notify({
            message: err || "获取小区信息失败",
            type: "fail"
          });
        });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index {
  position: relative;
  width: 100%;
  height: 100%;
  // background: rgba(7, 14, 18, 1);
  .header {
    width: 100%;
    height: 114px;
    margin-bottom: 19px;
    position: relative;
    z-index: 10;
    &-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    &-title {
      font-family: PangMenZhengDao;
      font-weight: 400;
      color: #ffffff;
      line-height: 32px;
    }
    &-svg {
      width: 291px;
      height: 42px;
      position: absolute;
      left: 50%;
      top: 26px;
      transform: translate(-50%, 0) scaleY(1.2);
      letter-spacing: 3px;
    }
    &-options {
      position: absolute;
      left: 0;
      height: 46px;
      width: 100%;
      height: 46px;
      top: 46px;
      padding: 0 47px;
    }
    &-hour {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #c8eefb;
      margin-right: 25px;
    }
    &-year {
      // font-size: 22px;
      // font-family: PingFang SC;
      // font-weight: 500;
      // color: #85b0c7;
      width: 102px;
      height: 42px;
      background-image: url("../assets/pensionServices/bg_back.png");
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 18px;
        height: 18px;
        margin-right: 10px;
      }
      span {
        font-size: 22px;
        line-height: 42px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #85b0c7;
      }
    }
    &-select {
      width: 260px;
      height: 46px;
      box-shadow: 0 0 38px 2px rgba(8, 60, 123, 0.72) inset;
      // background: rgba(8, 60, 123, .72);
      background: #091924;
      z-index: 102;
      transition: all 0.3s ease;
      border-radius: 4px;
      &-active {
        height: 630px;
      }
      &-box {
        width: 100%;
        height: 46px;
        padding: 0 11px 0 20px;
        cursor: pointer;
      }
      &-value {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #dffcff;
        margin-right: 5px;
      }
      &-icon {
        width: 30px;
        height: 26px;
      }
      &-list {
        height: 584px;
        overflow-y: scroll;
      }
      &-item {
        width: 100%;
        height: 46px;
        padding: 0 19px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #6a94ae;
        line-height: 46px;
        cursor: pointer;
        &-active {
          color: rgba(8, 192, 252, 1);
        }
      }
      &-item:hover {
        color: #dffcff;
        background: rgba(10, 32, 44, 1);
      }
      &-line {
        width: 100%;
        height: 1px;
        background: linear-gradient(
          90deg,
          rgba(15, 218, 255, 0) 0%,
          rgba(15, 218, 255, 1) 50%,
          rgba(15, 218, 255, 0) 100%
        );
        opacity: 0.36;
        position: absolute;
        z-index: 2;
        &1 {
          top: 0;
          left: 50%;
          transform: translate(-50%, 0);
        }
        &2 {
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
        }
      }
    }
  }
  .body {
    width: 100%;
    &-left {
      width: 500px;
      margin-left: 50px;
      height: 930px;
      position: relative;
      z-index: 2;
      .service-order {
        width: 100%;
        height: 100%;
      }
    }
    &-middle {
      width: 760px;
      height: 930px;
      position: relative;
      pointer-events: none;
      position: relative;
      z-index: 10;
      .data {
        &-value {
          font-size: 60px;
          font-family: PangMenZhengDao;
          font-weight: 400;
          color: #dffcff;
          text-shadow: 0 0 10px rgba(155, 255, 237, 0.5);
        }
        &-name {
          width: 238px;
          height: 36px;
          background: linear-gradient(
            90deg,
            rgba(17, 112, 255, 0) 0%,
            rgba(17, 112, 255, 0.5) 51%,
            rgba(17, 112, 255, 0) 100%
          );
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #aae1ed;
        }
      }
      .service-record {
        // height: 242px;
        position: absolute;
        bottom: 0;
      }
    }
    &-right {
      width: 500px;
      margin-right: 50px;
      position: relative;
      z-index: 2;
      .order-type {
        margin-bottom: 18px;
      }
      .dining-status {
        margin-bottom: 18px;
      }
    }
  }
}
.map {
  position: absolute;
  top: 46px;
  left: 400px;
  width: 1120px;
  height: 800px;
  z-index: 1;
}
.mask-middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 813px;
  height: 813px;
  filter: blur(200px);
  background-color: rgba(3, 60, 95, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 100;
}
.mask-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 707px;
  height: 1080px;
  background: linear-gradient(right, #07131a 10%, rgba(8, 22, 29, 0) 0%);
  opacity: 0.8;
  z-index: 1;
}
.mask-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 707px;
  height: 1080px;
  background: linear-gradient(left, #07131a 10%, rgba(8, 22, 29, 0) 0%);
  opacity: 0.8;
  z-index: 1;
}
.mask-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1920px;
  height: 349px;
  background: linear-gradient(top, #070e12 10%, rgba(7, 14, 18, 0) 0%);
  z-index: 1;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #070e12;
  z-index: -1;
}
</style>
