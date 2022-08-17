// function squareFun(x) {
//   return x * x
// }
// const squareArrow = (x) => {
//   return x * x
// }
// concise arrow fn syntax
const squareArrow = x => x * x

// challenge (regular function, arrow function, concise arrow function):
function getFirstNameFn(name) {
  return name.split(" ")[0]
}

const getFirstNameArrow = (fullName) => {
  return fullName.split(" ")[0];
}

const getFirstNameConcise = fullName => fullName.split(" ")[0];

console.log(getFirstNameConcise("First Last"));