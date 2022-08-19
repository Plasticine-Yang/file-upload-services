import multer from '@koa/multer'
import { directoryStorage, storage } from './storages'

// 创建负责处理文件上传 FormData 的 multer 对象
export const uploadMulter = multer({ storage })

// 创建负责处理目录上传 FormData 的 multer 对象
export const uploadDirectoryMulter = multer({ storage: directoryStorage })
