import React, { Component } from "react";

export default class EducationForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { updateState, view } = this.props;
    const [viewType, viewNo] = view.split("_");
    updateState(e.target.value, viewType, e.target.name, Number(viewNo));
  }
  render() {
    const { institution, subject, qualification, from, to } =
      this.props.education;
    const { view } = this.props;
    const educationNo = Number(view.split("_")[1]);

    return (
      <div className="inputFields">
        <h1>{`Education ${educationNo + 1}`}</h1>
        <label htmlFor="institution">Institution:</label>
        <input
          type="text"
          name="institution"
          id="institution"
          value={institution}
          required
          onChange={this.handleChange}
        />
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={subject}
          required
          onChange={this.handleChange}
        />
        <label htmlFor="position">Qualification:</label>
        <input
          type="text"
          name="qualification"
          id="qualification"
          value={qualification}
          required
          onChange={this.handleChange}
        />
        <label htmlFor="from">Start Date:</label>
        <input
          type="text"
          name="from"
          id="from"
          value={from}
          required
          onChange={this.handleChange}
        />
        <label htmlFor="to">End Date:</label>
        <input
          type="text"
          name="to"
          id="to"
          value={to}
          required
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
