"use strict";
const utils_request = require("../utils/request.js");
const searchContest = (name) => {
  return utils_request.request({
    url: "/matchInfos",
    method: "GET",
    data: {
      name
    }
  });
};
exports.searchContest = searchContest;
