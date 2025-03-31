import {request} from "@/utils/request.js"

export function createTeamAPI(data){

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
	console.log(formattedData,'api')

	return request({
		url:"/teams",
		method:"POST",
		header: {
			'Content-Type': 'application/json'
		},
		data: data  
	})
}

//获取创建队伍
export function getCreateTeamAPI(){
     return request({
		url:"/teams/create/list",
		method:"GET",
		 })
}

//获取加入的团队
export function getJoinTeamAPI(){
     return request({
		  url:"/teams/join/list",
		  method:"GET",
		 })
}

//根据Id获取队伍信息
export function getDetailTeamAPI(id){
	return request({
		url:`/teams/${id}`
	})
}
//队长解散队伍
export function deleteTeamAPI(id){
	return request({
		url:`/teams/${id}`,
		method:"DELETE",
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



