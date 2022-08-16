import KoaRouter from '@koa/router'
import { registerRoutes } from './routes'

export const router = new KoaRouter()

// 设置公共前缀
router.prefix('/api')

// 注册所有接口路由
registerRoutes(router)
