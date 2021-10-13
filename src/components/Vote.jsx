import React from "react";
import { useState } from "react";

const Vote = ({ issues, onVote }) => {
  const [name, setName] = useState("");
  const [issue, setIssue] = useState([]);
  const [time, setTime] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    // console.log(data);

    /// exemplen hur vi kan slå ihop två arrays till key pair values
    // var keys = ["foo", "bar", "baz"];
    // var values = [11, 22, 33];
    // var result = {};
    // keys.forEach((key, i) => (result[key] = values[i]));
    // console.log(result);

    const answer = {
      name: name,
      issues: issue,
      time: time,
    };
    console.log("answer", answer);

    onVote(answer);

    console.log(e.target)
    console.log("formulär", e.target[1][0]);
    console.log("formulär", e.target[1].label);

    // få tag i varje issue, lägg i ett object.. spala allt i ett object och skicka över till App.js , gör en POST och spara i DB
    setName("");
    setIssue([]);
    setTime([]);
  };

  return (
    <form onSubmit={onSubmit}>
      <select onChange={(e) => setName(e.target.value)}>
        <option>välj person...</option>
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
            onChange={(e) => setIssue([...issue, e.target.value])}
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
