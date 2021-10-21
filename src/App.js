import Header from "./components/Header";
// import AddIssue from "./components/AddIssue";
//import Show from "./components/Show";
import Vote from "./components/Vote";
import ShowResault from "./components/ShowResault";
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
    console.log("alla tidsgissningar: ", FormatData(answers))
    // console.log(answers);
    
    let estimateArr= FormatData(answers);
    console.log(estimateArr);

    // Calc min
    const minEstimate = estimateArr.map((issue) => Math.min(...issue.estimates));
    console.log("MIN", minEstimate);
    // setMinEstimate(minEstimate);

    // Calc max
    const maxEstimate = estimateArr.map((issue) => Math.max(...issue.estimates));
    console.log("MAX",maxEstimate);
    // setMaxEstimate(maxEstimate);

    // All estimates array
    const allEstimates = estimateArr.map((issue) => issue.estimates);
    console.log(allEstimates);

    // Calk median
    const medianEstimateCalc = arr => {
      const mid = Math.floor(arr.length / 2),
        nums = [...arr].sort((a, b) => a - b);
      return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };
  
    const medianEstimate = estimateArr.map((issue) => medianEstimateCalc(issue.estimates));
    console.log("MEDIAN",medianEstimate);

    // Calc average
    const averageEstimateCalc = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
    const averageEstimate = estimateArr.map((issue) => Math.round(averageEstimateCalc(issue.estimates)));
    console.log("MEDEL", averageEstimate);

    // Merge calculations to one array
    let allCalc = estimateArr.map((issue, i) => [issue.issue, minEstimate[i], maxEstimate[i], medianEstimate[i], averageEstimate[i]]);
    console.log(allCalc);
    setAllCalc(allCalc);

  }}, [votingFinished])



  //console.log(answers);

  // // fetch issues
  // const fetchIssues = async () => {
  //   const res = await fetch("http://localhost:3000/issues");
  //   const data = await res.json();
  //   //console.log(data);
  //   return data;
  // };

  // fetch issues

  const fetchIssues = async () => {
    //const res1 = await fetch('http://localhost:3000/issues');

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

  // callback functions
  // const onAdd = async (issue) => {
  //   console.log(issue);
  //   const res = await fetch("http://localhost:3000/issues", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(issue),
  //   });
  //   const data = await res.json();
  //   setIssues([...issues, data]);
  // };

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
    setAnswers([]); //fusk! här töms answers för att trigga en omrendering
    setAnswers(answers);
  };

  return (
    <div>
      <Header />
      {/* <div className="container">
        <AddIssue onAdd={onAdd} />
      </div> */}
  
      {votingFinished?
      <div className="container result-container">
        <ShowResault answers={answers} allCalc={allCalc}/>
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
  /* <div className="container">
<Show issues={issues} />
</div> */
}

export default App;
