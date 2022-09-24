import React from "react"
import { Link } from "react-router-dom"
import getExpensesTotal from '../selectors/expensesTotal.js'
import formatDollar from "../utils/formatDollar"

const ExpensesSummary = ({ expenseCount, expenses }) => {
  const expensesTotal = formatDollar(getExpensesTotal(expenses))
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          <span>{expenseCount}</span> {expenseCount === 1 ? "expense" : "expenses"}
          {", totalling"} <span>{expensesTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/app/create">Add Expense</Link>
        </div>

      </div>
    </div>
  )
}

export default ExpensesSummary