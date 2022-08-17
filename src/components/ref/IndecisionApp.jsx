import React from "react"
import Header from './Header.jsx'
import Action from './Action.jsx'
import AddOption from './AddOption.jsx'
import Options from './Options.jsx'
import OptionModal from "./OptionModal.jsx"

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    fakeState: "BOO!",
    selected: undefined
  }

  // Lifecycle methods, more at https://reactjs.org/docs/react-component.html
  componentDidMount = () => {
    try {
      const json = localStorage.getItem("options")
      const options = JSON.parse(json)
      if (json) {
        this.setState(() => ({ options }))
      }
    } catch (e) {
      console.log(`Error retrieving items, ${e}`);
    }
  }

  componentDidUpdate = (preProps, preState) => {
    if (preState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    }
  }

  handleClearSelection = () => {
    this.setState({ selected: undefined })
  }

  // handle delete options
  handRemoveAll = () => {
    this.setState({ options: [] })
  }

  handleRemove = (option) => {
    console.log(option);
    this.setState((prevState) => ({
      options: prevState.options.filter(item => item != option)
    }))
  }

  handleAddNew = (option) => {
    if (!option) return "Valid text entry required"
    else if (this.state.options.includes(option)) return "Already entered this option"
    this.setState((prevState) => ({
      options: [...prevState.options, option]
    }))
  }

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length)
    const result = this.state.options[randomNum]
    this.setState(() => ({ selected: result }))
  }

  render() {
    const title = "Decision Maker"
    const subtitle = "Make a random decision!"

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            buttonDisabled={this.state.options.length === 0}
            pick={this.handlePick} />
          <div className="widget">
            <Options
              options={this.state.options}
              remove={this.handleRemove}
              removeAll={this.handRemoveAll} />
            <AddOption addNew={this.handleAddNew} />
          </div>
        </div>
        <OptionModal selectedOption={this.state.selected} clearSelection={this.handleClearSelection} />
      </div>
    )
  }
}

IndecisionApp.defaultProps = {
  options: []
}