const nf = new Intl.NumberFormat('en-NZ', {
  style: "currency",
  currency: "NZD",
  maximumFractionDigits: 2,
  roundingIncrement: 1
})

export default (cents) => {
  const dollars = cents / 100
  return nf.format(dollars)
}