import React from "react";
import { useState } from "react";

const Vote = ({ issues, onVote, answers }) => {
  const [userId, setuserId] = useState('');
  const [issue, setIssue] = useState([]);
  const [time, setTime] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    // plocka ut alla issues och lägg i en ny/egen array
    const newIssuesArray = issues.map((issue) => {
      console.log(issue.issue);
      return issue.issue;
    });

    // gör om våran timeArray från string till numbers
    let timeToNumber = time.map((i) => Number(i));
    console.log("timeToNumber", timeToNumber);

    // Skapa ett object där issues är "keys" och time är "values"
    let newObject = {};
    newIssuesArray.forEach((item, i) => (newObject[item] = timeToNumber[i]));
    console.log(newObject);

    // skapa ett object som vi skall skicka till våran DB med samlad info från formuläret
    const answer = {
      id: userId,
      voted: true,
      IssueTimeObj: newObject,
    };
    console.log("answer", answer);

    // Anropa våran funktion som sköter en POST request till DB. dvs sparar vårat nya object i DB.
    onVote(answer);

    // nollsäller våra states
    setIssue([]);
    setTime([]);
  };

  return (
    <form onSubmit={onSubmit}>
       <select  onChange={(e) => setuserId(...userId, e.target.value)}>
        <option>välj person...</option>
        {answers.map((answers)=> {
          return answers.voted ? <option disabled  id={answers.id} value={answers.id} key={answers.id}>{answers.name}</option> : 
          <option id={answers.id} value={answers.id} key={answers.id}>{answers.name}</option>
        })}
      </select>
      {issues.map((issue) => (
        <div className="issue" key={issue.id}>
          <h3
            id={issue.id}
            onSubmit={(e) => setIssue([...issue, e.target.value])}
            value={issue.issue}
          >
            {issue.issue}
          </h3>
          <input
            type="number"
            placeholder="hours"
            onChange={(e) => setTime([...time, e.target.value])}
          />
        </div>
      ))}
      <input type="submit" value="Save" className="btn " />
    </form>
  );
};

export default Vote;

/// exemplen hur vi kan slå ihop två arrays till key pair values
// var keys = ["foo", "bar", "baz"];
// var values = [11, 22, 33];
// var result = {};
// keys.forEach((key, i) => (result[key] = values[i]));
// console.log(result);
