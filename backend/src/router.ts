import KoaRouter from '@koa/router'
import { SERVER_URL } from './constants'
import { uploadMulter } from './multer'
import { generateUniversalResponseData, getUploadedFileName } from './utils'

export const router = new KoaRouter()

// 设置公共前缀
router.prefix('/api')

const enum API_ROUTES {
  UPLOAD = '/upload',
}

/**
 * @description 单文件上传接口
 */
router.post(
  API_ROUTES.UPLOAD,
  async (ctx, next) => {
    try {
      // 直接交给 uploadMulter 中间件去处理 处理完毕后返回信息即可
      await next()
      ctx.body = generateUniversalResponseData(0, 'upload successfully!', {
        'download-url': `${SERVER_URL}/${getUploadedFileName(ctx.file)}`,
      })
    } catch (e) {
      ctx.body = generateUniversalResponseData(
        500,
        `[UPLOAD_FILE_ERROR]: ${e}`,
        null,
      )
    }
  },
  // 文件上传交给 uploadMulter 中间件处理
  uploadMulter.single('file'),
)
