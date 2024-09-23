export type ResponseBlob = {
  data: BlobPart
}
export const setupDownload = (response: ResponseBlob, fileName: string) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  const blob = new Blob([response.data], { type: fileType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.download = fileName
  link.click()
  document.body.removeChild(link)
}
