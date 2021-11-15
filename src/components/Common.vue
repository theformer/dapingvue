<template>
  <div id="common" class="common position-relative">
    <Title :title="title" :direction="direction" />
    <div
      class="content-line-left"
      :class="'content-line-left-' + direction"
    ></div>
    <div
      class="content-line-right"
      :class="'content-line-right-' + direction"
    ></div>
    <div
      class="content-line-bottom"
      :class="'content-line-bottom-' + direction"
    ></div>
    <div class="content-circle" :class="'content-circle-' + direction"></div>
    <div class="content position-relative">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Title from "./Title";
export default {
  name: "Common",
  props: {
    title: {
      type: String,
      default: "",
      required: true
    },
    /**
     * 方向
     * left middle right
     */
    direction: {
      type: String,
      default: "left" // left middle right
    }
  },
  components: {
    Title
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@font-face {
  font-family: "PangMenZhengDao";
  src: url("../font/PangMenZhengDao.woff2");
}
.common {
  width: 100%;
  height: 100%;
  background: rgba(4, 27, 70, 0.1);
  position: relative;
  z-index: 101;
  .content {
    width: 100%;
    &-line {
      &-left {
        position: absolute;
        left: 0;
        top: 0;
        width: 1px;
        height: 50%;
        background: linear-gradient(
          0deg,
          rgba(11, 62, 112, 0.3) 0%,
          #0b3e70 100%
        );
        z-index: 1;
        &-right {
          top: 0;
          left: 100%;
          transform: translate(-100%, 0);
        }
      }
      &-right {
        width: 1px;
        height: 114px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          to bottom,
          rgba(11, 62, 112, 0.3) 0%,
          #0b3e70 100%
        );
        z-index: 1;
        &-right {
          left: 0;
        }
      }
      &-bottom {
        width: 171px;
        height: 1px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          to right,
          rgba(11, 62, 112, 0.3) 0%,
          #0b3e70 100%
        );
        z-index: 1;
        &-right {
          left: 0;
          background: linear-gradient(
            to left,
            rgba(11, 62, 112, 0.3) 0%,
            #0b3e70 100%
          );
        }
      }
    }
    &-circle {
      width: 2px;
      height: 2px;
      background: #1ec2ff;
      border-radius: 50%;
      position: absolute;
      right: 0;
      bottom: 0;
      box-shadow: 0 0 6px 2px rgba(79, 220, 255, 0.4);
      z-index: 1;
      &-right {
        left: 0;
      }
    }
  }
}
</style>
