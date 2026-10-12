import React, { useState } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router';

/**
 * Class ErrorBoundary to catch React render & lifecycle errors across the component tree.
 * Designed for high reliability & 1M+ user scale applications.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log error to telemetry service (Sentry, LogRocket, Datadog, etc.)
    console.error('[ErrorBoundary] Caught runtime error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallbackUI
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      );
    }
    return this.props.children;
  }
}

/**
 * Route Error Element for React Router createBrowserRouter errorElement handling.
 */
export default function ErrorBoundPage() {
  const routeError = useRouteError();
  let errorMessage = 'An unexpected error occurred on this page.';
  let errorDetails = null;

  if (isRouteErrorResponse(routeError)) {
    errorMessage = `${routeError.status} ${routeError.statusText}`;
    errorDetails = routeError.data ? JSON.stringify(routeError.data, null, 2) : routeError.statusText;
  } else if (routeError instanceof Error) {
    errorMessage = routeError.message;
    errorDetails = routeError.stack;
  } else if (routeError) {
    errorMessage = String(routeError);
  }

  const handleReset = () => {
    window.location.href = '/';
  };

  return (
    <ErrorFallbackUI
      error={{ message: errorMessage, stack: errorDetails }}
      onReset={handleReset}
    />
  );
}

/**
 * Shared, modern, product-level error fallback user interface.
 */
function ErrorFallbackUI({ error, errorInfo, onReset }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="error-boundary-wrapper">
      <div className="error-boundary-card">
        <div className="error-icon-wrapper">
          <svg className="error-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="error-title">Something went wrong</h1>
        <p className="error-subtitle">
          We encountered an unexpected error while loading this component. Don't worry, your data is safe and our system is designed to recover gracefully.
        </p>

        <div className="error-actions">
          <button className="error-btn error-btn-primary" onClick={() => window.location.reload()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
            Refresh Page
          </button>
          <button className="error-btn error-btn-secondary" onClick={onReset}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Go to Home
          </button>
        </div>

        {error && (
          <div className="error-details-container">
            <button 
              className="error-details-toggle"
              onClick={() => setShowDetails(!showDetails)}
            >
              <span>{showDetails ? 'Hide technical logs' : 'View technical details'}</span>
              <svg 
                className={`chevron-icon ${showDetails ? 'open' : ''}`} 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            {showDetails && (
              <pre className="error-details-log">
                {error.message || String(error)}
                {error.stack && `\n\n${error.stack}`}
                {errorInfo?.componentStack && `\n\nComponent Stack:\n${errorInfo.componentStack}`}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
