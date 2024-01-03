const express = require('express')
const data = require('./data.json')

const PORT = process.env.PORT ?? 1234
const app = express()
app.disable('x-powered-by')

// MIDDLEWARE
app.use(express.json())
// app.use((req, res, next) => {
//   console.log('Middleware')
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''

//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     req.body = data
//     next()
//   })
// })

app.get('/', (_req, res) => {
  res.json(data)
})

app.post('/create', (req, res) => {
  res.status(201).json(req.body)
})

app.use((_req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
