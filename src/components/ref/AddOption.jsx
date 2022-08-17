import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: undefined
  }

  addNew = (e) => {
    e.preventDefault()
    const option = e.target.elements.option.value.trim();
    e.target.elements.option.value = ""
    const error = this.props.addNew(option)

    this.setState(() => ({ error }))

  }

  render() {
    return (
      <div>
        {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
        <form onSubmit={this.addNew} className='add-option'>
          <input type="text" name="option" className='add-option__input' />
          <button className="button">Add Option</button>
        </form>
      </div>
    )
  }
}
