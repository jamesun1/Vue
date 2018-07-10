import {
  login, logout, getInfo, insEnter, tableSelectAll, tableInsert, treeSelectAll, selectInfoByParentid, insertTreeInfo, deleteTreeInfo
  , classificationSelectAll, classificationSelectById, classificationInsert, insertDictionary, selectByCode
} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { debug } from 'util';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    treeList: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_TREELIST: (state, roles) => {
      state.treeList = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const user = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(user, userInfo.password).then(response => {
          const data = response.message
          setToken(data)
          commit('SET_TOKEN', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.role) { // 验证返回的roles是否是一个非空数组
            let dataFlag = [];
            if (data.role === '0') {
              dataFlag[0] = 'admin'
            } else if (data.role === '1') {
              dataFlag[0] = 'editor'
            }
            commit('SET_ROLES', dataFlag)
            resolve(dataFlag)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.user)
          commit('SET_AVATAR', data.avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    InsEnter({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        insEnter(data).then((response) => {
          if (response.code === 0) {
            resolve()
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    TableSelectAll({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        tableSelectAll(data).then((response) => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    TableInsert({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        tableInsert(data).then((response) => {
          if (response.code === 0) {
            resolve()
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    TreeSelectAll({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        treeSelectAll(data).then((response) => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    SelectInfoByParentid({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        selectInfoByParentid(data).then((response) => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    InsertTreeInfo({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        insertTreeInfo(data).then((response) => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteTreeInfo({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        deleteTreeInfo(data).then((response) => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    ClassificationSelectAll({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        classificationSelectAll(data).then((response) => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    ClassificationSelectById({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        classificationSelectById(data).then((response) => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    ClassificationInsert({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        classificationInsert(data).then((response) => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    InsertDictionary({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        insertDictionary(data).then((response) => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    SelectByCode({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        selectByCode(data).then((response) => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default user
