import React from "react"
import { connect } from 'react-redux'
import { removeExpense } from "../slices/expenses"
import { useNavigate } from "react-router-dom"
import { utcDateTime } from "../utils/date"

const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => {

  const navigate = useNavigate()
  return (
    <div>
      {description} ${amount / 100} on {utcDateTime(createdAt)}
      <span> </span>
      <button onClick={() => {
        console.log(`Edit ${id}`)
        navigate(`/edit/${id}`)
      }}
      >edit</button>
    </div>
  )
}
export default connect()(ExpenseListItem)