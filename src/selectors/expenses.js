const getVisibleExpenses = (expenses, { text, sortDescending, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if (sortBy === 'date')
      if (sortDescending)
        return a.createdAt < b.createdAt ? 1 : -1
      else
        return a.createdAt > b.createdAt ? 1 : -1
    else if (sortBy === 'amount')
      if (sortDescending)
        return a.amount < b.amount ? 1 : -1
      else
        return a.amount > b.amount ? 1 : -1
    else if (sortBy === 'description')
      if (sortDescending)
        return a.description.toUpperCase() < b.description.toUpperCase() ? 1 : -1
      else
        return a.description.toUpperCase() > b.description.toUpperCase() ? 1 : -1
  })
}

export default getVisibleExpenses