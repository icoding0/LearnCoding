import request from "./network.js"
export function getMultiData(){
  return request({
    url: '/home/multidata',
    method: 'get'
  })
}
export function getGoodsData(type,page) {
  return request({
    url: '/home/data',
    data:{
      type,
      page
    }
  })
}