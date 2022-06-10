require('dotenv').config()
const express = require('express')
var cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan')
const connectToMongo = require('./db')

connectToMongo()

const app = express()
const port = process.env.PORT

// Cors
app.use(cors())

// Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

// Available routes
app.use("/api/auth/",require("./routes/auth"))
app.use("/api/users/",require("./routes/users"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
