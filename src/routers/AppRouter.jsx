import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App404 from '../components/App404'
const ExpenseDashboardPage = React.lazy(() => import('../components/ExpenseDash'))
const AddExpensePage = React.lazy(() => import('../components/AddExpense'))
const EditExpensePage = React.lazy(() => import('../components/EditExpense'))
const NotFoundPage = React.lazy(() => import('../components/404'))
import Header from '../components/Header'
import LoginPage from '../components/Login'
const RegisterPage = React.lazy(() => import('../components/Register.jsx'))
const HelpPage = React.lazy(() => import('../components/Help'))


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <React.Suspense fallback={<>Loading...</>} >
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route index element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="app" element={<Header />} >
            <Route path="dashboard" element={<ExpenseDashboardPage />} />
            <Route path="edit/:id" element={<EditExpensePage />} />
            <Route path="create" element={<AddExpensePage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="*" element={<App404 />} />
          </Route>
        </Routes>
      </React.Suspense>
    </div>
  </BrowserRouter >
)

export default AppRouter