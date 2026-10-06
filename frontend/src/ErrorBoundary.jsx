import React from 'react';

export class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { failed: true, error };
  }

  componentDidCatch(error) {
    console.error('OM Stationary render error:', error);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <main className="app-error">
        <div className="panel">
          <h1>We hit a problem loading this page</h1>
          <p>Your cart is saved on this device. Refresh to try again.</p>
          {import.meta.env.DEV && this.state.error && (
            <pre role="alert" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', textAlign: 'left' }}>
              {this.state.error.name}: {this.state.error.message}
            </pre>
          )}
          <button className="btn" onClick={() => window.location.reload()}>Refresh page</button>
        </div>
      </main>
    );
  }
}
