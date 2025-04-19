"use strict";
const common_vendor = require("../../common/vendor.js");
const api_chat = require("../../api/chat.js");
const api_userInfo = require("../../api/userInfo.js");
require("../../utils/request.js");
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
    const showNotice = common_vendor.ref(null);
    const tempNoticeMsg = common_vendor.ref("请遵守团队规则：\n1. 按时完成分配任务\n2. 保持每日签到\n3. 禁止传播无关内容\n4. 服从队长安排\n5. 竞赛期间保持在线");
    const isEditing = common_vendor.ref(false);
    const noticeMsg = common_vendor.ref("请遵守团队规则：\n1. 按时完成分配任务\n2. 保持每日签到\n3. 禁止传播无关内容\n4. 服从队长安排\n5. 竞赛期间保持在线");
    const scrollTop = common_vendor.ref(0);
    const messages = common_vendor.ref([
      { type: 1, text: "Hello!", time: "9:32" },
      { type: 2, text: "Hi!", time: "9:33" }
    ]);
    const message = common_vendor.ref("");
    const isShowFunction = common_vendor.ref(false);
    const isOpen = common_vendor.ref(null);
    common_vendor.ref("");
    let socket = false;
    const chatRoomId = common_vendor.ref(null);
    const teamInfo = common_vendor.ref({});
    const unreadCount = common_vendor.ref(0);
    const currentUsername = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      chatRoomId.value = options.chatRoomId;
      getUsernameFromAPI();
    });
    const getUsernameFromAPI = async () => {
      try {
        const res = await api_userInfo.getUserInfoAPI();
        if (res && res.data && res.data.username) {
          currentUsername.value = res.data.username;
          common_vendor.index.setStorageSync("username", res.data.username);
          console.log("获取到的用户名:", currentUsername.value);
        } else {
          console.error("获取用户信息失败或用户名为空");
        }
      } catch (error) {
        console.error("获取用户名出错:", error);
      }
    };
    const startEditing = () => {
      tempNoticeMsg.value = noticeMsg.value;
      isEditing.value = true;
    };
    const cancelEditing = () => {
      isEditing.value = false;
      tempNoticeMsg.value = noticeMsg.value;
    };
    const saveNotice = () => {
      noticeMsg.value = tempNoticeMsg.value;
      isEditing.value = false;
      common_vendor.index.showToast({
        title: "公告修改成功",
        icon: "success"
      });
    };
    common_vendor.onMounted(() => {
      console.log("聊天室ID:", chatRoomId.value);
      console.log("当前用户名:", currentUsername.value);
      if (chatRoomId.value) {
        getTeamInfo();
        getUnreadMessageCount();
        initWebSocket();
        loadHistoryMessages();
        markAsRead();
      } else {
        common_vendor.index.showToast({
          title: "聊天室ID不存在",
          icon: "none"
        });
      }
    });
    const showFunction = () => {
      isShowFunction.value = !isShowFunction.value;
      if (isShowFunction.value) {
        setTimeout(() => {
          scrollToBottom();
        }, 300);
      }
    };
    const getTeamInfo = () => {
      teamInfo.value = {
        name: "对一题就队",
        icon: "../../static/images/队伍图标2.jpg"
      };
    };
    const getUnreadMessageCount = async () => {
      try {
        if (!chatRoomId.value)
          return;
        const res = await api_chat.getUnreadCount([chatRoomId.value]);
        if (res.code === 200 && res.data) {
          const chatRoomData = res.data.find((item) => item.chatRoomId === parseInt(chatRoomId.value));
          if (chatRoomData) {
            unreadCount.value = chatRoomData.count;
          }
        }
      } catch (error) {
        console.error("获取未读消息数量失败:", error);
      }
    };
    const markAsRead = async () => {
      try {
        if (!chatRoomId.value)
          return;
        const res = await api_chat.markMessagesAsRead(chatRoomId.value);
        if (res.code === 200) {
          unreadCount.value = 0;
        }
      } catch (error) {
        console.error("标记消息为已读失败:", error);
      }
    };
    common_vendor.onUnmounted(() => {
      closeWebSocket();
    });
    const exchangeWechat = () => {
      isOpen.value.open();
    };
    const initWebSocket = () => {
      try {
        const token = common_vendor.index.getStorageSync("token");
        const wsUrl = `ws://117.72.54.182:8898/chat/${chatRoomId.value}`;
        if (socket) {
          console.log("WebSocket已连接，无需重新连接");
          return;
        }
        common_vendor.index.connectSocket({
          url: wsUrl,
          success: () => {
            console.log("WebSocket连接请求发送成功");
          },
          fail: (error) => {
            console.error("WebSocket连接请求失败:", error);
          }
        });
        common_vendor.index.onSocketOpen(function() {
          console.log("WebSocket连接已打开");
          socket = true;
        });
        common_vendor.index.onSocketError(function(error) {
          console.error("WebSocket连接错误:", error);
          socket = false;
          common_vendor.index.showToast({
            title: "WebSocket连接失败",
            icon: "none"
          });
          setTimeout(() => {
            if (!socket) {
              console.log("尝试重新连接WebSocket");
              initWebSocket();
            }
          }, 5e3);
        });
        common_vendor.index.onSocketMessage(function(res) {
          try {
            const data = JSON.parse(res.data);
            console.log("收到消息:", data);
            if (data.messageType) {
              const isImage = data.messageType === "img";
              let currentTime = "";
              if (data.sendTime) {
                const timeMatch = data.sendTime.match(/\d{2}:\d{2}:\d{2}/);
                if (timeMatch) {
                  currentTime = timeMatch[0].substring(0, 5);
                } else {
                  currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5);
                }
              } else {
                currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5);
              }
              const username = currentUsername.value || common_vendor.index.getStorageSync("username");
              console.log("消息判断使用的用户名:", username, "消息中的用户名:", data.username);
              const newMessage = {
                type: data.username === username ? 2 : 1,
                text: data.content,
                time: currentTime,
                isImage
              };
              const isDuplicate = messages.value.some(
                (msg) => msg.text === newMessage.text && msg.type === newMessage.type && msg.time === newMessage.time
              );
              if (!isDuplicate) {
                messages.value.push(newMessage);
                scrollToBottom();
              }
            }
          } catch (error) {
            console.error("解析消息失败:", error);
          }
        });
        common_vendor.index.onSocketClose(function() {
          console.log("WebSocket连接已关闭");
          socket = false;
          setTimeout(() => {
            if (!socket) {
              console.log("连接已关闭，尝试重新连接");
              initWebSocket();
            }
          }, 3e3);
        });
        startHeartbeat();
      } catch (error) {
        console.error("初始化WebSocket失败:", error);
      }
    };
    let heartbeatTimer = null;
    const startHeartbeat = () => {
      if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
      }
      heartbeatTimer = setInterval(() => {
        if (socket) {
          console.log("发送心跳包");
          common_vendor.index.sendSocketMessage({
            data: JSON.stringify({ type: "heartbeat", chatRoomId: chatRoomId.value }),
            fail: (error) => {
              console.error("心跳发送失败:", error);
              socket = false;
              clearInterval(heartbeatTimer);
              setTimeout(() => {
                initWebSocket();
              }, 1e3);
            }
          });
        } else {
          console.log("WebSocket未连接，尝试重连");
          clearInterval(heartbeatTimer);
          initWebSocket();
        }
      }, 3e4);
    };
    const closeWebSocket = () => {
      try {
        if (socket) {
          common_vendor.index.closeSocket({
            success: () => {
              console.log("WebSocket关闭成功");
              socket = false;
            },
            fail: (error) => {
              console.error("WebSocket关闭失败:", error);
            },
            complete: () => {
              socket = false;
              if (heartbeatTimer) {
                clearInterval(heartbeatTimer);
                heartbeatTimer = null;
              }
            }
          });
        }
      } catch (error) {
        console.error("关闭WebSocket出错:", error);
      }
    };
    const loadHistoryMessages = async () => {
      try {
        const result = await api_chat.getChatMessages(chatRoomId.value);
        if (result && result.code === 200 && result.data) {
          messages.value = [];
          const username = currentUsername.value || common_vendor.index.getStorageSync("username");
          console.log("历史消息判断使用的用户名:", username);
          result.data.forEach((item) => {
            let messageTime = "";
            if (item.sendTime) {
              const timeMatch = item.sendTime.match(/\d{2}:\d{2}:\d{2}/);
              if (timeMatch) {
                messageTime = timeMatch[0].substring(0, 5);
              } else {
                messageTime = new Date(item.timestamp).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5);
              }
            } else {
              messageTime = new Date(item.timestamp).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5);
            }
            const isImage = item.messageType === "img";
            messages.value.push({
              type: item.username === username ? 2 : 1,
              // 使用username判断是否为自己发送的消息
              text: item.content,
              time: messageTime,
              isImage
              // 使用正确的判断条件
            });
          });
          scrollToBottom();
        }
      } catch (error) {
        console.error("获取历史消息失败:", error);
        common_vendor.index.showToast({
          title: "获取历史消息失败",
          icon: "none"
        });
      }
    };
    const scrollToBottom = () => {
      setTimeout(() => {
        const query = common_vendor.index.createSelectorQuery();
        query.select(".chat-content").boundingClientRect();
        query.exec(function(res) {
          if (res && res[0]) {
            common_vendor.index.pageScrollTo({
              scrollTop: res[0].height,
              duration: 300
            });
          }
        });
      }, 100);
    };
    const sendMessage = () => {
      if (message.value.trim()) {
        const currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5);
        const messageData = {
          messageType: "text",
          content: message.value,
          username: currentUsername.value || common_vendor.index.getStorageSync("username")
          // 添加用户名
        };
        console.log("发送消息:", JSON.stringify(messageData));
        common_vendor.index.sendSocketMessage({
          data: JSON.stringify(messageData),
          success: () => {
            const newMessage = {
              type: 2,
              // 2表示自己发送的消息
              text: message.value,
              time: currentTime,
              isImage: false
            };
            messages.value.push(newMessage);
            message.value = "";
            scrollToBottom();
            setTimeout(() => {
              loadHistoryMessages();
            }, 1e3);
          },
          fail: (error) => {
            console.error("发送消息失败:", error);
            common_vendor.index.showToast({
              title: "发送消息失败",
              icon: "none"
            });
          }
        });
      }
    };
    const dialogConfirm = () => {
      const msgText = "我的微信是: yangbaba";
      const currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5);
      const messageData = {
        messageType: "text",
        content: msgText,
        username: currentUsername.value || common_vendor.index.getStorageSync("username")
        // 添加用户名
      };
      common_vendor.index.sendSocketMessage({
        data: JSON.stringify(messageData),
        success: () => {
          messages.value.push({
            type: 2,
            text: msgText,
            time: currentTime
          });
          scrollToBottom();
          setTimeout(() => {
            loadHistoryMessages();
          }, 1e3);
        }
      });
    };
    const chooseAndSendImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album"],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          const currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5);
          common_vendor.index.showLoading({
            title: "图片上传中..."
          });
          api_chat.uploadFile(tempFilePath).then((data) => {
            if (data.code === 200) {
              const imageUrl = data.data.url;
              const messageData = {
                messageType: "img",
                content: imageUrl,
                username: currentUsername.value || common_vendor.index.getStorageSync("username")
              };
              common_vendor.index.sendSocketMessage({
                data: JSON.stringify(messageData),
                success: () => {
                  messages.value.push({
                    type: 2,
                    text: imageUrl,
                    time: currentTime,
                    isImage: true
                  });
                  scrollToBottom();
                  setTimeout(() => {
                    loadHistoryMessages();
                  }, 1e3);
                }
              });
            } else {
              common_vendor.index.showToast({
                title: "图片上传失败: " + (data.msg || "未知错误"),
                icon: "none"
              });
            }
          }).catch((error) => {
            console.error("上传图片失败:", error);
            common_vendor.index.showToast({
              title: "图片上传失败",
              icon: "none"
            });
          }).finally(() => {
            common_vendor.index.hideLoading();
          });
          isShowFunction.value = false;
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(teamInfo.value.name || "对一题就队"),
        b: teamInfo.value.icon || "../../static/images/队伍图标2.jpg",
        c: unreadCount.value > 0
      }, unreadCount.value > 0 ? {
        d: common_vendor.t(unreadCount.value > 99 ? "99+" : unreadCount.value)
      } : {}, {
        e: common_vendor.f(messages.value, (item, index, i0) => {
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
            f: common_vendor.t(item.text),
            g: common_vendor.t(item.time)
          } : {
            h: item.text,
            i: common_vendor.o(($event) => _ctx.previewImage(item.text), index),
            j: common_vendor.t(item.time)
          }) : {}, {
            k: index
          });
        }),
        f: isShowFunction.value ? 1 : "",
        g: scrollTop.value,
        h: common_vendor.o((...args) => _ctx.onScrollToLower && _ctx.onScrollToLower(...args)),
        i: common_vendor.o([($event) => message.value = $event.detail.value, (...args) => _ctx.handleInput && _ctx.handleInput(...args)]),
        j: message.value,
        k: common_vendor.o(showFunction),
        l: !message.value,
        m: common_vendor.p({
          type: "plus",
          size: "40"
        }),
        n: message.value,
        o: common_vendor.o(sendMessage),
        p: common_vendor.p({
          type: "image",
          size: "40"
        }),
        q: common_vendor.o(chooseAndSendImage),
        r: common_vendor.p({
          type: "camera",
          size: "40"
        }),
        s: common_vendor.p({
          type: "email",
          size: "40"
        }),
        t: common_vendor.p({
          type: "phone",
          size: "40"
        }),
        v: common_vendor.p({
          type: "location",
          size: "40"
        }),
        w: common_vendor.p({
          type: "weixin",
          size: "40"
        }),
        x: common_vendor.o(exchangeWechat),
        y: common_vendor.p({
          type: "mail-open",
          size: "40"
        }),
        z: common_vendor.o(() => {
          showNotice.value.open();
        }),
        A: isShowFunction.value,
        B: common_vendor.p({
          name: "slide-up"
        }),
        C: isShowFunction.value ? 1 : "",
        D: common_vendor.o(dialogConfirm),
        E: common_vendor.p({
          type: "success",
          cancelText: "取消",
          confirmText: "确定",
          content: "您确定要交换联系方式吗?"
        }),
        F: common_vendor.sr(isOpen, "9b186cfb-10", {
          "k": "isOpen"
        }),
        G: common_vendor.p({
          type: "dialog"
        }),
        H: !isEditing.value,
        I: !isEditing.value ? 1 : "",
        J: tempNoticeMsg.value,
        K: common_vendor.o(($event) => tempNoticeMsg.value = $event.detail.value),
        L: !isEditing.value
      }, !isEditing.value ? {
        M: common_vendor.o(($event) => showNotice.value.close()),
        N: common_vendor.o(startEditing)
      } : {
        O: common_vendor.o(cancelEditing),
        P: common_vendor.o(saveNotice)
      }, {
        Q: common_vendor.sr(showNotice, "9b186cfb-12", {
          "k": "showNotice"
        }),
        R: common_vendor.p({
          type: "center"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b186cfb"], ["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/pages/chatRoom/chatRoom.vue"]]);
wx.createPage(MiniProgramPage);
