import React from "react"
const ExpenseList = React.lazy(() => import("./ExpenseList"))
const ExpenseListFilter = React.lazy(() => import("./ExpenseListFilter"))

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
