"use strict";
const common_vendor = require("../../common/vendor.js");
const api_search = require("../../api/search.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "searchDetail",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    const matchData = common_vendor.ref([]);
    let searchTimeout = null;
    common_vendor.onLoad((options) => {
      if (options.value) {
        searchKeyword.value = decodeURIComponent(options.value);
        doSearch();
      }
    });
    const handleSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        doSearch();
      }, 300);
    };
    const doSearch = async () => {
      if (!searchKeyword.value) {
        matchData.value = [];
        return;
      }
      try {
        const res = await api_search.searchContest(searchKeyword.value);
        if (res.data) {
          matchData.value = res.data;
        } else {
          matchData.value = [];
        }
      } catch (error) {
        console.error("搜索失败：", error);
        common_vendor.index.showToast({
          title: "搜索失败",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o([($event) => searchKeyword.value = $event.detail.value, handleSearch]),
        b: searchKeyword.value,
        c: common_vendor.o(doSearch),
        d: matchData.value.length > 0
      }, matchData.value.length > 0 ? {
        e: common_vendor.f(matchData.value, (item, index, i0) => {
          return {
            a: item.poster,
            b: common_vendor.t(item.name),
            c: item.id
          };
        }),
        f: `/pages/teamDetail/teamDetail?toPageValue=a`
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ce5e1149"], ["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/pages/searchDetail/searchDetail.vue"]]);
wx.createPage(MiniProgramPage);
