const mongoose = require('mongoose');

const url = `mongodb+srv://nosnart:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.0gso0.mongodb.net/<dbname>?retryWrites=true&w=majority`

const connectDB = function() {
  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Mongo connection established')
  })

  db.on('close', () => {
    console.log('Mongo connection closed')
  })

  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true ,
    useFindAndModify: false
  })
}

module.exports = connectDB;