<template>
  <div class="operate flex align-center" @click="toPension">
    <img src="@/assets/lc/home_icon_yanglao@2x.png" class="operate-img" />
    <div class="operate-title flex1">养老服务运营</div>
    <img src="@/assets/lc/home_yanglao_enter@2x.png" class="operate-arrow" />
    <div class="line-left"></div>
    <div class="line-right"></div>
    <div class="line-top"></div>
    <div class="line-bottom"></div>
    <div class="circle-bottom"></div>
    <div class="circle-top"></div>
  </div>
</template>

<script>
import Common from "@/components/Common";
import ICountUp from "vue-countup-v2";
export default {
  name: "Operate",
  components: {
    Common,
    ICountUp
  },
  data() {
    return {
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: "",
        prefix: "",
        suffix: ""
      }
    };
  },
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  watch: {
    name: function(val) {
      /**
       * 重新获取数据
       */
    }
  },
  mounted() {
    // this.draw();
  },
  methods: {
    toPension() {
      this.$router.push(`/pensionServices`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@font-face {
  font-family: "PangMenZhengDao";
  src: url("../../font/PangMenZhengDao.woff2");
}
.operate {
  width: 100%;
  height: 106px;
  position: relative;
  padding-left: 41px;
  padding-right: 27px;
  cursor: pointer;
  background: linear-gradient(-90deg, rgba(17, 112, 255, 0.25) 0%, rgba(17, 112, 255, 0) 100%);
  .line {
    &-left {
      width: 1px;
      height: 90px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: linear-gradient(
        to top,
        rgba(11, 62, 112, 0.3) 0%,
        #0b3e70 100%
      );
    }
    &-right {
      width: 1px;
      height: 90px;
      position: absolute;
      right: 0;
      top: 0;
      background: linear-gradient(
        to bottom,
        rgba(11, 62, 112, 0.3) 0%,
        #0b3e70 100%
      );
    }
    &-bottom {
      width: 171px;
      height: 1px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: linear-gradient(
        to left,
        rgba(11, 62, 112, 0.3) 0%,
        #0b3e70 100%
      );
    }
    &-top {
      width: 171px;
      height: 1px;
      position: absolute;
      right: 0;
      top: 0;
      background: linear-gradient(
        to left,
        rgba(11, 62, 112, 0.3) 0%,
        #0b3e70 100%
      );
      &-right {
        left: 0;
      }
    }
  }
  .circle {
    &-top {
      width: 2px;
      height: 2px;
      background: #1ec2ff;
      border-radius: 50%;
      position: absolute;
      right: 0;
      top: 0;
      box-shadow: 0 0 6px 2px rgba(79, 220, 255, 0.4);
    }
    &-bottom {
      width: 2px;
      height: 2px;
      background: #1ec2ff;
      border-radius: 50%;
      position: absolute;
      left: 0;
      bottom: 0;
      box-shadow: 0 0 6px 2px rgba(79, 220, 255, 0.4);
    }
  }
  &-img {
    width: 110px;
    height: 96px;
    margin-right: 36px;
  }
  &-arrow {
    width: 53px;
    height: 46px;
    // margin-left: 20px;
  }
  &-title {
    color: #a7d4f1;
    font-size: 38px;
    font-family: PangMenZhengDao;
    letter-spacing: 2px;
    transform: scaleY(1.1);
  }
}
</style>
