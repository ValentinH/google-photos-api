const serverless = require('serverless-http')
const express = require('express')
const { getAlbum } = require('./google-photos')
const app = express()

const allowedOrigins = ['http://localhost:8000', 'https://valentin-hervieu.fr']

app.use(function(req, res, next) {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  } else {
    return res.status(403).json({
      status: 403,
      message: 'This API is only for https://valentin-hervieu.fr',
    })
  }
})

app.get('/', async (req, res) => {
  try {
    const results = await getAlbum(req.query.id)
    res.json(results)
  } catch (e) {
    res.status(500)
  }
})

module.exports.handler = serverless(app)
