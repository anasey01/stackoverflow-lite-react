import React, { Component } from "react";
import { connect } from 'react-redux';
import '../stylesheets/signup.scss';
import '../stylesheets/styles.scss';
import signupUser from '../redux/actions/signup';

const mapDispatchToProps = dispatch => {
  return {
    signupUser: user => dispatch(signupUser(user))
  };
};

const mapStateToProps = (state) => {
  const {
    fullname,
    gender,
    username,
    password,
    email,
  } = state;
  return {
    fullname,
    gender,
    username,
    password,
    email,
  }
}

class SignupComponent extends Component {
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

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/auth/signup'
      window.fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(this.state)
      })
      .then((response) => response.json())
      .then((response) => console.log(response));

    this.props.signupUser(this.state)
    this.setState({
      [event.target.id] : '',
    });
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
      <form className="form-card form-group" onSubmit= {this.handleSubmit}>
        <label htmlFor="fullname">Fullname</label>
        <input type="text" id="fullname"
        value={fullname} onChange={this.handleChange}
        placeholder="Enter your fullname" />

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
        placeholder="Enter your username" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password"
        value={password} 
        onChange={this.handleChange}
        placeholder="Enter your password" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email"
        value={email}
        onChange={this.handleChange}
        placeholder="Enter your valid email" />
        <button type="submit" className="">SIGNUP</button>
      </form>
    );
  }
}

const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
export default Signup;