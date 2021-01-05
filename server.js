require('dotenv').config();
const express = require('express');

const server = express();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

