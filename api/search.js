import {request} from "@/utils/request.js";

//模糊查询
export const searchContest = (name)=>{
    return request({
        url:"/matchInfos",
        method:"GET",
        data: {
          name: name
        }
    })
}
