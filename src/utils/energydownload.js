import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.DEV_API, // api的base_url
  // timeout: 10000, // request timeout
  responseType: 'blob',
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (getToken()) {
    config.headers['x-auth-token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data)
      var blob = new Blob([response.data], { type: 'image/jpeg;charset=utf-8' }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
      var downloadElement = document.createElement('a');
      var href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      var da = new Date();
      var year = da.getFullYear() + '年';
      var month = da.getMonth() + 1 + '月';
      var date = da.getDate() + '日';
      console.log('能源信息表_' + [year, month, date].join('-') + '.xls')
      var simpledate = "测试图片" + '.jpeg';

      downloadElement.download = simpledate; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
      return response.data
    } else {
      Message({
        message: '请求错误' + response.status,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(response)
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
