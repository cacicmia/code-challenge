"use client";
import { Component, ErrorInfo, ReactNode } from "react";
interface Props {
  children?: ReactNode;
  errorMessage?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: "",
  };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      errorMessage: error.message || "Something went wrong",
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo, this.state);
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>;
    }

    return this.props.children;
  }
}
