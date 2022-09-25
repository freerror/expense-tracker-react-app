/**
 * @jest-environment jsdom
 */
import React from "react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import '@testing-library/jest-dom'
import EditExpense from "../../components/EditExpense"
import ExpenseList from "../../components/ExpenseList"
import { renderWithWrappers, renderWithStoreOnly } from '../../utils/test-utils'
import { fireEvent, screen } from "@testing-library/react"

jest.mock('react-fit')

const mockFn = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockFn
}));

describe("Other behaviours", () => {
  let asFragment;
  beforeEach(() => {
    ({ asFragment } = renderWithWrappers(<EditExpense />))

    // change the date to a set one  (it defaults to today and
    // would change daily otherwise)
    const dateInput = screen.getByLabelText("Date")
    fireEvent.change(dateInput, { target: { value: '2022-08-12' } })

    // mandatory for submit
    const amountInput = screen.getByPlaceholderText("Amount")
    fireEvent.change(amountInput, { target: { value: '123.54' } })

    const descriptionInput = screen.getByPlaceholderText("Description")
    fireEvent.change(descriptionInput, { target: { value: 'abc123' } })
  })
  test("Page render", () => {
    expect(asFragment()).toMatchSnapshot()
  })

  test("Navigate after submit", () => {
    fireEvent.click(screen.getByText(/save expense/i))
    expect(mockFn).lastCalledWith('/app/dashboard')

  })
})