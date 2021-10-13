import { useState } from "react";

const AddIssue = ({ onAdd }) => {
  const [project, setProject] = useState("Grupp 3");
  const [issue, setIssue] = useState("");
  const [time, setTime] = useState("");

  // functions
  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ project, issue, time });
    setIssue("");
    setTime("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Project</label>
        <input
          type="text"
          placeholder="Grupp 3 miniproject"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Issue</label>
        <input
          type="text"
          placeholder="Add a issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
      </div>

      <input
        type="number"
        placeholder="hours"
        onChange={(e) => setTime(e.target.value)}
      />

      <input type="submit" value="Save" className="btn btn-block" />
    </form>
  );
};

export default AddIssue;
