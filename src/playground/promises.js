const promiseFunction = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const result = "Slow promise function resolved";
      res(result)
    }, 3000)
  })
}
const asyncFunction = async () => {
  const result = await promiseFunction()
  console.log("Inside async Function Received result:", result);
}

console.log("Running async function");
asyncFunction()
console.log("AFTER Running async function");