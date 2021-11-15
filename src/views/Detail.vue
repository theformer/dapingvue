<template>
  <div class="detail flex flex-column">
    <div class="mask"></div>
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
          x="50%"
          y="60%"
          fill="url(#headerTitle)"
          style="
            font-size: 30px;
            dominant-baseline: middle;
            text-anchor: middle;
          "
          class="header-title"
        >
          {{ orgname }}
        </text>
      </svg>
      <div class="header-options flex flex-between">
        <div
          class="header-select position-relative"
          :class="onSelect ? 'header-select-active' : ''"
          @mouseover="setOnSelect(true)"
          @mouseleave="setOnSelect(false)"
        >
          <div class="header-select-box flex align-center">
            <div class="header-select-value flex1 word-space-one">
              {{ name }}{{ orgname }}
            </div>
            <img
              class="header-select-icon"
              src="../assets/lc/home_combo_click@2x.png"
            />
          </div>
          <div class="position-relative">
            <div class="header-select-list" ref="selectList" v-show="onSelect">
              <div
                class="header-select-item flex align-center flex-between position-relative"
                :class="[
                  index == parentIndex ? 'header-select-item-hover' : '',
                  name == item.areaname ? 'header-select-item-active' : ''
                ]"
                @mouseover="setParent(index)"
                v-for="(item, index) in areaList"
                :key="index"
                :ref="'parent' + index"
              >
                <div class="flex1">
                  {{ item.areaname }}
                </div>
                <img
                  class="header-select-icon"
                  src="../assets/lc/home_combo_click@2x.png"
                  style="transform: rotate(-90deg)"
                  v-if="name == item.areaname"
                />
                <img
                  class="header-select-icon"
                  src="../assets/lc/home_icon_yanglao_enter.png"
                  style="width: 20px; margin-right: 6px"
                  v-if="name != item.areaname"
                />
              </div>
            </div>
            <div
              class="header-select-list header-select-children"
              :style="{ top: top + 'px', width: 'fit-content' }"
              v-show="
                onSelect &&
                  parentIndex > -1 &&
                  areaList[parentIndex] &&
                  areaList[parentIndex].nodes &&
                  areaList[parentIndex].nodes.length > 0
              "
            >
              <div
                @click="setName(item.orgname, item.orgcode)"
                class="header-select-item flex align-center flex-between"
                :class="
                  item.orgname == orgname ? 'header-select-item-active' : ''
                "
                v-for="(item, index) in areaList[parentIndex] &&
                  areaList[parentIndex].nodes"
                :key="index"
              >
                <div
                  class="flex1"
                  style="white-space: nowrap; padding-right: 5px;"
                >
                  {{ item.orgname }}
                </div>
              </div>
            </div>
          </div>
          <div class="header-select-line header-select-line1"></div>
          <div class="header-select-line header-select-line2"></div>
        </div>
        <div class="header-time flex align-center">
          <!-- <div class="header-hour">{{ hour }}</div>
          <div class="header-year">{{ year }}</div> -->
          <div class="header-hour" @click="home">
            <img src="../assets/lc/home.png" alt="" />
            <span>首页</span>
          </div>
          <div class="header-year" @click="back">
            <img src="../assets/pensionServices/back.png" alt="" />
            <span>返回</span>
          </div>
        </div>
      </div>
    </div>
    <div class="body flex flex-between flex1">
      <div class="body-left">
        <!-- left -->
        <div class="total">
          <Total :name="name" :orgname="orgname" :orgcode="orgcode" />
        </div>
        <div class="age">
          <Age :name="name" :orgname="orgname" :orgcode="orgcode" />
        </div>
        <div>
          <PatrolInspection
            :name="name"
            :orgname="orgname"
            :orgcode="orgcode"
          />
        </div>
      </div>
      <div class="body-middle">
        <!-- middle -->
        <div class="flex align-center flex-between">
          <div class="service">
            <Service :name="name" :orgname="orgname" :orgcode="orgcode" />
          </div>
          <div class="bed">
            <Bed :name="name" :orgname="orgname" :orgcode="orgcode" />
          </div>
        </div>
        <div class="monthlyOrder">
          <MonthlyOrder :name="name" :orgname="orgname" :orgcode="orgcode" />
        </div>
        <div class="DineStatus">
          <DineStatus :name="name" :orgname="orgname" :orgcode="orgcode" />
        </div>
        <div></div>
      </div>
      <div class="body-right">
        <!-- right -->
        <div class="org">
          <Org :name="name" :orgname="orgname" :orgcode="orgcode" />
        </div>
        <div class="order-sum">
          <Data :name="name" :orgname="orgname" :orgcode="orgcode" />
        </div>
        <div class="new-serviceorder">
          <NewServiceorder :name="name" :orgname="orgname" :orgcode="orgcode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sex from "@/components/index/Sex";
import ServiceRecord from "@/components/index/ServiceRecord";
import Age from "@/components/detail/Age";
import Total from "@/components/detail/Total";
import Service from "@/components/detail/Service";
import Bed from "@/components/detail/Bed";
import Org from "@/components/detail/Org";
import PatrolInspection from "@/components/detail/PatrolInspection";
import Data from "@/components/detail/Data";
import MonthlyOrder from "@/components/detail/MonthlyOrder";
import NewServiceorder from "@/components/detail/NewServiceorder";
import DineStatus from "@/components/detail/DineStatus";

export default {
  name: "Detail",
  components: {
    Sex,
    ServiceRecord,
    Age,
    Total,
    Service,
    Bed,
    Org,
    PatrolInspection,
    Data,
    MonthlyOrder,
    NewServiceorder,
    DineStatus
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
      parentIndex: -1,
      top: 0,
      onSelect: false,
      orgname: "",
      orgcode: ""
    };
  },
  beforeMount() {},
  mounted() {
    let that = this;
    this.getDay();
    this.setTime();
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
    getAreaList() {
      this.$axios({
        url: "/screen/getorgs",
        method: "post"
      }).then(res => {
        let data = res && res.data.data;
        // data = data.concat(data);
        // data = data.concat(data);
        if (data) {
          this.areaList = data;

          if (this.$route.params.name) {
            let orgname = this.$route.params.name;
            let areaList = data;
            // debugger
            this.orgname = orgname;
            for (let i = 0; i < areaList.length; i++) {
              let nodes = areaList[i].nodes;
              if (nodes && nodes.length > 0) {
                for (let j = 0; j < nodes.length; j++) {
                  if (nodes[j].orgname == orgname) {
                    this.parentIndex = i;
                    this.name = areaList[i].areaname;
                    this.orgcode = nodes[j].orgcode;
                    return;
                  }
                }
              }
            }
          }
          for (let i = 0; i < data.length; i++) {
            if (data[i].nodes.length > 0) {
              this.orgname = data[i].nodes[0].orgname;
              this.orgcode = data[i].nodes[0].orgcode;
              this.name = data[i].areaname;
              break;
            }
          }
        }
      });
    },
    toggleSelect() {
      // this.showSelect = !this.showSelect;
    },
    setName(orgname, orgcode) {
      this.orgname = orgname;
      this.name = this.areaList[this.parentIndex].areaname;
      this.orgcode = orgcode;
      this.onSelect = false;
    },
    setParent(index) {
      this.parentIndex = index;
      // console.log(this.$refs['parent' + index] && this.$refs['parent' + index][0].offsetTop)
      let offsetTop =
        this.$refs["parent" + index] &&
        this.$refs["parent" + index][0].offsetTop;
      let scrollTop = this.$refs.selectList.scrollTop;
      let top = offsetTop - scrollTop;
      this.top = top;
    },
    setOnSelect(value) {
      if (!value) {
        // this.parentIndex = -1;
      } else {
        // let orgname = this.orgname
        // let areaList = this.areaList
        // for (let i = 0; i < areaList.length; i++) {
        //   let nodes = areaList[i].nodes
        //   if (nodes && nodes.length > 0) {
        //     for (let j = 0; j < nodes.length; j++) {
        //       if (nodes[j].orgname == orgname) {
        //         this.parentIndex = i
        //         this.name = areaList[i].areaname
        //       }
        //       break
        //     }
        // }
      }
      this.onSelect = value;
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
    },
    home() {
      this.$router.push("/index");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.detail {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(7, 14, 18, 1);
  padding-bottom: 44px;
  .header {
    width: 100%;
    height: 114px;
    margin-bottom: 19px;
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
      width: 1800px;
      height: 42px;
      position: absolute;
      left: 50%;
      top: 20px;
      transform: translate(-50%, 0) scaleY(1.2);
      letter-spacing: 3px;
    }
    &-options {
      position: absolute;
      left: 0;
      height: 46px;
      width: 100%;
      height: 46px;
      top: 50px;
      padding: 0 47px;
    }
    &-hour {
      width: 102px;
      height: 42px;
      background-image: url("../assets/pensionServices/bg_back.png");
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-right: 20px;
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
    &-year {
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
        scrollbar-width: 0;
        scrollbar-color: transparent transparent;
        scrollbar-track-color: transparent;
        // -ms-scrollbar-track-color: transparent;
      }
      &-children {
        height: 282px;
        position: absolute;
        left: 100%;
        width: fit-content;
        box-shadow: 0 0 38px 2px rgba(8, 60, 123, 0.72) inset;
        background: #091924;
        z-index: 2;
      }
      &-item {
        width: 100%;
        height: 46px;
        padding-left: 19px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #6a94ae;
        line-height: 46px;
        cursor: pointer;
        padding-right: 10px;
        &-active {
          color: rgba(8, 192, 252, 1);
        }
        &-hover {
          color: #dffcff;
          background: rgba(10, 32, 44, 1);
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
      width: 432px;
      margin-left: 50px;
      .total {
        margin-bottom: 30px;
      }
      .age {
        margin-bottom: 30px;
      }
    }
    &-middle {
      width: 894px;
      .monthlyOrder {
        margin: 30px 0;
      }
    }
    &-right {
      width: 432px;
      margin-right: 50px;
      .order-sum {
        margin: 30px 0;
      }
    }
  }
}
.mask {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  width: 813px;
  height: 813px;
  filter: blur(200px);
  background-color: rgba(8, 141, 225, 0.2);
  border-radius: 50%;
  pointer-events: none;
}
</style>
