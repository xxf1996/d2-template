/**
 * d2admin预设功能相关的设置
 */
const files = require.context('./', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  let name = key.replace(/(\.\/|\.js)/g, '')
  if (name !== 'index') modules[name] = files(key).default
}) // 遍历获取js作为子模块

export default {
  namespaced: true,
  modules
}
