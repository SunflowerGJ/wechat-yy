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
    url: `/api/houses/detail `,
    params: params
  })
}
