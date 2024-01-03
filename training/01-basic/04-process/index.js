import { readdir } from 'node:fs'

// Arguments
console.log(process.argv)

// Current working dir
console.log(process.cwd())

// Env
console.log(process.env.node_env)

// Exit
// process.exit(1)

const folder = process.argv[2] ?? '.'

readdir(folder, (err, files) => {
  if (err) {
    console.log('Error reading directory: ', err)
  }

  files.forEach((file) => {
    console.log(file)
  })
})
