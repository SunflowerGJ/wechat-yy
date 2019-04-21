import fly from './request'
// 登录
export const login = params => {
  return fly({
    method: 'post',
    url: `/api/member/login`,
    params: params
  })
}

// 首页接口
export const postIndex = params => {
  return fly({
    method: 'get',
    url: `/api/page/index`,
    params: params
  })
}

// 楼盘列表接口
export const postHousesList = params => {
  return fly({
    method: 'post',
    url: `/api/houses/index`,
    params: params
  })
}
// 城市列表接口
export const postCities = params => {
  return fly({
    method: 'post',
    url: `/api/city/index`,
    params: params
  })
}
// 城市搜索接口
export const postCitySearch = params => {
  return fly({
    method: 'post',
    url: `/api/city/search`,
    params: params
  })
}
// 获取资讯列表
export const postArticleList = params => {
  return fly({
    method: 'post',
    url: `/api/article/searchArticleList`,
    params
  })
}
// 楼盘详情接口
export const postHousesDetail = params => {
  return fly({
    method: 'post',
    url: `/api/houses/detail`,
    params: params
  })
}
// 楼盘户型列表接口
export const postHouseType = params => {
  return fly({
    method: 'post',
    url: `/api/housetype/index`,
    params: params
  })
}
// 楼盘户型详情接口
export const postHouseTypeDetail = params => {
  return fly({
    method: 'post',
    url: `/api/housetype/detail`,
    params: params
  })
}

// 单向房贷计算
export const mortgageShow = params => {
  return fly({
    method: 'post',
    url: `/api/Apis/mortgageShow`,
    params: params
  })
}

// 双向房贷计算
export const mortgageShowTwo = params => {
  return fly({
    method: 'post',
    url: `/api/Apis/mortgageShowTwo`,
    params: params
  })
}
// 楼盘/户型收藏接口
export const postAddCollection = params => {
  return fly({
    method: 'post',
    url: `/api/member/addCollection`,
    params: params
  })
}
// 取消用户收藏接口
export const postRemoveCollection = params => {
  return fly({
    method: 'post',
    url: `/api/member/removeCollection`,
    params: params
  })
}
