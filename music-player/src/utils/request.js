import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

// manageClass an axios instance
const service = axios.create({
  // baseURL: 'http://47.100.88.121:8001/', // url = base url + request url
  baseURL: 'http://localhost:8001/', // url = base url + request url

  // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000, // request timeout
  crossDomain: true
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    console.log('Request sent')
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for d debug
    return Promise.reject(error)
  }
)

export default service
