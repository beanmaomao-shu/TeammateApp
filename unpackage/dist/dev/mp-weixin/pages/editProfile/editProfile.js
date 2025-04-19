"use strict";
const common_vendor = require("../../common/vendor.js");
const api_userInfo = require("../../api/userInfo.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "editProfile",
  setup(__props) {
    const genderArray = ["请选择性别", "男", "女"];
    const profile = common_vendor.ref({
      username: "",
      sex: "",
      school: "",
      phone: "",
      wechatId: "",
      email: "",
      introduction: "",
      location: "",
      awards: []
    });
    const getUserInfo = async () => {
      try {
        const res = await api_userInfo.getUserInfoAPI();
        if (res.data) {
          let awardsArray = [];
          try {
            awardsArray = res.data.awards ? JSON.parse(res.data.awards) : [];
          } catch (e) {
            console.error("解析 awards 失败：", e);
            awardsArray = [];
          }
          if (res.data.username) {
            common_vendor.index.setStorageSync("username", res.data.username);
            console.log("用户名已保存到本地存储:", res.data.username);
          }
          profile.value = {
            username: res.data.username || "",
            sex: res.data.sex === "男" ? 1 : res.data.sex === "女" ? 2 : 0,
            school: res.data.school || "",
            phone: res.data.phone || "",
            wechatId: res.data.wechatId || "",
            email: res.data.email || "",
            introduction: res.data.introduction || "",
            location: res.data.location || "",
            awards: awardsArray.map((award) => ({ name: award }))
            // 转换为对象数组用于显示
          };
        }
        console.log("获取到的用户信息：", profile.value);
      } catch (error) {
        console.error("获取用户信息失败：", error);
      }
    };
    const saveProfile = async () => {
      try {
        if (!profile.value.username.trim()) {
          common_vendor.index.showToast({
            title: "请输入昵称",
            icon: "none"
          });
          return;
        }
        const awardsArray = profile.value.awards.map((award) => award.name).filter((name) => name.trim());
        const formData = {
          username: String(profile.value.username || ""),
          sex: String(genderArray[profile.value.sex] || ""),
          school: String(profile.value.school || ""),
          phone: String(profile.value.phone || ""),
          wechatId: String(profile.value.wechatId || ""),
          email: String(profile.value.email || ""),
          awards: JSON.stringify(awardsArray),
          // 将数组转换为字符串
          location: String(profile.value.location || ""),
          introduction: String(profile.value.introduction || "")
        };
        console.log("准备提交的数据：", formData);
        const res = await api_userInfo.editUserInfoAPI(formData);
        console.log(res);
        if (res.code === 200) {
          common_vendor.index.setStorageSync("username", formData.username);
          console.log("用户名已更新到本地存储:", formData.username);
          common_vendor.index.showToast({
            title: "保存成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        } else {
          throw new Error(res.message || "保存失败");
        }
      } catch (error) {
        console.error("保存失败：", error);
        common_vendor.index.showToast({
          title: error.message || "保存失败，请重试",
          icon: "none"
        });
      }
    };
    const bindGenderChange = (e) => {
      profile.value.sex = parseInt(e.detail.value);
    };
    const addAward = () => {
      profile.value.awards.push({ name: "" });
    };
    const removeAward = (index) => {
      profile.value.awards.splice(index, 1);
    };
    common_vendor.onMounted(() => {
      getUserInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "camera-filled",
          size: "20",
          color: "#fff"
        }),
        b: profile.value.username,
        c: common_vendor.o(($event) => profile.value.username = $event.detail.value),
        d: common_vendor.t(genderArray[profile.value.sex]),
        e: common_vendor.o(bindGenderChange),
        f: profile.value.sex,
        g: genderArray,
        h: profile.value.school,
        i: common_vendor.o(($event) => profile.value.school = $event.detail.value),
        j: profile.value.location,
        k: common_vendor.o(($event) => profile.value.location = $event.detail.value),
        l: profile.value.phone,
        m: common_vendor.o(($event) => profile.value.phone = $event.detail.value),
        n: profile.value.wechatId,
        o: common_vendor.o(($event) => profile.value.wechatId = $event.detail.value),
        p: profile.value.email,
        q: common_vendor.o(($event) => profile.value.email = $event.detail.value),
        r: common_vendor.f(profile.value.awards, (award, index, i0) => {
          return {
            a: award.name,
            b: common_vendor.o(($event) => award.name = $event.detail.value, index),
            c: common_vendor.o(($event) => removeAward(index), index),
            d: "8a448ed0-1-" + i0,
            e: index
          };
        }),
        s: common_vendor.p({
          type: "trash",
          size: "20",
          color: "#999"
        }),
        t: common_vendor.p({
          type: "plus",
          size: "20",
          color: "#7700ff"
        }),
        v: common_vendor.o(addAward),
        w: profile.value.introduction,
        x: common_vendor.o(($event) => profile.value.introduction = $event.detail.value),
        y: common_vendor.t(profile.value.introduction.length),
        z: common_vendor.o(saveProfile)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8a448ed0"], ["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/pages/editProfile/editProfile.vue"]]);
wx.createPage(MiniProgramPage);
