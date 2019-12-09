// components/w-tab-control/w-tab-control.js
Component({
 
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },
  data: {
    currentIndex:0
  },
  methods: {
    handleItemClick(event){
      // 取index
      const index= event.currentTarget.dataset.index
      // 修改currentIndex
      this.setData({
        currentIndex:index
      })
      // 通知页面内部点击事件
      this.triggerEvent('itemclick',{index,title:this.properties.titles[index]})
    }
  }
})
