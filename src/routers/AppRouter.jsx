import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExpenseDashboardPage from '../components/ExpenseDash'
import AddExpensePage from '../components/AddExpense'
import EditExpensePage from '../components/EditExpense'
import NotFoundPage from '../components/404'
import Header from '../components/Header'
import HelpPage from '../components/Help'


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<ExpenseDashboardPage />} />
        <Route path="/edit/:id" element={<EditExpensePage />} />
        <Route path="/create" element={<AddExpensePage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </div>
  </BrowserRouter>
)

export default AppRouter