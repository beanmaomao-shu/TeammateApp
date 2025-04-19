"use strict";
const common_vendor = require("../../common/vendor.js");
const api_contest = require("../../api/contest.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  const _easycom_wei_dropdown_menu2 = common_vendor.resolveComponent("wei-dropdown-menu");
  (_easycom_dash2 + _easycom_wei_dropdown_menu2)();
}
const _easycom_dash = () => "../../components/dash/dash.js";
const _easycom_wei_dropdown_menu = () => "../../uni_modules/wei-dropdown-menu/components/wei-dropdown-menu/wei-dropdown-menu.js";
if (!Math) {
  (_easycom_dash + _easycom_wei_dropdown_menu)();
}
const _sfc_main = {
  __name: "moreDetail",
  setup(__props) {
    const recentMatchValue = common_vendor.ref({});
    const matchCategoryValue = common_vendor.ref({});
    common_vendor.ref({});
    const selectedType = common_vendor.ref();
    const contestData = common_vendor.ref([]);
    const selectedLocation = common_vendor.ref();
    common_vendor.ref(false);
    const changeMatch = () => {
      selectedType.value = "";
      selectedLocation.value = "";
      matchCategoryValue.value = {};
      teamRegionValue.value = {};
    };
    const getData = async () => {
      try {
        const res = await api_contest.getContest();
        contestData.value = res.data;
        console.log(contestData.value);
      } catch (error) {
        console.log("111", error);
      }
    };
    const changeCategory = (e) => {
      console.log("选择的类型：", e);
      const typeMap = {
        "0": "IT",
        "1": "理科",
        "2": "文学",
        "3": "外语"
      };
      selectedType.value = typeMap[e.value.matchCategory];
      console.log("筛选类型：", selectedType.value);
    };
    const changeRegion = (e) => {
      console.log("选择的地区：", e);
      const locationMap = {
        "0": "广东",
        "1": "上海",
        "2": "湖南"
      };
      selectedLocation.value = locationMap[e.value.teamRegion];
      console.log("筛选地区：", selectedLocation.value);
    };
    const recentMatchData = common_vendor.ref([
      {
        name: "recentMatch",
        title: "近期比赛",
        options: [
          {
            label: "全部比赛",
            value: "all",
            tip: "显示全部比赛"
          }
        ]
      }
    ]);
    const matchCategoryData = common_vendor.ref([
      {
        name: "matchCategory",
        title: "比赛类别",
        options: [
          {
            label: "IT",
            value: "0",
            tip: "IT类比赛"
          },
          {
            label: "理科",
            value: "1",
            tip: "理科类比赛"
          },
          {
            label: "文学",
            value: "2",
            tip: "文学类比赛"
          },
          {
            label: "外语",
            value: "3",
            tip: "外语类比赛"
          }
        ]
      }
    ]);
    const teamRegionData = common_vendor.ref([
      {
        name: "teamRegion",
        title: "组队赛区",
        options: [
          {
            label: "广东",
            value: "0",
            tip: "广东赛区"
          },
          {
            label: "上海",
            value: "1",
            tip: "上海赛区"
          },
          {
            label: "湖南",
            value: "2",
            tip: "湖南赛区"
          }
        ]
      }
    ]);
    common_vendor.ref("");
    const filteredContestData = common_vendor.computed(() => {
      if (!selectedType.value && !selectedLocation.value) {
        return contestData.value;
      }
      let result = contestData.value;
      if (selectedType.value) {
        result = result.filter((item) => item.type === selectedType.value);
      }
      if (selectedLocation.value) {
        result = result.filter((item) => item.location === selectedLocation.value);
      }
      return result;
    });
    common_vendor.onMounted(() => {
      getData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        b: common_vendor.o(changeMatch),
        c: common_vendor.p({
          data: recentMatchData.value,
          value: recentMatchValue.value
        }),
        d: common_vendor.o(changeCategory),
        e: common_vendor.p({
          data: matchCategoryData.value,
          value: matchCategoryValue.value
        }),
        f: common_vendor.o(changeRegion),
        g: common_vendor.p({
          data: teamRegionData.value,
          value: _ctx.teamRegionValue
        }),
        h: common_vendor.f(common_vendor.unref(filteredContestData), (item, k0, i0) => {
          return common_vendor.e({
            a: item.poster,
            b: common_vendor.t(item.name),
            c: item.teamList && item.teamList.length
          }, item.teamList && item.teamList.length ? {
            d: common_vendor.t(item.teamList[0].name)
          } : {}, {
            e: `/pages/teamDetail/teamDetail?id=${item.id}`,
            f: item.id
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c2e090e7"], ["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/pages/moreDetail/moreDetail.vue"]]);
wx.createPage(MiniProgramPage);
