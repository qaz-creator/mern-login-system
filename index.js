const express = require('express')
const env = require('dotenv')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
env.config()
mongoose
  .connect(
    process.env.MONGO_DB_URI ||
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.o6isb.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    console.log('Database connected')
  })

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./routes/index'))
const port = process.env.PORT | 2000

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'))
}
app.listen(port, console.log(`Server is starting at Port ${port}`))
