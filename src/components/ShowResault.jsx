import React from "react";
// import { useState } from "react";

// En användare skall kunna “gissa” på antalet timmar hen tror att det kommer att ta att genomföra ett issue.

// När sedan alla användare har “gissat” på samtliga issues skapas en rapport
// som visar dels spannet på gissninar (högst och lägst)
// samt medel och median -tidsåtgång per issue.

const ShowResault = ({ answers, allCalc }) => {
  // const [allResults, setAllResults] = useState({});
  console.log(answers);
  console.log(allCalc);


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

export default ShowResault;
