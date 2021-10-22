import React from "react";

const ShowResult = ({ allCalc }) => {
  return (
    <div>
      <table>
        <thead>
          <tr className="result">
            <th>ISSUE</th>
            <th>MIN</th>
            <th>MAX</th>
            <th>MEDIAN</th>
            <th>MEDEL</th>
          </tr>
        </thead>
        <tbody>
        {allCalc.map((issue, i) => {
          return <tr className="result" key={i}><td>{issue[0]}</td><td>{issue[1]}</td><td>{issue[2]}</td><td>{issue[3]}</td><td>{issue[4]}</td></tr>
        })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowResult;