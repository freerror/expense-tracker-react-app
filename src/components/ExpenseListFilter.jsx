import React from "react"
import { connect } from "react-redux"
import { setTextFilter, sortByAmount, sortByDate, flipSort, sortByDescription, setStartDate, setEndDate } from "../slices/filters"
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
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input type="text"
              className="text-input text-input--filter"
              placeholder="Search"
              value={this.props.filters.text}
              onChange={(e) => {
                this.props.dispatch(setTextFilter(e.target.value))
              }} />
          </div>
          <div className="input-group__item">
            <DateRangePicker
              className="text-input text-input--filter"
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
          </div>
          <div className="input-group__item input-group__hint-container">
            <div className="input-group__hint">Sort by:</div>
          </div>
          <div className="input-group__item">
            <select
              className="text-input text-input--select text-input--filter"
              data-testid="select"
              value={this.props.filters.sortBy}
              onChange={(e) => {
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
          </div>
          <div className="input-group__item">
            <button
              className="text-input text-input--button text-input--filter"
              onClick={() => {
                console.log("flip sort")
                const sortBy = this.props.filters.sortBy
                this.props.dispatch(flipSort())
              }} >{this.props.filters.sortDescending ? "Descending" : "Ascending"}</button>
          </div>
        </div>
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