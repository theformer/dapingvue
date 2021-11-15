<template>
  <Common title="最新服务订单信息">
    <div class="newServiceorder">
      <div class="newServiceorder-item">
        <div class="item-left">订购人</div>
        <div class="item-right">{{ data.buyer || '暂无' }}</div>
      </div>
      <div class="newServiceorder-item">
        <div class="item-left">地址</div>
        <div class="item-right">{{ data.address || '暂无' }}</div>
      </div>
      <div class="newServiceorder-item">
        <div class="item-left">联系电话</div>
        <div class="item-right">{{ data.phone || '暂无' }}</div>
      </div>
      <div class="newServiceorder-item">
        <div class="item-left">订单金额</div>
        <div class="item-right">{{ data.fee || '0.00' }}元</div>
      </div>
      <div class="newServiceorder-item">
        <div class="item-left">下单时间</div>
        <div class="item-right">{{ data.orderTime || '暂无' }}</div>
      </div>
      <div class="newServiceorder-item">
        <div class="item-left">订单内容</div>
        <div class="item-right">{{ data.context || '暂无' }}</div>
      </div>
    </div>
  </Common>
</template>

<script>
import Common from "@/components/Common";
export default {
  name: "NewServiceorder",
  components: { Common },
  data() {
    return {
      data: {},
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
      default: "",
    },
  },
  watch: {
    orgname: function (val) {
      /**
       * 重新获取数据
       */
      this.getData();
    },
  },
  mounted() {
    // this.getData();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getData();
    }, 1000 * 60 * 60);
  },
  methods: {
    getData() {
      this.$axios({
        url: "/screen/getLatestServiceOrder",
        method: "post",
        data: {
          organizationCode: this.orgcode,
        },
      }).then((res) => {
        // debugger
        console.log(res, "最新服务订单信息");
        let { data } = res.data;
        if (data) {
          this.data = data;
        } else {
          this.data = {}
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
.newServiceorder {
  width: 100%;
  padding: 20px 15px;
  box-sizing: border-box;
  height: 242px;
  .newServiceorder-item {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    .item-left {
      min-width: 64px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #85b0c7;
      line-height: 32px;
      margin-right: 17px;
    }
    .item-right {
      flex: 1;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #c8eefb;
      line-height: 32px;
    }
  }
}
</style>
