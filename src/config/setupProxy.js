import { createProxyMiddleware } from 'http-proxy-middleware'

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/cgi-bin/getcode', {
      target: 'https://qyapi.weixin.qq.com',
      changeOrigin: true,
    }),
    
  )
}