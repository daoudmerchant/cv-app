import "./styles/App.css";
import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import Render from "./components/Render";
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
  render() {
    const { view } = this.state;
    let stateProp;
    if (view === "about") {
      stateProp = this.state.about;
    } else {
      const [viewType, viewNo] = view.split("_");
      stateProp = this.state[viewType].find((item) => item.id === viewNo);
    }
    return (
      <div className="App">
        <Sidebar />
        <main>
          {view === "render" ? (
            <Render />
          ) : (
            <Form
              obj={stateProp}
              view={this.state.view}
              updateState={this.updateState}
              changeView={this.changeView}
              addItem={this.addItem}
              removeItem={this.removeItem}
              getPropLength={this.getPropLength}
            />
          )}
        </main>
        {this.state.isComplete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              this.setState({ view: "render" });
            }}
          >
            Render CV
          </button>
        )}
      </div>
    );
  }
}
