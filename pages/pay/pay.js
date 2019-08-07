import { requestPayment, showToast } from "../../utils/asyncWx";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/request.js";
Page({
  data: {
      address:{},
      cart:{},
      // 总价格
      totalPrice: 0,
      // 总数量
      totalNum: 0,
  },
  onShow() {
    const address = wx.getStorageSync("address") || {};
    const cart = wx.getStorageSync("cart") || {};

    let cartArr = Object.values(cart);
    let totalPrice = 0;
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        // 选中了
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    })
    this.setData({ cart, totalPrice, totalNum, address });
  },
  // 点击支付
  async handOrderPay(){
    try {
      const cart = this.data.cart;
      // console.log(222)
      // 1，获取token
      const token = wx.getStorageSync("token")
      // 2,判断有没有值
      if(!token){
        // 跳转页面到授权
        wx.navigateTo({
          url: '/pages/auth/auth',
        });
      
      }else{
        // console.log("继续往下执行")
        // 准备订单参数，获取订单号
        // 3.1请求头
        const header ={Authorization: token}
        // 获取请求头里面要获取到的参数
        // 订单总价
        const order_price = this.data.totalPrice;
        // 收货地址
        const consignee_addr = this.data.address.all;
        // 订单数组
        const goods = [];
        for (const key in cart) {
          if (cart.hasOwnProperty(key)) {
            if (cart[key].checked) {
              goods.push({
                goods_id: cart[key].goods_id,
                goods_number: cart[key].num,
                goods_price: cart[key].goods_price
              });
            }
  
          }
        }
        // 把订单要的参数都封装成一个对象
        const orderParams = {order_price,consignee_addr,goods}
        // 发送post请求获取订单数据
        const {order_number} = await request({url:"/my/orders/create",data:orderParams , method:"post" , header:header})
        // console.log(res)
        // 4,获取支付参数
        const {pay} = await request({url:"/my/orders/req_unifiedorder",data:{order_number} , method:"post" , header:header})
        // console.log(res1)
        // 5,调起微信支付
      const res = await requestPayment(pay);
        console.log(res)
        // 6，成功
        showToast({title:"支付成功"})
  
        // 7，查询订单是否支付成功
        const res2= await request({url:"/my/orders/chkOrder",data:{order_number} , method:"post" , header:header})
        console.log(res2)
        // 9.跳转订单页面
        wx.navigateTo({
          url:"/pages/order/order"
        })
        
      }
    } catch (error) {
      // 8.支付失败
      // 发送异步请求到服务器检查错误
      showToast({title:"支付失败"})
    }
  }
})