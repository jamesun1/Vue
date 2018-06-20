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

export function insEnter(data) {
  return request({
    url: '/user/insgister',
    method: 'post',
    data: data
  })
}

export function tableSelectAll(data) {
  return request({
    url: '/table/selectAll',
    method: 'post',
    data: data
  })
}

export function tableInsert(data) {
  return request({
    url: '/table/insert',
    method: 'post',
    data: data
  })
}