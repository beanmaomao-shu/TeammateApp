"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/teammateHall/teammateHall.js";
  "./pages/seminarRoom/seminarRoom.js";
  "./pages/home/home.js";
  "./components/teamInfo/teamInfo.js";
  "./pages/chatRoom/chatRoom.js";
  "./pages/makeTeam/makeTeam.js";
  "./pages/searchDetail/searchDetail.js";
  "./pages/moreDetail/moreDetail.js";
  "./pages/connect/connect.js";
  "./pages/newsCenter/newsCenter.js";
  "./pages/teamDetail/teamDetail.js";
  "./pages/inviteMate/inviteMate.js";
  "./pages/test/test.js";
  "./pages/fakedetail/fakedetail.js";
  "./pages/editProfile/editProfile.js";
  "./pages/ai/ai.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
