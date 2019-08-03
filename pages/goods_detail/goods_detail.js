import { request } from "../../request/request.js"
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    // 数据的存储
    goodsInfo:{}
  },
  onLoad(option){
      // console.log(option)
      this.getGoodDetail(option.goods_id)
  },
  // 获取商品详情页的数据
  async getGoodDetail(goods_id){
      const result = await request({url:"/goods/detail",data:{goods_id}})
      console.log(result)
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
  }
})

