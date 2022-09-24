import React from "react"
import { connect } from 'react-redux'
import getVisibleExpenses from '../selectors/expenses.js'
import ExpenseListFilter from "./ExpenseListFilter.jsx"
import ExpenseListItem from "./ExpenseListItem"
import ExpensesSummary from "./ExpensesSummary.jsx"

const ExpenseList = ({ expenses }) => {
  const expenseCount = expenses.length
  return (
    <div>
      <ExpensesSummary {...{ expenseCount, expenses }} />
      <ExpenseListFilter />
      <div className="content-container ">
        {expenseCount > 0 ? (
          expenses.map((item, idx) => (
            <ExpenseListItem {...item} key={idx} />
          ))) : (
          <p>No expenses</p>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    expenses: getVisibleExpenses(state.expenses.items, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList)
