import axios from 'axios'

import { getToken } from 'helpers/auth'

function authHeader() {
  axios.interceptors.request.use(function (config) {
    const token = getToken()
    if (token) {
      config.headers.Token = `${token}`
      config.headers.PartnerId = 2
      // config.headers.Accept = 'application/json'
      // config.headers['Content-Type'] = 'application/json-patch+json'
    }

    return config
  })
}

export default authHeader
