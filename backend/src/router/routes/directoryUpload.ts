import { API_ROUTES } from '~/enums'
import { uploadDirectoryMulter } from '~/multer'
import { RegisterRoute } from '~/types/global'
import { generateUniversalResponseData } from '~/utils'

export const directoryUpload: RegisterRoute = router => {
  router.post(
    API_ROUTES.DIRECTORY_UPLOAD,
    async (ctx, next) => {
      try {
        // 交给多文件上传 multer 去处理
        await next()
        ctx.body = generateUniversalResponseData(
          0,
          'upload successfully!',
          null,
        )
      } catch (e) {
        ctx.body = generateUniversalResponseData(
          500,
          `[UPLOAD_FILE_ERROR]: ${e}`,
          null,
        )
      }
    },
    // 使用 fields 对文件处理 可以支持多文件
    // name 要和 formData 的 fieldName 对应
    uploadDirectoryMulter.fields([{ name: 'file' }]),
  )
}
