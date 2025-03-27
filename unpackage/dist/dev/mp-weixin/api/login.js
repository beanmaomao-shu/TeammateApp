"use strict";const r=require("../utils/request.js"),s=e=>r.request({url:`/users/login?code=${e}`,method:"POST"});exports.login=s;
