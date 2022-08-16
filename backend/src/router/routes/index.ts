import type KoaRouter from '@koa/router'
import { singleFileUpload } from './singleFileUpload'

export const registerRoutes = (router: KoaRouter) => {
  // 单文件上传
  singleFileUpload(router)
}
