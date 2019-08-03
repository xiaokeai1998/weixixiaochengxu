import { request } from "../../request/request.js"
import regeneratorRuntime from '../../lib/runtime/runtime'
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

  // 获取缓存的数据,用来判断是否有没有缓存
 const cates = wx.getStorageSync('cates');
  // console.log(cates)
  // 判断是否发送请求
    if(!cates){
      // 没有数据，发送请求  
      this.getCategoryList()
    }else{
      // 有换成数据
      // 判断数据是否过期 假设过期时间是10s
      if( Date.now() - cates.time >1000){
        // 过期了
        this.getCategoryList()
      }else{
        // 获取缓存的数据
        const catesData = cates.data;
        // 给全局数据进行赋值
        this.cates = catesData;
        const CategoryLeftList = this.Cates.map(v => ({ cat_id:  v.cat_id, cat_name: v.cat_name }));
        const CategoryRightList = this.Cates[0].children
        // console.log(result)
          this.setData({
            CategoryLeftList,
            CategoryRightList
          })

      }
    }
    // h获取页面接口的数据
   
      
},
// 获取接口返回的数据，数组形式
Cates:[],
// 获取左边分类的数据
async getCategoryList(){
   const result = await request({url:"/categories"})
      this.Cates = result;
       // 存储数据
       wx.setStorageSync("cates", {time: Date.now() , data:this.Cates});
         
      // 左侧菜单要的数据
    const CategoryLeftList = this.Cates.map(v => ({ cat_id:  v.cat_id, cat_name: v.cat_name }));
    const CategoryRightList = this.Cates[0].children
    // console.log(result)
      this.setData({
        CategoryLeftList,
        CategoryRightList
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