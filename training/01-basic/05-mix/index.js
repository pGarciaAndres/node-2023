import fs from 'node:fs/promises'
import path from 'node:path'

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files

  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.error(`Error reading dir ${folder}`)
    process.exit(1)
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath)
    } catch (error) {
      console.error(`Error reading file ${filePath}`)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(
      10
    )} ${fileModified}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
