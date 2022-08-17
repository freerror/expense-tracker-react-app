import { configureStore } from '@reduxjs/toolkit'
import expensesReducer from './slices/expenses'
import filtersReducer from './slices/filters'


const createStore = (preloadedState) => (
  configureStore({
    reducer: {
      expenses: expensesReducer.reducer,
      filters: filtersReducer.reducer
    },
    preloadedState
  })
)

export default createStore