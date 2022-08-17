/**
 * @jest-environment jsdom
 */
import React from "react"
import '@testing-library/jest-dom'
import NotFoundPage from "../../components/404"
import { renderWithWrappers } from '../../utils/test-utils'

test("Test 404 page", () => {
  const { asFragment } = renderWithWrappers(<NotFoundPage />)
  expect(asFragment()).toMatchSnapshot()
})
