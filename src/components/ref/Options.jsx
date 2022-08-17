import React from "react";
import Option from './Option.jsx'

function Options(props) {
  return (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">Your Options</h3>
        <button className="button button--link" onClick={props.removeAll}>Remove all</button>
      </div>
      {props.options.map((option, index) => (
        <Option
          remove={props.remove}
          key={option}
          count={index + 1}
          optionName={option} />
      ))}
    </div>
  )
}

export default Options