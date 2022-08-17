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

// sub-classing / inheritance
class Student extends Person {
  constructor(name, age, major) {
    // init the parent
    super(name, age);
    this.major = major;
  }
  getMajor() {
    // I'm a method
    return this.major ? `${this.name}'s major is ${this.major}.` : `${this.name} has no major.`
  }
  getDescription() {
    return this.getMajor().replace(".", "") + ` and their age is ${this.age} year(s).`
  }
}

const student1 = new Student('First Last', 26, 'Computer Science')
console.log(student1.getMajor());
console.log(student1.getDescription());
const student2 = new Student()
console.log(student2.getMajor());
console.log(student2.getDescription());