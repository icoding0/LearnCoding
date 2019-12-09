// components/bb/bb.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type:Array,
      value:['f','u','c','k']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cindex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemclick(event){
      const index= event.currentTarget.dataset.index
      this.setData({
        cindex:index
      })
      this.triggerEvent('fashe',{'a':'b'})
    }
  }
})
