/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Help from '../../components/Help'
import '@testing-library/jest-dom'

test('Render Header', async () => {
  render(<Help />)
  await waitFor(() => {
    screen.getByText('This is from my help page')
  })

  expect(screen.getByRole("heading")).toHaveTextContent('help page')
})