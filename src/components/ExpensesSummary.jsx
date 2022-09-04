import React from "react"
import getExpensesTotal from '../selectors/expensesTotal.js'
import formatDollar from "../utils/formatDollar"

const ExpensesSummary = ({ expenseCount, expenses }) => {
  const expensesTotal = formatDollar(getExpensesTotal(expenses))
  return (
    <h5>
      {expenseCount} {expenseCount === 1 ? "expense" : "expenses"}
      {" shown, totalling"} {expensesTotal}
    </h5>
  )
}

export default ExpensesSummary