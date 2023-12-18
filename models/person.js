require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DB_URI;

console.log('Connecting to ', uri);
mongoose.connect(uri)
    .then(result => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDF: ', err);
    })

//new schema with mongoose with name and phone
let personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)
