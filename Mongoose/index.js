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
const CatSchema = new mongoose.Schema({
  name: String
})
const PersonModel = db.model('Person', PersonSchema)
const CatModel = db.model('Cat', CatSchema)
const catEntity = new CatModel({
  name: 'cat-kitty'
})
const personEntity = new PersonModel({
  name: 'kity'
})
personEntity.save((err, v) => {
  if (err) console.log(err);
})
catEntity.save((err, e) => {
  if (err) return
  console.log(e);
})