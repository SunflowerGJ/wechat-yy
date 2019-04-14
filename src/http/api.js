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

// 城市搜索接口
export const postHousesList = params => {
  return fly({
    method: 'post',
    url: `/api/houses/index`,
    params: params
  })
}
