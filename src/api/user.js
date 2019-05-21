import request from '@/plugin/axios'

/**
 * 用户登录验证
 * @param {object} data 用户登录信息
 */
export function login (data) {
  return request({
    method: 'post',
    url: '/api/login',
    data
  })
}

/**
 * 退出当前登录
 */
export function logout () {
  return request({
    method: 'delete',
    url: '/api/logout'
  })
}
