import React from 'react';
import { Button } from './Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bgDark flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
            <span className="text-2xl text-red-400">!</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-textLight mb-2">
            Something went wrong
          </h1>
          <p className="text-textMuted max-w-md mb-6 font-body text-sm">
            An unexpected error occurred. Please try reloading the page or contact Gowtham directly.
          </p>
          <Button onClick={() => window.location.reload()} variant="primary">
            Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
