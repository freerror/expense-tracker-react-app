import { configureStore, createSlice } from '@reduxjs/toolkit'

const demoState = {
  expenses: [{
    id: '123abc',
    description: 'This Month Rent',
    note: 'Final rent payment',
    amount: 95600,
    createdAt: 0,
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
}

// Expenses Reducer
const expensesReducer = createSlice({
  name: 'expenses',
  initialState: {
    items: []
  },
  reducers: {
    // add expense
    addExpense: (state, { payload: {
      id,
      description = "",
      note = "",
      amount = undefined,
      createdAt = 1234
    } }) => {
      state.items.push({
        id,
        description,
        note,
        amount,
        createdAt
      })
    },
    // edit Expense
    editExpense: (state, { payload }) => {
      const idx = state.items.findIndex(expense => expense.id == payload.id)
      state.items[idx] = {
        ...state.items[idx],
        ...payload
      }
    },
    // remove expense
    removeExpense: (state, { payload }) => {
      state.items = state.items.filter((expense) => {
        console.log(expense.id != payload);
        return expense.id !== payload
      })
    }
  }
})

const { addExpense, editExpense, removeExpense } = expensesReducer.actions


// Filters Reducer
const filtersReducer = createSlice({
  name: 'filters',
  initialState: {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  },
  reducers: {
    // set text filter
    setTextFilter: (state, { payload }) => {
      state.text = payload
      state.sortBy = 'text'
    },
    // sort by date
    sortByDate: state => {
      state.sortBy = 'date'
    },
    // sort by amount
    sortByAmount: state => {
      state.sortBy = 'amount'
    },
    // set start date
    setStartDate: (state, { payload }) => {
      state.startDate = payload
      state.sortBy = 'date'
    },
    // set end date
    setEndDate: (state, { payload }) => {
      state.endDate = payload
      state.sortBy = 'date'
    }
    // // set date range
    // setDateFilter: (state, { payload: { startDate, endDate } }) => {
    //   state.startDate = startDate
    //   state.endDate = endDate
    //   state.sortBy = 'date'
    // },

  }
})

const { setTextFilter, setDateFilter, setStartDate, setEndDate, sortByDate, sortByAmount } = filtersReducer.actions

// Store
const store = configureStore({
  reducer: {
    expenses: expensesReducer.reducer,
    filters: filtersReducer.reducer
  }
})


const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if (sortBy === 'date')
      return a.createdAt < b.createdAt ? 1 : -1
    else if (sortBy === 'amount')
      return a.amount > b.amount ? 1 : -1
  })
}

store.subscribe(() => {
  const { expenses: { items }, filters } = store.getState()
  console.log(
    getVisibleExpenses(items, filters)
  )
})

console.log('Add expense');
store.dispatch(addExpense({
  description: 'This Month Rent',
  note: 'Final rent payment',
  amount: 95600,
  createdAt: 5000
}))

console.log('Add expense');
store.dispatch(addExpense({
  description: 'This Month Rent',
  amount: 95600,
  createdAt: 4000
}))

const uuidLast = store.getState().expenses.items.at(-1).id
const uuidFirst = store.getState().expenses.items.at(0).id

// store.dispatch(removeExpense(uuidLast))

console.log('Updated first item with a new description');
store.dispatch(editExpense({
  id: uuidFirst,
  description: 'Fucking drugs'
}))

console.log('Update first item to a higher amount');
store.dispatch(editExpense({
  id: uuidFirst,
  amount: 120500
}))

console.log('Sort by amount start');
store.dispatch(sortByAmount())


// store.dispatch(setDateFilter({ startDate: 1234, endDate: 4321 }))

console.log('Set filter start date');
store.dispatch(setStartDate(4500))

console.log('Revert filter start date');
store.dispatch(setStartDate(0))

console.log('Set filter end date');
store.dispatch(setEndDate(4500))

console.log('Revert filter end date');
store.dispatch(setEndDate(10000))

console.log('Set text filter');
store.dispatch(setTextFilter("rEnT"))

console.log('Revert text filter');
store.dispatch(setTextFilter(""))

console.log('Sort by Date');
store.dispatch(sortByDate())

console.log('Change text filter');
store.dispatch(setTextFilter("drug"))