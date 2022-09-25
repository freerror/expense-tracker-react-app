import React from 'react'
import ReactDOM from 'react-dom/client'
const AppRouter = React.lazy(() => import('./routers/AppRouter'))
import './styles/styles.scss'
import 'normalize.css/normalize.css'
import Loading from './components/Loading'

const jsx = (
  <React.Suspense fallback={<Loading />}>
    <AppRouter />
  </React.Suspense>
)

const root = ReactDOM.createRoot(
  document.body.appendChild(
    document.createElement("DIV")
  )
)

root.render(jsx)