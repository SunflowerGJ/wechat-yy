var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API: '"http://yuanyang.thongfu.com/index.php?s="',
  // ROOT_API: '"https://api.sinooceangroup.com.cn/index.php?s="'
  // YX_APP_KEY:'"146b62b8b039383f894b04e5aaec3701"',
  YX_APP_KEY:'"bd4ea621af735fd6924c38d44ae76eb0"' // kai fa
  
})
