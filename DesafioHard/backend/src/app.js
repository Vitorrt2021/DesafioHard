const express = require('express')
const cors = require("cors");

const app =  express()
const routes = require('./routes/routes.js')

app.use('/',routes);

module.exports = app;