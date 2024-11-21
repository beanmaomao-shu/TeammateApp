"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
        b: common_assets._imports_0$4,
        c: common_vendor.o(openPhone),
        d: common_vendor.p({
          center: true,
          title: "拨打电话",
          isLink: true,
          value: phone.value
        }),
        e: common_assets._imports_1$5,
        f: common_vendor.o(openWechat),
        g: common_vendor.p({
          center: true,
          title: "添加微信",
          isLink: true,
          value: wechat.value
        }),
        h: common_assets._imports_2$1,
        i: common_vendor.o(openInfocard),
        j: common_vendor.p({
          center: true,
          title: "浏览名片",
          isLink: true,
          value: infocard.value
        }),
        k: common_vendor.o(closePhone),
        l: common_vendor.o(confirmPhone),
        m: common_vendor.p({
          mode: "input",
          message: "电话",
          duration: "2000",
          ["before-close"]: "true"
        }),
        n: common_vendor.sr(phoneRef, "ea8c7664-4", {
          "k": "phoneRef"
        }),
        o: common_vendor.p({
          type: "dialog"
        }),
        p: common_vendor.o(closeWechat),
        q: common_vendor.o(confirmWechat),
        r: common_vendor.p({
          mode: "input",
          message: "微信",
          duration: "2000",
          ["before-close"]: "true"
        }),
        s: common_vendor.sr(wechatRef, "ea8c7664-6", {
          "k": "wechatRef"
        }),
        t: common_vendor.p({
          type: "dialog"
        }),
        v: common_vendor.o(closeInfocard),
        w: common_vendor.o(confirmInfocard),
        x: common_vendor.p({
          mode: "input",
          message: "名片",
          duration: "2000",
          ["before-close"]: "true"
        }),
        y: common_vendor.sr(infocardRef, "ea8c7664-8", {
          "k": "infocardRef"
        }),
        z: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ea8c7664"]]);
wx.createPage(MiniProgramPage);
