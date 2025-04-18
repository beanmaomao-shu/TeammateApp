"use strict";
const common_vendor = require("../../common/vendor.js");
const api_team = require("../../api/team.js");
require("../../utils/request.js");
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
    const teamInfo = common_vendor.ref({
      id: "",
      name: "",
      icon: "",
      slogan: "",
      introduction: "",
      numbers: 0,
      endTime: "",
      matchLocation: "",
      matchId: 0
    });
    const toValue = common_vendor.ref("");
    const deleteID = common_vendor.ref();
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
    const dialogConfirm = async () => {
      try {
        await deleteTeam(deleteID.value);
        showMessage.value.open();
        popupMsg.value = "操作成功";
        common_vendor.index.switchTab({
          url: "/pages/seminarRoom/seminarRoom"
        });
      } catch (error) {
        console.error("删除失败：", error);
        popupMsg.value = "操作失败";
      }
    };
    const getTeamDetail = async (id) => {
      try {
        const res = await api_team.getDetailTeamAPI(id);
        if (res.code === 200 && res.data) {
          teamInfo.value = res.data;
          console.log("队伍详情：", teamInfo.value);
        }
      } catch (error) {
        console.error("获取队伍详情失败：", error);
        common_vendor.index.showToast({
          title: "获取队伍信息失败",
          icon: "none"
        });
      }
    };
    const deleteTeam = async (id) => {
      const res = await api_team.deleteTeamAPI(id);
      console.log(res.data);
    };
    common_vendor.onLoad((option) => {
      if (option.id) {
        getTeamDetail(option.id);
        deleteID.value = option.id;
      }
      toValue.value = option.tocPageValue;
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
        b: teamInfo.value.icon || "../../static/images/队伍图标1.jpg",
        c: common_vendor.p({
          ["img-src"]: "/static/images/别名.png",
          ["p-title"]: "队伍名称"
        }),
        d: common_vendor.t(teamInfo.value.name || "鸭鸭小队"),
        e: common_vendor.p({
          ["img-src"]: "/static/images/文字.png",
          ["p-title"]: "队伍口号"
        }),
        f: common_vendor.t(teamInfo.value.slogan || "加油加油"),
        g: common_vendor.p({
          ["img-src"]: "/static/images/简介.png",
          ["p-title"]: "队伍简介"
        }),
        h: common_vendor.t(teamInfo.value.introduction || "这是一条队伍简介"),
        i: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        j: common_vendor.p({
          ["img-src"]: "/static/images/人员.png",
          ["p-title"]: "队伍成员"
        }),
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
        n: common_vendor.t(teamInfo.value.numbers || "4"),
        o: common_vendor.p({
          ["img-src"]: "/static/images/timeout.png",
          ["p-title"]: "截止时间"
        }),
        p: common_vendor.t(teamInfo.value.endTime || "2025.3.29"),
        q: common_vendor.p({
          ["img-src"]: "/static/images/地点.png",
          ["p-title"]: "赛区地点"
        }),
        r: common_vendor.p({
          type: "map-pin-ellipse",
          size: "20"
        }),
        s: common_vendor.t(teamInfo.value.matchLocation || "四会市人民政府"),
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
        K: common_vendor.sr(showMessage, "3c341a0e-17", {
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
        O: common_vendor.sr(alertDialog, "3c341a0e-19", {
          "k": "alertDialog"
        }),
        P: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/pages/teamDetail/teamDetail.vue"]]);
wx.createPage(MiniProgramPage);
