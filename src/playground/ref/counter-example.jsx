// const appRoot = document.getElementById("app");

// let count = 0;
// const addOne = () => {
//   count++;
//   console.log('addOne', count);
//   renderCounterApp();
// }
// const minusOne = () => {
//   count--;
//   console.log('minusOne', count);
//   renderCounterApp();
// }
// const reset = () => {
//   count = 0;
//   console.log('reset', count);
//   renderCounterApp();
// }
// // note: class is not valid in JSX (it's reserved), use className
// // For more differences see: https://reactjs.org/docs/dom-elements.html

// const renderCounterApp = () => {
//   const templateThree = (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={minusOne}>-1</button>
//       <button onClick={reset}>Reset</button>
//       <button onClick={addOne}>+1</button>
//     </div>
//   );
//   ReactDOM.render(templateThree, appRoot);
// };

// renderCounterApp();


function ordinalIndicator(num) {
  if ([11, 12, 13].includes(num)) {
    return 'th';
  } else if (num % 10 === 1) {
    return 'st';
  } else if (num % 10 === 2) {
    return 'nd';
  } else if (num % 10 === 3) {
    return 'rd';
  } else {
    return 'th';
  }
}


class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.addOne = this.addOne.bind(this)
    this.minusOne = this.minusOne.bind(this)
    this.reset = this.reset.bind(this)
    this.state = {
      count: props.count,
      counterNum: 0
    }
  }

  componentDidMount() {
    const strCount = localStorage.getItem("count")
    if (strCount) {
      const count = parseInt(strCount)
      console.log("Retrieving count from localStorage");
      this.setState(() => ({ count }))
    }
    const strCounterNum = localStorage.getItem("counterNum")
    if (strCounterNum) {
      const counterNum = parseInt(strCounterNum)
      console.log("Retrieving count from localStorage");
      this.setState(() => ({ counterNum }))
    }
  }

  componentDidUpdate(preProps, preState) {
    if (this.state.count != preState.count || this.state.counterNum != preState.counterNum) {
      console.log("Setting localStorage");
      localStorage.setItem("count", this.state.count)
      localStorage.setItem("counterNum", this.state.counterNum)
    }
  }

  addOne() {
    console.log("Add 1");
    this.setState((prevState) => ({ count: prevState.count + 1 }))
  }
  minusOne() {
    console.log("Minus 1");
    this.setState((prevState) => ({ count: prevState.count - 1 }))
  }
  reset() {
    console.log("Reset");
    this.setState((prevState) => ({ count: 0, counterNum: prevState.counterNum + 1 }))
    // older-style syntax (can be problematic due to async)
    // this.setState({ count: 0, counterNum: this.state.counterNum + 1 });
  }
  render() {
    return (
      <div>
        <h1>{`${this.state.counterNum}${ordinalIndicator(this.state.counterNum)} Counter:`}{this.state.count}</h1>
        <button onClick={this.addOne}>+1</button>
        <button onClick={this.minusOne}>-1</button>
        <button onClick={this.reset}>reset</button>
      </div>
    )
  }
}

Counter.defaultProps = {
  count: 0
}

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<Counter />)