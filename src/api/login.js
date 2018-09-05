import request from '@/utils/request'
import download from '@/utils/energydownload'

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

export function treeSelectAll(data) {
  return request({
    url: '/tree/selectTreeInfo',
    method: 'get'
  })
}

export function selectInfoByParentid(data) {
  return request({
    url: '/tree/selectInfoByParentid',
    method: 'post',
    data: data
  })
}

export function insertTreeInfo(data) {
  return request({
    url: '/tree/insertTreeInfo',
    method: 'post',
    data: data
  })
}

export function deleteTreeInfo(data) {
  return request({
    url: '/tree/deleteTreeInfo',
    method: 'post',
    data: data
  })
}

export function classificationSelectAll(data) {
  return request({
    url: '/classification/selectAll',
    method: 'post'
  })
}

export function classificationSelectById(data) {
  return request({
    url: '/classification/selectById',
    method: 'post',
    data: data
  })
}

export function classificationInsert(data) {
  return request({
    url: '/classification/insert',
    method: 'post',
    data: data
  })
}

export function insertDictionary(data) {
  return request({
    url: '/classification/insertDictionary',
    method: 'post',
    data: data
  })
}

export function selectByCode(data) {
  return request({
    url: '/classification/selectByCode',
    method: 'post',
    data: data
  })
}

export function selectUserByTreeid(data) {
  return request({
    url: '/tree/selectUserByTreeid',
    method: 'post',
    params: {
      treeid: data
    }
  })
}

export function insertUserByTreeid(data) {
  return request({
    url: '/tree/insertUserByTreeid',
    method: 'post',
    data: data
  })
}

export function createImage(data) {
  return request({
    url: '/file/createImage',
    method: 'post'
  })
}

export function insertPermission(data) {
  return request({
    url: '/tree/insertPermission',
    method: 'post',
    data: data
  })
}

export function downloadTest(data) {
  return download({
    url: '/file/downloadTest',
    method: 'post'
  })
}