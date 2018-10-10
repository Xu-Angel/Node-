const fs = require('fs')
const content = 'i am writeStream'
const path = './sample.txt'

const writeStram = fs.createWriteStream(path)
writeStram.write(content)
writeStram.end()