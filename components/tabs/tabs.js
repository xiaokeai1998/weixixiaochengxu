// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      tabs:{
        type: Array,
        value:[]
      }
  },

  /**
   * 组件的初始数据
   */


  /**
   * 组件的方法列表
   */
  methods: {
    handleTapChang(e){
      console.log(e)
      const {index}=e.currentTarget.dataset;
      // 触发父组件的自定义事件
      this.triggerEvent("itemChange",{index});
    },
  
  }
})
