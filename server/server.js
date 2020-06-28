// GLOBALS
// import & unpack express
const express = require('express');
// import bodyParser
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

//USES
// This must be added before GET & POST routes 
// & is another requirement of bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// Set default path: serving up static files: HTML, CSS & Client JS
app.use(express.static("server/public"));

//Show that we are on running and listening on port: 5000
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
