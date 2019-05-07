/**
 * demo模块示例，可查看`pages/demo/page1`
 */

export default {
  namespaced: true,
  state: {
    info: '示例数据',
    user: {
      age: 22,
      sex: 'male'
    }
  },
  getters: {
    userAge (state) {
      return state.user.age
    }
  }
}
