import React, { Component } from "react";
import AboutForm from "./AboutForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import FormButtons from "./FormButtons";
import "../styles/Form.css";

export default class Form extends Component {
  constructor() {
    super();
    this.submitAndAdvance = this.submitAndAdvance.bind(this);
  }
  submitAndAdvance(e) {
    /*
    Ideally, both advance view and add new only work IF form is filled out
    Therefore, they only activate on form submit
    Therefore, the buttons have to be listed as submit buttons
    But as soon as I run the 'addItem' function, no user object is
    passed to the ExperienceForm component...?
    */
    e.preventDefault();

    const { changeView, getPropLength, addItem } = this.props;
    const nextView = e.nativeEvent.submitter.value;
    const [nextViewType, nextViewNo] = nextView.split("_");

    if (getPropLength(nextViewType) === Number(nextViewNo)) {
      // doesn't exist yet
      addItem(nextViewType);
    } else {
      // exists
      changeView(nextView);
    }
  }
  render() {
    const { view, obj, updateState, changeView, getPropLength, removeItem } =
      this.props;
    if (view === "about") {
      return (
        <form onSubmit={this.submitAndAdvance}>
          <AboutForm user={obj} updateState={updateState} view={view} />
          <FormButtons
            view={view}
            getPropLength={getPropLength}
            changeView={changeView}
            removeItem={removeItem}
          />
        </form>
      );
    } else if (view.includes("experience")) {
      return (
        <form onSubmit={this.submitAndAdvance}>
          <ExperienceForm
            experience={obj}
            updateState={updateState}
            view={view}
          />
          <FormButtons
            view={view}
            getPropLength={getPropLength}
            changeView={changeView}
            removeItem={removeItem}
          />
        </form>
      );
    } else if (view.includes("education")) {
      return (
        <form onSubmit={this.submitAndAdvance}>
          <EducationForm
            education={obj}
            updateState={updateState}
            view={view}
          />
          <FormButtons
            view={view}
            getPropLength={getPropLength}
            changeView={changeView}
            removeItem={removeItem}
          />
        </form>
      );
    }
  }
}
