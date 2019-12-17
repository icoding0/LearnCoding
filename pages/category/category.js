// pages/category/category.js
import { getCategory, getSubcategory, getCategoryDetail} from '../../servie/category.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:[],
    categoryData: {},
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategory()
    // this._getSubcategory(0)
  },
  _getCategory(){
    getCategory().then(res =>{
      const categories = res.data.data.category.list
      const categoryData={}
      for( let i=0;i<categories.length;i++){
        categoryData[i]={
          subcategories: [],
          categoryDetail: []
        }
      }
      this.setData({
        categories:res.data.data.category.list,
        categoryData: categoryData
      })

      this._getSubcategory(0)
      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex){
    const maitKey = this.data.categories[currentIndex].maitKey
    getSubcategory(maitKey).then(res => {
      const tempCategoryData = this.data.categoryData;

      tempCategoryData[currentIndex].subcategories = res.data.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    // 1.获取对应的miniWallKey
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;
    // 2.请求数据类别的数据
    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop');
  },
  _getRealCategoryDetail(currentIndex, miniWallKey,type){
    getCategoryDetail(miniWallKey,type).then(res =>{
      // 1.获取categoryData
      const categoryData = this.data.categoryData;
      // 2.修改数据
      categoryData[currentIndex].categoryDetail = res.data;

      // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
      })
    })
  },
  menuClick(e){
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })
    this._getSubcategory(currentIndex);
    this._getCategoryDetail(currentIndex)
  }
})