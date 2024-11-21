"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_detailTitle2 = common_vendor.resolveComponent("detailTitle");
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_fcButton2 = common_vendor.resolveComponent("fcButton");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  (_easycom_detailTitle2 + _easycom_dash2 + _easycom_uni_icons2 + _easycom_fcButton2 + _easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_popup_dialog2)();
}
const _easycom_detailTitle = () => "../../components/detailTitle/detailTitle.js";
const _easycom_dash = () => "../../components/dash/dash.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_fcButton = () => "../../components/fcButton/fcButton.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
if (!Math) {
  (_easycom_detailTitle + _easycom_dash + _easycom_uni_icons + _easycom_fcButton + _easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_popup_dialog)();
}
const _sfc_main = {
  __name: "teamDetail",
  setup(__props) {
    const numbers = common_vendor.ref("2");
    const time = common_vendor.ref("2022-12-12 12:12:12");
    const address = common_vendor.ref("北京市朝阳区");
    const toValue = common_vendor.ref("");
    common_vendor.ref("");
    const alertDialog = common_vendor.ref(null);
    const showMessage = common_vendor.ref(null);
    const messageText = common_vendor.ref("");
    const popupMsg = common_vendor.ref("");
    const msgType = common_vendor.ref("success");
    const popupType = common_vendor.ref("success");
    const toggleDialog = (type, msg) => {
      msgType.value = type;
      alertDialog.value.open();
      if (msg == "out") {
        messageText.value = "您确定要退出该团队吗？";
      }
      if (msg == "disband") {
        messageText.value = "您确定要解散该团队吗?";
      }
    };
    const dialogConfirm = () => {
      showMessage.value.open();
      popupMsg.value = "操作成功";
    };
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
        b: common_assets._imports_0$5,
        c: common_vendor.p({
          ["img-src"]: "/static/images/别名.png",
          ["p-title"]: "队伍名称"
        }),
        d: common_vendor.p({
          ["img-src"]: "/static/images/文字.png",
          ["p-title"]: "队伍口号"
        }),
        e: common_vendor.p({
          ["img-src"]: "/static/images/简介.png",
          ["p-title"]: "队伍简介"
        }),
        f: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        g: common_vendor.p({
          ["img-src"]: "/static/images/人员.png",
          ["p-title"]: "队伍成员"
        }),
        h: common_assets._imports_1$2,
        i: common_assets._imports_1$2,
        j: common_assets._imports_1$2,
        k: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        l: common_vendor.p({
          ["img-src"]: "/static/images/组队要求.png",
          ["p-title"]: "组队要求"
        }),
        m: common_vendor.p({
          ["img-src"]: "/static/images/组队人数.png",
          ["p-title"]: "组队人数"
        }),
        n: common_vendor.t(numbers.value),
        o: common_vendor.p({
          ["img-src"]: "/static/images/timeout.png",
          ["p-title"]: "截止时间"
        }),
        p: common_vendor.t(time.value),
        q: common_vendor.p({
          ["img-src"]: "/static/images/地点.png",
          ["p-title"]: "赛区地点"
        }),
        r: common_vendor.p({
          type: "map-pin-ellipse",
          size: "20"
        }),
        s: common_vendor.t(address.value),
        t: common_vendor.o((...args) => _ctx.getMapLocation && _ctx.getMapLocation(...args)),
        v: toValue.value === "a"
      }, toValue.value === "a" ? {
        w: common_vendor.p({
          ["img-src"]: "/static/images/申请加入.png",
          Title: "申请加入",
          Color: "#FF5733"
        })
      } : {}, {
        x: toValue.value === "a"
      }, toValue.value === "a" ? {
        y: common_vendor.p({
          ["img-src"]: "/static/images/一起讨论.png",
          Title: "一起讨论",
          Color: "#F3705A"
        }),
        z: common_vendor.o(($event) => toChatPage())
      } : {}, {
        A: toValue.value === "b"
      }, toValue.value === "b" ? {
        B: common_vendor.p({
          ["img-src"]: "/static/images/退出队伍.png",
          Title: "退出队伍",
          Color: "#D43030"
        }),
        C: common_vendor.o(($event) => toggleDialog("error", "out"))
      } : {}, {
        D: toValue.value === "c"
      }, toValue.value === "c" ? {
        E: common_vendor.p({
          ["img-src"]: "/static/images/发送邀请.png",
          Title: "发送邀请",
          Color: "#FF5733"
        }),
        F: common_vendor.o(($event) => toInvitePage())
      } : {}, {
        G: toValue.value === "c"
      }, toValue.value === "c" ? {
        H: common_vendor.p({
          ["img-src"]: "/static/images/解散队伍.png",
          Title: "解散队伍",
          Color: "#FF8D1A"
        }),
        I: common_vendor.o(($event) => toggleDialog("error", "disband"))
      } : {}, {
        J: common_vendor.p({
          type: popupType.value,
          message: popupMsg.value,
          duration: 2e3
        }),
        K: common_vendor.sr(showMessage, "a119523a-17", {
          "k": "showMessage"
        }),
        L: common_vendor.p({
          type: "message"
        }),
        M: common_vendor.o(dialogConfirm),
        N: common_vendor.p({
          type: msgType.value,
          cancelText: "取消",
          confirmText: "确定",
          content: messageText.value
        }),
        O: common_vendor.sr(alertDialog, "a119523a-19", {
          "k": "alertDialog"
        }),
        P: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
