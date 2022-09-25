import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import createStore from '../store'
import { BrowserRouter } from 'react-router-dom'
import expenses from '../tests/fixtures/expenses'

export function renderWithWrappers(
  ui, {
    // get test data
    preloadedState = { expenses: { items: [...expenses] } },
    // create store with the preloaded test data
    store = createStore(preloadedState),
    ...renderOptions
  } = {}
) {

  // Wrapper for react router and redux for integrated tests
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>
          {children}
        </Provider>
      </BrowserRouter>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function renderWithStoreOnly(
  ui, {
    // get test data
    preloadedState = { expenses: { items: [...expenses] } },
    // create store with the preloaded test data
    store = createStore(preloadedState),
    ...renderOptions
  } = {}
) {

  // Wrapper for react router and redux for integrated tests
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}