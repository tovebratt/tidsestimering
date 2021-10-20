import { useState } from "react";

const Vote = ({ issues, onVote, answers, inputs, setInputs }) => {
  const [userId, setuserId] = useState('');

  //sparar inputs i state när man skriver i fälten
  const handleInputChange = (event) => {
    if(event.target.value)
    {setInputs(
      inputs => ({...inputs, [event.target.name]: parseInt(event.target.value)})
      )};
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // plocka ut alla issues och lägg i en ny/egen array
    const newIssuesArray = issues.map((issue) => {
      return issue.issue;
    });

    //skapa ett object som vi skall skicka till våran DB med samlad info från formuläret
    const answer = {
      id: userId,
      voted: true,
      IssueTimeObj: inputs,
    };

    // Anropa våran funktion som sköter en POST request till DB. dvs sparar vårat nya object i DB.
    onVote(answer);

    // nollställer vårt state
    setInputs({});
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="custom-select">
        <select onChange={(e) => setuserId(e.target.value)} required>
          <option value="">välj person...</option>
          {answers.map((answers)=> {
            return answers.voted ? <option disabled  id={answers.id} value={answers.id} key={answers.id * 100}>{answers.name}</option> : 
            <option id={answers.id} value={answers.id} key={answers.id}>{answers.name}</option>
          })}
        </select>
      </div>

      {issues.map((issue) => (

        <div className="issue" key={issue.id}>
          <h3
            id={issue.id}
            value={issue.issue}
          >
            {issue.issue}
          </h3>
          <input
          required
            type="number"
            min="0" //gör så att det inte går att skriva negativa tal
            name={issue.issue}
            placeholder="hours"
            value={inputs[issue.issue] || ""} //den måste ha ett startvärde, det blir en tom sträng
            onChange={e=>handleInputChange(e)}
          />
        </div>
      ))}
      <input type="submit" value="Save" className="btn " />
    </form>
  );
};

export default Vote;