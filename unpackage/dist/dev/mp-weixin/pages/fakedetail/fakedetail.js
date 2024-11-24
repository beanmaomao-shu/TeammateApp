"use strict";
const common_vendor = require("../../common/vendor.js");
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
  __name: "fakedetail",
  setup(__props) {
    common_vendor.ref("");
    const alertDialog = common_vendor.ref(null);
    const showMessage = common_vendor.ref(null);
    const messageText = common_vendor.ref("向队长发送加入申请");
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
      popupMsg.value = "已发送组队申请，请稍等";
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/teammateHall/teammateHall"
        });
      }, 1e3);
    };
    const toChatPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/chatRoom/chatRoom"
      });
    };
    return (_ctx, _cache) => {
      return {
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
        j: common_vendor.p({
          ["img-src"]: "/static/images/timeout.png",
          ["p-title"]: "截止时间"
        }),
        k: common_vendor.p({
          ["img-src"]: "/static/images/地点.png",
          ["p-title"]: "赛区地点"
        }),
        l: common_vendor.p({
          type: "map-pin-ellipse",
          size: "20"
        }),
        m: common_vendor.o((...args) => _ctx.getMapLocation && _ctx.getMapLocation(...args)),
        n: common_vendor.p({
          ["img-src"]: "/static/images/申请加入.png",
          Title: "申请加入",
          Color: "#FF5733"
        }),
        o: common_vendor.o(($event) => toggleDialog("success", "enter")),
        p: common_vendor.p({
          ["img-src"]: "/static/images/一起讨论.png",
          Title: "一起讨论",
          Color: "#F3705A"
        }),
        q: common_vendor.o(($event) => toChatPage()),
        r: common_vendor.p({
          type: popupType.value,
          message: popupMsg.value,
          duration: 2e3
        }),
        s: common_vendor.sr(showMessage, "bab0c8fc-14", {
          "k": "showMessage"
        }),
        t: common_vendor.p({
          type: "message"
        }),
        v: common_vendor.o(dialogConfirm),
        w: common_vendor.p({
          type: msgType.value,
          cancelText: "取消",
          confirmText: "确定",
          content: messageText.value
        }),
        x: common_vendor.sr(alertDialog, "bab0c8fc-16", {
          "k": "alertDialog"
        }),
        y: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/fakedetail/fakedetail.vue"]]);
wx.createPage(MiniProgramPage);
