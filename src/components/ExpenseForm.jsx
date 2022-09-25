import React from "react";
import DatePicker from "react-date-picker";

class ExpenseForm extends React.Component {
  state = {
    id: this.props.expense?.id || '',
    description: this.props.expense?.description || '',
    note: this.props.expense?.note || '',
    amount: this.props.expense?.amount ? this.props.expense.amount / 100 : '',
    createdAt: this.props.expense?.createdAt ? new Date(this.props.expense.createdAt) : new Date(),
    calendarFocussed: false,
    err: undefined
  }
  onDescriptionChange = (e) => {
    const description = e.target.value
    this.setState(() => ({ description }))
  }
  onNoteChange = (e) => {
    const note = e.target.value
    this.setState(() => ({ note }))
  }
  onAmountChange = (e) => {
    const amount = e.target.value

    if (amount.match(/^\d{1,}(\.\d{0,2})?$|^.{0}$/)) {
      this.setState(() => ({ amount }))
    }
  }
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }))
    }
  }
  onCalClose = () => {
    this.setState(() => ({ calendarFocussed: false }))
  }
  onCalOpen = () => {
    this.setState(() => ({ calendarFocussed: true }))
  }
  onErr = (err) => {
    this.setState(() => ({ err }))
  }
  onDelete = () => {
    this.props.onDelete(this.state.id)
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (!this.state.description || !this.state.amount) {
      this.onErr("Missing Description or Amount")
    } else {
      this.onErr()

      // submit
      this.props.onSubmit({
        id: this.state.id,
        description: this.state.description,
        amount: parseInt(parseFloat(this.state.amount * 100, 10)),
        createdAt: this.state.createdAt.getTime(),
        note: this.state.note
      })
    }

  }
  render() {
    return (
      <div className="content-container">
        <form className="form" onSubmit={this.onSubmit}>
          <div className="input-group">
            {this.state.err && <div className="input-group__item status-err">Error: {this.state.err}</div>}
            <div className="input-group__item">

              <input
                className="text-input text-input--form wide"
                type="text"
                placeholder="Description"
                autoFocus
                value={this.state.description}
                onChange={this.onDescriptionChange}
              />
            </div>
            <div className="input-group__item">
              <input
                className="text-input text-input--form"
                type="text"
                placeholder="Amount"
                value={this.state.amount}
                onChange={this.onAmountChange}
              />
            </div>
            <div className="input-group__item">
              <DatePicker
                className="text-input text-input--form"
                calendarAriaLabel="Toggle calendar"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                monthAriaLabel="Month"
                nativeInputAriaLabel="Date"
                onChange={this.onDateChange}
                value={this.state.createdAt}
                yearAriaLabel="Year"
                format="y/MM/dd"
                isOpen={this.state.calendarFocussed}
                onCalendarClose={this.onCalClose}
                onCalendarOpen={this.onCalOpen}
                clearIcon={null}
              />
            </div>
          </div>
          <div className="input-group__item input-group__item--textarea">
            <textarea
              className="text-input text-input--form wide"
              placeholder="Notes (optional)"
              value={this.state.note}
              onChange={this.onNoteChange}
            />
          </div>
          <div className="input-group__item">
            <button className="button" type="submit">Save Expense</button>
          </div>
        </form>
        {this.props.expense && <button className="button" onClick={this.onDelete} >DELETE</button>}
      </div>
    )
  }
}

export default ExpenseForm