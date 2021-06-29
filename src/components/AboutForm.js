import React, { Component } from "react";

export default class AboutForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { updateState, view } = this.props;
    updateState(e.target.value, view, e.target.name);
  }
  render() {
    const { fullName, profession, email, phone } = this.props.user;
    return (
      <div className="inputFields">
        <h1>About Me</h1>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={fullName}
          required
          onChange={this.handleChange}
        />
        <label htmlFor="profession">Profession:</label>
        <input
          type="text"
          name="profession"
          id="profession"
          value={profession}
          required
          onChange={this.handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          required
          onChange={this.handleChange}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={phone}
          required
          pattern="[0-9 ()+]+"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
