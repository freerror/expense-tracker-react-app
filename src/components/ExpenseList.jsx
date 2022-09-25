import React from "react"
import { connect } from 'react-redux'
import getVisibleExpenses from '../selectors/expenses.js'
import ExpenseListFilter from "./ExpenseListFilter.jsx"
import ExpenseListItem from "./ExpenseListItem"
import ExpensesSummary from "./ExpensesSummary.jsx"

const ExpenseList = ({ expenses }) => {
  const expenseCount = expenses.length
  return (
    <>
      <ExpensesSummary {...{ expenseCount, expenses }} />
      <ExpenseListFilter />
      <div className="content-container ">
        <div className="expense-list-header">
          <div className="expense-list-header-item mobile">Expenses</div>
          <div className="expense-list-header-item desktop">Expense</div>
          <div className="expense-list-header-item desktop">Amount</div>
        </div>
        <div className="expense-list-body">
          {expenseCount > 0 ? (
            expenses.map((item, idx) => (
              <ExpenseListItem {...item} key={idx} />
            ))) : (
            <div className="expense-list-body-item expense-list-body-item--no-expenses">
              <span>No expenses</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    expenses: getVisibleExpenses(state.expenses.items, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList)
