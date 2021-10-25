import { render, screen } from '@testing-library/react'
import View from 'os/view'

test('renders home contents', () => {
  render(<View />)
  const linkElement = screen.getByText(/Micro Frontend and Module Federation./i)
  expect(linkElement).toBeInTheDocument()
})
