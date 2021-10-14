import Header from './components/Header';
import AddIssue from './components/AddIssue';
//import Show from "./components/Show";
import Vote from './components/Vote';

import { useState, useEffect } from 'react';

function App() {
  // states
  const [issues, setIssues] = useState([]);

  // setIssues from Data
  useEffect(() => {
    const getIssues = async () => {
      const issuesFromServer = await fetchIssues();
      setIssues(issuesFromServer);
    };
    getIssues();
  }, []);

  // fetch issues
  const fetchIssues = async () => {
    //const res1 = await fetch('http://localhost:3000/issues');
    const res = await fetch(
      'https://api.github.com/repos/tovebratt/tidsestimering/issues'
    );
    const data = await res.json();

    let issues = [];
    data.map((issue) => {
      issues.push({
        project: 'Grupp 3',
        issue: issue.title,
        time: 0,
        id: issue.id,
      });
      return issues;
    });
    console.log(issues);
    return issues;
  };

  // callback functions
  const onAdd = async (issue) => {
    console.log(issue);
    const res = await fetch('http://localhost:3000/issues', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(issue),
    });
    const data = await res.json();
    setIssues([...issues, data]);
  };

  const onVote = (answer) => {
    console.log(answer);
  };

  return (
    <div>
      <Header />
      <div className='container'>
        <AddIssue onAdd={onAdd} />
      </div>

      <div className='container'>
        <Vote issues={issues} onVote={onVote} />
      </div>
    </div>
  );
}

export default App;
