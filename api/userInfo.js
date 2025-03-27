import {request} from "@/utils/request.js";
//编辑名片
export const editUserInfoAPI = (data)=>{
    return request({
        url:"/users/card",
        method:"PUT",
        data:data
    })
}

//获取名片
export const getUserInfoAPI = ()=>{
    return request({
        url:"/users/card",
        method:"GET",
    })
}

