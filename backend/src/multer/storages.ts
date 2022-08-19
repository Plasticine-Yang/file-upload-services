import multer from '@koa/multer'
import { ensureDir } from 'fs-extra'
import path from 'path'
import { UPLOADED_DIR } from '../constants'
import { getUploadedFileName } from '../utils'

// 使用磁盘存储引擎管理上传的文件
export const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // 确保保存目录存在
    await ensureDir(UPLOADED_DIR)

    // 指定上传的文件的保存路径
    cb(null, UPLOADED_DIR)
  },
  filename: (req, file, cb) => {
    // 设置保存的文件名命名格式 -- 时间-文件名
    cb(null, getUploadedFileName(file))
  },
})

// 处理目录上传
export const directoryStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // 将 @ 分隔的相对路径转为操作系统可识别的路径
    const relativePath = file.originalname.replace(/@/g, path.sep)
    // 拼接出目录的保存路径
    const directoryPath = path.join(
      UPLOADED_DIR,
      relativePath.substring(0, relativePath.lastIndexOf(path.sep)),
    )

    // 确保保存目录存在
    await ensureDir(directoryPath)

    // 指定上传的文件的保存路径
    cb(null, directoryPath)
  },
  filename: (req, file, cb) => {
    const items = file.originalname.split('@')
    // 设置保存的文件名命名格式 -- 时间-文件名
    cb(null, `${Date.now()}-${items[items.length - 1]}`)
  },
})
