import axios from 'axios'
import { Toast } from 'mint-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 0 // request timeout
  // withCredentials: true,
  // crossDomain: true
})

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Toast({
        message: res.message || 'Error',
        position: 'center',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Toast({
      message: error.message,
      position: 'center',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
