import { readdir, readFile as readFileCallback } from 'node:fs'

import { readFile } from 'node:fs/promises'

readdir('.', (err, files) => {
  if (err) console.log('Error reading directory: ', err)

  files.forEach((file) => {
    console.log(file)
  })
})

// With Callbacks
readFileCallback('./file-short.txt', 'utf-8', (err, text) => {
  if (err) console.error('Error', err)
  console.log('Read with callback: ', text)
})
readFileCallback('./file-long.txt', 'utf-8', (err, text2) => {
  if (err) console.error('Error', err)
  console.log('Read with callback: ', text2)
})

// With Promises
console.log('Reading Short..')
readFile('./file-short.txt', 'utf-8').then((text1) => {
  console.log('Read with Promises: ', text1)
})

// With Promises parallel
Promise.all([
  readFile('./file-short.txt', 'utf-8'),
  readFile('./file-long.txt', 'utf-8')
]).then(([text1, text2]) => {
  console.log('Read with Promises in Parallel Short: ', text1)
  console.log('Read with Promises in Parallel Long: ', text2)
})

// With Async-await
console.log('Reading Long..')
const text2 = await readFile('./file-long.txt', 'utf-8')
console.log('Read with Async await: ', text2)
