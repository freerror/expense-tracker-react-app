import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import './styles/styles.scss'
import 'normalize.css/normalize.css'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from './slices/filters'
import { addExpense, editExpense, removeExpense } from './slices/expenses'
import getVisibleExpenses from './selectors/expenses'
import createStore from './store'
import { v4 as uuid } from 'uuid'
import expenses from './tests/fixtures/expenses.js'

const preloadedState = {
  expenses: { items: [...expenses] }
}
const store = createStore(preloadedState)

store.subscribe(() => {
  const { expenses: { items }, filters } = store.getState()
  console.log(
    getVisibleExpenses(items, filters)
  )
  console.log(filters)
})


const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(jsx)