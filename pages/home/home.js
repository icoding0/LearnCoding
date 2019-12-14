// pages/home/home.js
import { getMultiData, getGoodsData} from "../../servie/home.js"
const types = ['pop','new','sell']
const top_distance=800
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods:{
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell':{page:0,list:[]}
    },
    currentType:'pop',
    showBackTop:false,
    isTabFixed:false,
    tapScrollTop:0
  },
  onLoad: function (options) {
    //获取轮播数据
    this._getMultiData()
    //获取商品列表
    this._getGoodsData('pop', 1)
    this._getGoodsData('new', 1)
    this._getGoodsData('sell',1)

  },
  // --------------------获取网络请求-----------------
  // 商品列表
  _getGoodsData(type,page){
      // 1 获取页码
      const pages = this.data.goods[type].page+1
      getGoodsData(type, pages).then(res => {
        // 2 取出数据
        const list =res.data.data.list
        // 3 将数据存入对应type的list
        const oldList=this.data.goods[type].list;
        oldList.push(...list)
        const typeKey = `goods.${type}.list`
        const pageKey=`goods.${type}.page`
        this.setData({
          [typeKey]: oldList,
          [pageKey]: pages
        })
      })
  },
  // 轮播图
  _getMultiData(){
      // 1 请求数据
    getMultiData().then(res => {
      // 2 取出数据
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },
  // --------------------监听事件-----------------
  handleTabClick(e) {
    // 取出index
    const index = e.detail.index
    // 修改currentType
    const type = types[index] 
    this.setData({
      currentType:type
    })
  },
  onReachBottom(){
    // 上拉加载更多
    this._getGoodsData(this.data.currentType, this.data.goods[this.data.currentType].page)
  },
  onPageScroll(options){
    const scrollTop = options.scrollTop
    const flag = scrollTop >= top_distance
    if(flag != this.data.showBackTop)
    this.setData({
      showBackTop: flag
    })

    // 修改isTabFixed
    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2 != this.data.isTabFixed){
      this.setData({
        isTabFixed:flag2
      })
    }
  },
  handleImageLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop =rect.top
    }).exec()
  }
})