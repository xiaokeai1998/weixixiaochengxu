// 同时发送ajax的作用
let ajaxTimes = 0;
export const request = (params) =>{
    // 公共接口前缀
    ajaxTimes++;
// 页面加载
    wx.showLoading({
        title: "加载"
    });
      
    const baseUrl ="https://api.zbztb.cn/api/public/v1";
    return new Promise((resolve,reject) =>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: (result) =>{
                resolve(result.data.message)
            },
            fail: (err) =>{
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if( ajaxTimes === 0){
                    wx.hideLoading();
                }
               
            }
        });
    })
}