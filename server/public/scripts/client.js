
$(document).ready(onReady);

let displayedOperator;
let operator;
let firstNumber = '';
let secondNumber = '';

function onReady() {
  console.log("JQ");
  addEventListeners();
  // $('#numberContainer').on('submit', '#equal', equalize (response) {

} //end onReady()



// addCalculation() uses Ajax to 'Post' call to the server
// and send calculations (objects) that need to be solved,
// then receive calculation results from the server as a string,  
// then display them via the showCalculation()
function addCalculation(calculatorInput) {
  console.log('in addCalculation');
  // I want to prevent the page from reloading
  // to keep my calculation history growing
  calculatorInput = $('#calculatorInput').val();
  console.log("sending:", calculatorInput);
  $.ajax({
    //POST is a two-way street, GET is a one-way street
    type: 'POST',
    url: '/calculation',
    data: calculatorInput,
  })
    .then(function (response) {
      console.log("back from server with:", response);
      updateCalculatedResult(response);
      addCalculationToHistory(response)
    })
    .catch(function (err) {
      alert("error calculating recent input. see console for details");
      console.log(err);
    });
} // end addCalculation()

function addEventListeners() {
  console.log('in addEventListeners');
  
  // '.operator'
  $('#numberContainer').on('click', '.operator', function () {
    console.log('in .operator click handler function');
    if (firstNumber === '') { // if firstNumber hasn't been entered
      alert('Please enter a number before using an operator.');
    } else if (secondNumber === '') { // if firstNumber was entered but not secondnumber
      // assign operator/displayedOperator variables based on the button that was clicked
      operatorCall(this.name, $(this).text());
      // update calculatorDisplay with selected numOne & operator
      $('#calculatorInput').empty();
      $('#calculatorInput').val(`${ firstNumber } ${ displayedOperator }`);
    } else { // if both numOne && numTwo have been entered & operator is assigned:
      // store inputted numbers & operators into an object
      let calculation = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: operator
      };//end else
    // send calculation to the server via addCalculation() function
    addCalculation(calculation);
      // assign operator/displayedOperator variables based on the button that was clicked
      operatorCall(this.name, $(this).text());
    } // end else 
  }); // end '.operator' click handler function
  
  // '#equal'
  $('#numberContainer').on('click', '#equal', function (response) {
    console.log('in #equal click handler function');
    // prevent page auto refreshing
    response.preventDefault();
    // store numbers & operators entered into
    // calculator into an object
    let calculation = {
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      operator: operator
    };
    // sending calculation to server via addCalculation()
    addCalculation(response);
    addCalculationToHistory(response)
  }); // end '#equal' click handler function

  //'#clear'
  $('#clear').on('click', function () {
    console.log('in #clear click handler function');
    // preventDefault
    // reset numOne, numTwo, operator and displayedOperator variables
    firstNumber = '';
    secondNumber = '';
    operator = undefined;
    displayedOperator = undefined;
    // empty both number inputs and any results that are displayed on the DOM
    $('#calculationResult').empty();
    $('#calculatorInput').val('');
  }); // end '#clear' click handler function  

  //'.number'
  $('#numberContainer').on('click', '.number', function () {
    console.log('.number click handler function');
    // if only the 1st # is pressed bc opeator isn't defined bc isn't pressed
    // then only display first number
    if (operator === undefined) {
      // show only the firstNumber
      console.log(this);
      
      firstNumber += $(this).text();
      console.log('firstNumber', firstNumber);
      $('#calculatorInput').empty();
      $('#calculatorInput').val(`${firstNumber}`);
      // we can't append to an input field
    } else {
      // show the whole calculation
      secondNumber += $(this).text();
      $('#calculatorInput').empty();
      $('#calculatorInput').val(`${firstNumber} ${displayedOperator} ${secondNumber}`);
      console.log('secondNumber', secondNumber);
    } // end else
  }); // end '.number' click handler function

    //'#decimal'
  // $('#numberContainer').on('click', 'button', '#decimal', decimalFunction);

} // end addEventListeners()

function decimalFunction(){
    console.log('in #decimal click handler function');
    event.preventDefault();
    let currentDisplay = $('#calculatorInput').val();
    // only if currentDisplay doesn't have a decimal at the end of it, add one
    if (currentDisplay.slice(-1) != '.') {
      $('#calculatorInput').val(currentDisplay + '.');
    } // end if
  };// end decimalFunction click handler function

// sets the operator & displayedOperator
function operatorCall(akaOperator, realOperator) {
  console.log('in operatorCall');
  operator = akaOperator;
  displayedOperator = realOperator;
}//end operatorCall

// sets the firstNumber
function setFirstNumber(number) {
  console.log('in setFirstNumber');
  firstNumber = number;
}// end setFirstNumber

// sets the secondNumber
function setSecondNumber(number) {
  console.log('in setSecondNumber');
  secondNumber = number;
}// end setSecondNumber

//this function updates results
function updateCalculatedResult(response) {
  console.log("in updateCalculatedResult");
  // Here I am emptying out the Results area
  $("#calculationResult").empty();
  // Here I am appending the new results
  $("#calculationResult").append(response);
}// end updateCalculatedResults

function addCalculationToHistory(response) {
  console.log("in showCalculation", response);
response.preventDefault
  $("#calculatedHistory").append(`<li>${response}</li>`);
  } //end addCalculationToHistory()

