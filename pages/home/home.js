// pages/home/home.js
import request from '../../service/network.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  get_data_origin(){

    // request({
    //   url: 'http://192.168.1.200/admin.php/Account/index.html',
    //   method: 'post',
    //   data: { token: 'c5ddd12e8052d4c698f317051e1ac50f' }
    // })
    // .then(res=>{
    //   console.log(res)
    // })
    // .catch(res=>{

    // })
    // 发送网络请求
    // wx.request({
    //   url: 'http://123.207.32.32:3000/login',
    //   method: 'post',
    //   data: { token: 'c5ddd12e8052d4c698f317051e1ac50f' },
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (err) {

    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_data_origin()
  
    
  },
  onShareAppMessage:function(optons){
    return {
      title:'安抚费',
      path:"/pages/about/page",
      imageUrl:'http://images.ourjb.com/uploads/sign/5bd2723089f6f.jpeg'
    }
  }
})