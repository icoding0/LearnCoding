App({
  globalData:{
    token:'1'
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 判断登录
    const token =wx.getStorageSync('token')
    if(token && token.length!=0){
    // 验证token是否过期
    this.check_token(token)
    }else{
      this.login()
    }
    
  },
  check_token(token){
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      header:{token},
      method: 'post',
      success: (res) => {
        if(!res.data.errCode){
          this.globalData.token=token
        }else{
          this.login()
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  login(){
    // 登录操作
    wx.login({
      // code只有五分钟有效期
      success: (res) => {
        const code = res.code
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          data: { code: code },
          method: 'post',
          success: (res) => {
            this.globalData.token = res.data.token
            // wx.setStorage({
            //   key: '',
            //   data: '',
            // })
            wx.setStorageSync('token', res.data.token)
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  }
  
})
