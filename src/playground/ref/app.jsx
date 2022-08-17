// This is a class component
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: props.options,
      fakeState: "BOO!"
    }
    this.removeAll = this.removeAll.bind(this)
    this.addNew = this.addNew.bind(this)
    this.pick = this.pick.bind(this)
    this.remove = this.remove.bind(this)
  }

  // Lifecycle methods, more at https://reactjs.org/docs/react-component.html
  componentDidMount() {
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

  componentDidUpdate(preProps, preState) {
    if (preState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    }
  }

  // handle delete options
  removeAll() {
    this.setState({ options: [] })
  }

  remove(option) {
    console.log(option);
    this.setState((prevState) => ({
      options: prevState.options.filter(item => item != option)
    }))
  }

  addNew(option) {
    if (!option) return "Valid text entry required"
    else if (this.state.options.includes(option)) return "Already entered this option"
    this.setState((prevState) => ({
      options: [...prevState.options, option]
    }))
  }

  pick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length)
    const result = this.state.options[randomNum]
    alert(`You should ${result}!!!`)
  }

  render() {
    const title = "Decision Maker"
    const subtitle = "Make a random decision!"

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          buttonDisabled={this.state.options.length === 0}
          pick={this.pick} />
        <Options
          options={this.state.options}
          remove={this.remove}
          removeAll={this.removeAll} />
        <AddOption addNew={this.addNew} />
      </div>
    )
  }
}

IndecisionApp.defaultProps = {
  options: []
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  )
}
Header.defaultProps = {
  title: 'Indecision',
}

// Or you can use functional components
// "stateless"
function Action(props) {
  return (
    <div>
      <button
        onClick={props.pick}
        disabled={props.buttonDisabled}
      >What should I do?</button>
    </div>
  )
}


function Options(props) {
  return (
    <div>
      {props.options.map((option) => <Option remove={props.remove} key={option} optionName={option} />)}
      <button onClick={props.removeAll}>Remove all</button>
    </div>
  )
}


function Option(props) {
  return (
    <div>
      {props.optionName + " "}
      <button onClick={() => props.remove(props.optionName)}>Remove</button>
    </div>
  )
}

class AddOption extends React.Component {
  constructor(props) {
    super(props)
    this.addNew = this.addNew.bind(this)
    this.state = {
      error: undefined
    }
  }

  addNew(e) {
    e.preventDefault()
    const option = e.target.elements.option.value.trim();
    e.target.elements.option.value = ""
    const error = this.props.addNew(option)

    this.setState(() => ({ error }))

  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.addNew}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<IndecisionApp options={["Walk Dog", "Do Dishes"]} />)