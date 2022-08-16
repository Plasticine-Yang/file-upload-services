import { FileUploadAPI } from '~/constants'
import { request } from '~/utils'

/**
 * @description 上传文件 -- 会转成 formData 上传
 * @param fieldName formData 的 字段名 不指定则默认为 file
 * @param file input 中选择的文件
 */
export const singleUploadFile = (fieldName: string, file: File) => {
  const formData = new FormData()
  formData.set(fieldName, file)
  request.post(FileUploadAPI.SINGLE_UPLOAD, formData, {
    // 计算上传进度
    onUploadProgress: (progressEvent: ProgressEvent) => {
      const uploadedPercent = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100,
      )
      console.log(uploadedPercent)
    },
  })
}
