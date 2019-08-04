import { getSetting, openSetting, chooseAddress } from "../../utils/asyncWx";
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
      address:{}
  },
  // 获取收获地址的点击事件
  async handCholeAddress(){

          // console.log(result)
          const result1 = await getSetting();
          // 获取用户收获地址的权限
          const scopeAddress = result1.authSetting["scope.address"]
          // 直接对用户权限进行判断
      if(scopeAddress === true || scopeAddress === undefined){
            console.log(result1)
      }else{
        // 先打开授权页面
        await openSetting();
        const result2 = await chooseAddress();
        // console.log(result2)
      }
      // 在去获取收获地址信息
       const res2=await chooseAddress();
    
    // 1.3 存入到本地存储中
    // 自己新增 很详细的地址信息
    res2.all=res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo;
    wx.setStorageSync("address", res2);
      
          
  },
  onShow(){
    this.setData({address:wx.getStorageSync("address")||{}});

  }
 
})