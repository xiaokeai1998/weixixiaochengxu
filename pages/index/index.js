Page({
  data: {
    // 轮播图数据源
    SwiperList: [],
  },
  // 页面开始的时候加载
  onLoad () {
    this.getSwiperList()

  },
  // 轮播图页面数据接口
  getSwiperList(e){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
          console.log(result)
        this.setData({
          SwiperList: result.data.message
        })
      },
      
    })
   
  }
})