/**
 * @jest-environment jsdom
 */
import React from "react"
import '@testing-library/jest-dom'
import ExpenseForm from "../../components/ExpenseForm"
import { renderWithWrappers } from '../../utils/test-utils'
import { fireEvent, screen } from "@testing-library/react"

jest.mock('react-fit')

describe("Rendering", () => {
  let asFragment;
  beforeEach(() => {
    ({ asFragment } = renderWithWrappers(<ExpenseForm />))
    const dateInput = screen.getByLabelText("Date")
    fireEvent.change(dateInput, { target: { value: '2022-08-12' } })
  })

  test('Render expense form', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  test('Render expense form with values', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  test("set new date on date change", () => {
    const newValue = '2022-08-10'
    const dateInput = screen.getByLabelText("Date")
    fireEvent.change(dateInput, { target: { value: newValue } })
    expect(dateInput).toHaveValue(newValue)
  })

  test('Render error for invalid values', () => {
    fireEvent.click(screen.getByText("Save Expense"))
    expect(asFragment()).toHaveTextContent("Error: Missing Description or Amount")
  })

  test('Reject invalid values', () => {
    const amountInput = screen.getByPlaceholderText("Amount")
    fireEvent.change(amountInput, { target: { value: 'abc' } })
    expect(amountInput).toHaveValue('')
  })


})
test("onSubmit of form returns the correct object", () => {
  const spy = jest.fn()
  renderWithWrappers(<ExpenseForm onSubmit={spy} />)

  const amountInput = screen.getByPlaceholderText("Amount")
  fireEvent.change(amountInput, { target: { value: '123.54' } })

  const descriptionInput = screen.getByPlaceholderText("Description")
  fireEvent.change(descriptionInput, { target: { value: 'abc123' } })

  const noteInput = screen.getByPlaceholderText("Notes (optional)")
  fireEvent.change(noteInput, { target: { value: 'abc123' } })

  const dateInput = screen.getByLabelText("Date")
  fireEvent.change(dateInput, { target: { value: '2022-08-12' } })

  // submission
  fireEvent.click(screen.getByText(/save expense/i))
  expect(spy.mock.lastCall[0]).toMatchObject({
    amount: 12354,
    description: 'abc123',
    note: 'abc123',
    createdAt: 1660219200000
  })
})

