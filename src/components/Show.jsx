import React from "react";
import Issue from "./Issue";

const Show = ({ issues }) => {
  //console.group(issues);
  return (
    <div>
      <h1> Project issues : {issues.project}</h1>
      {issues.map((issue) => (
        <Issue key={issue.id} issue={issue} />
      ))}
    </div>
  );
};

export default Show;
