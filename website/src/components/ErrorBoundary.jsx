import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('UI error:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-2xl border border-white/[0.12] bg-[#101E31] p-6">
          <div className="text-sm font-semibold">Something went wrong rendering the page</div>
          <div className="mt-2 text-sm text-[#CBD5E1]">
            This is a temporary dev-friendly error screen so we don’t get silent black pages.
          </div>
          <pre className="mt-4 overflow-auto whitespace-pre-wrap rounded-xl bg-black/5 p-4 text-xs text-[#FFFFFF]">
            {String(this.state.error?.message || this.state.error || 'Unknown error')}
          </pre>
          <div className="mt-4 text-xs text-[#94A3B8]">
            Tip: refresh the page. If it persists, send me the error message above.
          </div>
        </div>
      </div>
    )
  }
}
