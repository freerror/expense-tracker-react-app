import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
const AppRouter = React.lazy(() => import('./routers/AppRouter'))
import './styles/styles.scss'
import 'normalize.css/normalize.css'
import createStore from './store'
import expenses from './tests/fixtures/expenses.js'

const preloadedState = {
  expenses: { items: [...expenses] }
}
const store = createStore(preloadedState)


const jsx = (
  <React.Suspense fallback={<>Loading...</>}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.Suspense>
)

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(jsx)