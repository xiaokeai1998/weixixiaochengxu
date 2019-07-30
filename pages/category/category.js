Page({
  data: {
    // 左边列表数据
    CategoryList:[],
  },
//  页面开始的是加载
onLoad () {
    // h获取页面接口的数据
    this.getCategoryList()
},
// 获取左边分类的数据
getCategoryList(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/categories',
      success: (result) => {
        // console.log(result)
        this.setData({
          CategoryList:result.data.message
        })
      },

    });
      
}
})