/* 
1 onLoad 通过形参获取url上的参数
2 onShow 无法通过 形参获取url上的参数
 */


import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/request.js";
import { getStorageToken } from "../../utils/storage.js";

Page({
  data: {
    tabs: [
      { id: 0, title: "全部", isActive: true },
      { id: 1, title: "待付款", isActive: false },
      { id: 2, title: "待发货", isActive: false },
      { id: 3, title: "退款/退货", isActive: false }
    ],
    orderList: []
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
  // 根据索引器去修改标题

})