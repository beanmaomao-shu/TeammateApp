import {request} from "@/utils/request.js"

export function createTeamAPI(data){
	// 确保数据格式完全符合API要求
	const formattedData = {
		name: String(data.name || ""),          
		icon: String(data.icon || ""),          
		slogan: String(data.slogan || ""),      
		introduction: String(data.introduction || ""), // 注意这里改回introduction
		numbers: Number(data.numbers || 0),      
		endTime: String(data.endTime || ""),     
		matchLocation: String(data.matchLocation || ""), 
		matchId: Number(data.matchId || 0)       
	};
	console.log(formattedData,'api')

	return request({
		url:"/teams",
		method:"POST",
		header: {
			'Content-Type': 'application/json'
		},
		data: data  // 使用data而不是body，因为uni.request使用data字段
	})
}

export function exitTeamAPI(data){
	return request({
		url:"reqlnfos/{id}",
		method:"DELETE",
		data:{
			id:data.id||"",
		}
	})
}


