import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4">
          <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#000] p-8 max-w-md">
            <h1 className="text-2xl font-black text-[#e74c3c] mb-4">⚠️ Error Loading App</h1>
            <p className="text-gray-600 mb-4">
              Something went wrong. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#3498db] text-white font-black border-3 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] transition-all"
            >
              REFRESH PAGE
            </button>
            {this.state.error && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-bold">Error Details</summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary


