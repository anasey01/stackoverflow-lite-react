import React, { Component } from "react";
import Input from '../presentational/Input';

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    console.log(event.target.value)
    console.log(this.state.value);
    this.setState({ value: event.target.value });
  }

  render() {
    const { value } = this.state;
    return (
      <form id="fullname">
        <Input text="SEO title" label="fullname" type="text" id="name" value={value} handleChange={this.handleChange}
        placeholder="Enter your fullname" />
      </form>
    );
  }
}
export default FormContainer;