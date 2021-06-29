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
        console.log(this.state);
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
        console.log(this.state);
        this.readyToRender();
      }
    );
  }
  readyToRender() {
    // for (const value of Object.values(this.state)) {
    //   if (typeof value === "string") {
    //     continue;
    //   }
    //   for (const subValue of Object.values(value)) {
    //     if (!subValue) {
    //       return;
    //     }
    //   }
    // }
    // this.setState({ isComplete: true });
    for (const value of Object.values(this.state)) {
      console.log({ value });
      if (typeof value === "string" || typeof value === "boolean") {
        // 'view' or 'isComplete' properties
        continue;
      } else if (typeof value === "object") {
        // 'about'
        for (const subValue of Object.values(value)) {
          console.log({ subValue });
          // if (!subValue) {
          //   return;
          // }
        }
      } else if (value.isArray()) {
        // experience or education array
        if (
          !value.every((item) => {
            for (const arraySubValue of Object.values(item)) {
              console.log({ arraySubValue });
              if (!arraySubValue) {
                return false;
              }
            }
            return true;
          })
        ) {
          // Array.prototype.every returns false
          return;
        }
      }
    }
    // everything complete (theoretically)
    console.log("READY TO RENDER");
  }
  updateState(value, prop, subProp, index = null) {
    const newState = { ...this.state };
    if (index === null) {
      newState[prop][subProp] = value;
    } else {
      newState[prop][index][subProp] = value;
    }
    this.setState(newState, () => {
      console.log(this.state);
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
        {this.readyToRender() && (
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
