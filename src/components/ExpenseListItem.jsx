import React from "react"
import { connect } from 'react-redux'
import { removeExpense } from "../slices/expenses"
import { useNavigate } from "react-router-dom"
import { utcDateTime } from "../utils/date"
import formatDollar from "../utils/formatDollar"

const Br = (() => (
  <br></br>
))

const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => {

  const navigate = useNavigate()
  return (
    <div>
      {description}
      <Br />
      Amount:{formatDollar(amount)}
      <Br />
      Date: {utcDateTime(createdAt)}
      <Br />
      <button onClick={() => {
        console.log(`Edit ${id}`)
        navigate(`/app/edit/${id}`)
      }}
      >edit</button>
      <Br />
      <Br />
    </div>
  )
}
export default connect()(ExpenseListItem)