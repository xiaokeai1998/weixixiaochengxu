import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data:{
    // 给标题定义一个数据
    tabs:[
      {id: 0, title:"综合" ,isActive:true},
      {id: 1, title:"销量",isActive:false},
      {id: 2, title:"价格",isActive:false}

    ],
    // 页面要渲染的商品动态数据
    gooodsLIst:[]
  },

    // 接口用的参数
    QueryParams:{
      query:"",//关键字
      cid:"",//分类id
      pagenum: 1,//页码
      pagesize: 10,//页容量
    },
    // 全局的总页数
    TotalPages: 1,
  // 当前页面的加载
  onLoad(options){
    // 形参可以获取到url上面的参数
    this.QueryParams.cid = options.cid
    this.getGoods_list()
  },

  // 获取列表数据的方法
   async getGoods_list(){
    const result = await request({url:"/goods/search",data:this.QueryParams})
      // 计算总页数
      this.TotalPages = Math.ceil(result.total / this.QueryParams.pagesize)
      // console.log(this.TotalPages)
      this.setData({
        // 要拼接数据
        gooodsLIst:[...this.data.gooodsLIst,...result.goods]
      })
       // 关闭页面刷新的下拉效果
       wx.stopPullDownRefresh()
  },
    // 子组件触发
    handleItemChang(e){
      // console.log(e)
      // 获取传递过来的索引
      const {index} = e.detail;
      // 获取tabs数组
      const {tabs} = this.data;
      // 循环修改tabs数组
      tabs.forEach((v,i) =>i === index?v.isActive=true:v.isActive=false);
      this.setData({tabs});
  },
// 页面触底事件的触发
onReachBottom(){
  // console.log("已经到底了，别拉了")
  if(this.QueryParams.pagenum >= this.TotalPages){
    //  console.log("没有数据")
    // 提示框    Toast会自动的弹出显示框
    wx.showToast({
      title: '已经没有下一页数据了',
      icon:'none'
    });
      
  }else{
    // 还存在下一页数据，要获取出来
    this.QueryParams.pagenum ++ ;
    this.getGoods_list();
  }
},

// 出发下拉的时候触发的
onPullDownRefresh(){
  this.QueryParams.pagenum = 1;
  this.setData({
    // 重置数组
    gooodsLIst:[]
  })
  // 重新发送请求
  this.getGoods_list()
}

})