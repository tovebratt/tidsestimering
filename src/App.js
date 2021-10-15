import Header from "./components/Header";
import AddIssue from "./components/AddIssue";
//import Show from "./components/Show";
import Vote from "./components/Vote";
import ShowResault from "./components/ShowResault";
import FormatData from "./components/FormatData"; //Rebecka
import { useState, useEffect } from "react";

function App() {
  // states
  const [issues, setIssues] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [minEstimate, setMinEstimate] = useState([]);
  const [maxEstimate, setMaxEstimate] = useState([]);

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

  //Rebecka, test. Här ska nog Toves beräkningar köras med min data som prop, 
  // sedan sak resultatet av dem stoppas i något state som ska in som prop i ShowResault-komponenten??:
  // useEffect(()=>{if(answers.length){console.log("alla tidsgissningar: ", FormatData(answers))}}, [answers])
  useEffect(()=>{if(answers.length){
    console.log("alla tidsgissningar: ", FormatData(answers))
    
    let estimateArr= FormatData(answers);
    console.log(estimateArr);
    console.log(estimateArr[0].estimates);

    // Calc min
    const minEstimate = estimateArr.map((issue) => Math.min(...issue.estimates));
    console.log("minEstimate", minEstimate);
    setMinEstimate(minEstimate);

    // Calc max
    const maxEstimate = estimateArr.map((issue) => Math.max(...issue.estimates));
    console.log("maxEstimate", maxEstimate);
    setMaxEstimate(maxEstimate);


    // Calc median
    const allEstimates = estimateArr.map((issue) => issue.estimates);
    console.log("allEstimates", allEstimates);

    let firstIssue = estimateArr[0].estimates;

    const medianEstimate = firstIssue => {
      const mid = Math.floor(firstIssue.length / 2),
        nums = [...firstIssue].sort((a, b) => a - b);
      return firstIssue.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };
    console.log(medianEstimate(firstIssue));

    // Calc average
    const averageEstimate = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
    console.log(averageEstimate(firstIssue));


  }}, [answers])



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
  const onAdd = async (issue) => {
    console.log(issue);
    const res = await fetch("http://localhost:3000/issues", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(issue),
    });
    const data = await res.json();
    setIssues([...issues, data]);
  };

  const onVote = async (answer) => {
    //console.log(answer);
    const res = await fetch("http://localhost:3000/answers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(answer),
    });
    const data = await res.json();
    setAnswers([...answers, data]);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <AddIssue onAdd={onAdd} />
      </div>

      <div className="container">
        <Vote issues={issues} onVote={onVote} />
      </div>
      <div className="container result-container">
        <ShowResault answers={answers} minEstimate={minEstimate} maxEstimate={maxEstimate}/>
      </div>
    </div>
  );
}

{
  /* <div className="container">
<Show issues={issues} />
</div> */
}

export default App;
