require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDB = require('./helpers/db');
const router = require('./routes');

const server = express();

const PORT = process.env.PORT;
const HOUR = 1000 * 60 * 60;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(cors());

server.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: HOUR,
    sameSite: true,
    secure: process.env.NODE_ENV === 'prod'
  }
}));

// set the view engine to ejs
server.set('view engine', 'ejs');
server.set('views', './views');

server.use('/', router);

connectDB()
  .then(async () => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  })
  .catch((err) => {
    console.log(`Connect error ${err}`);
  })


