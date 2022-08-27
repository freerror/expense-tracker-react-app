import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const ExpenseDashboardPage = React.lazy(() => import('../components/ExpenseDash'))
const AddExpensePage = React.lazy(() => import('../components/AddExpense'))
const EditExpensePage = React.lazy(() => import('../components/EditExpense'))
const NotFoundPage = React.lazy(() => import('../components/404'))
import Header from '../components/Header'
const HelpPage = React.lazy(() => import('../components/Help'))


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <React.Suspense fallback={<>Loading...</>} >
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<ExpenseDashboardPage />} />
          <Route path="/edit/:id" element={<EditExpensePage />} />
          <Route path="/create" element={<AddExpensePage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </React.Suspense>
    </div>
  </BrowserRouter >
)

export default AppRouter