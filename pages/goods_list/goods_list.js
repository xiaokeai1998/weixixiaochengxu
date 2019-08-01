import { request } from "../../request/request.js"
Page({
  data:{
    // 给标题定义一个数据
    tabs:[
      {id: 0, title:"综合" ,isActive:true},
      {id: 1, title:"销量",isActive:false},
      {id: 2, title:"价格",isActive:false}

    ],
    // 页面要渲染的商品动态数据
    gooodsList:[]
  },

    // 接口用的参数
    QueryParams:{
      query:"",//关键字
      cid:"",//分类id
      pagenum: 1,//页码
      pagesize: 10,//页容量
    },
  // 当前页面的加载
  onLoad(option){
    // 形参可以获取到url上面的参数
    this.QueryParams.cid = option.cid
    this.getGoods_list()
  },

  // 获取列表数据的方法
  getGoods_list(){
    request({url:"/goods/search",data:this.QueryParams})
    .then(result =>{
      console.log(result)
      this.setData({
        gooodsLIst:result.goods
      })
    })

  }

})