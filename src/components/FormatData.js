//funktion som plockar ut gissningar per issue

const FormatData = (answers) => {
  console.log("svar", answers)
  let allEstimates = [];
  let issues = Object.keys(answers[0].IssueTimeObj);
  for (let i = 0; i < issues.length; i++) {
    const issueText = issues[i];
    let issueEstimates = [];
    for (let j = 0; j < answers.length; j++) {
      const timeObj = answers[j].IssueTimeObj;
      const keys = Object.keys(timeObj);
      const values = Object.values(timeObj);
      for (let k = 0; k < keys.length; k++) {
        if (keys[k] == issueText) {
          issueEstimates.push(values[k]);
        }
      }
    }
    allEstimates.push({ issue: issueText, estimates: issueEstimates });
  }
  console.log("alla tidsgissningar: ", allEstimates);
  return allEstimates;
};

export { FormatData };