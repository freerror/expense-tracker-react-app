import React from "react"
const ExpenseList = React.lazy(() => import("./ExpenseList"))

const ExpenseDashboardPage = (props) => (
  <div>
    <ExpenseList />
  </div>
)

export default ExpenseDashboardPage
