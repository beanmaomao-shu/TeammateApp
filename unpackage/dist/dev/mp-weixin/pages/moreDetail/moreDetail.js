"use strict";
const common_vendor = require("../../common/vendor.js");
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
    const matchData = common_vendor.ref([
      { id: 1, matchName: "2024年第十四届APMCM亚太地区大学生数学建模竞赛", name: "一战成名队", imgUrl: "../../static/images/match6.png" },
      { id: 2, matchName: "2024年全国大学生英语翻译大赛（NETCCS）", name: "六级能不能过队", imgUrl: "../../static/images/match3.png" },
      { id: 3, matchName: '2024年第五届"中译国青杯"国际组织文件翻译大赛', name: "超级翻译官队", imgUrl: "../../static/images/match4.png" },
      { id: 4, matchName: "2024创想中国全国大学生创新创业大赛", name: "小呆呆创新队", imgUrl: "../../static/images/match15.png" },
      { id: 5, matchName: '第三届"中外传播杯"全国大学生英语翻译大赛-英译汉赛道', name: "翻译的都队", imgUrl: "../../static/images/match8.png" },
      { id: 6, matchName: '第二届"数学周报"全国大学生数学能力大赛', name: "基本不懂式队", imgUrl: "../../static/images/match13.png" },
      { id: 7, matchName: "2024第二届全国大学生数学竞赛暨创新思维挑战赛", name: "哎我队", imgUrl: "../../static/images/match11.png" },
      { id: 8, matchName: "CCF2024年中国计算机应用技术大赛-全国算法精英大赛", name: "AC队", imgUrl: "../../static/images/match7.png" },
      { id: 9, matchName: "浙大研究院《智能无人机》研学实践项目", name: "让你飞起来队", imgUrl: "../../static/images/match14.png" }
    ]);
    const data = common_vendor.ref([
      { id: 1, matchName: "2024年全国大学生英语翻译大赛（NETCCS）", name: "六级能不能过队", imgUrl: "../../static/images/match3.png" },
      { id: 2, matchName: '2024年第五届"中译国青杯"国际组织文件翻译大赛', name: "超级翻译官队", imgUrl: "../../static/images/match4.png" },
      { id: 3, matchName: '第三届"中外传播杯"全国大学生英语翻译大赛-英译汉赛道', name: "翻译的都队", imgUrl: "../../static/images/match8.png" }
    ]);
    const show = common_vendor.ref(false);
    const changeMatch = (e) => {
      console.log(e.value.recentMatch);
    };
    const changeCategory = (e) => {
      if (e.value.matchCategory == 3) {
        show.value = true;
      }
    };
    const changeRegion = (e) => {
      console.log(e.value.teamRegion);
    };
    const recentMatchData = common_vendor.ref([
      {
        name: "recentMatch",
        title: "近期比赛",
        options: [
          {
            label: "APMCM亚太大学生数学建模竞赛",
            value: "0",
            tip: "显示在最右边的提示"
          },
          {
            label: "CCF CAT中国计算机应用技术大赛",
            value: "1",
            tip: "显示在最右边的提示"
          },
          {
            label: "“天柱山杯”国际传播翻译大赛",
            value: "2",
            tip: "显示在最右边的提示"
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
            label: "工科",
            value: "0",
            tip: "显示在最右边的提示"
          },
          {
            label: "理科",
            value: "1",
            tip: "显示在最右边的提示"
          },
          {
            label: "文学",
            value: "2",
            tip: "显示在最右边的提示"
          },
          {
            label: "外语",
            value: "3",
            tip: "显示在最右边的提示"
          },
          {
            label: "媒体",
            value: "4",
            tip: "显示在最右边的提示"
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
            tip: "显示在最右边的提示"
          },
          {
            label: "上海",
            value: "1",
            tip: "显示在最右边的提示"
          },
          {
            label: "湖南",
            value: "2",
            tip: "显示在最右边的提示"
          }
        ]
      }
    ]);
    return (_ctx, _cache) => {
      return common_vendor.e({
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
        h: !show.value
      }, !show.value ? {
        i: common_vendor.f(matchData.value, (item, index, i0) => {
          return {
            a: item.imgUrl,
            b: common_vendor.t(item.matchName),
            c: common_vendor.t(item.name),
            d: item.id
          };
        }),
        j: `/pages/teamDetail/teamDetail?toaPageValue=a`
      } : {}, {
        k: show.value
      }, show.value ? {
        l: common_vendor.f(data.value, (item, index, i0) => {
          return {
            a: item.imgUrl,
            b: common_vendor.t(item.matchName),
            c: common_vendor.t(item.name),
            d: item.id
          };
        }),
        m: `/pages/teamDetail/teamDetail?toaPageValue=a`
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c2e090e7"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/moreDetail/moreDetail.vue"]]);
wx.createPage(MiniProgramPage);
