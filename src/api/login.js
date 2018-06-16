import request from '@/utils/request'

export function login(user, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      user,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
