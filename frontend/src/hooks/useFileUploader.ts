import { multipleUploadFile, singleUploadFile, uploadDirectory } from '~/api'

interface Options {
  // 是否进行目录上传
  directory?: boolean
  // formData 的 fieldName
  fieldName?: string
}

export default function useFileUploader(options?: Options) {
  const directory = options?.directory ?? false
  const fieldName = options?.fieldName ?? 'file'

  return (files: FileList | undefined | null) => {
    // 没选择文件则不调用接口
    if (!files || files.length === 0) return

    // 开启目录上传的话则只调用目录上传接口
    if (directory) {
      uploadDirectory(fieldName, files)
      return
    }

    if (files.length > 1) {
      // 超过 1 个文件则用多文件上传
      multipleUploadFile(fieldName, files)
    } else {
      // 获取选择的第一个文件并调用接口上传
      if (files.item(0) !== null) {
        singleUploadFile('file', files.item(0) as File)
      }
    }
  }
}
