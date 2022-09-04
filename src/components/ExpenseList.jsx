import React from "react"
import { connect } from 'react-redux'
import getVisibleExpenses from '../selectors/expenses.js'
import ExpenseListItem from "./ExpenseListItem"
import ExpensesSummary from "./ExpensesSummary.jsx"

const ExpenseList = ({ expenses }) => {
  const expenseCount = expenses.length
  return (
    <div>
      <h4>Expenses:</h4>
      <ExpensesSummary {...{ expenseCount, expenses }} />
      {expenseCount > 0 ? (
        expenses.map((item, idx) => (
          <ExpenseListItem {...item} key={idx} />
        ))) : (
        <p>No expenses</p>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    expenses: getVisibleExpenses(state.expenses.items, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList)
