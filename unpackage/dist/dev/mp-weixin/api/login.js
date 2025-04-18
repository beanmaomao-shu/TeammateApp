"use strict";
const utils_request = require("../utils/request.js");
const login = (code) => {
  return utils_request.request({
    url: `/users/login?code=${code}`,
    // 将code作为query参数
    method: "POST"
    // 移除data，因为code需要作为query参数
  });
};
exports.login = login;
