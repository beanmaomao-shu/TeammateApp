"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://117.72.54.182:8898";
const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = common_vendor.index.getStorageSync("token");
    let requestData = options.data;
    if (options.method === "POST" && options.data) {
      requestData = {
        ...options.data
      };
    }
    common_vendor.index.request({
      ...options,
      url: baseURL + options.url,
      data: requestData,
      // 添加请求头，携带token
      header: {
        "Content-Type": "application/json",
        ...options.header,
        // 如果有token则添加到请求头
        ...token ? { "Authorization": token } : {}
      },
      success: (res) => {
        console.log("请求响应：", res);
        if (res.statusCode === 200) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          common_vendor.index.removeStorageSync("token");
          common_vendor.index.showToast({
            title: "请重新登录",
            icon: "none"
          });
          reject(res);
        } else {
          common_vendor.index.showToast({
            title: `请求失败: ${res.statusCode}`,
            icon: "none"
          });
          console.error("请求失败详情：", res);
          reject(res);
        }
      },
      fail: (err) => {
        console.error("网络错误详情：", err);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
        reject(err);
      }
    });
  });
};
exports.request = request;
