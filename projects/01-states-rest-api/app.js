import express, { json } from 'express'
import { createStatesRouter } from './routes/states.js'
import { corsMiddleware } from './middleware/cors.js'

export const createApp = ({ stateModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  app.use('/states', createStatesRouter({ stateModel }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
