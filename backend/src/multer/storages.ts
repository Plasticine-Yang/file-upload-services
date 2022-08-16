import multer from '@koa/multer'
import { existsSync, mkdirSync } from 'fs'
import { UPLOADED_DIR } from '../constants'
import { getUploadedFileName } from '../utils'

// 使用磁盘存储引擎管理上传的文件
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!existsSync(UPLOADED_DIR)) {
      // 确保保存目录存在
      mkdirSync(UPLOADED_DIR)
    }
    // 指定上传的文件的保存路径
    cb(null, UPLOADED_DIR)
  },
  filename: (req, file, cb) => {
    // 设置保存的文件名命名格式 -- 时间-文件名
    cb(null, getUploadedFileName(file))
  },
})

