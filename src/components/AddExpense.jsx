import React from 'react'
import { useDispatch } from 'react-redux';
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from '../slices/expenses';
import { useNavigate } from 'react-router-dom';

const AddExpensePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onSubmit = ({ id, ...expense }) => {
    dispatch(startAddExpense(expense))
    navigate('/')
  }

  return (
    <div>
      <div className="page-header">
        <div className='content-container'>
          <h1 className='page-header__title'>Add Expense</h1>
        </div>
      </div>
      <ExpenseForm onSubmit={onSubmit} />
    </div>
  )
}

export default AddExpensePage