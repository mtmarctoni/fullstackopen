
const personsRouter = require('express').Router();
const Person = require('../models/person');

personsRouter.get("/", (req, res) => {
    Person.find({})
      .then(persons => {
        if (persons) {
          res.json(persons)
        } else {
          res.satus(404).end()
        }
      })
  })
  
  personsRouter.get("/info", (req, res) => {
      console.log('Dentro de INFO');
      
      const newDate = new Date
      Person.countDocuments({})
        .then(count => {
          //console.log('Count documents: ', count);
          const messageHtml = `
            <div>
              <p>Phonebook has info for ${count} people</p>
              <p>${newDate}</p>
            </div>
            `
          res.send(messageHtml).end()
        })
        .catch(err => {
          console.log('Error ', err);
        })
    
  })
    
  personsRouter.get("/:id", (req, res, next) => {
    const id = req.params.id
    Person.findById(id)
      .then(person => {
        res.json(person)
      })
      .catch(err => {
        console.log('Error getting person: ', err);
        next(err)
      })
    
  })
  
  
  
  
  personsRouter.delete("/:id", (req, res) => {
    const id = req.params.id
    //find Person and delete from the database
    Person.findByIdAndDelete(id)
      .then(person => {
        //console.log('Delete person: ', person);
        if (person) {
          res.status(204).end()
        } else {
          res.status(404).end()
        }
        })
  
  })
  
  
  personsRouter.post("/", (req, res) => {
    const body = req.body
    //console.log('Body recibido: ', body);
    //ensure body is something
    if (body === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
  
    /*
    //name must be unique.
    //en principio no hace falta esta condición porque si existe en el forntend
    //se llama al método PUT y no al POST
    Person.findOne({ name: body.name })
      .then(exisitngElement => {
        if (exisitngElement) {
          return res.status(400).json({
            error: 'name must be unique'
            })
        }
      })
    */
    
    //body must have name and number
    if (body.name && body.number) {
      const person = new Person({
        //id: generateRandomId(),
        name: body.name,
        number: body.number
      })
  
      //add new 'person' to DB
      //console.log('Voy a meter en mongoDB: ', person);
      person.save()
        .then(savedPerson => {
          //console.log('Metido en DB: ', savedPerson);
          res.json(savedPerson)
        })
        .catch(err => {
          console.log('Error saving new Person to DB: ', err);
        })
      
  
    } else {
      res.status(404).json({
        error: 'name and number are required'
      }).end()
  
    }
    
  })
  
  //update a person
  personsRouter.put('/:id', (req, res) => {
    let id = req.params.id
    const body = req.body
    //console.log('Body recibido: ', body);
    //ensure body is something
    if (body === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
    
    //body must have name and number
    if (body.name && body.number) {
      //find and update with id in mongodb
      Person.findByIdAndUpdate(id, body, {
        new: true //return the modified document rather than the original
      })
        .then(person => {
          if (person) {
            console.log(`${person.name} number updated: ${person.number}`);
            res.json(person)
          } else {
            res.status(404).json({ error: 'person not found' })
          }
        })
     
  
    } else {
      res.status(404).json({
        error: 'name and number are required'
      }).end()
  
    }
  
  })

module.exports = personsRouter;