// pages/detail/detail.js
import { getDetail, GoodsBaseInfo, ShopInfo, ParamInfo, getRecommends} from "../../servie/detail.js"
const app = getApp()
Page({
  data: {
    iid:'',
    topImages:[],
    baseInfo:{},
    shopInfo:{},
    detailInfo:{},
    paramInfo:{},
    recommends:{}
  },
  onLoad(options){
    this.setData({
      iid:options.iid
    })

    this._getDetailData()
    // 3.请求推荐的数据
    this._getRecommends()
  },
  _getDetailData(){
    console.log(this.data.iid)
    getDetail(this.data.iid).then(res =>{
      const data = res.data.result
      // 1.取出顶部的图片
      const topImages = data.itemInfo.topImages
      // 2.创建BaseInfo对象 
      const baseInfo = new GoodsBaseInfo( data.itemInfo , data.columns , data.shopInfo.services)
      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo)
      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo
      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }
      this.setData({
        topImages: topImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        paramInfo: paramInfo,
        commentInfo: commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      this.setData({
        recommends: res.data.data.list
      })
    })
  },
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;
    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})