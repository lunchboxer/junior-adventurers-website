import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const development = NODE_ENV === 'development'

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev: development }),
    sapper.middleware(),
  )
  .listen(PORT, error => {
    if (error) console.log('error', error)
  })
