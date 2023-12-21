
require("dotenv").config()
const Sentry = require("@sentry/node")
const { ProfilingIntegration } = require("@sentry/profiling-node")
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person');

const PORT = process.env.PORT
const app = express()

Sentry.init({
  dsn: 'https://5ffb1d191298af211d55ed913b40e716@o4506365652434944.ingest.sentry.io/4506365659054080',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

morgan.token('heymorgan', (req, res) => {
  //console.log('this is morgan', req.body)  
  return JSON.stringify(req.body);
})

//function delcaration
const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 

  next(err)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unkown endpoint'})
}


//middleWares
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());
//avoid CORS
app.use(cors())
//stati build
app.use(express.static('build'))
//json-Parser
app.use(express.json())
//use middleware morgan to show HTTP requests on the console
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :heymorgan'))

//Controllers

app.get('/', (req, res) => {
  res.send('<h1>Hello Internet!</h1>')
})

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        res.json(persons)
      } else {
        res.satus(404).end()
      }
    })
})

app.get("/api/persons/:id", (req, res, next) => {
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


app.get("/info", (req, res) => {
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


app.delete("/api/persons/:id", (req, res) => {
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


app.post("/api/persons", (req, res) => {
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
app.put('/api/persons/:id', (req, res) => {
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


//error test Sentry
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

//Error handler middleware with Sentry
// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
//no endpoint defined
app.use(unknownEndpoint);
//manual error handler
app.use(errorHandler);
// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});


app.listen(PORT, () => {
  console.log("\n\nServer runnin on PORT ", PORT, "\n\n")
  
})
