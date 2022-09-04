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
    expect(mockFn).lastCalledWith('/')

  })
})
describe("Expected result from editing", () => {
  let asFragment;
  beforeEach(() => {
    // Since the route determines the id being editted have to set up a
    // react-router-dom implementation
    ({ asFragment } = renderWithStoreOnly(
      <>
        <MemoryRouter initialEntries={['/edit/abc123']} >
          <Routes>
            <Route path="/edit/:id" element={<EditExpense />} />
          </Routes>
        </MemoryRouter>
        <ExpenseList />
      </>
    ))
    const dateInput = screen.getByLabelText("Date")
    fireEvent.change(dateInput, { target: { value: '2022-08-12' } })

    const amountInput = screen.getByPlaceholderText("Amount")
    fireEvent.change(amountInput, { target: { value: '123.54' } })

    const descriptionInput = screen.getByPlaceholderText("Description")
    fireEvent.change(descriptionInput, { target: { value: 'abc123' } })

  })

  test("save changes", () => {
    fireEvent.click(screen.getByText(/save expense/i))
    expect(asFragment()).toHaveTextContent('abc123 - $123.54 on 2022/08/12T00:00')
  })
  test("delete", () => {
    fireEvent.click(screen.getByText(/delete/i))
    expect(asFragment()).not.toHaveTextContent('b test description details - $140.00 on 2022/08/01T00:00')
  })
})