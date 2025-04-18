"use strict";
const common_vendor = require("../../common/vendor.js");
const api_team = require("../../api/team.js");
const api_contest = require("../../api/contest.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_fcButton2 = common_vendor.resolveComponent("fcButton");
  (_easycom_uni_badge2 + _easycom_uni_data_select2 + _easycom_uni_file_picker2 + _easycom_uni_datetime_picker2 + _easycom_uni_icons2 + _easycom_uni_data_picker2 + _easycom_fcButton2)();
}
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_fcButton = () => "../../components/fcButton/fcButton.js";
if (!Math) {
  (_easycom_uni_badge + _easycom_uni_data_select + _easycom_uni_file_picker + _easycom_uni_datetime_picker + _easycom_uni_icons + _easycom_uni_data_picker + _easycom_fcButton)();
}
const _sfc_main = {
  __name: "makeTeam",
  setup(__props) {
    const imageStyles = common_vendor.ref({
      width: 90,
      height: 90,
      border: {
        color: "#68c984",
        width: 1,
        style: "dashed",
        radius: "10rpx"
      }
    });
    const rates = common_vendor.ref([
      { value: "1", name: "专科" },
      { value: "2", name: "普通本科" },
      { value: "3", name: "92高校" },
      { value: "4", name: "研究生" }
    ]);
    const teamData = common_vendor.ref({
      name: "",
      icon: "",
      slogan: "",
      introduction: "",
      numbers: 0,
      matchId: 1,
      endTime: "",
      matchLocation: ""
    });
    common_vendor.ref();
    const items = common_vendor.ref([
      { text: "0", value: 0 },
      { text: "1", value: 1 },
      { text: "2", value: 2 },
      { text: "3", value: 3 },
      { text: "4", value: 4 },
      { text: "5", value: 5 },
      { text: "6", value: 6 },
      { text: "7", value: 7 },
      { text: "8", value: 8 },
      { text: "9", value: 9 },
      { text: "10", value: 10 }
    ]);
    const logNum = (e) => {
      const selectedNumber = parseInt(e.value || e);
      teamData.value.numbers = selectedNumber;
      console.log("选择的人数：", teamData.value.numbers);
    };
    const logTime = (e) => {
      teamData.value.endTime = e;
      console.log("选择的截止时间：", teamData.value.endTime);
    };
    const onFileSelect = (e) => {
      console.log("文件选择事件：", e);
      onFileUploadSuccess(e);
    };
    const onFileUploadProgress = (e) => {
      console.log("上传进度：", e);
    };
    const onFileUploadFail = (e) => {
      console.error("上传失败：", e);
    };
    const onFileUploadSuccess = async (e) => {
      try {
        console.log("文件上传事件触发：", e);
        if (!e.tempFiles || !e.tempFiles.length) {
          console.error("没有获取到文件信息");
          return;
        }
        const tempFilePath = e.tempFiles[0].url || e.tempFiles[0].path;
        const token = common_vendor.index.getStorageSync("token");
        common_vendor.index.uploadFile({
          url: "http://117.72.54.182:8898/users/upload",
          filePath: tempFilePath,
          name: "file",
          header: {
            "Authorization": token
          },
          success: (uploadRes) => {
            try {
              console.log("上传响应：", uploadRes);
              const data = JSON.parse(uploadRes.data);
              if (data.code === 200) {
                teamData.value.icon = data.data.url;
                console.log("设置图片URL：", teamData.value.icon);
                common_vendor.index.showToast({
                  title: "图片上传成功",
                  icon: "success"
                });
              } else {
                throw new Error("上传失败: " + data.message);
              }
            } catch (error) {
              console.error("解析上传响应失败：", error);
            }
          },
          fail: (error) => {
            console.error("图片上传失败：", error);
            common_vendor.index.showToast({
              title: "图片上传失败",
              icon: "error"
            });
          }
        });
      } catch (error) {
        console.error("图片上传异常：", error);
      }
    };
    const addTeam = async () => {
      console.log("发布组队函数被调用");
      if (!teamData.value.icon) {
        common_vendor.index.showToast({ title: "请上传队伍图标", icon: "none" });
        return;
      }
      if (!teamData.value.name) {
        common_vendor.index.showToast({ title: "请填写队伍名称", icon: "none" });
        return;
      }
      if (!teamData.value.slogan) {
        common_vendor.index.showToast({ title: "请填写队伍口号", icon: "none" });
        return;
      }
      if (!teamData.value.introduction) {
        common_vendor.index.showToast({ title: "请填写队伍简介", icon: "none" });
        return;
      }
      if (!teamData.value.endTime) {
        common_vendor.index.showToast({ title: "请选择截止时间", icon: "none" });
        return;
      }
      if (!teamData.value.matchLocation) {
        common_vendor.index.showToast({ title: "请选择比赛地点", icon: "none" });
        return;
      }
      try {
        const teamDataToSend = {
          name: String(teamData.value.name || ""),
          icon: String(teamData.value.icon || ""),
          // 确保icon字段被包含
          slogan: String(teamData.value.slogan || ""),
          introduction: String(teamData.value.introduction || ""),
          numbers: parseInt(teamData.value.numbers) || 0,
          endTime: String(teamData.value.endTime || ""),
          matchLocation: String(teamData.value.matchLocation || ""),
          matchId: parseInt(teamData.value.matchId) || 1
        };
        console.log("发送的格式化数据：", JSON.stringify(teamDataToSend, null, 2));
        const res = await api_team.createTeamAPI(teamDataToSend);
        if (res.code === 200) {
          common_vendor.index.showToast({
            title: "发布成功",
            icon: "success"
          });
          common_vendor.index.switchTab({
            url: "/pages/teammateHall/teammateHall"
          });
        } else {
          common_vendor.index.showToast({
            title: "发布失败，请重试",
            icon: "error"
          });
        }
      } catch (error) {
        console.error("创建队伍失败：", error);
        if (error.response) {
          console.error("错误响应数据：", error.response.data);
        }
        common_vendor.index.showToast({
          title: "创建失败",
          icon: "error"
        });
      }
    };
    const range = common_vendor.ref([]);
    const getContestList = async () => {
      try {
        const res = await api_contest.getContest();
        if (res.data) {
          range.value = res.data.map((item) => ({
            value: item.id,
            // 比赛ID作为value
            text: item.name
            // 比赛名称作为显示文本
          }));
        }
      } catch (error) {
        console.error("获取比赛列表失败：", error);
        common_vendor.index.showToast({
          title: "获取比赛列表失败",
          icon: "none"
        });
      }
    };
    const value = common_vendor.ref("");
    const change = (e) => {
      teamData.value.matchId = parseInt(e);
      console.log("选择的比赛ID：", teamData.value.matchId);
    };
    common_vendor.onMounted(() => {
      getContestList();
    });
    const address = common_vendor.ref("定位您的位置");
    const getMapLocation = () => {
      common_vendor.index.chooseLocation({
        success: (res) => {
          address.value = res.name;
          teamData.value.matchLocation = res.name;
          console.log("选择的地点：", teamData.value.matchLocation);
        },
        fail: () => {
          common_vendor.index.getSetting({
            success: (res) => {
              if (!res.authSetting["scope.userLocation"]) {
                common_vendor.index.showModal({
                  title: "是否授权当前位置",
                  content: "需要获取您的地理位置，请确认授权",
                  success: (tip) => {
                    if (tip.confirm) {
                      common_vendor.index.openSetting({
                        success: (data) => {
                          if (data.authSetting["scope.userLocation"] === true) {
                            common_vendor.index.showToast({ title: "授权成功", icon: "success" });
                            common_vendor.index.chooseLocation({
                              success: (res2) => {
                                address.value = res2.name;
                                teamData.value.matchLocation = res2.name;
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                });
              }
            }
          });
        }
      });
    };
    const radioChange = (e) => {
      console.log("选择的组别：", e.detail.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          text: "+",
          type: "primary"
        }),
        b: common_vendor.o(change),
        c: common_vendor.o(($event) => value.value = $event),
        d: common_vendor.p({
          localdata: range.value,
          modelValue: value.value
        }),
        e: common_vendor.p({
          text: "1",
          customStyle: {
            background: "#8707ff"
          }
        }),
        f: common_vendor.o(onFileSelect),
        g: common_vendor.o(onFileUploadSuccess),
        h: common_vendor.o(onFileUploadProgress),
        i: common_vendor.o(onFileUploadFail),
        j: common_vendor.p({
          limit: "1",
          title: "",
          fileMediatype: "image",
          ["image-styles"]: imageStyles.value,
          action: "http://117.72.54.182:8898/users/upload"
        }),
        k: common_vendor.p({
          text: "2",
          customStyle: {
            background: "#8707ff"
          }
        }),
        l: teamData.value.name,
        m: common_vendor.o(($event) => teamData.value.name = $event.detail.value),
        n: common_vendor.p({
          text: "3",
          customStyle: {
            background: "#8707ff"
          }
        }),
        o: teamData.value.slogan,
        p: common_vendor.o(($event) => teamData.value.slogan = $event.detail.value),
        q: common_vendor.p({
          text: "4",
          type: "primary",
          customStyle: {
            background: "#8707ff"
          }
        }),
        r: common_vendor.f(rates.value, (item, index, i0) => {
          return {
            a: item.value,
            b: index === _ctx.current,
            c: common_vendor.t(item.name),
            d: item.value
          };
        }),
        s: common_vendor.o(radioChange),
        t: common_vendor.p({
          text: "5",
          customStyle: {
            background: "#8707ff"
          }
        }),
        v: teamData.value.introduction,
        w: common_vendor.o(($event) => teamData.value.introduction = $event.detail.value),
        x: common_vendor.p({
          text: "6",
          customStyle: {
            background: "#8707ff"
          }
        }),
        y: common_vendor.o(logTime),
        z: common_vendor.p({
          type: "date",
          value: teamData.value.endTime
        }),
        A: common_vendor.p({
          type: "map-pin-ellipse",
          size: "20"
        }),
        B: common_vendor.t(address.value),
        C: common_vendor.o(getMapLocation),
        D: common_vendor.o(logNum),
        E: common_vendor.o(($event) => teamData.value.numbers = $event),
        F: common_vendor.p({
          localdata: items.value,
          ["popup-title"]: "请选择组队人数",
          modelValue: teamData.value.numbers
        }),
        G: common_vendor.p({
          ["img-src"]: "/static/images/发布.png",
          Title: "发布组队",
          Color: "#6B57FE"
        }),
        H: common_vendor.o(addTeam)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f62f500a"], ["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/pages/makeTeam/makeTeam.vue"]]);
wx.createPage(MiniProgramPage);
