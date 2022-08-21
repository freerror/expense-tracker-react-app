/**
 * @jest-environment jsdom
 */
import React from "react"
import '@testing-library/jest-dom'
import ExpenseDash from "../../components/ExpenseDash"
import { renderWithWrappers } from '../../utils/test-utils'

jest.mock('react-fit')

test("Test expense list item", () => {
  const { asFragment } = renderWithWrappers(<ExpenseDash />)
  expect(asFragment()).toMatchSnapshot()
})