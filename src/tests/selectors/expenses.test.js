import getVisibleExpenses from "../../selectors/expenses"
import expenses from "../fixtures/expenses"

const filters = {
  text: '',
  sortDescending: true,
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
}

test("Text match filter", () => {
  filters.text = 'description'
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[0]])
  filters.text = ''
})

test("Sort by Date (Descending)", () => {
  filters.sortDescending = true
  filters.sortBy = 'date'
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([
    expenses[2],
    expenses[1],
    expenses[0],
  ])
})

test("Sort by Date (Ascending)", () => {
  filters.sortDescending = false
  filters.sortBy = 'date'
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([
    expenses[0],
    expenses[1],
    expenses[2],
  ])
})

test("Sort by amount (Descending)", () => {
  filters.sortDescending = true
  filters.sortBy = 'amount'
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([
    expenses[0],
    expenses[1],
    expenses[2]
  ])
})

test("Sort by amount (Ascending)", () => {
  filters.sortDescending = false
  filters.sortBy = 'amount'
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([
    expenses[2],
    expenses[1],
    expenses[0],
  ])
})

test("Sort by description (Descending)", () => {
  filters.sortDescending = true
  filters.sortBy = 'description'
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([
    expenses[2],
    expenses[0],
    expenses[1]
  ])
})

test("Sort by description (Ascending)", () => {
  filters.sortDescending = false
  filters.sortBy = 'description'
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([
    expenses[1],
    expenses[0],
    expenses[2]
  ])
})

test("Date Range Filter", () => {
  filters.startDate = 1659268800000
  filters.endDate = 1659441600000
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[1], expenses[0]])
})
