/**
 * @jest-environment jsdom
 */
import React from "react"
import '@testing-library/jest-dom'
import ExpenseDash from "../../components/ExpenseDash"
import { renderWithWrappers } from '../../utils/test-utils'

test("Test expense list item", () => {
  const { asFragment } = renderWithWrappers(<ExpenseDash />)
  expect(asFragment()).toMatchSnapshot()
})