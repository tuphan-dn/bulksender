import { Component, ReactNode } from 'react'

interface Props {
  children?: ReactNode
  defaultChildren: ReactNode
}

interface State {
  failed: boolean
}

/**
 * Error Boundary
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      failed: false,
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.children !== this.props.children)
      return this.setState({ failed: false })
  }

  // Reference: https://reactjs.org/docs/error-boundaries.html
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { failed: true }
  }

  render() {
    const { failed } = this.state
    const { children, defaultChildren } = this.props

    if (failed || !children) return defaultChildren
    return children
  }
}

export default ErrorBoundary
