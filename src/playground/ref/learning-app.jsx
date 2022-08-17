console.log("App.js is running!");

// if statements
// ternary operators


// JSX (JavaScript XML) a language extension for JavaScript

// Challenge: Create app object title/subtitle
// user title/sub in the template
// render template
const app = {
  title: 'Indecision App!',
  subtitle: 'Make decisions easily!',
  options: []
}


const onFormSubmit = (e) => {
  e.preventDefault();

  console.log('form submitted');

  const option = e.target.elements.option.value;
  if (option) {
    app.options.push(option);
  }

  e.target.elements.option.value = '';

  render()
};

const removeAllOptions = () => { app.options = []; render() }

const makeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length)
  alert(app.options[randomNum])
};

// This is how react elements get to the DOM
const appRoot = document.getElementById("app");

const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      <p>{app.subtitle && app.subtitle}</p>
      <h2>{app.options.length > 0 ? "Options:" : `No options!`}</h2>
      <button disabled={!app.options.length} onClick={makeDecision}>What should I do!?</button>
      <ol>
        {app.options.map((opt) => {
          return <li key={opt}>{opt}</li>
        })}
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add option</button>
      </form>
      <button onClick={removeAllOptions}>Remove all!</button>
    </div>
  );
  ReactDOM.render(template, appRoot);
}

render()