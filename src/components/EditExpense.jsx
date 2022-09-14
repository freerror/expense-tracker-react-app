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
      <h4>Edit Expense</h4>
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