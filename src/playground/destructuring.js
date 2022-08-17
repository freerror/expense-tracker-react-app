// object destructuring
const person = {
  name: 'Jack',
  age: 19,
  location: {
    city: 'Townington',
    temp: 32
  }
}

const { name: first, age } = person
console.log(`${first}'s age is ${age}`);


// array destructuring

const address = ['123', 'Roading Street', 'Townington']
const [num, , city, country = "Defaultris"] = address

console.log(`They live at ${num} in the city of ${city}, which is in ${country}`);