import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobList from "../../components/jobmanagement/joblist";
import CreateJob from "../../components/jobmanagement/createjob";
import OpenModalButton from "../OpenModalButton";
import LeftNavBar from "../LeftNavBar";
import Navigation from "../Navigation";
import ProfileButton from "../Navigation/ProfileButton";
import * as jobActions from "../../store/job";
import * as userDepartmentActions from "../../store/user_department";
import "./dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userDepartments = useSelector((state) => state.userDepartmentReducer.departments);
  const jobs = useSelector((state) => state.jobs.jobs);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (sessionUser) {
      // Fetch user's departments
      dispatch(userDepartmentActions.fetchUserDepartments(sessionUser.id));
      // Fetch all jobs
      dispatch(jobActions.fetchJobs());
    }
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (userDepartments.length > 0 && jobs.length > 0) {
      // Get an array of department IDs for the user
      const userDepartmentIds = userDepartments.map((userDept) => userDept.department_id);

      // Filter jobs based on user's department
      const filtered = jobs.filter((job) => userDepartmentIds.includes(job.department_id));
      setFilteredJobs(filtered);

      // Dispatch the action to update filtered jobs in Redux state
      dispatch(jobActions.filterJobs(filtered));
    }
  }, [userDepartments, jobs]);

  const [showform, setShowform] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="ProfileButton"></div>
      <div className="nav-bar">
        <h1>Work Orders</h1>
        <OpenModalButton modalComponent={<CreateJob />} buttonText="Create Job" />
      </div>
      <div className="job-list">
        <JobList jobs={filteredJobs} />
      </div>
    </div>
  );
}

export default Dashboard;
