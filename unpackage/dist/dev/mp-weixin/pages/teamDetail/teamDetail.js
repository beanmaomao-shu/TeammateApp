"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_detailTitle2 = common_vendor.resolveComponent("detailTitle");
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_fcButton2 = common_vendor.resolveComponent("fcButton");
  (_easycom_detailTitle2 + _easycom_dash2 + _easycom_uni_icons2 + _easycom_fcButton2)();
}
const _easycom_detailTitle = () => "../../components/detailTitle/detailTitle.js";
const _easycom_dash = () => "../../components/dash/dash.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_fcButton = () => "../../components/fcButton/fcButton.js";
if (!Math) {
  (_easycom_detailTitle + _easycom_dash + _easycom_uni_icons + _easycom_fcButton)();
}
const _sfc_main = {
  __name: "teamDetail",
  setup(__props) {
    const numbers = common_vendor.ref("2");
    const time = common_vendor.ref("2022-12-12 12:12:12");
    const address = common_vendor.ref("北京市朝阳区");
    const toValue = common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.onLoad((option) => {
      toValue.value = option.toPageValue;
    });
    const toChatPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/chatRoom/chatRoom"
      });
    };
    const toInvitePage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/inviteMate/inviteMate"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          ["img-src"]: "/static/images/图片.png",
          ["p-title"]: "队伍图标"
        }),
        b: common_vendor.p({
          ["img-src"]: "/static/images/别名.png",
          ["p-title"]: "队伍名称"
        }),
        c: common_vendor.p({
          ["img-src"]: "/static/images/文字.png",
          ["p-title"]: "队伍口号"
        }),
        d: common_vendor.p({
          ["img-src"]: "/static/images/简介.png",
          ["p-title"]: "队伍简介"
        }),
        e: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        f: common_vendor.p({
          ["img-src"]: "/static/images/人员.png",
          ["p-title"]: "队伍成员"
        }),
        g: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        h: common_vendor.p({
          ["img-src"]: "/static/images/组队要求.png",
          ["p-title"]: "组队要求"
        }),
        i: common_vendor.p({
          ["img-src"]: "/static/images/组队人数.png",
          ["p-title"]: "组队人数"
        }),
        j: common_vendor.t(numbers.value),
        k: common_vendor.p({
          ["img-src"]: "/static/images/timeout.png",
          ["p-title"]: "截止时间"
        }),
        l: common_vendor.t(time.value),
        m: common_vendor.p({
          ["img-src"]: "/static/images/地点.png",
          ["p-title"]: "赛区地点"
        }),
        n: common_vendor.p({
          type: "map-pin-ellipse",
          size: "20"
        }),
        o: common_vendor.t(address.value),
        p: common_vendor.o((...args) => _ctx.getMapLocation && _ctx.getMapLocation(...args)),
        q: toValue.value === "a"
      }, toValue.value === "a" ? {
        r: common_vendor.p({
          ["img-src"]: "/static/images/申请加入.png",
          Title: "申请加入",
          Color: "#FF5733"
        })
      } : {}, {
        s: toValue.value === "a"
      }, toValue.value === "a" ? {
        t: common_vendor.p({
          ["img-src"]: "/static/images/一起讨论.png",
          Title: "一起讨论",
          Color: "#F3705A"
        }),
        v: common_vendor.o(($event) => toChatPage())
      } : {}, {
        w: toValue.value === "b"
      }, toValue.value === "b" ? {
        x: common_vendor.p({
          ["img-src"]: "/static/images/退出队伍.png",
          Title: "退出队伍",
          Color: "#D43030"
        })
      } : {}, {
        y: toValue.value === "c"
      }, toValue.value === "c" ? {
        z: common_vendor.p({
          ["img-src"]: "/static/images/发送邀请.png",
          Title: "发送邀请",
          Color: "#FF5733"
        }),
        A: common_vendor.o(($event) => toInvitePage())
      } : {}, {
        B: toValue.value === "c"
      }, toValue.value === "c" ? {
        C: common_vendor.p({
          ["img-src"]: "/static/images/解散队伍.png",
          Title: "解散队伍",
          Color: "#FF8D1A"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/teamDetail/teamDetail.vue"]]);
wx.createPage(MiniProgramPage);
