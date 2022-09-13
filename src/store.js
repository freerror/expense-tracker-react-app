import { configureStore } from '@reduxjs/toolkit'
import expensesReducer from './slices/expenses'
import filtersReducer from './slices/filters'
import authReducer from './slices/auth'


const createStore = (preloadedState) => (
  configureStore({
    reducer: {
      expenses: expensesReducer.reducer,
      filters: filtersReducer.reducer,
      auth: authReducer.reducer
    },
    preloadedState
  })
)

export default createStore