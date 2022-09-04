import getExpensesTotal from "../../selectors/expensesTotal";
import expenses from "../fixtures/expenses"

test("Expenses total as expected", () => {
  const total = getExpensesTotal(expenses)
  console.log(total);
  expect(total).toBe(39000)
})

test("Expenses zero when empty array", () => {
  const total = getExpensesTotal([expenses[0]])
  console.log(total);
  expect(total).toBe(14000)
})

test("Expenses zero when empty array", () => {
  const total = getExpensesTotal([])
  console.log(total);
  expect(total).toBe(0)
})