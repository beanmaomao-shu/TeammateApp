"use strict";
const common_vendor = require("../common/vendor.js");
const API_KEY = "cc37d55678ef4a28a361c20528d6d0ae.35p09PfQrZKOSVIn";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`
};
function zhipuChat(prompt) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: "https://open.bigmodel.cn/api/paas/v4/async/chat/completions",
      method: "POST",
      header: headers,
      data: {
        model: "glm-4",
        messages: [{ role: "user", content: prompt }]
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
function zhipuResult(taskId) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `https://open.bigmodel.cn/api/paas/v4/async-result/${taskId}`,
      method: "GET",
      header: headers,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.zhipuChat = zhipuChat;
exports.zhipuResult = zhipuResult;
