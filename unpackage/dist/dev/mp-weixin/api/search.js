"use strict";const e=require("../utils/request.js"),s=t=>e.request({url:"/matchInfos",method:"GET",data:{name:t}});exports.searchContest=s;
