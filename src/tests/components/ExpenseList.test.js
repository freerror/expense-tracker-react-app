/**
 * @jest-environment jsdom
 */
import React from "react"
import '@testing-library/jest-dom'
import ExpenseList from "../../components/ExpenseList"
import ExpenseListFilter from "../../components/ExpenseListFilter"
import { renderWithWrappers } from '../../utils/test-utils'
import { fireEvent, screen } from "@testing-library/react"

jest.mock('react-fit')

test('Render Expense List', async () => {
  const { asFragment } = renderWithWrappers(<ExpenseList />)
  expect(asFragment()).toMatchSnapshot()
})

test('Render Expense List with No items', async () => {
  const { asFragment } = renderWithWrappers(<ExpenseList />, { preloadedState: { expenses: { items: [] } } })
  expect(asFragment()).toMatchSnapshot()
})

describe('Filtering, Sorting etc', () => {
  let asFragment;
  beforeEach(() => {
    ({ asFragment } = renderWithWrappers(
      <>
        <ExpenseListFilter />
        <ExpenseList />
      </>
    ))
  })
  test('Date Descending', () => {
    fireEvent.click(screen.getByText(/descending/i))
    fireEvent.click(screen.getByText(/ascending/i))
    expect(asFragment()).toMatchSnapshot()
  })

  test('Date Ascending', () => {
    fireEvent.click(screen.getByText(/descending/i))
    expect(asFragment()).toMatchSnapshot()
  })

  test('Amount Descending', () => {
    fireEvent.change(screen.getByTestId('select'), { target: { value: 'amount' } })
    expect(asFragment()).toMatchSnapshot()
  })

  test('Amount Ascending', () => {
    fireEvent.change(screen.getByTestId('select'), { target: { value: 'amount' } })
    fireEvent.click(screen.getByText(/descending/i))
    expect(asFragment()).toMatchSnapshot()
  })

  test('Description Descending', () => {
    fireEvent.change(screen.getByTestId('select'), { target: { value: 'description' } })
    expect(asFragment()).toMatchSnapshot()
  })

  test('Description Ascending', () => {
    fireEvent.change(screen.getByTestId('select'), { target: { value: 'description' } })
    fireEvent.click(screen.getByText(/descending/i))
    expect(asFragment()).toMatchSnapshot()
  })

  test('Date Filtering', () => {
    const startAndEndRange = screen.getAllByLabelText("Date Range")
    const toggleButton = screen.getByLabelText("Toggle calendar")
    fireEvent.click(toggleButton)
    // these are actually supposed to be able to change independently
    fireEvent.change(startAndEndRange[0], { target: { value: '2022-08-02' } })
    fireEvent.change(startAndEndRange[1], { target: { value: '2022-08-04' } })
    fireEvent.click(toggleButton)
    expect(asFragment()).toMatchSnapshot()
  })
})