import {request} from"@/utils/request.js"

export function getContest(){
	return request({
		url:"/matchInfos/list",
		method:"get",
	})
}