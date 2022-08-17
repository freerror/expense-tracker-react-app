/**
 * @jest-environment jsdom
 */
import React from "react"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Header from "../../components/Header"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"

test('Render Header', async () => {
  const { asFragment } = render(<Header />, { wrapper: BrowserRouter })
  expect(asFragment()).toMatchSnapshot()
})