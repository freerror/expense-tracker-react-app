import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import ExpenseForm from "./ExpenseForm"
import { editExpense, startRemoveExpense } from "../slices/expenses"

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
          dispatch(editExpense(edittedExpense))
          navigate('/')
        }}
        onDelete={(id) => {
          dispatch(startRemoveExpense(id))
          navigate('/')
        }}
      />

    </div>
  )
}

export default EditExpensePage