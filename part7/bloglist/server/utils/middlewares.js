const { info, error } = require('./logger')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (req, res) => {
    res.status(404).json({
        error: {
            code: 404,
            message: 'Unknown endpoint',
        },
    })
}

const errorHandler = (err, req, res, next) => {
    error(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    } else if (
        err.name === 'MongoServerError' &&
        err.message.includes('E11000 duplicate key error')
    ) {
        return res.status(400).json({ error: 'username must be unique' })
    } else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'token expired' })
    }

    next(err)
}

const logRequest = (req, res, next) => {
    info(
        `Incoming request:
        ${req.method} ${req.path} - ${res.statusCode} - ${JSON.stringify(req.body)}
        ---`
    )
    next()
}

const getAuthToken = (req, res, next) => {
    const authorization = req.get('Authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    } else {
        req.token = null
    }

    next()
}

const decodeToken = (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    req.decodedToken = decodedToken

    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    logRequest,
    getAuthToken,
    decodeToken,
}
