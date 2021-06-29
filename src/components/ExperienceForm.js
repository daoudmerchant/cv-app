import React, { Component } from "react";

export default class ExperienceForm extends Component {
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
    const { establishment, position, responsibilities, from, to } =
      this.props.experience;
    const { view } = this.props;
    const experienceNo = Number(view.split("_")[1]);

    return (
      <div className="inputFields">
        <h1>{`Experience ${experienceNo + 1}`}</h1>
        <label htmlFor="establishment">Establishment:</label>
        <input
          type="text"
          name="establishment"
          id="establishment"
          value={establishment}
          required
          onChange={this.handleChange}
        />
        <label htmlFor="position">Position:</label>
        <input
          type="text"
          name="position"
          id="position"
          value={position}
          required
          onChange={this.handleChange}
        />
        <label htmlFor="responsibilities">Responsibilities:</label>
        <input
          type="textarea"
          name="responsibilities"
          id="responsibilities"
          value={responsibilities}
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
