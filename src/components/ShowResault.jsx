import React from "react";
import { useState, useEffect } from "react";

// En användare skall kunna “gissa” på antalet timmar hen tror att det kommer att ta att genomföra ett issue.

// När sedan alla användare har “gissat” på samtliga issues skapas en rapport
// som visar dels spannet på gissninar (högst och lägst)
// samt medel och median -tidsåtgång per issue.

const ShowResault = ({ answers, minEstimate, maxEstimate }) => {
  const [allResults, setAllResults] = useState({});

  console.log("answers", answers);
  console.log("minEstimate", minEstimate);
  console.log("maxEstimate", maxEstimate);
  // console.log(answers[0].IssueTimeObj);

  // plocka ut alla issues och lägg i en ny/egen array
  const newIssuesArrays = answers.map((answer) => {
    const keys = Object.keys(answer.IssueTimeObj);
    return keys;
  });
  let issueArray = newIssuesArrays[0];
  console.log("issueArray", issueArray);

  //setIssueArray(newIssuesArrays[0])

  // // Skapa ett object där issues är "keys" och minEstimate är "values"
  //  let objectMinEstimate = {};
  //  issueArray.forEach((item, i) => (objectMinEstimate[item] = minEstimate[i]));
  //  console.log(objectMinEstimate);

  // Skapa ett object där issues är "keys" och maxEstimate är "values"
  //  let objectMaxEstimates = {}
  // issueArray.forEach((item, i ) => (objectMaxEstimates[item] =  maxEstimate[i]))
  //  console.log(objectMaxEstimates)

  return (
    <div>
      <div className="result">
        <button className="btn"> lägsta värden</button>
        <ul> {issueArray} </ul>
      </div>
      <div className="result">
        <button className="btn"> högsta värden</button>
        <ul> {issueArray}</ul>
      </div>
      <div className="result">
        <button className="btn"> median värden</button>
        <ul> {issueArray}</ul>
      </div>
      <div className="result">
        <button className="btn"> medel värden</button>
        <ul> {issueArray}</ul>
      </div>
    </div>
  );
};

export default ShowResault;
