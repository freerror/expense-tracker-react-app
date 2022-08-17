// Challenge:, create another JSX, templateTwo etc
// div 
//   h1 -> Your Name
//   p -> Age
//   p -> Location
//   Render template
const user = {
  name: 'Your Name',
  age: 19,
  location: 'Amurica',
}

function getValue(key, value) {
  if (value) {
    return <p><b>{key}:</b> {value}</p>
  }
}

const templateTwo = (
  <div>
    <h1>{user.name ? user.name : "Anon"}</h1>
    {(user.age > 17) && <p><b>Age: {user.age} </b></p>}
    {getValue("Location", user.location)}
    {null}
    {false}
    {undefined}
  </div>
);
