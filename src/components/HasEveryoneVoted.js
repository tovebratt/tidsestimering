//funktion som kollar om alla röstat

const HasEveryoneVoted = (answers) => {
  if (answers.length) {
    for (let i = 0; i < answers.length; i++) {
      if (!answers[i].voted) {
        return false;
      }
    }
    return true;
  }
}

export default HasEveryoneVoted;