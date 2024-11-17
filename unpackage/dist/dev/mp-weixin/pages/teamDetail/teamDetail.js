"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_detailTitle2 = common_vendor.resolveComponent("detailTitle");
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_fcButton2 = common_vendor.resolveComponent("fcButton");
  (_easycom_detailTitle2 + _easycom_dash2 + _easycom_uni_data_picker2 + _easycom_uni_datetime_picker2 + _easycom_uni_icons2 + _easycom_fcButton2)();
}
const _easycom_detailTitle = () => "../../components/detailTitle/detailTitle.js";
const _easycom_dash = () => "../../components/dash/dash.js";
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_fcButton = () => "../../components/fcButton/fcButton.js";
if (!Math) {
  (_easycom_detailTitle + _easycom_dash + _easycom_uni_data_picker + _easycom_uni_datetime_picker + _easycom_uni_icons + _easycom_fcButton)();
}
const _sfc_main = {
  __name: "teamDetail",
  setup(__props) {
    const numbers = common_vendor.ref();
    const items = common_vendor.ref([
      {
        text: "0",
        value: 0
      },
      {
        text: "1",
        value: 1
      },
      {
        text: "2",
        value: 2
      },
      {
        text: "3",
        value: 3
      },
      {
        text: "4",
        value: 4
      },
      {
        text: "5",
        value: 5
      },
      {
        text: "6",
        value: 6
      },
      {
        text: "7",
        value: 7
      },
      {
        text: "8",
        value: 8
      },
      {
        text: "9",
        value: 9
      },
      {
        text: "10",
        value: 10
      }
    ]);
    const logNum = () => {
      console.log(numbers.value);
    };
    const single = common_vendor.ref();
    const logTime = (e) => {
      single.value = e;
      console.log(e);
    };
    const address = common_vendor.ref("定位您的位置");
    const getMapLocation = () => {
      common_vendor.index.chooseLocation({
        success: (res) => {
          address.value = res.name;
        },
        fail: () => {
          common_vendor.index.getSetting({
            //获取用户的当前设置
            success: (res) => {
              var status = res.authSetting;
              if (!status["scope.userLocation"]) {
                common_vendor.index.showModal({
                  //显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。
                  title: "是否授权当前位置",
                  content: "需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
                  success: (tip) => {
                    if (tip.confirm) {
                      common_vendor.index.openSetting({
                        //调起客户端小程序设置界面，返回用户设置的操作结果
                        success: (data) => {
                          if (data.authSetting["scope.userLocation"] === true) {
                            common_vendor.index.showToast({
                              title: "授权成功",
                              icon: "success",
                              duration: 1e3
                            });
                            common_vendor.index.chooseLocation({
                              success: (res2) => {
                                address.value = res2.address;
                              }
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "授权失败",
                              icon: "none",
                              duration: 1e3
                            });
                          }
                        }
                      });
                    }
                  }
                });
              }
            },
            fail: (res) => {
              common_vendor.index.showToast({
                title: "调用授权窗口失败",
                icon: "none",
                duration: 1e3
              });
            }
          });
        }
      });
    };
    common_vendor.ref("");
    const toPage = () => {
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
        j: common_vendor.o(logNum),
        k: common_vendor.o(($event) => numbers.value = $event),
        l: common_vendor.p({
          localdata: items.value,
          ["popup-title"]: "请选择组队人数",
          modelValue: numbers.value
        }),
        m: common_vendor.p({
          ["img-src"]: "/static/images/timeout.png",
          ["p-title"]: "截止时间"
        }),
        n: common_vendor.o(logTime),
        o: common_vendor.p({
          type: "date",
          value: single.value
        }),
        p: common_vendor.p({
          ["img-src"]: "/static/images/地点.png",
          ["p-title"]: "赛区地点"
        }),
        q: common_vendor.p({
          type: "map-pin-ellipse",
          size: "20"
        }),
        r: common_vendor.t(address.value),
        s: common_vendor.o(getMapLocation),
        t: common_vendor.p({
          ["img-src"]: "/static/images/申请加入.png",
          Title: "申请加入",
          Color: "#FF5733"
        }),
        v: common_vendor.p({
          ["img-src"]: "/static/images/一起讨论.png",
          Title: "一起讨论",
          Color: "#F3705A"
        }),
        w: common_vendor.o(toPage)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/teamDetail/teamDetail.vue"]]);
wx.createPage(MiniProgramPage);
