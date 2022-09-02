import React from "react"
import { connect } from "react-redux"
import { setTextFilter, sortByAmount, sortByDate, flipSort, sortByDescription, setStartDate, setEndDate } from "../slices/filters"
import { startOfMonth, endOfMonth } from "../utils/date"
import DateRangePicker from "@wojtekmaj/react-daterange-picker"

class ExpenseListFilter extends React.Component {
  state = {
    calendarFocussed: false,
  }
  onDateRangeChange = (dateRange) => {
    if (dateRange) {
      if (dateRange[0]) {
        const startDate = dateRange[0].getTime()
        this.props.dispatch(setStartDate(startDate))
      }
      if (dateRange[1]) {
        const endDate = dateRange[1].getTime()
        this.props.dispatch(setEndDate(endDate))
      }
    } else {
      this.props.dispatch(setStartDate(undefined))
      this.props.dispatch(setEndDate(undefined))
    }
  }
  onCalClose = () => {
    this.setState(() => ({ calendarFocussed: false }))
  }
  onCalOpen = () => {
    this.setState(() => ({ calendarFocussed: true }))
  }
  getDateRange = () => {
    if (!(this.props.filters.startDate && this.props.filters.endDate)) {
      return [undefined, undefined]
    }
    const startDate = new Date(this.props.filters.startDate)
    const endDate = new Date(this.props.filters.endDate)
    return [startDate, endDate]
  }
  render() {
    return (
      <div>
        <input type="text"
          value={this.props.filters.text}
          onChange={(e) => {
            this.props.dispatch(setTextFilter(e.target.value))
          }} />
        <select data-testid="select" value={this.props.filters.sortBy} onChange={(e) => {
          console.log(`Sort by ${e.target.value}`)
          if (e.target.value === 'date')
            this.props.dispatch(sortByDate())
          else if (e.target.value === 'amount')
            this.props.dispatch(sortByAmount())
          else if (e.target.value === 'description')
            this.props.dispatch(sortByDescription())
        }}>
          <option data-testid="select-option" value="date">Date</option>
          <option data-testid="select-option" value="amount">Amount</option>
          <option data-testid="select-option" value="description">Description</option>
        </select>
        <button onClick={() => {
          console.log("flip sort")
          const sortBy = this.props.filters.sortBy
          this.props.dispatch(flipSort())
        }} >{this.props.filters.sortDescending ? "Descending" : "Ascending"}</button>
        <DateRangePicker
          calendarAriaLabel="Toggle calendar"
          clearAriaLabel="Clear value"
          dayAriaLabel="Day"
          monthAriaLabel="Month"
          nativeInputAriaLabel="Date Range"
          onChange={this.onDateRangeChange}
          onCalendarClose={this.onCalClose}
          onCalendarOpen={this.onCalOpen}
          format="y/MM/dd"
          isOpen={this.state.calendarFocussed}
          value={this.getDateRange()}
        />
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps)(ExpenseListFilter);