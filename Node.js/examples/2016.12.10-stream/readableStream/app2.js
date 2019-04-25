const fs = require('fs')

const readStream = fs.createReadStream('./sample.txt')
let content = ''

readStream.on('data', chunk => {
	content += `${chunk}${Date()}`
})

readStream.on('end', chunck => {
	console.log(`file read finished, ${content}`)
})