import { getSetting, openSetting, chooseAddress , showModal ,showToast} from "../../utils/asyncWx";
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
      totalNum: 0,
      // 购物车空空如也
      // hasGoods: false
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
    this.setCart(cart)

  },

  // 根据cart对象来计算总的数量
  // 还要把总价格设置到总数据里面去
  setCart(cart){
    // 1,把对象转换为数组，因为数组里面有很多的方法： 比如：[].forEarch ，[].filter
        // 把它对象的值提取出来，转化成数组
        const cartArr = Object.values(cart); 
        // console.log(cartArr)
    // 2,计算全选
    // every : 会接收回调函数， 数组在循环的时候 这个回调的函数是true
    // 那么every的返回值要么是true，要么是false
    // let isAllChecked =cartArr.every(v => v.checked)
    let isAllChecked = true
    // 3，计算商品的价格
    let totalPrice = 0;
    let totalNum = 0;
    cartArr.forEach(v =>{
      if(v.checked){
        // 总价格的计算
        totalPrice += v.num * v.goods_price
        // 总数量的计算
        totalNum += v.num
      }
      else {
        isAllChecked = false
      }
     
    // 判断购物车里面有没有数据
    isAllChecked = cartArr.length === 0 ? false : isAllChecked;
     // 判断购物车里面有没有商品
    //  const hasGoods = cartArr.length ? true : false;
    })

    this.setData({cart, isAllChecked ,totalPrice ,totalNum })
   // 把新的cart设置到data中 ，保存到本地
      wx.setStorageSync('cart', cart)
  },
  // 获取单个商品切换的选中事件
  handelCartChecked(e){
      // console.log(e.currentTarget.dataset)
      // 1,获取要修改的id
      const {id} = e.currentTarget.dataset;
      // // 2，获取data中的购物车cart的对象
      const { cart } = this.data;
      // // 3,设置复选框中的反选
      cart[id].checked = !cart[id].checked;
        // 重新计算全选状态
      this.setCart(cart)
  },


//  获取购物车数量的改变
async handelCartClick(e){
  console.log(e)
  // 1,获取到要操作的商品id 和加 还是减
  const {id ,operation} = e.currentTarget.dataset;
  // 2,获取data中购物的cart
  const {cart} = this.data;
  // 3,判断当前的数据是正常操作还是删除操作
  if(cart[id].num === 1 && operation === -1){
    // 执行删除
      const res = await showModal({content:"您确认删除吗"});
      if (res.confirm) {
          delete cart[id]
          this.setCart(cart)
      } else if (res.cancel) {
        console.log('点击取消')
      }
  }else{
    // 4,直接修改购物车里面的数量
    cart[id].num += operation
    //5，把cart重新赋值到data里面重新计算赋值 然后缓存，同时也要让底部的工具栏重新计算
    wx.setStorageSync("cart", cart)
    this.setCart(cart)
  }
    

} ,
// 结算按钮页面的点击触发
async handelpay(){
  // console.log(1213)
  // 1,获取data中的地址信息
  const {address,totalNum} = this.data 
  // const cartArr = Object.values(cart)
  // 判断有没有收货地址
  if(!address.all){
    // 判断有没有收货地址
   const res = await showToast({title:"您没有选择收货地址"})
     
      }else if(  totalNum <=0){
        const res = await showToast({title:"您没有要结算的商品"})
  } else{
      // 满足要求，可以跳转
      wx.navigateTo({
        url: '/pages/pay/pay',
      });
        
  }

}

})