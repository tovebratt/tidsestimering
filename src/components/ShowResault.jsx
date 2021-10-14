import React from "react";
import { useState } from "react";

// En användare skall kunna “gissa” på antalet timmar hen tror att det kommer att ta att genomföra ett issue.

// När sedan alla användare har “gissat” på samtliga issues skapas en rapport
// som visar dels spannet på gissninar (högst och lägst)
// samt medel och median -tidsåtgång per issue.

const ShowResault = ({ answers }) => {
  const [allResults, setAllResults] = useState({});
  
  //console.log(answers[0].IssueTimeObj);
  //const allIssues = answers[0].IssueTimeObj

  return (
    <div>
      <div className="result">
        <button className="btn">Median</button>
        <h2>5 h </h2>
      </div>
      <div className="result">
        <button className="btn">Median</button>
        <h2>5 h </h2>
      </div>
      <div className="result">
        <button className="btn">högsta-lägsta</button>
        <h2>5 h </h2>
      </div>
    </div>
  );
};

export default ShowResault;
