import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../styles/signup.scss';
import '../styles/styles.scss';
import { signupRequest } from '../../redux/actions/signup/signupAction';
import { notify, ToastContainer } from '../../utilities/toast/notify';
import 'react-toastify/dist/ReactToastify.css';

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: user => dispatch(signupRequest(user))
  };
};

const mapStateToProps = (state) => {
  return {
    registerUser: state.signupReducer,
  };
};

export class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      gender: '',
      username: '',
      password: '',
      email: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      signupUser,
      history,
    } = this.props;
    const userInfo = await signupUser(this.state);
    const {
      success,
      message
    } = userInfo;
    switch (success) {
    case true:
      notify(message, 'success');
      break;
    default:
      return notify(message, 'failure');
    }
    if (success) {
      return setTimeout(() => history.push('/'), 2000);
    }
  }

  render() {
    const {
      fullname,
      gender,
      username,
      password,
      email,
    } = this.state;
    return (
      <div className="min-height">
        <ToastContainer />
        <form className="form-card form-group" onSubmit= {this.handleSubmit}>
          <h2 className="center">Signup</h2>
          <label htmlFor="fullname">Fullname</label>
          <input type="text" id="fullname"
            value={fullname} onChange={this.handleChange}
            placeholder="Enter your fullname" required />

          <label htmlFor="gender">Gender</label>
          <select id="gender" className="label"
            value= {gender}
            onChange={this.handleChange}>
            <option value="">SELECT YOUR GENDER</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
          <label htmlFor="username">Username</label>
          <input type="text" id="username"
            value={username}
            onChange={this.handleChange}
            placeholder="Enter your username" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Enter your password" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Enter your valid email" required />
          <button type="submit" className="">SIGNUP</button>
        </form>
      </div>
    );
  }
}
SignupComponent.propTypes = {
  signupUser: propTypes.func.isRequired,
  history: propTypes.object,
};

const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
export default Signup;
