import { request } from "../../request/request.js"
Page({
  data: {
    // 左边列表数据
    CategoryLeftList:[],
    // 右侧列表数据
    CategoryRightList:[],
    // 表示菜单的索引
    currentIndex: 0,
    // 滚动条
    scrollTap: 0
  },
//  页面开始的是加载
onLoad () {
    // h获取页面接口的数据
    this.getCategoryList()
},
// 获取接口返回的数据，数组形式
Cates:[],
// 获取左边分类的数据
getCategoryList(){
    request({url:"/categories"})
    .then(result =>{
      this.Cates = result;
      
      // 左侧菜单要的数据
    const CategoryLeftList = this.Cates.map(v => ({cat_id:v.cat_id,cat_name:v.cat_name}));
    const CategoryRightList = this.Cates[0].children
    // console.log(result)
      this.setData({
        CategoryLeftList,
        CategoryRightList
      })
    })
},

// 给左侧添加绑定事件
handelMessChang(e){
  console.log(e)
  // 获取索引
  const { index } = e.currentTarget.dataset;
  const CategoryRightList = this.Cates[index].children
  this.setData({
    currentIndex:index,
    CategoryRightList
  
  })
}
})