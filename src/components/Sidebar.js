import React from "react";
import "../styles/Sidebar.css";

export default function Sidebar(props) {
  const { isComplete, changeView, getHeaders, view, getPropLength } = props;
  const { experience, education } = getHeaders();
  const ExperienceList = experience.map((item) => (
    <li key={item.id}>
      {item.establishment || `Experience ${Number(item.id) + 1}`}
    </li>
  ));
  const EducationList = education.map((item) => (
    <li key={item.id}>
      {item.institution || `Education ${Number(item.id) + 1}`}
    </li>
  ));
  let RenderButton;
  if (!isComplete) {
    RenderButton = (
      <div className="cannotrender">
        <p>Please complete form</p>
      </div>
    );
  } else {
    if (view === "render") {
      RenderButton = (
        <div className="canrender">
          <button
            onClick={() =>
              changeView(`education_${getPropLength("education") - 1}`)
            }
          >
            Edit CV
          </button>
        </div>
      );
    } else {
      RenderButton = (
        <div className="canrender">
          <button onClick={() => changeView("render")}>Render CV</button>
        </div>
      );
    }
  }
  return (
    <div className="sidebar">
      <ul className="formlist">
        <li>About Me</li>
        <li>
          Experience
          <ul>{ExperienceList}</ul>
        </li>
        <li>
          Education
          <ul>{EducationList}</ul>
        </li>
      </ul>
      {RenderButton}
    </div>
  );
}
