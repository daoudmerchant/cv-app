import React from "react";

export default function Sidebar(props) {
  const { isComplete, changeView, getHeaders, view } = props;
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
    RenderButton = <p>Please complete form</p>;
  } else {
    if (view === "render") {
      RenderButton = <button>Edit CV</button>;
    } else {
      RenderButton = (
        <button onClick={() => changeView("render")}>Render CV</button>
      );
    }
  }
  return (
    <div>
      <ul>
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
