"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/teammateHall/teammateHall.js";
  "./pages/seminarRoom/seminarRoom.js";
  "./pages/home/home.js";
  "./components/teamInfo/teamInfo.js";
  "./pages/chatRoom/chatRoom.js";
  "./pages/searchDetail/searchDetail.js";
  "./pages/moreDetail/moreDetail.js";
  "./pages/connect/connect.js";
  "./pages/newsCenter/newsCenter.js";
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
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
