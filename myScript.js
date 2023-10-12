// Define variables
var number1 = 10;
var number2 = 5;

// Conditional statements
if (number1 > number2) {
  console.log("number1 is greater than number2");
} else if (number1 < number2) {
  console.log("number2 is greater than number1");
} else {
  console.log("number1 and number2 are equal");
}

// Loops
for (var i = 0; i < 5; i++) {
  console.log("Loop iteration " + i);
}

// Functions
function addNumbers(a, b) {
  return a + b;
}

var result = addNumbers(number1, number2);
console.log("The result of adding number1 and number2 is: " + result);

// Event handling (this code will work in a browser)
document.getElementById("myButton").addEventListener("click", function() {
    alert("Button clicked!");
  });
  
  // DOM manipulation (change the content of an HTML element)
  document.getElementById("output").innerHTML = "Hello, World!";
