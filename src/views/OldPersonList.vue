<template>
  <div class="servePerson">
    <div class="serve-top flex">
      <div class="serve-left flex">
        <img
          class="serve-img"
          src="../assets/lc/home_icon_ornament@2x.png"
          alt=""
        />
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
            y="40"
            fill="url(#headerTitle)"
            style="font-size: 42px"
            class="header-title"
          >
            老人列表
          </text>
        </svg>
      </div>
      <!-- <div class="serve-right" @click="$router.go(-1)">
        <img class="serve-right-img" src="../assets/lc/group50@2x.png" alt="" />
        <span class="goback">返回</span>
      </div> -->
      <div class="header-time flex align-center">
        <div class="header-hour"></div>
        <div class="header-year" @click="$router.go(-1)">
          <img src="../assets/pensionServices/back.png" alt="" />
          <span>返回</span>
        </div>
      </div>
    </div>
    <div class="serve-bg">
      <div class="serve-table">
        <table border="0" cellspacing="0" cellpadding="0" class="tableStyle">
          <thead>
            <tr>
              <th style="text-align:left; padding-left:52px;">姓名</th>
              <th>服务订单数</th>
              <th>服务评价次数</th>
              <th>服务好评次数</th>
              <th>服务好评率</th>
              <th>活动参与数</th>
              <th>活动评价次数</th>
              <th>活动好评率</th>
              <th>投诉次数</th>
              <th>投诉率</th>
              <th>最近出行时间</th>
            </tr>
          </thead>
          <tbody class="serveList" style="text-align: center" v-if="oldList.length> 0">
            <tr v-for="(item, index) in oldList" :key="index" class="bableBody">
              <td style="width: 200px; text-align:left;padding-left:52px;">{{ item.olderName }}</td>
              <td>{{ item.orderNum }}</td>
              <td>{{ item.fwpjNum }}</td>
              <td>{{ item.fwpjGood }}</td>
              <td>{{ item.fwpjGoodRate }}%</td>
              <td>{{ item.activityNum }}</td>
              <td>{{ item.hdpjGood }}</td>
              <td>{{ item.hdpjGoodRate }}%</td>
              <td>{{ item.orderTs }}</td>
              <td>{{ item.tsRate }}%</td>
              <td>{{ item.outLately }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="block" style="text-align: center; margin: 34px 0 36px 0" v-if="oldList.length> 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listOldPerson.pageNum"
          :page-size="listOldPerson.pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </div>
       <div class="default" v-if="oldList.length == 0">
       <img
          class="default-img"
          src="../assets/blank/blankpage_nodata@2x.png"
          alt=""
        />
        <span class="no-content">暂无内容~</span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SerPerson",
  data() {
    return {
      orgCode: null,
      listOldPerson: {
        orgCode: "",
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      oldList: [],
    };
  },
  created() {
    this.organizationCode = this.$route.params.organizationCode;
    console.log(this.$route.params.organizationCode, 12312);
  },
  mounted() {
    this.getOldPersonList();
  },
  methods: {
    getOldPersonList() {
      this.$axios({
        url: "/screen/olderList",
        method: "post",
        data: {
          orgCode: this.organizationCode,
          pageNum: 1,
          pageSize: 10,
        },
      }).then((res) => {
        console.log(res, "服务人员列表");
        let { data } = res.data;
        if (data) {
          this.oldList = data.list;
          console.log(data);
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.listOldPerson.pageSize = val;
      this.getOldPersonList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listOldPerson.pageNum = val;
      this.getOldPersonList();
    },
  },
};
</script>

<style lang="scss" scoped>
.servePerson {
  width: 1920px;
  height: 100%;
  background: #070e12;
  padding: 61px 61px 42px 64px;
}
.serve-top {
  justify-content: space-between;
}
.serve-img {
  width: 29px;
  height: 33px;
  margin: auto;
}
.serve-right {
  width: 102px;
  height: 42px;
  background: #091924;
  border: 1px solid #072b51;
  border-radius: 4px;
  text-align: center;
  line-height: 42px;
  cursor: pointer;
  pointer-events: initial;
}
.serve-right-img {
  width: 18px;
  height: 18px;
  margin-right: 2px;
}
.goback {
  width: 41px;
  height: 21px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #85b0c7;
  cursor: pointer;
  pointer-events: initial;
}
.serve-bg {
  display: flex;
  flex-direction: column;
  background-image: url("../assets/lc/bg@2x.png");
  background-size: 1795px 904px;
  height: 904px;
  // border: 2px solid #1468a7;
  margin-top: 42px;
}
.header {
  &-svg {
    width: 291px;
    height: 42px;
  }
  &-title {
    font-family: PangMenZhengDao;
    font-weight: 400;
    color: #ffffff;
    font-style: italic;
    transform: scaleY(0.9);
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
}
.serve-table {
  flex: 1;
}
.tableStyle {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
}
.tableStyle th {
  height: 72px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #85b0c7;
}
.bableBody {
  height: 56px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #dffcff;
}
// .bableBody td:nth-child(1) {
//   color: #16C0FF;
// }
.serveList tr:nth-child(odd) {
  background: #091d2e;
}
.default {
  width: 425px;
  height: 348px;
  margin: 267px auto;
  text-align: center;
}
.default-img {
  width: 100%;  
  margin-bottom: 25px;
}
.no-content {
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #7089B6;
  line-height: 28px;
}
</style>
<style>
.btn-prev {
  height: 36px !important;
  width: 37px !important;
  border: 1px solid #0f406b !important;
  border-radius: 4px !important;
  background-color: transparent !important;
}
.btn-next {
  height: 36px !important;
  width: 37px !important;
  border: 1px solid #0f406b !important;
  border-radius: 4px !important;
  background-color: transparent !important;
}
.el-pager li {
  height: 36px !important;
  width: 37px !important;
  line-height: 36px;
  border: 1px solid #0f406b !important;
  border-radius: 4px !important;
  background: transparent !important;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.el-pager li:not(.disabled).active {
  border: none;
  background: #197fdf !important;
}
.el-pager .more::before {
  line-height: 36px;
}
.el-pagination__jump {
  height: 36px !important;
  line-height: 36px !important;
}
.el-pagination__editor.el-input {
  width: 47px !important;
  margin: 0 10px;
  font-size: 18px;
}
.el-pagination__editor .el-input text {
  font-size: 18px;
}
.el-input__inner {
  color: #85b0c7;
  font-size: 18px;
  height: 36px !important;
  border: 1px solid #0f406b !important;
  border-radius: 4px !important;
  background-color: transparent !important;
  line-height: 36px !important;
}
</style>
