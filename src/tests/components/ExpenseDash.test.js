/**
 * @jest-environment jsdom
 */
import React from "react"
import '@testing-library/jest-dom'
import { waitFor } from "@testing-library/react"
import ExpenseDash from "../../components/ExpenseDash.jsx"
import { renderWithWrappers } from '../../utils/test-utils'

test("Test expense list", async () => {
  const { getByText, asFragment } = renderWithWrappers(
    <React.Suspense fallback="Test Loading">
      <ExpenseDash />
    </React.Suspense>
  )
  await waitFor(() => {
    expect(getByText(/totalling/i)).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

})