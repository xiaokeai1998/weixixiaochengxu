// pages/login/login.js
import {setStorageUserInfo} from "../../utils/storage.js";
Page({

  // 获取登录授权
  handelGetUserInfo(e){
      console.log(e)
      setStorageUserInfo(e.detail.userInfo)
      wx.navigateBack({
        delta: 1
      });
        
        
  }
})