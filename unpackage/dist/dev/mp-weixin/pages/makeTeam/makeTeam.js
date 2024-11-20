"use strict";
const common_vendor = require("../../common/vendor.js");
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
    const range = common_vendor.ref([
      { value: 0, text: "2024全国大学生数学模型竞赛" },
      { value: 1, text: "2024全国大学生数学模型竞赛" },
      { value: 2, text: "2024全国大学生数学模型竞赛" },
      { value: 3, text: "2024全国大学生数学模型竞赛" },
      { value: 4, text: "2024全国大学生数学模型竞赛" }
    ]);
    const rates = common_vendor.ref([
      { value: "1", name: "专科" },
      { value: "2", name: "普通本科" },
      { value: "3", name: "92高校" },
      { value: "4", name: "研究生" }
    ]);
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
    const publish = async () => {
      common_vendor.index.showToast({
        title: "发布成功",
        icon: "success",
        duration: 500
      });
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/teammateHall/teammateHall"
        });
      }, 1e3);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          text: "+",
          type: "primary"
        }),
        b: common_vendor.o(_ctx.change),
        c: common_vendor.o(($event) => _ctx.value = $event),
        d: common_vendor.p({
          localdata: range.value,
          modelValue: _ctx.value
        }),
        e: common_vendor.p({
          text: "1",
          customStyle: {
            background: "#8707ff"
          }
        }),
        f: common_vendor.p({
          limit: "1",
          title: "",
          fileMediatype: "image",
          ["image-styles"]: imageStyles.value
        }),
        g: common_vendor.p({
          text: "2",
          customStyle: {
            background: "#8707ff"
          }
        }),
        h: common_vendor.p({
          text: "3",
          customStyle: {
            background: "#8707ff"
          }
        }),
        i: common_vendor.p({
          text: "4",
          type: "primary",
          customStyle: {
            background: "#8707ff"
          }
        }),
        j: common_vendor.f(rates.value, (item, index, i0) => {
          return {
            a: item.value,
            b: index === _ctx.current,
            c: common_vendor.t(item.name),
            d: item.value
          };
        }),
        k: common_vendor.o((...args) => _ctx.radioChange && _ctx.radioChange(...args)),
        l: common_vendor.p({
          text: "5",
          customStyle: {
            background: "#8707ff"
          }
        }),
        m: common_vendor.p({
          text: "6",
          customStyle: {
            background: "#8707ff"
          }
        }),
        n: common_vendor.o(logTime),
        o: common_vendor.p({
          type: "date",
          value: single.value
        }),
        p: common_vendor.p({
          type: "map-pin-ellipse",
          size: "20"
        }),
        q: common_vendor.t(address.value),
        r: common_vendor.o(getMapLocation),
        s: common_vendor.o(logNum),
        t: common_vendor.o(($event) => numbers.value = $event),
        v: common_vendor.p({
          localdata: items.value,
          ["popup-title"]: "请选择组队人数",
          modelValue: numbers.value
        }),
        w: common_vendor.o(publish),
        x: common_vendor.p({
          ["img-src"]: "/static/images/发布.png",
          Title: "发布组队",
          Color: "#6B57FE"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f62f500a"]]);
wx.createPage(MiniProgramPage);
