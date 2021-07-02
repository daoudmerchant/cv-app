import React from "react";
import "../styles/RenderCV.css";

export default function RenderCV(props) {
  const { about, education, experience } = props.getUserData();
  return (
    <div className="cv">
      <div className="cvheader">
        <h1 className="cvname">{about.fullName}</h1>
        <h2 className="cvprofession">{about.profession}</h2>
        <div className="cvcontact">
          <p className="cvphone">☎: {about.phone}</p>
          <p className="cvemail">✉: {about.email}</p>
        </div>
      </div>
      <table className="cvtable">
        <caption>Experience</caption>
        <tbody>
          {experience.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <tr>
                  <th className="cvdates" scope="row" rowSpan="3">
                    {item.from} - {item.to}
                  </th>
                  <th className="cvestablishment">{item.establishment}</th>
                </tr>
                <tr>
                  <td className="cvposition">{item.position}</td>
                </tr>
                <tr>
                  <td className="cvresponsibilities">
                    {item.responsibilities}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <table className="cvtable">
        <caption>Education</caption>
        <tbody>
          {education.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <tr>
                  <th className="cvdates" scope="row" rowSpan="2">
                    {item.from} - {item.to}
                  </th>
                  <th className="cvinstitution">{item.institution}</th>
                </tr>
                <tr>
                  <td>
                    <span className="cvqualification">
                      {item.qualification}
                    </span>{" "}
                    - <span className="cvsubject">{item.subject}</span>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
