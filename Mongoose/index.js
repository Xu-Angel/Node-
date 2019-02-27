const mongoose = require('mongoose')
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/mongoose-learn')
db.on('error', () => {
  console.log('error');
})
db.on('open', () => {
  console.log('sussess');
})

const PersonSchema = new mongoose.Schema({
  name:String
})
const PersonModel = db.model('Person', PersonSchema)
const personEntity = new PersonModel({
  name: 'kity'
})
personEntity.save((err, v) => {
  if (err) console.log(err);
})
