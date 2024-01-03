import http from 'node:http'

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hello world')
})

server.listen(3000, () => {
  console.log(
    `server listening on port http://localhost:${server.address().port}`
  )
})
