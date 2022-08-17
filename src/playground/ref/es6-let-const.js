var yourName = "Your Name"
var yourName = "Your Name2"
console.log('yourName:', yourName);

let myName = "Your Name"
// invalid: (redefine)
// let mnameVaryName = "Your Name2"
// valid: (re-assign)
myName = "Other Name"
console.log('myName:', myName);

const theirName = 'Their Name'
// invalid: (redefine)
// const theirName = 'Their Name2'
// invalid: (re-assign)
// theirName = 'Their Name2'
console.log('theirName:', theirName);

function getPetName() {
  var petName = 'Hal';
  // let petName = 'Hal';
  // const petName = 'Hal';
  return petName;
}

getPetName();
// invalid scope:
// console.log(petName);

// Block scoping
var fullName = "Affirm Name";

if (fullName) {
  // won't be accessible outside this if statement (unless already defined
  // outside this scope)
  // let firstName = fullName.split(' ')[0];
  // const firstName = fullName.split(' ')[0];
  var firstName = fullName.split(' ')[0];
  console.log(firstName);
}

console.log(firstName);