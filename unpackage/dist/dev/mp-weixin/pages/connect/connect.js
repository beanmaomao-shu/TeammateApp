"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_dash2 + _component_van_cell + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_dash = () => "../../components/dash/dash.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_dash + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "connect",
  setup(__props) {
    const phone = common_vendor.ref("(空)");
    const wechat = common_vendor.ref("(空)");
    const infocard = common_vendor.ref("(空)");
    const phoneRef = common_vendor.ref(null);
    const wechatRef = common_vendor.ref(null);
    const infocardRef = common_vendor.ref(null);
    const openPhone = () => {
      phoneRef.value.open();
    };
    const closePhone = () => {
      phoneRef.value.close();
    };
    const confirmPhone = async (value) => {
      phone.value = value;
      phoneRef.value.close();
    };
    const openWechat = () => {
      wechatRef.value.open();
    };
    const closeWechat = () => {
      wechatRef.value.close();
    };
    const confirmWechat = async (value) => {
      wechat.value = value;
      wechatRef.value.close();
    };
    const openInfocard = () => {
      infocardRef.value.open();
    };
    const closeInfocard = () => {
      infocardRef.value.close();
    };
    const confirmInfocard = async (value) => {
      infocard.value = value;
      infocardRef.value.close();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        b: common_vendor.o(openPhone),
        c: common_vendor.p({
          center: true,
          title: "拨打电话",
          isLink: true,
          value: phone.value
        }),
        d: common_vendor.o(openWechat),
        e: common_vendor.p({
          center: true,
          title: "添加微信",
          isLink: true,
          value: wechat.value
        }),
        f: common_vendor.o(openInfocard),
        g: common_vendor.p({
          center: true,
          title: "浏览名片",
          isLink: true,
          value: infocard.value
        }),
        h: common_vendor.o(closePhone),
        i: common_vendor.o(confirmPhone),
        j: common_vendor.p({
          mode: "input",
          message: "电话",
          duration: "2000",
          ["before-close"]: "true"
        }),
        k: common_vendor.sr(phoneRef, "ea8c7664-4", {
          "k": "phoneRef"
        }),
        l: common_vendor.p({
          type: "dialog"
        }),
        m: common_vendor.o(closeWechat),
        n: common_vendor.o(confirmWechat),
        o: common_vendor.p({
          mode: "input",
          message: "微信",
          duration: "2000",
          ["before-close"]: "true"
        }),
        p: common_vendor.sr(wechatRef, "ea8c7664-6", {
          "k": "wechatRef"
        }),
        q: common_vendor.p({
          type: "dialog"
        }),
        r: common_vendor.o(closeInfocard),
        s: common_vendor.o(confirmInfocard),
        t: common_vendor.p({
          mode: "input",
          message: "名片",
          duration: "2000",
          ["before-close"]: "true"
        }),
        v: common_vendor.sr(infocardRef, "ea8c7664-8", {
          "k": "infocardRef"
        }),
        w: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ea8c7664"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/connect/connect.vue"]]);
wx.createPage(MiniProgramPage);
