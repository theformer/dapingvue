<template>
  <Common title="就餐情况">
    <div class="DineStatus">
      <RepastStatus :name="name" :orgname="orgname" :orgcode="orgcode" />
      <Repast :name="name" :orgname="orgname" :orgcode="orgcode" />
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
import RepastStatus from "@/components/detail/RepastStatus";
import Repast from "@/components/detail/Repast";
export default {
  name: "DineStatus",
  components: {
    Common,
    RepastStatus,
    Repast,
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
    orgname: {
      type: String,
      default: "",
    },
    orgcode: {
      type: String,
      required: "",
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
.DineStatus {
  width: 100%;
  height: 242px;
  display: flex;
  padding: 0 0 0 75px;
}
</style>
