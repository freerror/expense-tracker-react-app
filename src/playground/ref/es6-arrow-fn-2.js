// argument object - no longer bound with arrow fns

const add = function (a, b) {
  console.log(arguments);
  return a + b;
}
console.log(add(1, 2));

const addArrow = (a, b) => {
  // "arguments is not bound" err
  // console.log(arguments);
  return a + b;
}

// 'this' - no longer bound

const addThis = (a, b) => {
  console.log(this);
  return a + b;
}
console.log(addThis(1, 2));

// ... which is good to avoid this problem
const user = {
  names: ["First", "Last"],
  printName: function () {
    this.names.forEach(function () {
      // this is undefined
      console.log(this.names[0]);
    })
  },
  printNameArr: function () {
    this.names.forEach(() => {
      // this just uses the caller's scope for this
      console.log(this.names[0]);
    })
  }
}

user.printNameArr()
user.printName()