"use strict";
const common_vendor = require("../../common/vendor.js");
const api_contest = require("../../api/contest.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const isauthenticated = common_vendor.ref(true);
    const contestList = common_vendor.ref([]);
    const getContestList = async () => {
      try {
        const res = await api_contest.getContest();
        contestList.value = res.data;
        console.log("成功");
      } catch (error) {
        console.log("111222", error);
      }
    };
    const goToUserRating = () => {
      common_vendor.index.navigateTo({
        url: "/pages/userRating/userRating"
      });
    };
    console.log("111", contestList.value);
    common_vendor.onMounted(() => {
      getContestList();
    });
    const goToEditProfile = () => {
      common_vendor.index.navigateTo({
        url: "/pages/editProfile/editProfile"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isauthenticated.value
      }, isauthenticated.value ? {} : {}, {
        b: !isauthenticated.value
      }, !isauthenticated.value ? {} : {}, {
        c: common_vendor.o(goToEditProfile),
        d: common_vendor.o(goToUserRating)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"], ["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
