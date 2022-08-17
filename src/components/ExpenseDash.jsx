import React from "react"
import ExpenseList from "./ExpenseList"
import ExpenseListFilter from "./ExpenseListFilter"

const ExpenseDashboardPage = (props) => (
  <div>
    <div>
      <h2>
        This is from my dashboard
      </h2>
      <ExpenseListFilter />
      <ExpenseList />
    </div>
  </div>
)

export default ExpenseDashboardPage
