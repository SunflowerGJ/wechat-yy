import fly from './request'
// 1登录
export const login = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/member/login`,
    params: params
  })
}

// 2首页接口
export const postIndex = (params = {}) => {
  return fly({
    method: 'get',
    url: `/api/page/index`,
    params: params
  })
}

// 3楼盘列表接口
export const postHousesList = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/houses/index`,
    params: params
  })
}
// 4城市列表接口
export const postCities = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/city/index`,
    params: params
  })
}
// 5城市搜索接口
export const postCitySearch = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/city/search`,
    params: params
  })
}
// 6获取资讯列表
export const postArticleList = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/article/searchArticleList`,
    params
  })
}
// 7楼盘详情接口
export const postHousesDetail = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/houses/detail`,
    params: params
  })
}
// 8楼盘户型列表接口
export const postHouseType = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/housetype/index`,
    params: params
  })
}
// 9楼盘户型详情接口
export const postHouseTypeDetail = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/housetype/detail`,
    params: params
  })
}

// 10单向房贷计算
export const mortgageShow = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/Apis/mortgageShow`,
    params: params
  })
}

// 11双向房贷计算
export const mortgageShowTwo = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/Apis/mortgageShowTwo`,
    params: params
  })
}
// 12楼盘/户型收藏接口
export const postAddCollection = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/member/addCollection`,
    params: params
  })
}
// 13取消用户收藏接口
export const postRemoveCollection = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/member/removeCollection`,
    params: params
  })
}
// 14.获取资讯详情
export const postArticleDetail = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/article/searchArticleDetail`,
    params: params
  })
}
// 15查询用户收藏接口
export const postSearchCollection = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/member/searchCollection`,
    params: params
  })
}
// 获取楼盘访问记录
export const postShowHousesAccess = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/houses/showHousesAccess`,
    params: params
  })
}
// 获取用户过去10天访问楼盘记录
export const postShowMemberAccess = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/member/showMemberAccess`,
    params: params
  })
}

// 微信授权更新用户手机号接口
export const postMobileSave = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/member/mobileSave`,
    params: params
  })
}
// 17楼盘相册接口
export const postAlbums = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/houses/albums`,
    params: params
  }, false)
}
// 生成小程序图片
export const postEWM = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/member/createUnlimited`,
    params: params
  })
}
// 微信授权更新用户信息接口
export const postUserInfoSave = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/member/userInfoSave`,
    params: params
  }, false)
}

// 城市统计
export const POINTCity = (params = {}) => {
  return fly({
    method: 'get',
    url: `/api/Statis/cityClick`,
    params: params
  })
}
// 广告统计
export const POINTAd = (params = {}) => {
  return fly({
    method: 'get',
    url: `/api/Statis/adClick`,
    params: params
  })
}
export const POINTAlbums = (params = {}) => {
  return fly({
    method: 'get',
    url: `/api/Statis/albumsClick`,
    params: params
  })
}
// 项目访问

export const POINTHouseClick = (params = {}) => {
  return fly({
    method: 'get',
    url: `/api/Statis/houseClick`,
    params: params
  })
}
// 户型统计
export const POINTHouseType = (params = {}) => {
  return fly({
    method: 'get',
    url: `/api/Statis/housetypeClick`,
    params: params
  })
}

// 咨询统计
export const POINTArticleClick = (params = {}) => {
  return fly({
    method: 'get',
    url: `/api/Statis/articleClick`,
    params: params
  })
}

// 优惠券列表
export const postCouponsList = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/Coupons/getCouponsList`,
    params: params
  })
}
// 领取优惠券

export const postGetCoupons = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/Coupons/memberGetCoupons`,
    params: params
  }, false)
}
// 5. 会员已领取优惠券详情接口
export const postMemberCouponsDetail = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/Coupons/getMemberCouponsDetail`,
    params: params
  })
}
// 获取会员已领取优惠券列表
export const postMemberCouponsList = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/Coupons/getMemberCouponsList`,
    params: params
  }, false)
}
// 7.优惠券点击次数接口
export const POINTBtnClickNum = (params = {}) => {
  return fly({
    method: 'get',
    url: `/api/Coupons/btnClickNum`,
    params: params
  }, false)
}

// 7.预约看房接口
export const sendSeeInfo = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/MemberSee/sendSeeinfo`,
    params: params
  }, false)
}
// 获取首页主页弹窗
export const getCityAlertAd = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/houses/getCityAlertAd`,
    params: params
  }, false)
}
// 获取资讯分享海报参数接口

export const getArticleShareData = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/Article/getArticleShareData`,
    params: params
  }, false)
}

// 初始化云信
export const initInim = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/Yunxin/init`,
    params: params
  }, false)
}
// 楼盘客服列表

export const getContactList = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/Yuanhui/GetCustomerServiceUserList`,
    params: params
  }, false)
}
// 聊天信息传递
export const getCustomerCall = (params = {}) => {
  return fly({
    method: 'post',
    url: `/api/Yuanhui/CustomerCall`,
    params: params
  }, false)
}
