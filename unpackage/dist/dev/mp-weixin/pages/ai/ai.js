"use strict";
const common_vendor = require("../../common/vendor.js");
const api_ai = require("../../api/ai.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_transition = common_vendor.resolveComponent("transition");
  (_easycom_uni_icons2 + _component_transition)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "ai",
  setup(__props) {
    const scrollTop = common_vendor.ref(0);
    const messages = common_vendor.ref([
      {
        type: 1,
        text: "你好！我是Teammate的AI助手。",
        time: "9:32"
      },
      {
        type: 1,
        text: "有比赛相关的什么问题请尽管问",
        time: "9:32",
        loading: false
      },
      { type: 2, text: "Hi！我想问的是.....", time: "9:33" }
    ]);
    const message = common_vendor.ref("");
    const isShowFunction = common_vendor.ref(false);
    const showFunction = () => {
      isShowFunction.value = !isShowFunction.value;
      if (isShowFunction.value) {
        setTimeout(() => {
          scrollToBottom();
        }, 300);
      }
    };
    const scrollToBottom = () => {
      common_vendor.index.nextTick(() => {
        setTimeout(() => {
          const query = common_vendor.index.createSelectorQuery();
          query.select("#chatScroll").boundingClientRect();
          query.select("#chatScroll").scrollOffset();
          query.exec((res) => {
            if (res[1]) {
              scrollTop.value = res[1].scrollTop + res[0].height + 50;
            }
          });
        }, 100);
      });
    };
    const sendMessage = async () => {
      const currentMessage = message.value;
      message.value = "";
      if (currentMessage.trim()) {
        const currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5);
        messages.value.push({
          type: 2,
          text: currentMessage,
          time: currentTime,
          isImage: false
        });
        messages.value.push({
          type: 1,
          text: "思考中...",
          time: currentTime,
          loading: true
        });
        try {
          const aiChat = await api_ai.zhipuChat(currentMessage);
          const taskId = aiChat.id;
          let pollCount = 0;
          const maxPoll = 20;
          let result = null;
          while (pollCount < maxPoll) {
            await new Promise((resolve) => setTimeout(resolve, 2e3));
            const aiRes = await api_ai.zhipuResult(taskId);
            console.log("智谱回复aiRes", aiRes);
            if (aiRes.task_status === "SUCCESS") {
              result = aiRes;
              break;
            }
            if (aiRes.task_status === "FAILED") {
              break;
            }
            pollCount++;
          }
          messages.value = messages.value.filter((msg) => !msg.loading);
          if (result && result.choices && result.choices.length > 0) {
            messages.value.push({
              type: 1,
              text: result.choices[0].message.content,
              time: (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5),
              loading: false
            });
          } else {
            messages.value.push({
              type: 1,
              text: "抱歉，AI暂时没有返回结果，请稍后再试。",
              time: (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5),
              loading: false
            });
          }
        } catch (error) {
          messages.value = messages.value.filter((msg) => !msg.loading);
          messages.value.push({
            type: 1,
            text: "抱歉，AI请求出错，请稍后再试。",
            time: (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5),
            loading: false
          });
        }
      }
      scrollToBottom();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(messages.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.type == 1
          }, item.type == 1 ? {
            b: common_vendor.t(item.text),
            c: common_vendor.t(item.time)
          } : {}, {
            d: item.type == 2
          }, item.type == 2 ? common_vendor.e({
            e: !item.isImage
          }, !item.isImage ? {
            f: common_vendor.t(item.text)
          } : {
            g: item.text,
            h: common_vendor.o(($event) => _ctx.previewImage(item.text), index)
          }, {
            i: common_vendor.t(item.time)
          }) : {}, {
            j: index
          });
        }),
        b: isShowFunction.value ? 1 : "",
        c: scrollTop.value,
        d: common_vendor.o((...args) => _ctx.onScrollToLower && _ctx.onScrollToLower(...args)),
        e: common_vendor.o([($event) => message.value = $event.detail.value, (...args) => _ctx.handleInput && _ctx.handleInput(...args)]),
        f: message.value,
        g: common_vendor.o(showFunction),
        h: !message.value,
        i: common_vendor.p({
          type: "plus",
          size: "40"
        }),
        j: message.value,
        k: common_vendor.o(sendMessage),
        l: common_vendor.p({
          type: "email",
          size: "40"
        }),
        m: isShowFunction.value,
        n: common_vendor.p({
          name: "slide-up"
        }),
        o: isShowFunction.value ? 1 : ""
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fdb58938"], ["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/pages/ai/ai.vue"]]);
wx.createPage(MiniProgramPage);
