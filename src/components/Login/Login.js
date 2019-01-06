import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { notify, ToastContainer } from '../../utilities/toast/notify';
import { loginRequest } from '../../redux/actions/Login/LoginActions';
import '../styles/login.scss';

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginRequest(user))
});

export class ConnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      login,
      history,
    } = this.props;
    const loginResponse = await login(this.state);
    const {
      success,
      message,
    } = loginResponse;
    switch (success) {
    case true:
      notify(message, 'success');
      break;
    default:
      notify(message, 'failure');
    }

    if (success) {
      return setTimeout(() => history.push('/', { prev: 'login' }), 2000);
    }
  };

  render() {
    return (
      <div className="min-height">
        <ToastContainer />
        <div className="form-card">
          <h2 className="center">Welcome back</h2>
          <p className="center">Please login</p>
          <form id="login-form" onSubmit={this.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username"
              onChange={this.handleChange}
              id="username"
              placeholder="Enter your Username..."
              required />
            <label htmlFor="password">Password</label>
            <input type="password"
              onChange={this.handleChange}
              name="password"
              id="password"
              placeholder="Enter your Password"
              required />
            <button type="submit" id="submit" className="btn">Login</button>
            <p id="signup">Don't have an account? <Link to="/signup">Signup </Link></p>
          </form>
        </div>
      </div>
    );
  }
}

ConnectedLogin.propTypes = {
  login: propTypes.func.isRequired,
  history: propTypes.object,
};

const Login = connect(null, mapDispatchToProps)(ConnectedLogin);
export default Login;
