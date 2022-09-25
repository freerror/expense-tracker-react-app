/**
 * @jest-environment jsdom
 */
import React from "react"
import Header from "../../components/Header"
import '@testing-library/jest-dom'
import { renderWithWrappers } from '../../utils/test-utils'

test('Render Header', async () => {
  const { asFragment } = renderWithWrappers(<Header />)
  expect(asFragment()).toMatchSnapshot()
})