import { login} from "../../utils/asyncWx";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/request.js";
Page({
  data: {

  },
  // 获取用户信息
  async handelGetUserInfo(e){
    // console.log(e)
    // 1，获取参数  encryptedData rawData iv signature 
    const {encryptedData, rawData ,iv, signature} = e.detail;
    // 2,获取登录后code属性
    const {code } = await login();
    // 2.5,把要提交的参数分装为对象
    const postParams = { encryptedData, rawData ,iv, signature, code }
    // console.log(code)
    // 3,发送请求获取token
    const {token} = await request({url:"/users/wxlogin" , method:"post" , data: postParams})
    console.log(token)
    // 4,把缓存本地
   wx.setStorageSync("token", token);
  //  跳转返回上一页
  wx.navigateBack({
    delta: 1
  });
    
  }
})