// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCurrent:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabItemActive(e){
      const index = e.currentTarget.dataset.index
      this.setData({
        isCurrent:index
      })
      const data = {index:this.data.isCurrent}
      this.triggerEvent('tabClick',data,{})
    }
  }
})
