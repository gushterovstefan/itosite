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
      <div className="min-h-dvh bg-[#07111F] px-4 py-20 text-[#F8FAFC]">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/[0.12] bg-[#101E2F] p-6 shadow-[0_22px_90px_-60px_rgba(0,0,0,0.85)] md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">Page loading issue</div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">We’re having trouble loading this page.</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1] md:text-base">
            Please refresh the page or contact IT Outsource if the problem continues.
          </p>
          <a href="/contacts" className="mt-6 inline-flex rounded-full bg-[#2F80ED] px-5 py-2.5 text-sm font-semibold text-[#0F172A]">
            Contact Us
          </a>
        </div>
      </div>
    )
  }
}
