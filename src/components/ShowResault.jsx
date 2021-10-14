import React from "react";
import { useState } from "react";

// En användare skall kunna “gissa” på antalet timmar hen tror att det kommer att ta att genomföra ett issue.

// När sedan alla användare har “gissat” på samtliga issues skapas en rapport
// som visar dels spannet på gissninar (högst och lägst)
// samt medel och median -tidsåtgång per issue.

const ShowResault = ({ answers }) => {
  const [allResults, setAllResults] = useState({});
  

  //här är Rebeckas funktion för att formatera om datan till tidsgissningar per issue istället för per person.
  //Tyvärr lyckas jag inte bryta ut den för då kommer inte propen answers med eftersom den är asynk (tror jag?)
  function FormatData(answers) {
  let allEstimates = [];
  let issues = Object.keys(answers[0].IssueTimeObj);
  for (let i = 0; i < issues.length; i++) {
    const issueText = issues[i];
    let issueEstimates = [];
    for (let j = 0; j < answers.length; j++) {
      const timeObj = answers[j].IssueTimeObj;
      const keys = Object.keys(timeObj);
      const values = Object.values(timeObj);
      for (let k = 0; k < keys.length; k++) {
        if (keys[k] == issueText) {
          issueEstimates.push(values[k]);
        }
      }
    }
    allEstimates.push({ issue: issueText, estimates: issueEstimates });
  } 
  return allEstimates;}
  
  console.log("tidsestimeringar per issue: ", FormatData(answers));

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
