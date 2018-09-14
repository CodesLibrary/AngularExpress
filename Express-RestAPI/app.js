// load our app server using express somehow....
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
var cors = require('cors')
const bodyParser = require('body-parser')
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
const router = require('./routes/user.js')
app.use(router)


const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log("Server is up and listening PORT: " + PORT)
})
