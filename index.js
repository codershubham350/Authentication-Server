// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

//Database connect
mongoose.connect(
  'mongodb+srv://auth:n4mMD6I3iOH9qpJv@auth.l8o3h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('Connected to DB');
});

const app = express();

// App Setup
// middleware
app.use(morgan('combined'));
app.use(
  bodyParser.json({
    type: '*/*',
  })
);
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
