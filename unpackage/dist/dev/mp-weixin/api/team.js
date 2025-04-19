"use strict";
const utils_request = require("../utils/request.js");
function createTeamAPI(data) {
  const formattedData = {
    name: String(data.name || ""),
    icon: String(data.icon || ""),
    slogan: String(data.slogan || ""),
    introduction: String(data.introduction || ""),
    numbers: Number(data.numbers || 0),
    endTime: String(data.endTime || ""),
    matchLocation: String(data.matchLocation || ""),
    matchId: Number(data.matchId || 0)
  };
  console.log(formattedData, "api");
  return utils_request.request({
    url: "/teams",
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    data
  });
}
function getCreateTeamAPI() {
  return utils_request.request({
    url: "/teams/create/list",
    method: "GET"
  });
}
function getJoinTeamAPI() {
  return utils_request.request({
    url: "/teams/join/list",
    method: "GET"
  });
}
function getDetailTeamAPI(id) {
  return utils_request.request({
    url: `/teams/${id}`
  });
}
function deleteTeamAPI(id) {
  return utils_request.request({
    url: `/teams/${id}`,
    method: "DELETE"
  });
}
exports.createTeamAPI = createTeamAPI;
exports.deleteTeamAPI = deleteTeamAPI;
exports.getCreateTeamAPI = getCreateTeamAPI;
exports.getDetailTeamAPI = getDetailTeamAPI;
exports.getJoinTeamAPI = getJoinTeamAPI;
