const fs = require('fs')
const end = () => {
	process.stdout.write(']')
}

const fileStream = fs.createReadStream('./sample.txt')
fileStream.pipe(process.stdout)
console.log(fileStream, 'fileStream')
process.stdout.write('file read finished,[')
fileStream.on('end', end)