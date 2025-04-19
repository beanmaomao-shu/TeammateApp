"use strict";
const common_vendor = require("../../common/vendor.js");
const api_userInfo = require("../../api/userInfo.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "userRating",
  setup(__props) {
    const userInfo = common_vendor.ref({
      username: "",
      avatar: "",
      school: ""
    });
    const ratingData = common_vendor.ref([
      { name: "技术能力", value: 4.5, color: "#FF6B6B" },
      { name: "合作能力", value: 4.2, color: "#4ECDC4" },
      { name: "交流能力", value: 3.8, color: "#FFD166" },
      { name: "责任心", value: 4.7, color: "#6A0572" },
      { name: "满意度", value: 4.3, color: "#1A936F" }
    ]);
    const averageScore = common_vendor.computed(() => {
      const sum = ratingData.value.reduce((acc, item) => acc + item.value, 0);
      return sum / ratingData.value.length;
    });
    common_vendor.ref({
      padding: [15, 15, 0, 15],
      legend: {
        show: true,
        position: "bottom"
      },
      dataLabel: false,
      dataPointShape: true,
      radarAxis: {
        gridType: "radar",
        gridColor: "#CCCCCC",
        gridCount: 5,
        labelColor: "#666666",
        max: 5
      },
      extra: {
        radar: {
          gridType: "radar",
          gridColor: "#CCCCCC",
          gridCount: 5,
          opacity: 0.2,
          border: true
        }
      }
    });
    common_vendor.ref({
      categories: ratingData.value.map((item) => item.name),
      series: [
        {
          name: "个人评分",
          data: ratingData.value.map((item) => item.value),
          color: "#AC33C1"
        },
        {
          name: "平均水平",
          data: [3.5, 3.5, 3.5, 3.5, 3.5],
          color: "#4ECDC4"
        }
      ]
    });
    const reviews = common_vendor.ref([
      {
        rating: 5,
        content: "非常优秀的队友，技术能力强，沟通顺畅，合作愉快！",
        date: "2023-05-15",
        tags: ["技术过硬", "沟通顺畅", "有责任心"]
      },
      {
        rating: 4,
        content: "很好的合作伙伴，能够按时完成任务，积极参与讨论。",
        date: "2023-04-28",
        tags: ["按时交付", "积极参与"]
      },
      {
        rating: 5,
        content: "技术能力很强，解决问题迅速，是团队的中流砥柱。",
        date: "2023-03-10",
        tags: ["解决问题快", "技术过硬"]
      }
    ]);
    const getUserInfo = async () => {
      try {
        const res = await api_userInfo.getUserInfoAPI();
        if (res.data) {
          userInfo.value = {
            username: res.data.username || "用户名",
            avatar: res.data.avatar || "../../static/images/avatar.png",
            school: res.data.school || "未知学校"
          };
        }
      } catch (error) {
        console.error("获取用户信息失败：", error);
      }
    };
    common_vendor.onMounted(() => {
      getUserInfo();
    });
    function drawRadar() {
      const ctx = common_vendor.index.createCanvasContext("radarChart", this);
      new common_vendor.uCharts({
        type: "radar",
        context: ctx,
        width: 360,
        // 增大宽高
        height: 360,
        categories: ratingData.value.map((item) => item.name),
        series: [
          {
            name: "个人评分",
            data: ratingData.value.map((item) => item.value),
            color: "#AC33C1"
          }
        ],
        radar: {
          max: 5,
          labelColor: "#666",
          gridColor: "#ccc",
          gridCount: 5,
          radius: 120
        },
        dataLabel: true,
        legend: {
          show: true,
          position: "bottom"
        },
        extra: {
          radar: {
            gridType: "radar",
            gridColor: "#CCCCCC",
            gridCount: 5,
            opacity: 0.2,
            border: true
          }
        }
      });
    }
    common_vendor.onMounted(() => {
      getUserInfo();
      setTimeout(() => {
        drawRadar();
      }, 300);
    });
    return (_ctx, _cache) => {
      return {
        a: userInfo.value.avatar || "../../static/images/avatar.png",
        b: common_vendor.t(userInfo.value.username || "用户名"),
        c: common_vendor.t(userInfo.value.school || "学校"),
        d: common_vendor.t(common_vendor.unref(averageScore).toFixed(1)),
        e: common_vendor.f(ratingData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.value / 5 * 100 + "%",
            c: item.color,
            d: common_vendor.t(item.value.toFixed(1)),
            e: index
          };
        }),
        f: common_vendor.t(reviews.value.length),
        g: common_vendor.f(reviews.value, (review, index, i0) => {
          return {
            a: common_vendor.t(review.date),
            b: common_vendor.f(5, (i, k1, i1) => {
              return {
                a: i,
                b: "9b35427c-0-" + i0 + "-" + i1,
                c: common_vendor.p({
                  type: i <= review.rating ? "star-filled" : "star",
                  size: "18",
                  color: i <= review.rating ? "#FFCC00" : "#CCCCCC"
                })
              };
            }),
            c: common_vendor.t(review.rating),
            d: common_vendor.t(review.content),
            e: common_vendor.f(review.tags, (tag, tagIndex, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tagIndex
              };
            }),
            f: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b35427c"], ["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/pages/userRating/userRating.vue"]]);
wx.createPage(MiniProgramPage);
