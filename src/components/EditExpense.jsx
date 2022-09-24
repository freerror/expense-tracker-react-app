import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import ExpenseForm from "./ExpenseForm"
import { startEditExpense, startRemoveExpense } from "../slices/expenses"

const EditExpensePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const targetExpense = useSelector(state => state.expenses.items.find(expense => expense.id === id))
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className='page-header__title'>Edit Expense</h1>
        </div>
      </div>
      <ExpenseForm
        expense={targetExpense}
        onSubmit={(edittedExpense) => {
          dispatch(startEditExpense(edittedExpense))
          navigate('/app/dashboard')
        }}
        onDelete={(id) => {
          dispatch(startRemoveExpense(id))
          navigate('/app/dashboard')
        }}
      />

    </div>
  )
}

export default EditExpensePage