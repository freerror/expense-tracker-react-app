// can call the default import anything you like
import defaultFlatten, { remove, partial } from './utils.js'
import isSenior, { canDrink, isAdult } from './person.js'
// import { ReactDOM, Component } from 'React'

console.log("app.jsx is running!!!");

const newArr = remove([1, 2, 3, 4, 5, 6], [3, 6])
console.log(newArr);

const person1 = {
  name: "Rodney",
  age: 17
}
const person2 = {
  name: "King",
  age: 19
}
const person3 = {
  name: "Ed",
  age: 95
}
const people = [person1, person2, person3]
for (const person of people) {
  console.log(`${person.name} is ${isAdult(person.age) ? "an adult" : "not an adult"}.`);
  console.log(`${person.name} is ${canDrink(person.age) ? "above" : "below"} the legal drinking age.`);
  console.log(`${person.name} is ${isSenior(person.age) ? "a" : "not a"} senior citizen.`);
}

console.log(defaultFlatten([1, 2, [3, 4]]));
const power4 = partial(Math.pow, 4)
console.log(power4(2));