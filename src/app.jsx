import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
const AppRouter = React.lazy(() => import('./routers/AppRouter'))
import './styles/styles.scss'
import 'normalize.css/normalize.css'
import createStore from './store'
import { auth } from './firebase/firebase'
import { startSetExpenses } from './slices/expenses'

const store = createStore()

const jsx = (
  <React.Suspense fallback={<>Loading...</>}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.Suspense>
)

const root = ReactDOM.createRoot(
  document.body.appendChild(
    document.createElement("DIV")
  )
)

let rendered = false
const render = () => {
  if (!rendered) {
    root.render(jsx)
  }
}

auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(startSetExpenses()).then(() => {
      render()
    })
  } else {
    render()
  }
})
