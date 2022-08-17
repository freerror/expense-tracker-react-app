// Higher Order Component (HOC) - A component that renders another component
// - reuse code
// - render hijacking
// - prop manipulation
// - abstract state

import React from 'react'
import ReactDOM from 'react-dom/client'

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
)

const withWarning = (WrappedComponent) => (
  (props) => (
    <div>
      {props.isPrivate && <p>Warning: This is private, do NOT share.</p>}
      <WrappedComponent {...props} />
    </div>
  )
)

const requireAuth = (WrappedComponent) => (
  (props) => (
    <div>
      {
        props.isAuth ? (
          <WrappedComponent {...props} />
        ) : (
          <h2>You must be logged in to view this.</h2>
        )
      }
    </div>
  )
)

// requireAuth
const AdminInfo = withWarning(Info)
const AuthInfo = requireAuth(AdminInfo)

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<AuthInfo isAuth={false} isPrivate={true} info="These are the deets" />)