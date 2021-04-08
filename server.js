const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const colors = require('colors')

// third party packages 
const morgan = require('morgan')
const rfs = require('rotating-file-stream')

// Custom 
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')
// Midllewares
const logger = require('./middleware/logger')
const fileupload = require("express-fileupload");

// Router оруулж ирэх 
const categoriesRoutes = require('./routes/categories')
const bookRoutes = require('./routes/books')
const usersRoutes = require('./routes/users')

// nodejs ajillah ued process.env uusdeg 
// Аппын тохиргоог process.env рүү ачаалах
dotenv.config({
    path: './config/config.env'
})

const app = express()

connectDB()

// create a write stream (a in append mode) 
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'log'),
})


// Body parser // request -ийн body хэвлэхдээ ашиглах объект 
// request body -г json болгож өгнө. 
app.use(express.json())
app.use(fileupload())
app.use(logger)
app.use(morgan('combined', {stream: accessLogStream}))
app.use('/api/v1/categories', categoriesRoutes)
app.use('/api/v1/books', bookRoutes)
app.use('/api/v1/users', usersRoutes)
app.use(errorHandler)

const server = app.listen(process.env.PORT, console.log(`express server...${process.env.PORT} дээр аслаа.`.rainbow))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Алдаа гарлаа: ${err.message}`.red.underline.bold)
    server.close(() => {
        process.exit(1)
    })
})
