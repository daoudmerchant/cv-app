import React, { Component } from "react";
import "../styles/FormButtons.css";

export default class FormButtons extends Component {
  render() {
    const toUpperCase = (string) =>
      string.charAt(0).toUpperCase().concat(string.slice(1));
    const { view, getPropLength, changeView, removeItem } = this.props;
    let nextFormButton;
    let prevFormButton;
    let addNewButton;
    let deleteCurrentButton;
    if (view === "about") {
      // About view
      nextFormButton = (
        <button key="next" type="submit" value="experience_0">
          Experience 1
        </button>
      );
    } else {
      // Education or experience

      const [viewType, viewNo] = view.split("_");

      if (Number(viewNo) === getPropLength(viewType) - 1) {
        // last of type

        if (viewType === "experience") {
          // experience advances to education
          nextFormButton = (
            <button key="next" type="submit" value="education_0">
              Education 1
            </button>
          );
        }

        // education does not advance

        // can add new if last of type
        addNewButton = (
          <button
            key="add"
            type="submit"
            value={`${viewType}_${Number(viewNo) + 1}`}
          >
            + {toUpperCase(viewType)}
          </button>
        );
      } else {
        // exists higher number of type
        nextFormButton = (
          <button
            key="next"
            type="submit"
            value={`${viewType}_${Number(viewNo) + 1}`}
          >{`${toUpperCase(viewType)} ${Number(viewNo) + 2}`}</button>
        );
      }

      if (viewNo === "0") {
        // first of type

        if (viewType === "experience") {
          // Experience 1
          prevFormButton = (
            <button
              key="previous"
              className="backbutton"
              onClick={(e) => {
                changeView("about");
                e.preventDefault();
              }}
            >
              About Me
            </button>
          );
        } else if (viewType === "education") {
          // Education 1
          const lastExperienceIndex = getPropLength(viewType) - 1;
          prevFormButton = (
            <button
              key="previous"
              onClick={(e) => {
                changeView(`experience_${lastExperienceIndex}`);
                e.preventDefault();
              }}
            >{`Experience ${lastExperienceIndex + 1}`}</button>
          );
        }
      } else {
        // is experience/education 2 or more
        deleteCurrentButton = (
          <button
            key="delete"
            onClick={(e) => {
              removeItem(viewType, viewNo);
              e.preventDefault();
            }}
          >{`Delete Current ${toUpperCase(viewType)}`}</button>
        );
        prevFormButton = (
          <button
            key="previous"
            className="backbutton"
            onClick={(e) => {
              changeView(`${viewType}_${viewNo - 1}`);
              e.preventDefault();
            }}
          >{`${toUpperCase(viewType)} ${viewNo}`}</button>
        );
      }
    }

    const Buttons = [
      prevFormButton,
      deleteCurrentButton,
      addNewButton,
      nextFormButton,
    ].filter((button) => button);

    let containerJustify;
    switch (Buttons.length) {
      case 1:
        containerJustify = { justifyContent: "flex-end" };
        break;
      case 2:
        containerJustify = { justifyContent: "space-between" };
        break;
      default:
        containerJustify = { justifyContent: "center" };
        break;
    }
    return (
      <div className="buttonContainer" style={containerJustify}>
        {Buttons}
      </div>
    );
  }
}
