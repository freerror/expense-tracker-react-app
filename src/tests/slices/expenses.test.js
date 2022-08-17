// Note: Below are examples only. The official page
// (https://redux.js.org/usage/writing-tests) suggests writing much more
// integrated tests with everything working together. Do not test
// implementation details as it achieves little/nothing while increasing workload.

import expensesReducer, { removeExpense, editExpense, addExpense } from "../../slices/expenses"

test('Remove expense', () => {
  const action = removeExpense({ id: '123abc' })

  expect(action).toEqual({
    "payload": { "id": "123abc" },
    "type": "expenses/removeExpense",
  })
})

test('Edit expense', () => {
  const action = editExpense({ id: '123abc', note: 'New Note Content' })

  expect(action).toEqual({
    payload: {
      id: "123abc",
      note: "New Note Content"
    },
    type: "expenses/editExpense"
  })
})

test('Add expense (default values)', () => {
  const action = addExpense({ id: '123' })

  expect(action).toEqual({
    "payload": {
      id: expect.any(String)
    },
    type: "expenses/addExpense"
  })
})

test('Add expense (custom values)', () => {
  const expenseData = {
    id: '123abc',
    description: 'Test Payment',
    amount: 10999,
    createdAt: 1000,
    note: 'Test payment note'
  }

  const action = addExpense(expenseData)
  expect(action).toEqual({
    "payload": {
      id: '123abc',
      description: 'Test Payment',
      amount: 10999,
      createdAt: 1000,
      note: 'Test payment note'
    },
    type: "expenses/addExpense"
  })
})

// Reducer Tests
const default_state = {
  items: []
}

const new_expense = {
  id: '123',
  description: 'test',
  note: 'test',
  amount: 123,
  createdAt: 4321
}

test('Default', () => {
  const state = expensesReducer.getInitialState()
  expect(state).toEqual(default_state)
})

test('Add expense', () => {
  const state = { ...default_state }
  expensesReducer.caseReducers.addExpense(state, { payload: new_expense })
  expect(state).toEqual({ items: [new_expense] })
})

test('edit expense', () => {
  const state = { items: [new_expense] }
  expensesReducer.caseReducers.editExpense(state, {
    payload: {
      id: '123',
      note: 'New Note',
    }
  })
  expensesReducer.caseReducers.editExpense(state, {
    payload: {
      id: '123',
      description: 'New Description',
    }
  })
  expensesReducer.caseReducers.editExpense(state, {
    payload: {
      id: '123',
      amount: 321,
    }
  })
  expensesReducer.caseReducers.editExpense(state, {
    payload: {
      id: '123',
      createdAt: 1234,
    }
  })
  expensesReducer.caseReducers.editExpense(state, {
    payload: {
      id: '123',
      note: 'final note',
      description: 'final description'
    }
  })
  const expectedState = {
    id: '123',
    description: 'final description',
    note: 'final note',
    amount: 321,
    createdAt: 1234
  }
  expect(state).toEqual({ items: [expectedState] })
})

test('remove expense', () => {
  const state = { items: [new_expense, { ...new_expense, id: '124' }] }
  expensesReducer.caseReducers.removeExpense(state, { payload: '124' })
  expect(state).toEqual({ items: [new_expense] })
})

test('remove expense 2', () => {
  const state = { items: [new_expense, { ...new_expense, id: '124' }] }
  expensesReducer.caseReducers.removeExpense(state, { payload: '123' })
  expect(state).toEqual({ items: [{ ...new_expense, id: '124' }] })
})