require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/person');

//get the arguments from the command line
let args = process.argv.slice(2);
let nameArg = args[0];
let phoneArg = args[1];

const person = new Person({
    name: nameArg,
    number: phoneArg
    });
    
if (args.length === 0 ) {
    Person.find({})
        .then(result => {
            console.log('Phonebook:');
            result.forEach(personData => {
                console.log(`${personData.name} ${personData.number}`);
            })
            mongoose.connection.close()
                .then(result => {
                    console.log('Connection closed');
                })
                .catch(err => {
                    console.log('Error closing connection: ', err);
                 })
        })
        .catch( err => {
            console.log('Error: ', err);
        })
    
} else {
    person.save().then((result) => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close()
    }).catch( err => {
        console.error(err);
    })
    
}
        
    