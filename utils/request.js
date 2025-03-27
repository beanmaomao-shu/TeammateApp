// 设置基础URL
const baseURL = 'http://117.72.54.182:8898'

// 封装请求方法
export const request = (options) => {
    return new Promise((resolve, reject) => {
        // 获取存储的token
        const token = uni.getStorageSync('token');
        
        // 处理请求数据
        let requestData = options.data;
        if (options.method === 'POST' && options.data) {
            requestData = {
                ...options.data
            };
        }

        uni.request({
            ...options,
            url: baseURL + options.url,
            data: requestData,
            // 添加请求头，携带token
            header: {
                'Content-Type': 'application/json',
                ...options.header,
                // 如果有token则添加到请求头
                ...(token ? { 'Authorization': token } : {})
            },
            success: (res) => {
                console.log('请求响应：', res);  // 添加调试日志
                // 请求成功
                if (res.statusCode === 200) {
                    resolve(res.data)
                } else if (res.statusCode === 401) {
                    // token失效，需要重新登录
                    uni.removeStorageSync('token');
                    uni.showToast({
                        title: '请重新登录',
                        icon: 'none'
                    });
                    reject(res)
                } else {
                    // 处理其他状态码
                    uni.showToast({
                        title: `请求失败: ${res.statusCode}`,
                        icon: 'none'
                    });
                    console.error('请求失败详情：', res);  // 添加错误详情日志
                    reject(res)
                }
            },
            fail: (err) => {
                // 请求失败
                console.error('网络错误详情：', err);  // 添加错误详情日志
                uni.showToast({
                    title: '网络错误',
                    icon: 'none'
                });
                reject(err)
            }
        })
    })
}


