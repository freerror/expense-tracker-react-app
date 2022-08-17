import React from 'react'

function Option(props) {
  return (
    <div className='option'>
      <p className='option__text'>{props.count}. {props.optionName}</p>
      <button className='button button--link' onClick={() => props.remove(props.optionName)}>Remove</button>
    </div>
  )
}

export default Option