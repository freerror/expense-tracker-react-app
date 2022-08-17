/**
 * @jest-environment jsdom
 */
import React from "react"
import '@testing-library/jest-dom'
import expenses from "../fixtures/expenses"
import ExpenseListItem from "../../components/ExpenseListItem"
import { renderWithWrappers } from '../../utils/test-utils'

test("Test expense list item", () => {
  const { asFragment } = renderWithWrappers(<ExpenseListItem {...expenses[0]} />)
  expect(asFragment()).toMatchSnapshot()
})