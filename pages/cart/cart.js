import { getSetting, openSetting, chooseAddress } from "../../utils/asyncWx";
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
      address:{},
      cart:{},
      // 全选状态
      isAllChecked: false,
      // 总价格
      totalPrice: 0,
      // 总数量
      totalNum: 0

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
    const address = wx.getStorageSync("address")||{};
    const cart  = wx.getStorageSync("cart")||{};
    this.setData({address,cart});
    this.setCart({cart})

  },

  // 根据cart对象来计算总的数量
  // 还要把总价格设置到总数据里面去
  setCart(cart){
    // 1,把对象转换为数组，因为数组里面有很多的方法： 比如：[].forEarch ，[].filter
        // 把它对象的值提取出来，转化成数组
        const cartArr = Object.values(cart); 
        console.log(cartArr)
    // 2,计算全选
    // every : 会接收回调函数， 数组在循环的时候 这个回调的函数是true
    // 那么every的返回值要么是true，要么是false
    let isAllChecked =cartArr.every(v => v.checked)
    // 3，计算商品的价格
    let totalPrice = 0;
    cartArr.forEach(v =>{
      if(v.checked){
        totalPrice += v.num * v.goods_price
      }
    })
    this.setData({ isAllChecked ,totalPrice})
  }
 
})