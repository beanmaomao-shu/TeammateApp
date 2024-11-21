"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_infoCard2 = common_vendor.resolveComponent("infoCard");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_transition = common_vendor.resolveComponent("transition");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_infoCard2 + _easycom_uni_icons2 + _component_transition + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_infoCard = () => "../../components/infoCard/infoCard.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_infoCard + _easycom_uni_icons + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "chatRoom",
  setup(__props) {
    const messages = common_vendor.ref([
      { type: 1, text: "Hello!", time: "18:32" },
      { type: 2, text: "Hi!", time: "18:33" }
    ]);
    const message = common_vendor.ref("");
    const isShowFunction = common_vendor.ref(false);
    const isOpen = common_vendor.ref(null);
    const sendMessage = () => {
      if (message.value.trim()) {
        const currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5);
        messages.value.push({ type: 2, text: message.value, time: currentTime });
        message.value = "";
      }
    };
    const showFunction = () => {
      isShowFunction.value = !isShowFunction.value;
    };
    const handleInput = () => {
    };
    const exchangeWechat = () => {
      console.log("111");
      isOpen.value.open();
      msg.value = "您确定要交换联系方式吗？";
    };
    const dialogConfirm = () => {
      const msg2 = "我的微信是: yangbaba";
      const currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5);
      messages.value.push({ type: 2, text: msg2, time: currentTime });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.f(messages.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.type == 1
          }, item.type == 1 ? {
            b: common_assets._imports_4,
            c: common_vendor.t(item.text),
            d: common_vendor.t(item.time)
          } : {}, {
            e: item.type == 2
          }, item.type == 2 ? {
            f: common_vendor.t(item.text),
            g: common_vendor.t(item.time),
            h: common_assets._imports_4
          } : {}, {
            i: index
          });
        }),
        c: common_vendor.o([($event) => message.value = $event.detail.value, handleInput]),
        d: message.value,
        e: common_vendor.o(showFunction),
        f: !message.value,
        g: common_vendor.p({
          type: "plus",
          size: "40"
        }),
        h: message.value,
        i: common_vendor.o(sendMessage),
        j: common_vendor.p({
          type: "image",
          size: "40"
        }),
        k: common_vendor.p({
          type: "camera",
          size: "40"
        }),
        l: common_vendor.p({
          type: "email",
          size: "40"
        }),
        m: common_vendor.p({
          type: "phone",
          size: "40"
        }),
        n: common_vendor.p({
          type: "location",
          size: "40"
        }),
        o: common_vendor.p({
          type: "weixin",
          size: "40"
        }),
        p: common_vendor.o(exchangeWechat),
        q: isShowFunction.value,
        r: common_vendor.p({
          name: "slide-up"
        }),
        s: isShowFunction.value ? 1 : "",
        t: common_vendor.o(dialogConfirm),
        v: common_vendor.p({
          type: "success",
          cancelText: "取消",
          confirmText: "确定",
          content: "您确定要交换联系方式吗?"
        }),
        w: common_vendor.sr(isOpen, "9b186cfb-9", {
          "k": "isOpen"
        }),
        x: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b186cfb"]]);
wx.createPage(MiniProgramPage);
