import { request } from "../utils/request";

// 获取聊天室消息列表
export const getChatMessages = (chatRoomId) => {
  return request({
    url: `/ws/${chatRoomId}`,
    method: 'GET'
  });
};

// 获取未读消息数量
export const getUnreadCount = (chatRoomIds) => {
  return request({
    url: '/ws/unread',
    method: 'GET',
    params: { chatRoomIds }
  });
};

// 标记消息为已读
export const markMessagesAsRead = (chatRoomId) => {
  return request({
    url: `/ws/markRead/${chatRoomId}`,
    method: 'PUT'
  });
};

// 上传文件接口
export const uploadFile = (filePath) => {
  return new Promise((resolve, reject) => {
    // 获取存储的token
    const token = uni.getStorageSync('token');
    console.log('上传图片使用的token:', token);
    
    uni.uploadFile({
      url: 'http://117.72.54.182:8898/users/upload', 
      filePath: filePath,
      name: 'file',
      header: {
        'Authorization': token
      },
      formData: {}, 
      success: (res) => {
        console.log('上传响应状态码:', res.statusCode);
        console.log('上传响应数据:', res.data);
        
        try {
          // 检查响应状态码
          if (res.statusCode !== 200) {
            reject(new Error(`上传失败，状态码: ${res.statusCode}`));
            return;
          }
          
          // 检查响应数据是否为空
          if (!res.data) {
            reject(new Error('服务器返回数据为空'));
            return;
          }
          
          // 尝试解析响应数据
          const data = JSON.parse(res.data);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      },
      fail: (error) => {
        console.error('上传请求失败:', error);
        reject(error);
      }
    });
  });
};
