import multer from '@koa/multer'
import { storage } from './storages'

// 创建负责处理文件上传 FormData 的 multer 对象
export const uploadMulter = multer({ storage })
