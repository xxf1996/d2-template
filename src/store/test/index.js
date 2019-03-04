const files = require.context('./', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  let name = key.replace(/(\.\/|\.js)/g, '')
  if (name !== 'index') modules[name] = files(key).default // 对子模块进行收集
})

export default {
  namespaced: true,
  modules
}
