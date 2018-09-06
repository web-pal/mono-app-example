// @flow
import React from 'react';
import {
  connect,
} from 'react-redux';


type Props = {
  initialState: any,
  handlers: any,
  componentDidMount?: () => void,
  componentWillUpdate?: () => void,
  componentWillUnmount?: () => void,
  children?: React.Node,
};

class ConnectWithLifeCycle extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = props.initialState || {};
    this.handlers = (
      Object.keys(props.handlers || {})
        .reduce(
          (
            handlers,
            handlerName,
          ) => {
            handlers[handlerName] = args => ( // eslint-disable-line
              props.handlers[handlerName](this.props)(args)
            );
            return handlers;
          },
          {},
        )
    );
  }

  componentDidMount() {
    const { componentDidMount } = this.props;
    if (componentDidMount) {
      componentDidMount(this.props);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { componentWillUpdate } = this.props;
    if (componentWillUpdate) {
      componentWillUpdate(nextProps, nextState);
    }
  }

  componentWillUnmount() {
    const { componentWillUnmount } = this.props;
    if (componentWillUnmount) {
      componentWillUnmount(this.props);
    }
  }

  getRenderedComponent() {
    return this.component;
  }

  render() {
    const { children } = this.props;
    return children(
      this.props,
      {
        handlers: this.handlers,
        setState: (updater, callback) => this.setState(updater, callback),
        state: this.state,
        ref: el => this.component = el, // eslint-disable-line
      },
    );
  }
}

ConnectWithLifeCycle.defaultProps = {
  componentDidMount: null,
  componentWillUpdate: null,
  componentWillUnmount: null,
  children: null,
};

export default connect(
  (state, { mapStateToProps, ...props }) => (
    mapStateToProps ? mapStateToProps(state, props) : {}
  ),
  dispatch => ({
    dispatch,
  }),
)(ConnectWithLifeCycle);
