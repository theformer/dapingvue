<template>
  <Common title="服务订单">
    <div class="serviceOrder">
      <OrderSum :name="name" />
      <ServiceTime :name="name" />
      <SunBar :name="name" />
      <OrderLine :name="name" />
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
import OrderSum from "@/components/pensionServices/OrderSum";
import ServiceTime from "@/components/pensionServices/ServiceTime";
import SunBar from "@/components/pensionServices/SunBar";
import OrderLine from "@/components/pensionServices/OrderLine";
export default {
  name: "ServiceOrder",
  components: {
    Common,
    OrderSum,
    ServiceTime,
    SunBar,
    OrderLine,
  },
  data() {
    return {
      options: {},
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
    },
  },
  mounted() {
    // this.draw();
  },
  methods: {
    draw() {
      let echarts = this.$echarts.init(this.$refs.chart);

      // echarts.clear();
      // echarts.setOption(option, true);
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
.ServiceOrder {
  width: 100%;
  height: 100%;
}
</style>
