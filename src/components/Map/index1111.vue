<template>
  <div class="content">
    <div id="container" class="container"></div>
  </div>
</template>

<script>
export default {
  name: "Map",
  components: {},
  props: {
    areaname: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    areaname(val, oldVal) {
      if (val === oldVal) return;
      this.getList(this.initMap);
    },
  },
  mounted() {
    this.getList(() => {
      let item = this.list[0];
      const that = this;
      // 定义自定义覆盖物的构造函数
      function Overlay(center, width, height) {
        this._center = center;
        this._width = width;
        this._height = height;
      }
      // 继承API的BMap.Overlay
      Overlay.prototype = new BMap.Overlay();

      // 实现初始化方法
      Overlay.prototype.initialize = function (map) {
        // 保存map对象实例
        this._map = map;
        // 创建div元素，作为自定义覆盖物的容器
        var div = document.createElement("div"); // 返回最外层容易
        var icon = document.createElement("img"); // 定位icon
        var infoBox = document.createElement("div"); // 显示数据信息右侧盒子
        var content = document.createElement("p");
        icon.src = require("../../assets/lc/home_map_spot_selected@2x.png");
        icon.style.width = "40px";
        icon.style.height = "40px";
        icon.style.marginTop = "66px";

        infoBox.style.width = "300px";
        infoBox.style.height = "166px";
        infoBox.style.marginLeft = "10px";
        infoBox.style.padding = "10px 16px 0 29px";
        infoBox.style.background = `url(${require("../../assets/lc/popup_bg@2x.png")}) no-repeat`;
        infoBox.style.backgroundSize = "300px 166px";
        // infoBox.style.display = "none";

        content.innerHTML = `<div style="font-size: 16px;">
                              <div style="line-height: 20px;font-size: 20px;font-weight: bold;color: #DFFCFF;">${
                                item.orgname
                              }</div>
                              <div style="padding-top: 13px;font-weight: 500;color: #5CACCA;">${
                                item.orgaddress
                              }</div>
                              <div style="display: flex;justify-content: space-between;padding-top: 20px;color: #AAE1ED;">
                                <div style="display: flex;justify-content: center;align-items: center;">
                                  <img src="${require("@/assets/lc/popup_box_icon_people@2x.png")}" style="width: 17px;height: 17px;"></img>
                                  <span style="margin-left: 8px;font-weight: 500;">服务人员</span>
                                </div>
                                <div>
                                  <span style="color: #02C6FF;">${
                                    item.servicecount
                                  }</span>
                                  <span>人</span>
                                </div>
                              </div>
                              <div style="display: flex;justify-content: space-between;padding-top: 6px;color: #AAE1ED;">
                                <div style="display: flex;justify-content: center;align-items: center;">
                                  <img src="${require("@/assets/lc/popup_box_icon_people@2x.png")}" style="width: 17px;height: 17px;"></img>
                                  <span style="margin-left: 8px;font-weight: 500;">服务人员</span>
                                </div>
                                <div>
                                  <span style="color: #02C6FF;">${
                                    item.ordercount
                                  }</span>
                                  <span>单</span>
                                </div>
                              </div>
                            </div>`;

        div.style.position = "absolute";
        div.style.display = "flex";
        div.style.width = this._width + "px";
        div.style.height = this._height + "px";

        div.appendChild(icon);
        infoBox.appendChild(content);
        div.appendChild(infoBox);
        // 切换显示隐藏
        icon.addEventListener("mousemove", () => {
          this.show();
        });
        icon.addEventListener("mouseout", () => {
          this.hide();
        });
        icon.addEventListener("click", () => {
          that.$router.push(`/detail/${item.areaname}`);
        });
        // 将div添加到覆盖物容器中
        map.getPanes().markerPane.appendChild(div);
        // 保存div实例
        this._div = div;
        this._infoBox = infoBox;
        // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
        // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
      };

      // 实现绘制方法
      Overlay.prototype.draw = function () {
        // 根据地理坐标转换为像素坐标，并设置给容器
        var position = this._map.pointToOverlayPixel(this._center);
        this._div.style.left = position.x - this._width / 2 + "px";
        this._div.style.top = position.y - this._height / 2 + "px";
      };

      // 实现显示方法
      Overlay.prototype.show = function () {
        if (this._infoBox) {
          this._infoBox.style.display = "";
        }
      };

      // 实现隐藏方法
      Overlay.prototype.hide = function () {
        if (this._infoBox) {
          this._infoBox.style.display = "none";
        }
      };

      // 初始化地图
      var map = new BMap.Map("container");
      // var point = new BMap.Point(120.675342, 28.028397);
      // 默认原点为列表第一个
      var point = new BMap.Point(
        this.list[0].orglatitude,
        this.list[0].orglongitude
      );
      map.centerAndZoom(point, 21);
      map.setMapStyleV2({
        styleId: "ec3adb0b14b34d2d8f641a6d1856f704",
      });
      map.enableScrollWheelZoom(true); //启用滚轮放大缩小，默认禁用
      // 添加自定义覆盖物
      var square = new Overlay(map.getCenter(), 345, 166);
      map.addOverlay(square);
      // this.list.forEach((item) => {
      //   let Overlay = new Overlay(item.orglatitude, item.orglongitude);
      //   // 添加自定义覆盖物
      //   var square = new Overlay(new BMap.Point(), );
      //   map.addOverlay(square);
      // });
    });
  },
  methods: {
    getList(callback) {
      this.$axios({
        url: "/screen/getorgaddress",
        method: "post",
        data: {
          areaname: this.areaname,
        },
      }).then((res) => {
        if (!res.data.success) return;
        this.list = res.data.data;
        callback ? callback() : "";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
</style>
