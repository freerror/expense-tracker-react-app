class Person {
  // constructor with default value parameter
  constructor(name = "Anon", age = 0) {
    this.name = name;
    this.age = age;
  }
  getDescription() {
    // I'm a method
    return `${this.name} is ${this.age} year(s) old.`
  }
}

const me = new Person('First Last', 26);
console.log(me.getDescription());

const me2 = new Person();
console.log(me2.getDescription());