"use strict";
const utils_request = require("../utils/request.js");
function getContest() {
  return utils_request.request({
    url: "/matchInfos/list",
    method: "get"
  });
}
exports.getContest = getContest;
