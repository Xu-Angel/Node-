const fs = require('fs')

fs.readFile('./sample.txt', 'utf8', (err, con) => {
	console.log(`read finished${con}`);
} )