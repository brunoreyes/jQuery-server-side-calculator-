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


// GET & POST Routes go here
app.post( '/calculation', ( req, res )=>{
  console.log('in /calculation POST');

  // The data arrives here as "req.body", which is like an envelop that has alot of nonsense in it
  console.log(req.body);

  // here we are making it easier by setting a variable = req.body
  // therefore using the variable instead of req.body
  let calculation = req.body

  //here we are sending the data to a function
  let equalizerCalculation = equalizer(calculation);
  let result = equalizerCalculation.toString();
console.log('Showing result:',result);

  // res.send takes whatever variable we have and sends it back to the client in this case it is 
  res.send(result);

  // res.sendStatus sends back an HTTP status code 201: something was created with the request that was received
  // 200: everything went well 
  // res.sendStatus(201); //not sure if it's code 201 or 200
})




// equalizer() calculates based on a switcher 
function equalizer(calculation) {
  console.log(calculation);
    let x = parseFloat(calculation.firstNumber);
    let y = parseFloat(calculation.secondNumber);
    let operation = calculation.operator;
    let solvedResult;
    // parseFlot will start at the beginning
    // but it has to start with a # or space but no letters

  // for (let i = 0; i < Array.length; i++)
    switch (operation) {
      case 'add':
        
        solvedResult = x + y;
        break;
      case 'subtract':
        solvedResult = x - y;
        break;
      case 'multiply':
        solvedResult = x * y;
        break;
      case 'divide':
        solvedResult = x / y;
        break;
      default:
        solvedResult = "calculator error";
    }
    console.log('operation is:', operation);

    // if ('multiply' === operation) {
    //   result = x * y;
    // } else if ('divide' === operation) {
  return solvedResult;
}