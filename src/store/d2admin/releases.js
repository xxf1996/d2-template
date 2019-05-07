import util from '@/libs/util.js'
import packageInfo from '../../../package.json'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state vuex state
     */
    versionShow () {
      util.log.capsule(packageInfo.name, `v${packageInfo.version}`)
      console.log('模板基于d2admin项目')
      util.log.capsule('Github', 'https://github.com/d2-projects/d2-admin')
      util.log.capsule('文档地址', 'https://doc.d2admin.fairyever.com/zh/')
    }
  }
}
