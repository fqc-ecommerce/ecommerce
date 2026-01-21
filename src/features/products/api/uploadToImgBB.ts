export const uploadToImgBB = async (file: File): Promise<string> => {
  const apiKey = '9f05138efeb0768759ac3c9776be5d75'
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()
  return data.data.url
}
