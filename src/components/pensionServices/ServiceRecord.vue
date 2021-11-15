<template>
  <Common title="最新服务订单" direction="middle">
    <div class="service-record hiden-box">
      <div class="service-record-header flex">
        <div
          class="service-record-header-item flex align-center"
          v-for="(item, index) in headerList"
          :key="index"
          :style="{ width: item.width }"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="service-record-body hiden-box" ref="scroll">
        <vueSeamlessScroll
          :data="list"
          :class-option="option"
          class="seamless-warp"
        >
          <div
            class="service-record-row flex"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="service-record-column" style="width: 110px">
              {{ item.buyer }}
            </div>
            <div class="service-record-column" style="width: 300px">
              <div class="word-space-one" style="width: 260px">
                {{ item.address }}
              </div>
            </div>
            <div
              :class="[
                'service-record-column',
                item.status === '完成'
                  ? 'green'
                  : item.status === '已接单'
                  ? 'blue'
                  : item.status === '已回访'
                  ? 'yellow'
                  : '',
              ]"
              style="width: 120px"
            >
              {{ item.status }}
            </div>
            <div class="service-record-column" style="width: 202px">
              {{ item.orderTime }}
            </div>
          </div>
        </vueSeamlessScroll>
      </div>
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "ServiceRecord",
  components: {
    Common,
    vueSeamlessScroll,
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
      headerList: [
        {
          name: "姓名",
          width: "110px",
        },
        {
          name: "位置",
          width: "300px",
        },
        {
          name: "状态",
          width: "120px",
        },
        {
          name: "下单时间",
          width: "202px",
        },
      ],
      list: [],
    };
  },
  computed: {
    option() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
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
        url: "/screen/listServiceOrders",
        method: "post",
        data: {
          areaName: this.name,
        },
      }).then((res) => {
        console.log(res, "最新服务订单");
        let { data } = res.data;
        if (data) {
          this.list = data;
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
.service-record {
  width: 100%;
  height: 242px;
  &-header {
    height: 51px;
    padding: 0 23px;
    &-item {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #85b0c7;
      height: 100%;
    }
  }
  &-row {
    width: 100;
    height: 38px;
    padding: 0 23px;
    &:nth-child(2n + 1) {
      background: #0a1927;
    }
  }
  &-column {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #c8eefb;
    line-height: 38px;
  }
  .blue {
    color: #08c0fc;
  }
  .green {
    color: #33e172;
  }
  .yellow {
    color: #ffcd22;
  }
}
</style>
