import { API_BASE_URL } from 'constants/endpoint'

export const partnerFromUrl = (API_BASE_URL || '')
  .replace('https://powerball-', '')
  .replace('-dev', '')
  .replace('.axolotl18.com', '')

import axios from 'axios'

type Props = {
  url: string
  params: any
}

export async function handleExportRequest({ url, params }: Props) {
  try {
    const json = JSON.stringify(params)

    const response = await axios.post(url, json, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
        Connection: 'keep-alive',
        timeout: 60000,
      },
    })

    return response
  } catch (err: any) {
    return new Error(err)
  }
}
