// pages/image/image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath:''
  },
  handleChooseAlbum (){
    const _this=this
    // 系统API，让用户在相册中选择图片
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        // 取出路径
        const path = res.tempFilePaths[0]
        // 设置路径
        _this.setData({
          imagePath:path
        })
      },
    })
  },
  handLoadImage(){
    console.log('加载完成')
  }
})