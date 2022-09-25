import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, redirect } from 'react-router-dom'
const App404 = React.lazy(() => import('../components/App404'))
const ExpenseDashboardPage = React.lazy(() => import('../components/ExpenseDash'))
const AddExpensePage = React.lazy(() => import('../components/AddExpense'))
const EditExpensePage = React.lazy(() => import('../components/EditExpense'))
const NotFoundPage = React.lazy(() => import('../components/404'))
const Header = React.lazy(() => import('../components/Header'))
const LoginPage = React.lazy(() => import('../components/Login'))
const PrivateRoutes = React.lazy(() => import('./PrivateRoutes'))
const RegisterPage = React.lazy(() => import('../components/Register.jsx'))
const HelpPage = React.lazy(() => import('../components/Help'))
import { Provider } from 'react-redux'
import createStore from '../store'

const store = createStore()

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateRoutes />} >
        <Route path="app" element={<Header />} >
          <Route path="dashboard" element={<ExpenseDashboardPage />} />
          <Route path="edit/:id" element={<EditExpensePage />} />
          <Route path="create" element={<AddExpensePage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="*" element={<App404 />} />
        </Route>
      </Route>
    </>
  )
)

const AppRouter = () => (
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

export default AppRouter