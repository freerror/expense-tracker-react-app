import React from 'react'
import { useDispatch } from 'react-redux';
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from '../slices/expenses';
import { useNavigate } from 'react-router-dom';

const AddExpensePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onSubmit = (expense) => {
    dispatch(startAddExpense(expense))
    console.log("onSubmit", expense)
    navigate('/')
  }

  return (
    <div>
      <h2>Add Expense</h2>
      <ExpenseForm onSubmit={onSubmit} />
    </div>
  )
}

export default AddExpensePage