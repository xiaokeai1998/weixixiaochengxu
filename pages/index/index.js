Page({
  data: {
    // 轮播图数据源
    SwiperList: [],
    // 分类导航数组
    NavrCategory:[]
  },
  // 页面开始的时候加载
  onLoad () {
    this.getSwiperList(),
    this.getNavrCategory()
  },
  // 轮播图页面数据接口
  getSwiperList(e){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
          // console.log(result)
        this.setData({
          SwiperList: result.data.message
        })
      },
      
    })
   
  },

  // 获取导航数据
  getNavrCategory(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: (result) => {
          console.log(result)
          this.setData({
            NavrCategory: result.data.message
          })
      },

    })
  }

})