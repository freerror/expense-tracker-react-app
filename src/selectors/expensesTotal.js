const getExpensesTotal = (expenses) => {
  return expenses
    .map((expense) => expense.amount)
    .reduce(
      (prev, cur) => (prev + cur), 0
    )
}

export default getExpensesTotal