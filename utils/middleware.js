const logger = require('./logger');

//averiguar si puedo añadir aquí morgan

  //function delcaration
const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method);
    logger.info('Path: ', req.path);
    logger.info('Body: ', req.body);
    logger.info('---');
    next();

}
  
  const errorHandler = (err, req, res, next) => {
    console.error(err.message);
  
    if (err.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(err)
  }
  
  const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unkown endpoint'})
}
  
module.exports = {
    requestLogger,
    errorHandler,
    unknownEndpoint
}