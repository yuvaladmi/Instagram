export const uploadService = {
    uploadImg
}


async function uploadImg(blobUrl) {
    //* Defining our variables
    const CLOUD_NAME = 'dchwihaef'
    const UPLOAD_PRESET = 'yuvals_preset'
    const blob = await fetch(blobUrl).then(res => res.blob())
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData()
    //* Building the request body
    FORM_DATA.append('file', blob)
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
    //* Sending a post method request to Cloudinary API
    try {
        const res = await fetch(UPLOAD_URL, { method: 'POST', body: FORM_DATA, })
        const imgData = await res.json()
        return imgData
    } catch (err) {
        console.error(err)
        throw err
    }
}