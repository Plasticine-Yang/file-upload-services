import cors from '@koa/cors'
import Koa from 'koa'
import serve from 'koa-static'
import { PORT, SERVER_URL, UPLOADED_DIR } from './constants'
import { router } from './router'

const app = new Koa()

/**
 * @description 初始化 Koa 服务
 */
const setupApp = (app: Koa) => {
  // 静态资源服务
  app.use(serve(UPLOADED_DIR))

  // 路由
  app.use(router.routes())

  // 后端配置 cors 解决跨域问题
  app.use(cors())

  // 开启服务监听
  app.listen(PORT, () => {
    console.log(
      `server listening at port ${PORT}, access server with ${SERVER_URL}`,
    )
  })
}

setupApp(app)
