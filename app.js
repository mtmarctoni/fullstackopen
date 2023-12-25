
const config = require('./utils/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const personsRouter = require('./controllers/personsRouter');
const middleware = require('./utils/middleware.js');
const logger = require('./utils/logger.js');

logger.info('Connecting to ', config.DB_URI)

mongoose.connect(config.DB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })


//sentry variables
const Sentry = require("@sentry/node")
const { ProfilingIntegration } = require("@sentry/profiling-node")

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

//middleWares
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());
//avoid CORS
app.use(cors())
//json-Parser
app.use(express.json())
//use middleware morgan to show HTTP requests on the console
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :heymorgan'))
//request logger
app.use(middleware.requestLogger)

//Controllers
/*
app.get('/', (req, res) => {
  res.send("Hello World!")
});
*/

app.use('/api/persons', personsRouter);

//error test Sentry
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

//Error handler middleware with Sentry
// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
//no endpoint defined
app.use(middleware.unknownEndpoint);
//manual error handler
app.use(middleware.errorHandler);
// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});


module.exports = app;
