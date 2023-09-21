import React from "react";
import JobList from "../../components/jobmanagement/joblist"; // Import the JobList component

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Include the JobList component */}
      <JobList />
      {/* Add other dashboard content as needed */}
    </div>
  );
}

export default Dashboard;
