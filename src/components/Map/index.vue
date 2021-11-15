<template>
  <div class="content">
    <div id="container" class="container"></div>
  </div>
</template>

<script>
import mapJson from "@/assets/map/custom_map_config.json";
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
      list: [
        {
          areaname: "五马街道",
          orgcode: "001001",
          orgname: "1号社区",
          orgaddress: "新永川路与株浦路交叉口西北100米",
          orglatitude: "120.6753420",
          orglongitude: "28.0283970",
          servicecount: "10",
          ordercount: "10",
        }
      ],
    };
  },
  watch: {
    areaname() {
      // this.getList(this.initMap);
    },
  },
  mounted() {
    this.initMap()
    // this.getList(this.initMap);
  },
  methods: {
    // 自定义标注参考--https://lbsyun.baidu.com/index.php?title=jspopular/guide/custom-markers
    createOverlay(item) {
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
        var div = document.createElement("div"); // 返回最外层容器
        var icon = document.createElement("img"); // 定位icon
        var infoBox = document.createElement("div"); // 显示数据信息右侧盒子
        var content = document.createElement("p");
        icon.src = require("../../assets/lc/home_map_spot_selected@2x.png");
        icon.style.width = "40px";
        icon.style.height = "40px";
        icon.style.marginTop = "66px";
        icon.style.zIndex = "10";

        infoBox.style.width = "287px";
        infoBox.style.height = "166px";
        infoBox.style.marginLeft = "10px";
        infoBox.style.padding = "10px 16px 0 29px";
        infoBox.style.background = `url(${require("../../assets/lc/popup_bg@2x.png")}) no-repeat`;
        infoBox.style.backgroundSize = "287px 166px";
        infoBox.style.display = "none";
        infoBox.style.zIndex = "10";


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
       
        // 将div添加到覆盖物容器中
        map.getPanes().markerPane.appendChild(div);
        // 保存div实例
        this._div = div;
        this._infoBox = infoBox;
        // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
        // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
        return div;
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

      // 添加自定义方法
      // Overlay.prototype.toggle = function () {
      //   if (this._infoBox) {
      //     if (this._infoBox.style.display == "") {
      //       this.hide();
      //     } else {
      //       this.show();
      //     }
      //   }
      // };
      return Overlay;
    },
    initMap() {
      // 初始化地图
      var map = new BMap.Map("container", {
        minZoom: 13,
        maxZoom: 21,
      });
      // var point = new BMap.Point(120.675342, 28.028397);
      // 默认原点为列表第一个
      var point = null;
      if (this.list[0]) {
        point = new BMap.Point(
          this.list[0].orglatitude,
          this.list[0].orglongitude
        );
      } else {
        // 默认鹿城区
        point = new BMap.Point(120.658716, 28.02877);
      }
      map.centerAndZoom(point, 21);
      map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
      // map.setMapStyleV2({
      //   styleId: "ec3adb0b14b34d2d8f641a6d1856f704",
      // });
      map.setMapStyleV2({
        styleJson: mapJson,
      });
      this.list.forEach((item) => {
        let Overlay = this.createOverlay(item);
        // 添加自定义覆盖物
        var square = new Overlay(
          new BMap.Point(item.orglatitude, item.orglongitude),
          345,
          166
        );
        map.addOverlay(square);
      });
    },
    // getList(callback) {
    //   this.$axios({
    //     url: "/screen/getorgaddress",
    //     method: "post",
    //     data: {
    //       areaname: this.areaname,
    //     },
    //   }).then((res) => {
    //     if (!res.data.success) return;
    //     this.list = res.data.data;
    //     callback ? callback() : "";
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 1120px;
  height: 100%;
  background: #070F1C !important;
  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 1120px;
    height: 100%;
    background: #082941 !important;
  }
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none !important;
}
</style>
