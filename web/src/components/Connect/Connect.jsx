import {
  connect,
} from 'react-redux';

const Connect = connect(
  (state, { mapStateToProps }) => mapStateToProps(state),
  dispatch => ({
    dispatch,
  }),
)(({
  children,
  ...props
}) => children(props));


export default Connect;
