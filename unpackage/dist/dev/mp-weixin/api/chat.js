"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
const getChatMessages = (chatRoomId) => {
  return utils_request.request({
    url: `/ws/${chatRoomId}`,
    method: "GET"
  });
};
const getUnreadCount = (chatRoomIds) => {
  return utils_request.request({
    url: "/ws/unread",
    method: "GET",
    params: { chatRoomIds }
  });
};
const markMessagesAsRead = (chatRoomId) => {
  return utils_request.request({
    url: `/ws/markRead/${chatRoomId}`,
    method: "PUT"
  });
};
const uploadFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const token = common_vendor.index.getStorageSync("token");
    console.log("上传图片使用的token:", token);
    common_vendor.index.uploadFile({
      url: "http://117.72.54.182:8898/users/upload",
      filePath,
      name: "file",
      header: {
        "Authorization": token
      },
      formData: {},
      success: (res) => {
        console.log("上传响应状态码:", res.statusCode);
        console.log("上传响应数据:", res.data);
        try {
          if (res.statusCode !== 200) {
            reject(new Error(`上传失败，状态码: ${res.statusCode}`));
            return;
          }
          if (!res.data) {
            reject(new Error("服务器返回数据为空"));
            return;
          }
          const data = JSON.parse(res.data);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      },
      fail: (error) => {
        console.error("上传请求失败:", error);
        reject(error);
      }
    });
  });
};
exports.getChatMessages = getChatMessages;
exports.getUnreadCount = getUnreadCount;
exports.markMessagesAsRead = markMessagesAsRead;
exports.uploadFile = uploadFile;
