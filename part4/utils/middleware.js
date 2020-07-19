const logger = require('./logger')

const unknownEndpoint = (req, res) => {
    res.status(404).json({error: 'unknown endpoint'})
}

const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({error: err.message})
    }

    next(err)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        req.token = authorization.substring(7)
    }

    next()
}

module.exports = {
    errorHandler,
    unknownEndpoint,
    tokenExtractor
}
