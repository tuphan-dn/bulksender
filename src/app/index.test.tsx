import { render, screen } from '@testing-library/react'
import App from 'app'

test('renders home contents', () => {
  render(<App />)
  const linkElement = screen.getByText(/Micro Frontend and Module Federation./i)
  expect(linkElement).toBeInTheDocument()
})
