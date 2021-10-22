import Header from "./components/Header";
import Vote from "./components/Vote";
import ShowResult from "./components/ShowResult";
import FormatData from "./components/FormatData";
import HasEveryoneVoted from "./components/HasEveryoneVoted";
import { useState, useEffect } from "react";

function App() {
  // states
  const [issues, setIssues] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [allCalc, setAllCalc] = useState([]);
  const [votingFinished, setVotingFinished] = useState();
  const [inputs, setInputs] = useState({}); //ett state för input-fältens innehåll
  
  // setIssues  & setAnswers från Data
  useEffect(() => {
    const getIssues = async () => {
      const issuesFromServer = await fetchIssues();
      setIssues(issuesFromServer);
      const answersFromSever = await fetchAnswers();
      setAnswers(answersFromSever);
    };
    getIssues();
  }, []);
  
  //sätter votingFinished till true om alla svarat
  useEffect(()=>{setVotingFinished(HasEveryoneVoted(answers))}, [answers]) 

  // Time estimation calculations
  useEffect(()=>{if(votingFinished){
    let estimateArr= FormatData(answers);

    // Calc min
    const minEstimate = estimateArr.map((issue) => Math.min(...issue.estimates));

    // Calc max
    const maxEstimate = estimateArr.map((issue) => Math.max(...issue.estimates));

    // All estimates array

    // Calk median
    const medianEstimateCalc = arr => {
      const mid = Math.floor(arr.length / 2),
        nums = [...arr].sort((a, b) => a - b);
      return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };
  
    const medianEstimate = estimateArr.map((issue) => medianEstimateCalc(issue.estimates));

    // Calc average
    const averageEstimateCalc = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
    const averageEstimate = estimateArr.map((issue) => Math.round(averageEstimateCalc(issue.estimates)));

    // Merge calculations to one array
    let allCalc = estimateArr.map((issue, i) => [issue.issue, minEstimate[i], maxEstimate[i], medianEstimate[i], averageEstimate[i]]);
    setAllCalc(allCalc);

  }}, [votingFinished])

  const fetchIssues = async () => {
    const res = await fetch(
      "https://api.github.com/repos/tovebratt/tidsestimering/issues"
    );

    const data = await res.json();

    let issues = [];

    data.map((issue) => {
      issues.push({
        project: "Grupp 3",
        issue: issue.title,
        time: 0,
        id: issue.id,
      });
      return issues;
    });
    console.log(issues);
    return issues;
  };

  // fetch Answers
  const fetchAnswers = async () => {
    const res = await fetch("http://localhost:3000/answers");
    const data = await res.json();
    return data;
  };

  const onVote = async (answer) => {
    const res = await fetch("http://localhost:3000/answers/" + answer.id, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(answer),
    });
    const data = await res.json();
    answers.forEach(function(answer, i) { if (answer.id === data.id) answers[i] = data; });
    setAnswers([]);
    setAnswers(answers);
  };

  return (
    <div>
      <Header />
      {votingFinished?
      <div className="container result-container">
        <ShowResult answers={answers} allCalc={allCalc}/>
      </div>
      :
      <div className="container">
        <Vote issues={issues} onVote={onVote} answers={answers} inputs={inputs} setInputs={setInputs}/>
      </div>
      }
    </div>
  );
  }

{
}

export default App;