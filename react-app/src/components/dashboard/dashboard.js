// Dashboard.js
import React, { useState } from "react";
import JobList from "../../components/jobmanagement/joblist";
import CreateJob from "../../components/jobmanagement/createjob";
import OpenModalButton from "../OpenModalButton";
import LeftNavBar from "../LeftNavBar";
import Navigation from "../Navigation"
import ProfileButton from "../Navigation/ProfileButton";
import "./dashboard.css";

function Dashboard() {
  const [showform, setShowform] = useState(false);
  return (
    <div className="dashboard-container">
      <div classname = 'ProfileButton'>   </div>
      <div className="nav-bar">
        <h1>Dashboard</h1>
        <OpenModalButton modalComponent={<CreateJob />} buttonText="Create Job" />
        <ProfileButton/>
      </div>
      <div className="left-nav-bar">
        <LeftNavBar />
      </div>
      <div className="job-list">
        <JobList />
      </div>
    </div>
  );
}

export default Dashboard;
