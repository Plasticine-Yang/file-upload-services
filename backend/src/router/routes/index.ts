import type KoaRouter from '@koa/router'
import { multiFileUpload } from './multiFileUpload'
import { singleFileUpload } from './singleFileUpload'

export const registerRoutes = (router: KoaRouter) => {
  // 单文件上传
  singleFileUpload(router)
  // 多文件上传
  multiFileUpload(router)
}
