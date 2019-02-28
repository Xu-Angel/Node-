/* 
 mongoose 的所有合法 SchemaTypes：

String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Example
*/


const mongoose = require("mongoose")
const Schema = mongoose.Schema
mongoose.connect("mongodb://127.0.0.1:27017/students", {useNewUrlParser: true})
const schema = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65 },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: {type: String, lowercase: true, trim: true}
  }
})

const Types = mongoose.model('Types', schema)
const t = new Types
try {
  t.name = 'bbaby'
t.age = 19
t.updated = new Date
t.binary = new Buffer('sdfdsfsdfsdf')
t.living = false,
t.mixed = { any: { thing: 'i want' } };
t.markModified('mixed');
t._someId = new mongoose.Types.ObjectId;
t.array.push(1);
t.ofString.push("strings!");
t.ofNumber.unshift(1,2,3,4);
t.ofDates.addToSet(new Date);
t.ofBuffer.pop();
t.ofMixed = [1, [], 'three', { four: 5 }];
t.nested.stuff = 'good';
t.save();
} catch (error) {
  console.log(error, 'error')
}

Types.find((err, t) => {
  console.log(t)
})