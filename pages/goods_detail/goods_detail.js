import { request } from "../../request/request.js"
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    // 数据的存储
    goodsInfo:{},
    // 全局商品的对象
    goodsObj:{}
  },
  onLoad(option){
      // console.log(option)
      this.getGoodDetail(option.goods_id)
  },
  // 获取商品详情页的数据
  async getGoodDetail(goods_id){
      const result = await request({url:"/goods/detail",data:{goods_id}})
    //  给全局的商品赋值
    this.goodsObj = result;
      // console.log(result)
      this.setData({
        goodsInfo:{
          goods_name: result.goods_name,
          goods_price: result.goods_price,
          pics: result.pics,
          goods_introduce: result.goods_introduce.replace(/\.webp/g,'.jpg')
        }
      })
  },
  // 给轮播图添加预览效果
  handlePreviewImage(e){
      // console.log("已经放大")
      const {index} = e.currentTarget.dataset;
      // 构造参数
      const urls = this.data.goodsInfo.pics.map(v =>v.pics_big);
      const current = urls[index]
      wx.previewImage({
        current,
        urls
      }); 
  },
  // 加入购物车
  handelCartAdd(){
    // console.log(222)
    // 1,获取本地存储的购物车对象
    let cart = wx.getStorageSync("cart") || {};
    // 2，判断商品是否已经购买
    if(cart[this.goodsObj.goods_id]){
      cart[this.goodsObj.goods_id].num++;
      // 已经都买过的
    }else{
      cart[this.goodsObj.goods_id] = this.goodsObj;
      cart[this.goodsObj.goods_id].num = 1;
      cart[this.goodsObj.goods_id].checked = true
    }
    // 存储到本地
    wx.setStorageSync("cart", cart);
      
    // 弹框提示
    wx.showToast({
      title: '加购成功',
      icon: 'success',
      mask: true
     
    });
      

  }
})

