"use strict";
const utils_request = require("../utils/request.js");
const editUserInfoAPI = (data) => {
  return utils_request.request({
    url: "/users/card",
    method: "PUT",
    data
  });
};
const getUserInfoAPI = () => {
  return utils_request.request({
    url: "/users/card",
    method: "GET"
  });
};
exports.editUserInfoAPI = editUserInfoAPI;
exports.getUserInfoAPI = getUserInfoAPI;
