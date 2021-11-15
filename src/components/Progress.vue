<template>
  <div class="flex align-center">
    <div class="modalprogress-name">{{ name }}</div>
    <div class="modalprogress flex1">
      <div
        class="modalprogress-bar"
        :style="{
          transition: show ? 'all .3s ease' : 'all 0s',
          width: show ? percent + '%' : '0%',
          background: bgColor,
        }"
      ></div>
      <div
        class="modalprogress-info flex align-center"
        :style="{
          transition: show ? 'all .3s ease' : 'all 0s',
          left: show ? percent + '%' : '0%',
          opacity: show ? 1 : 0,
        }"
      >
        <div class="modalprogress-label">
          <div
            class="modalprogress-label-outer"
            :style="{ border: `1px solid ${outerColor}` }"
          ></div>
          <div
            class="modalprogress-label-middle"
            :style="{ background: outerColor }"
          ></div>
          <div
            class="modalprogress-label-inner"
            :style="{ background: innerColor }"
          ></div>
        </div>
      </div>
    </div>
    <div class="modalprogress-value" :style="{color: color}">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: "ModalProgress",
  props: {
    value: {
      type: [Number, String],
      default: 2000,
    },
    percent: {
      type: [Number, String],
      default: 20,
    },
    name: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default:
        "linear-gradient(90deg, rgba(19, 158, 255, 1) 0%, rgba(19, 158, 255, 0.6))",
    },
    color: {
      type: String,
      default: "rgba(96, 189, 255, 1)",
    },
    outerColor: {
      type: String,
      default: "rgba(96, 189, 255, 0.1)",
    },
    innerColor: {
      type: String,
      default: "rgba(96, 189, 255, 0.1)",
    },
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.reset();
    this.draw();
  },
  methods: {
    draw() {
      this.timer = setInterval(() => {
        this.reset();
      }, 10000);
    },
    reset() {
      this.show = true;
      let timer = setTimeout(() => {
        this.show = false;
        clearTimeout(timer);
      }, 9700);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.modalprogress {
  position: relative;
  width: 100%;
  height: 8px;
  background: #0a1927;
  &-name {
    min-width: 72px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #85b0c7;
  }
  &-bar {
    position: absolute;
    width: 0;
    height: 8px;
    left: 0;
    top: 0;
  }
  &-info {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
  }
  &-label {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    transform: translate(-50%, 0);
    &-outer {
      position: absolute;
      width: 25px;
      height: 25px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
    &-inner {
      position: absolute;
      width: 8px;
      height: 8px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
    &-middle {
      position: absolute;
      width: 17px;
      height: 17px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
    // &::after {
    //   content: '';
    //   position: absolute;
    //   display: block;
    //   width: 25px;
    //   height: 25px;
    //   left: 50%;
    //   top: 50%;
    //   transform: translate(-50%, -50%);
    // }
  }
  &-value {
    font-size: 18px;
    font-family: PangMenZhengDao;
    font-weight: 400;
    min-width: 72px;
    text-align: right;
  }
}
</style>
