import { request } from "../../request/request.js"
Page({
  data: {
    // 左边列表数据
    CategoryLeftList:[],
    // 右侧列表数据
    CategoryRightList:[]
  },
//  页面开始的是加载
onLoad () {
    // h获取页面接口的数据
    this.getCategoryList()
},
// 获取左边分类的数据
getCategoryList(){
    request({url:"/categories"})
    .then(result =>{
      
      // 左侧菜单要的数据
    const CategoryLeftList = result.map(v => ({cat_id:v.cat_id,cat_name:v.cat_name}));
    const CategoryRightList = result[0].children
    console.log(result)
      this.setData({
        CategoryLeftList,
        CategoryRightList
      })
    })
}
})