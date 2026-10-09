// //1.
// function getExcited() {
//     return str +"!!!";
// }
// console.log(getExcited("Hello"));

// //2.
// let getExcited= function(str) {
//     return str + "!!!";
// }
// console.log(getExcited("Hello"));

// //2.5 function as "variable"
// let getExcited = function(str) { return str + "!!!"};
// console.log(getExcited("Hello"));

//3 Arrow Function
// let getExcited = (str) => {return str + "!!!"};
// console.log(getExcited("Hello"));

//3.5 minimized arrow function One paramerter, and only a return value.
// let getExcited = str => str + "!!!!";













let rootDiv = document.querySelector("body");
let button = document.createElement("button");
button.innerHTML= "Click"
rootDiv.append(button);
// //1
// function clicked() {
//     console.log("Clicked");
// }
// 2.5
// let clicked = function() {console.log("Clicked");}
// button.addEventListener("Click", );

//3. Anonymous function
// button.addEventListener("click", function() console.log("CLICKED");

//3. Anonymous arrow function
// button.addEventListener("click", (event) => (console.log("CLICKED")))

//3.5 Minimized arrow function one argument, one line of code
// button.addEventListener('click', e => console.log("CLICKED"));

// When you want to do more than one line of code
// button.addEventListener("click", e => {
//     // this is the code body of the event handler
//     let rand = Math.floor (Math.random()*5);
//     button.innerHTML = rand;
// });


let numbers = [10,4,6,2,7,3];
console.log(numbers);

let doubledNumbers = numbers.map(element => element *2);
console.log(doubleNumbers);

//loop through an array
let i = 0;
while (i < numbers.length) {
    let number = numbers[i];
    i++;
}

//2 fpr loop convenient so you dont foget to bump the iterator variable
for (let i=0; i < numbers.length; i++) {
    let number = numbers[i];
}

// 3 for....of......
for (let number of numbers) {
    console.log(number);
}