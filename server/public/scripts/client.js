$(document).readyState(onReady);

// 
let displayedOperator;

let operator;

let firstNumber = '';
let secondNumber = '';

function onReady() {
  console.log("JQ");
  addEventListeners();
} //end onReady


//this function replaces old results with new results
function updateCalculatedResult() {
  console.log("in updateCalculatedResult");
  // Here I am emptying out the Results area
  $("#calculationResult").empty();
  // Here I am appending the new results
  $("#calculationResult").append(newResult);
}// end updateCalculatedResults



// addCalculation() uses Ajax to 'Post' call to the server
// and send calculations (objects) that need to be solved,
// then receive calculation results from the server as a string,  
// then display them via the showCalculation()
function addCalculation(calculatorInput) {
  console.log('in addCalculation');
  // I want to prevent the page from reloading
  // to keep my calculation history growing
  let calculatorInput = $('#calculatorInput').val();

  console.log("sending:", calculatorInput);

  $.ajax({
    //POST is a two-way street, GET is a one-way street
    type: 'POST',
    url: '/calculation',
    data: calculatorInput,
  })
    .then(function (response) {
      console.log("back from server with:", response);
      showCalculation(response);

    })
    .catch(function (err) {
      alert("error calculating recent input. see console for details");
      console.log(err);
    });
} // end addCalculation





function addEventListeners() {

  // '.operator'
  $('.operator').on('click', 'button', function() {
    if (firstNumber === '') { // if firstNumber hasn't been entered
      alert('Please enter a number before using an operator.');

    } else if (secondNumber === '') { // if firstNumber was entered but not secondnumber
      // assign operator/displayedOperator variables based on the button that was clicked
      setOperation(this.name, $(this).text());

      // update calculatorDisplay with selected numOne & operator
      $('#calculatorInput').empty();
      $('#calculatorInput').append(`${ firstNumber } ${ displayedOperator }`);
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
  }); // end '.operator'
  
  // '#equal'
  $('#equal').on('submit', function (calculating) {
    // prevent page auto refreshing
    calculating.preventDefault();
    // store numbers & operators entered into
    // calculator into an object
    var calculation = {
      numOne: numOne,
      numTwo: numTwo,
      operator: operator
    };
    // sending calculation to server via addCalculation()
    addCalculation(calculation);
    addCalculationToHistory(response)
  }); // end '#equal'

  //'#clear'
  $('#clear').on('click', function() {
    // reset numOne, numTwo, operator and displayedOperator variables
    numOne = '';
    numTwo = '';
    operator = undefined;
    displayedOperator = undefined;
    // empty both number inputs and any results that are displayed on the DOM
    $('#calculationResult').empty();
    $('#calculatorInput').empty();
  }); // end '#clear'  

  //'.number'
  $('.numbers').on('click', 'button', function () {
    // if only the 1st # is pressed bc opeator isn't defined bc isn't pressed
    // then only display first number
    if (operator === undefined) {
      // show only the firstNumber
      firstNumber += $(this).text();
      console.log('firstNumber', firstNumber);
      $('#calculatorInput').empty();
      $('#calculatorInput').append(`${ firstNumber }`);
    } else {
      // show the whole calculation
      secondNumber += $(this).text();
      $('#calculatorInput').empty();
      $('#calculatorInput').append(`${firstNumber} ${displayedOperator} ${secondNumber}`);
      console.log('secondNumber', secondNumber);
    } // end else
  }); // end '.number'

$('#decimal').on('click', 'button', function() {
  event.preventDefault();
  let currentDisplay = $('#calculatorInput').val();
  // only if currentDisplay doesn't have a decimal at the end of it, add one
  if (currentDisplay.slice(-1) != '.') {
    $('#calculatorInput').val(currentDisplay + '.');
  } // end if
}// end '#decimal'
} // end addEventListeners()

// setter for operator & displayedOperator
function operatorCall(akaOperator, realOperator) {
  operator = akaOperator;
  displayedOperator = realOperator;
}//end operatorCall

// setter for firstNumber
function setFirstNumber(number) {
  firstNumber = number;
}// end setFirstNumber

// setter for secondNumber
function setSecondNumber(number) {
  secondNumber = number;
}// end setSecondNumber


function addCalculationToHistory(response) {
  console.log("in showCalculation", response);

    $("#calculatedHistory").append(`<li>${response}</li>`);
  }
} //end addCalculationToHistory()


