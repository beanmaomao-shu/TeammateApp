"use strict";
const common_vendor = require("../../common/vendor.js");
const api_team = require("../../api/team.js");
const api_chat = require("../../api/chat.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_infoCard2 = common_vendor.resolveComponent("infoCard");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_segmented_control2 + _easycom_infoCard2 + _component_uni_section)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_infoCard = () => "../../components/infoCard/infoCard.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_infoCard)();
}
const _sfc_main = {
  __name: "seminarRoom",
  setup(__props) {
    const current = common_vendor.ref(0);
    const items = common_vendor.ref(["我创建的团队", "我加入的团队"]);
    const styleType = common_vendor.ref("button");
    const activeColor = common_vendor.ref("#AC33C1");
    const createTeams = common_vendor.ref([]);
    const joinTeams = common_vendor.ref([]);
    const onClickItem = (e) => {
      if (current.value !== e.currentIndex) {
        current.value = e.currentIndex;
      }
    };
    common_vendor.ref(true);
    common_vendor.ref(true);
    const getCreateTeam = async () => {
      try {
        const res = await api_team.getCreateTeamAPI();
        console.log("获取创建的团队：", res);
        if (res.code === 200 && res.data) {
          createTeams.value = res.data.map((team) => ({
            id: team.id,
            name: team.name,
            icon: team.icon,
            chatRoomId: team.chatRoomId,
            // 确保包含chatRoomId
            isLeader: true,
            // 在创建的团队中都是队长
            unreadCount: 0
            // 初始化未读消息数量
          }));
          await getUnreadMessages();
        }
      } catch (error) {
        console.error("获取创建的团队失败：", error);
        common_vendor.index.showToast({
          title: "获取团队信息失败",
          icon: "none"
        });
      }
    };
    const getJoinTeam = async () => {
      try {
        const res = await api_team.getJoinTeamAPI();
        console.log("获取加入的团队：", res);
        if (res.code === 200 && res.data) {
          joinTeams.value = res.data.map((team) => ({
            ...team,
            unreadCount: 0
            // 初始化未读消息数量
          }));
          await getUnreadMessages();
        }
      } catch (error) {
        console.error("获取加入的团队失败：", error);
        common_vendor.index.showToast({
          title: "获取加入的团队失败",
          icon: "none"
        });
      }
    };
    const getUnreadMessages = async () => {
      try {
        const allChatRoomIds = [
          ...createTeams.value.map((team) => team.chatRoomId),
          ...joinTeams.value.map((team) => team.chatRoomId)
        ].filter((id) => id);
        if (allChatRoomIds.length === 0)
          return;
        console.log("所有聊天室ID：", allChatRoomIds);
        const res = await api_chat.getUnreadCount(allChatRoomIds);
        console.log("获取未读消息数量：", res);
        if (res.code === 200 && res.data) {
          createTeams.value = createTeams.value.map((team) => {
            const unreadInfo = res.data.find((item) => item.chatRoomId === team.chatRoomId);
            return {
              ...team,
              unreadCount: unreadInfo ? unreadInfo.count : 0
            };
          });
          joinTeams.value = joinTeams.value.map((team) => {
            const unreadInfo = res.data.find((item) => item.chatRoomId === team.chatRoomId);
            return {
              ...team,
              unreadCount: unreadInfo ? unreadInfo.count : 0
            };
          });
        }
      } catch (error) {
        console.error("获取未读消息数量失败：", error);
      }
    };
    const handleGetID = (id) => {
      console.log("从 infoCard 获取到的 ID：", id);
    };
    common_vendor.onShow(() => {
      getCreateTeam();
      getJoinTeam();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onClickItem),
        b: common_vendor.p({
          current: current.value,
          values: items.value,
          ["style-type"]: styleType.value,
          ["active-color"]: activeColor.value
        }),
        c: current.value === 0
      }, current.value === 0 ? common_vendor.e({
        d: createTeams.value.length === 0
      }, createTeams.value.length === 0 ? {} : {
        e: common_vendor.f(createTeams.value, (team, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(team.name),
            b: team.icon || "../../static/images/队伍图标1.jpg",
            c: team.unreadCount && team.unreadCount > 0
          }, team.unreadCount && team.unreadCount > 0 ? {
            d: common_vendor.t(team.unreadCount > 99 ? "99+" : team.unreadCount)
          } : {}, {
            e: team.id,
            f: common_vendor.o(handleGetID, team.id),
            g: "779b4231-2-" + i0 + ",779b4231-0",
            h: common_vendor.p({
              id: team.id,
              contentValue: "c"
            }),
            i: `/pages/chatRoom/chatRoom?chatRoomId=${team.chatRoomId}`,
            j: team.id
          });
        })
      }) : {}, {
        f: current.value === 1
      }, current.value === 1 ? common_vendor.e({
        g: joinTeams.value.length === 0
      }, joinTeams.value.length === 0 ? {} : {
        h: common_vendor.f(joinTeams.value, (team, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(team.name),
            b: team.icon || "../../static/images/队伍图标2.jpg",
            c: team.unreadCount && team.unreadCount > 0
          }, team.unreadCount && team.unreadCount > 0 ? {
            d: common_vendor.t(team.unreadCount > 99 ? "99+" : team.unreadCount)
          } : {}, {
            e: team.id,
            f: "779b4231-3-" + i0 + ",779b4231-0",
            g: common_vendor.p({
              id: team.id,
              contentValue: "b"
            }),
            h: `/pages/chatRoom/chatRoom?chatRoomId=${team.chatRoomId}`,
            i: team.id
          });
        })
      }) : {}, {
        i: common_vendor.p({
          title: "实心标签",
          type: "line"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-779b4231"], ["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/pages/seminarRoom/seminarRoom.vue"]]);
wx.createPage(MiniProgramPage);
