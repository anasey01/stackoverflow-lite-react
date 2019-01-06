import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logoutRequest } from '../../redux/actions/Login/LoginActions';

export const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(logoutRequest()),
});
export class ConnectedLogout extends Component {
  componentDidMount() {
    this.logoutUser();
  }

  logoutUser = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('signup');
    this.props.userLogout();
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}

ConnectedLogout.propTypes = {
  userLogout: propTypes.func.isRequired,
  history: propTypes.object,
};

const Logout = connect(null, mapDispatchToProps)(ConnectedLogout);
export default Logout;
