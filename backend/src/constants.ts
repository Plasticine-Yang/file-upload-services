import path from 'path'

// 已上传文件的保存目录
export const UPLOADED_DIR = path.join(__dirname, '/uploaded')

// 服务运行的端口号
export const PORT = 3000

// 服务的 url 地址
export const SERVER_URL = `http://localhost:${PORT}`
