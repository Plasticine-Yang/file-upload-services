import { FileUploadAPI } from '~/constants'
import { request } from '~/utils'

const baseUploadFile = (fieldName: string, fileOrFiles: File | FileList) => {
  const formData = new FormData()
  let uploadUrl = ''

  if (fileOrFiles instanceof File) {
    // 单文件上传
    formData.set(fieldName, fileOrFiles)
    uploadUrl = FileUploadAPI.SINGLE_UPLOAD
  } else if (fileOrFiles instanceof FileList) {
    // 多文件上传
    // 将 files 类数组转成数组方便遍历
    const fileArr = Array.from(fileOrFiles)
    fileArr.forEach(file => {
      formData.append(fieldName, file)
    })
    uploadUrl = FileUploadAPI.MULTIPLE_UPLOAD
  }

  uploadUrl !== '' &&
    request.post(uploadUrl, formData, {
      // 计算上传进度
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const uploadedPercent = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100,
        )
        console.log(uploadedPercent)
      },
    })
}

/**
 * @description 上传文件 -- 会转成 formData 上传
 * @param fieldName formData 的 字段名 不指定则默认为 file
 * @param file input 中选择的文件
 */
export const singleUploadFile = (fieldName: string, file: File) => {
  baseUploadFile(fieldName, file)
  console.log('调用单文件上传API')
}

/**
 * @description 多文件上传
 * @param fieldName formData 的字段名 不指定则默认为 file
 * @param files input 中选择的多个文件
 */
export const multipleUploadFile = (fieldName: string, files: FileList) => {
  baseUploadFile(fieldName, files)
  console.log('调用多文件上传API')
}
