import {request} from '@/utils/request.js'

// 微信登录，code作为query参数
export const login = (code) => {
    return request({
        url: `/users/login?code=${code}`,  // 将code作为query参数
        method: 'POST'
        // 移除data，因为code需要作为query参数
    })
}

// 获取用户信息
export const getUserInfo = () => {
    return request({
        url: '/users/info',
        method: 'GET'
    })
}



