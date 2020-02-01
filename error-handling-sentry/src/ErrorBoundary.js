import React from 'react';
import PropTypes from 'prop-types';

const noop = () => {}

export default class ErrorBoundary extends React.Component {

  static propTypes = {
    capture: PropTypes.func,
  }

  static defaultProps = {
    capture: noop,
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null
    };
  }

  // static getDerivedStateFromError(error) {
  //   console.info('getDerivedStateFromError', arguments)
  //   return { error };
  // }

  componentDidCatch(error, errorInfo) {
    console.info('componentDidCatch', arguments)
    this.props.capture(error)
    // setting state here is deprecated
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo } = this.state;

    if (error) {
      return (
        <div>
          <h2>doof</h2>
          <p>{error.message}</p>
          <pre>{errorInfo && errorInfo.componentStack}</pre>
        </div>
      )
    }

    return children;
  }
}

