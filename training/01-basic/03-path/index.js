import path from 'node:path'

console.log(path.sep)

// Path join
const filePath = path.join('content', 'subfolder', 'text.txt')
console.log(filePath)

// Basename
const base = path.basename(filePath, '.txt')
console.log(base)

// Extname
const ext = path.extname(filePath)
console.log(ext)
