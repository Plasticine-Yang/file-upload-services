import { request } from '~/utils'

enum FileUploadAPI {
  UPLOAD = '/upload',
}

/**
 * @description 上传文件 -- 会转成 formData 上传
 * @param key formData 的 key 不指定则默认为 file
 * @param file input 中选择的文件
 */
export const uploadFile = (key: string, file: File) => {
  const formData = new FormData()
  formData.set(key, file)
  request.post(FileUploadAPI.UPLOAD, formData, {
    // 计算上传进度
    onUploadProgress: (progressEvent: ProgressEvent) => {
      const uploadedPercent = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100,
      )
      console.log(uploadedPercent)
    },
  })
}
