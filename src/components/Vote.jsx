import React from "react";
import { useState } from "react";

const Vote = ({ issues, onVote }) => {
  const [name, setName] = useState("");
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
      name: name,
      IssueTimeObj: newObject,
    };
    console.log("answer", answer);

    // Anropa våran funktion som sköter en POST request till DB. dvs sparar vårat nya object i DB.
    onVote(answer);

    // nollsäller våra states
    setName("");
    setIssue([]);
    setTime([]);
  };

  return (
    <form onSubmit={onSubmit}>
      <select onChange={(e) => setName(e.target.value)} required>
        <option value ="">välj person...</option>
        <option value="Antonia">Antonia</option>
        <option value="Johanna">Johanna</option>
        <option value="Tove">Tove</option>
        <option value="Olesia">Olesia</option>
        <option value="Rebecka">Rebecka</option>
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
          required
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
