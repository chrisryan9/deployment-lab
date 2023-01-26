require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const { ACCESS_TOKEN } = process.env
const {seed, getCountries, getCities, createCity, deleteCity} = require('./controller.js')

app.use(express.static(`${__dirname}/../public`))

app.use(express.json())
app.use(cors())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: `${ACCESS_TOKEN}`,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


// DEV
app.post('/seed', seed)

// COUNTRIES
app.get('/countries', getCountries)

// CITIES
app.post('/cities', createCity)
app.get('/cities', getCities)
app.delete('/cities/:cityId', deleteCity)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))