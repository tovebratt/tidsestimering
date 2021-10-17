import React from "react";
import { useState, useEffect } from "react";

// En användare skall kunna “gissa” på antalet timmar hen tror att det kommer att ta att genomföra ett issue.

// När sedan alla användare har “gissat” på samtliga issues skapas en rapport
// som visar dels spannet på gissninar (högst och lägst)
// samt medel och median -tidsåtgång per issue.

const ShowResault = ({ answers, minEstimate, maxEstimate, issues }) => {
  const [allResults, setAllResults] = useState({});
  const [showResaultDivMin, setShowResaultDivMin] = useState(true);
  const [showResaultDivMax, setShowResaultDivMax] = useState(true);
  const [showResaultDivMedel, setShowResaultDivMedel] = useState(false);
  const [showResaultDivMedian, setShowResaultDivMedian] = useState(false);

  console.log("minEstimate", minEstimate);
  console.log("maxEstimate", maxEstimate);
  // console.log(answers[0].IssueTimeObj);

  // plocka ut alla issues och lägg i en ny/egen array
  let newArray = [];
  const newArrayOfAllIssues = issues.forEach((issue) => {
    //console.log(issue.issue);
    newArray.push(issue.issue);
  });
  console.log(newArray);


  return (
    <div>
      <div className="result">
        <button className="btn" onClick={() =>setShowResaultDivMin(!showResaultDivMin)}>
          Gissningar lägsta värden
        </button>
        {showResaultDivMin && (
          <div className="flex">
            <ul>
              {issues.map((issue) => (
                <li key={issue.id}>
                  {issue.issue} <span> </span>
                </li>
              ))}
            </ul>
            <ul>
              {minEstimate.map((estimate) => (
                <li>{estimate} Timmar </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="result">
        <button className="btn" onClick={()=> setShowResaultDivMax(!showResaultDivMax)}>
          Gissningar högsta värden
        </button>
        {showResaultDivMax && (
          <div className="flex">
            <ul>
              {issues.map((issue) => (
                <li>
                  {issue.issue} <span> </span>
                </li>
              ))}
            </ul>
            <ul>
              {maxEstimate.map((estimate) => (
                <li>{estimate} Timmar </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="result">
        <button className="btn" onClick={() => setShowResaultDivMedel(!showResaultDivMedel)}>
          Medel värden
        </button>
        {showResaultDivMedel && <div className="flex"></div>}
      </div>
      <div className="result">
        <button className="btn" onClick={()=> setShowResaultDivMedian(!showResaultDivMedian)}>

          Median värden
        </button>
        {showResaultDivMedian && <div className="flex"></div>}
      </div>
    </div>
  );
};

export default ShowResault;




  // // // plocka ut alla issues och lägg i en ny/egen array
  // // const newIssuesArrays = answers.map((answer) => {
  // //   const keys = Object.keys(answer.IssueTimeObj);
  // //   return keys;
  // // });
  // // let issueArray = newIssuesArrays[0];
  // // console.log("issueArray", issueArray);

  // // // plocka ut alla issues och lägg i en ny/egen array
  // // const newIssuesArrays = answers.map((answer) => {
  // //   const keys = Object.keys(answer.IssueTimeObj);
  // //   console.log("keys", keys)
  // //   Object.values(keys).map((i)=>{
  // //     issueArray.push(i);
  // //   })
  // //   console.log(issueArray)
  // //   return keys;
  // // });
  // // console.log(newIssuesArrays[0]);
  // // let issueArray = [];

  // //let issueArray = newIssuesArrays[0];
  // //console.log("issueArray", issueArray);
  // // console.log("issueArray", issueArray);
  // // Object.values(issueArray).map((i) => {
  // //   console.log(i)
  // // } )
  // //setIssueArray(newIssuesArrays[0])

  // //Skapa ett object där issues är "keys" och minEstimate är "values"
  // let objectMinEstimate = {};
  // newArray.forEach((item, i) => (objectMinEstimate[item] = minEstimate[i]));
  // console.log("objectMinEstimate", objectMinEstimate);
  // console.log(Object.keys(objectMinEstimate));
  // console.log(Object.values(objectMinEstimate));

  // Skapa ett object där issues är "keys" och maxEstimate är "values"
  //  let objectMaxEstimates = {}
  // issueArray.forEach((item, i ) => (objectMaxEstimates[item] =  maxEstimate[i]))
  //  console.log(objectMaxEstimates)
  //test arrays

  // onToggle

  // Tooggle DIV
  // const onToggleMin = () => {
  //   setShowResaultDivMin(!showResaultDivMin);
  // };
  // const onToggleMax = () => {
  //   setShowResaultDivMax(!showResaultDivMax);
  // };
  // const onToggleMedel = () => {
  //   setShowResaultDivMedel(!showResaultDivMedel);
  // };
  // const onToggleMedian = () => {
  //   setShowResaultDivMedian(!showResaultDivMedian);
  // };