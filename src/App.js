import "./styles/App.css";
import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import RenderCV from "./components/RenderCV";
import Form from "./components/Form";

export default class App extends Component {
  constructor() {
    super();
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.readyToRender = this.readyToRender.bind(this);
    this.updateState = this.updateState.bind(this);
    this.changeView = this.changeView.bind(this);
    this.getPropLength = this.getPropLength.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.state = {
      about: {
        fullName: "",
        profession: "",
        email: "",
        phone: "",
      },
      education: [
        {
          institution: "",
          subject: "",
          qualification: "",
          from: "",
          to: "",
          id: "0",
        },
      ],
      experience: [
        {
          establishment: "",
          position: "",
          responsibilities: "",
          from: "",
          to: "",
          id: "0",
        },
      ],
      view: "about",
      isComplete: false,
    };
  }
  addItem(type) {
    const blankItem =
      type === "education"
        ? {
            institution: "",
            subject: "",
            qualification: "",
            from: "",
            to: "",
            id: this.state.education.length.toString(),
          }
        : {
            establishment: "",
            position: "",
            responsibilities: "",
            from: "",
            to: "",
            id: this.state.experience.length.toString(),
          };
    this.setState(
      (prevState) => ({
        [type]: [...prevState[type], blankItem],
        view: `${type}_${prevState[type].length}`,
      }),
      () => {
        this.readyToRender();
      }
    );
  }
  removeItem(type, id) {
    this.setState(
      (prevState) => {
        const newProp = prevState[type].filter((item) => item.id !== id);
        newProp.forEach(
          (item) =>
            (item.id = item.id > id ? Number(item.id - 1).toString() : item.id)
        );
        return { [type]: newProp, view: `${type}_${id - 1}` };
      },
      () => {
        this.readyToRender();
      }
    );
  }
  readyToRender() {
    const aboutValues = Object.values(this.state.about);
    if (aboutValues.some((subValue) => !subValue)) {
      // empty about subvalue
      this.state.isComplete &&
        this.setState({ isComplete: false }, () => console.log(this.state));
      return;
    }
    for (const prop of Object.values(this.state)) {
      if (!Array.isArray(prop)) {
        // is not 'education' or 'experience' (array properties)
        continue;
      }
      // 'education' or 'experience'
      if (
        prop.some((item) => {
          if (Object.values(item).some((subValue) => !subValue)) {
            // empty array item subvalue
            return true;
          }
          return false;
        })
      ) {
        // array item with empty value
        this.state.isComplete &&
          this.setState({ isComplete: false }, () => console.log(this.state));
        return;
      }
    }
    // all fields are filled
    !this.state.isComplete &&
      this.setState({ isComplete: true }, () => console.log(this.state));
  }
  updateState(value, prop, subProp, index = null) {
    const newState = { ...this.state };
    if (index === null) {
      newState[prop][subProp] = value;
    } else {
      newState[prop][index][subProp] = value;
    }
    this.setState(newState, () => {
      this.readyToRender();
    });
  }
  changeView(view) {
    this.setState({ view });
  }
  getPropLength(prop) {
    return this.state[prop].length;
  }
  getHeaders() {
    return {
      experience: this.state.experience.map((item) => ({
        establishment: item.establishment,
        id: item.id,
      })),
      education: this.state.education.map((item) => ({
        institution: item.institution,
        id: item.id,
      })),
    };
  }
  getUserData() {
    return {
      about: this.state.about,
      experience: this.state.experience,
      education: this.state.education,
    };
  }
  render() {
    const { view } = this.state;
    let stateProp;
    if (view === "about") {
      stateProp = this.state.about;
    } else if (view !== "render") {
      // CHECK ABOVE!!
      const [viewType, viewNo] = view.split("_");
      stateProp = this.state[viewType].find((item) => item.id === viewNo);
    }
    return (
      <div className="App">
        <Sidebar
          isComplete={this.state.isComplete}
          getHeaders={this.getHeaders}
          changeView={this.changeView}
          view={view}
          getPropLength={this.getPropLength}
        />
        <main>
          {view === "render" ? (
            <RenderCV getUserData={this.getUserData} />
          ) : (
            <Form
              obj={stateProp}
              view={view}
              updateState={this.updateState}
              changeView={this.changeView}
              addItem={this.addItem}
              removeItem={this.removeItem}
              getPropLength={this.getPropLength}
            />
          )}
        </main>
      </div>
    );
  }
}
