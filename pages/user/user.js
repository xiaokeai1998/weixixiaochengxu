import regeneratorRuntime from '../../lib/runtime/runtime';
// import { request } from "../../request/index.js";
import { getStorageToken, getStorageUserInfo } from "../../utils/storage.js";


Page({
  data: {
    userinfo: {}
  },
  onShow(){
   // 1，获取缓存中的用户信息
   const userinfo = getStorageUserInfo(); 
    // 2,判断是否有用户信息
    if(!userinfo){
        // 如果没有用户信息，就跳转到登录页面
        wx.navigateTo({
          url: '/pages/login/login',
        });
          return;
    }
    this.setData({
      userinfo
    })
 }
});
  