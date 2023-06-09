
import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(_) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <span>Не удалось загрузить компонент микросервиса</span>;
    }

    return this.props.children;
  }
}
