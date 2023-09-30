import React, {useState} from "react";
import { Link } from "react-router-dom";
import JobList from "../../components/jobmanagement/joblist"; // Import the JobList component
import CreateJob from "../../components/jobmanagement/createjob";
import OpenModalButton from "../OpenModalButton";

function Dashboard() {
  const [showform, setShowform] = useState(false);
  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => setShowform(!showform) }>Create Job</button>
      {showform && <CreateJob />}
      <OpenModalButton modalComponent={<CreateJob/>} buttonText={'Create Job'} />
      {/* Include the JobList component */}
      <JobList />
      {/* Add other dashboard content as needed */}
    </div>
  );
}

export default Dashboard;
