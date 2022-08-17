import React from "react"

function Action(props) {
  return (
    <div>
      <button
        className="big-button"
        onClick={props.pick}
        disabled={props.buttonDisabled}
      >What should I do?</button>
    </div>
  )
}

export default Action