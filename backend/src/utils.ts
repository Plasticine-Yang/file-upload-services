import type { File } from '@koa/multer'

/**
 * @description 封装统一响应体
 * @param code API 调用状态码 -- 0 表示正常
 * @param msg API 调用信息
 * @param data API 返回的数据
 */
export const generateUniversalResponseData = <T>(
  code: number,
  msg: string,
  data: T,
) => {
  return {
    code,
    msg,
    data,
  }
}

/**
 * @description 获取 koa multer 保存的文件名格式
 * @param file koa 接收到的文件
 */
export const getUploadedFileName = (file: File) => {
  return `${Date.now()}-${file.originalname}`
}
