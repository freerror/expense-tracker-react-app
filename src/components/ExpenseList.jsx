import React from "react"
import { connect } from 'react-redux'
import getVisibleExpenses from '../selectors/expenses.js'
import ExpenseListItem from "./ExpenseListItem"

const ExpenseList = (props) => {
  return (
    <div>
      <h4>Expenses:</h4>
      {props.expenses.length > 0 ? (
        props.expenses.map((item, idx) => (
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
