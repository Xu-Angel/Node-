const express = require('express')
const fs = require('fs')
const app = express()
const router  = express.Router()
const formidable = require('formidable')

router.get('/', (req, res) => {
  fs.readFile('./index.html', (err, content) => {
    if (err) {console.log(err) ;return false;}
    res.end(content)
  })
})

router.post('/fileupload', (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = './static'
  form.keepExtensions = true

  form.parse(req, (err, fields, files) => {
    console.log(fields, files);
    fs.renameSync(files.photo.path, './static/' + files.photo.name)
    res.end('o')
  })
})

app.use('/', router)
app.listen(9999)