<template>
  <div id="title" class="title flex align-center flex-start position-relative" :class="direction">
    <div class="title-bg"></div>
    <div class="title-label"></div>
    <div class="title-name flex1">{{title}}</div>
    <div class="title-label-right" v-if="direction == 'middle'"></div>

  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
    /**
     * 方向
     * left middle right
     */
    direction: {
      type: String,
      default: "left", // left middle right
    },
    showDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.title {
  width: 100%;
  height: 30px;
  background-image: url(../assets/index/module_title_bg.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  // background: linear-gradient(90deg, rgba(17, 112, 255, 1) 0%, rgba(17, 112, 255, 0.25) 100%);
  position: relative;
  &-bg {
    background: linear-gradient(90deg, #1170FF 0%, rgba(17, 112, 255, 0) 100%);
    opacity: 0.25;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  &-label {
    width: 1px;
    height: 36px;
    background: #1EC2FF;
    position: relative;
    z-index: 1;
    &-right {
      width: 1px;
      height: 36px;
      background: #1EC2FF;
      position: absolute;
      z-index: 1;
      right: 0;
      top: 0;
    }
  }
  &-name {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 32px;
    position: relative;
    margin-left: 17px;
    z-index: 1;
  }
}
.right {
  transform: rotateY(180deg);
  .title-name {
    transform: rotateY(180deg);
    text-align: right;
  }
}
.middle {
  .title-bg {
    background: linear-gradient(90deg, rgba(17, 112, 255, 0) 0%, rgba(17, 112, 255, 0.99) 51%, rgba(17, 112, 255, 0) 100%);
  }
  .title-name {
    text-align: center;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    margin: 0;
  }
}
</style>
