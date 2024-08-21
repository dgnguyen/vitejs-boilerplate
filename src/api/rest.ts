import axios from 'axios'
import { getToken } from 'helpers/auth'

export const HTTP_REQUEST = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
}

export function handleRestAPI({
  method = HTTP_REQUEST.GET,
  url = '',
  body = {},
}) {
  if (method === HTTP_REQUEST.GET) {
    return axios.get(url, {
      headers: {
        PartnerId: 2,
        Token: getToken(),
      },
    })
  } else if (method === HTTP_REQUEST.POST) {
    return axios.post(url, {
      headers: {
        PartnerId: 2,
        Token: getToken(),
      },
      body: JSON.stringify(body),
    })
  }
}
