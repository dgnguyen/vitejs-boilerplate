import axios from 'axios'

export async function CRUDAction({
  data,
  url,
}: {
  data: {
    id: string
    partnerId?: number[] | number
  }
  url: string
}) {
  try {
    const json = JSON.stringify(data)

    const response = await axios.post(url, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response
  } catch (err: any) {
    return new Error(err)
  }
}

export const headersContentType = {
  headers: {
    'Content-Type': 'application/json',
  },
}
