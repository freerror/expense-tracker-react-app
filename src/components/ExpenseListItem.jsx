import React from "react"
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { utcDateOnly } from "../utils/date"
import formatDollar from "../utils/formatDollar"

const Br = (() => (
  <br></br>
))

const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => {

  return (
    <>
      <Link className="expense-list-body-item" to={`/app/edit/${id}`} >
        <div>
          <h3 className="expense-list-body-item__title">{description}</h3>
          <span className="expense-list-body-item__date">{utcDateOnly(createdAt)}</span>
        </div>
        <div>
          <h3 className="expense-list-body-item__amount">{formatDollar(amount)}</h3>
        </div>
      </Link>
    </>
  )
}
export default connect()(ExpenseListItem)