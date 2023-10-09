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
      // // Fetch user's departments
      // dispatch(userDepartmentActions.fetchUserDepartments(sessionUser.id));
      // Fetch all jobs
      dispatch(jobActions.fetchJobs());
    }
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (userDepartments.length > 0 && jobs.length > 0) {
      const userDepartmentIds = userDepartments.map((userDept) => userDept.department_id);

      const filtered = jobs.filter((job) => userDepartmentIds.includes(job.department_id));
      setFilteredJobs(filtered);

      
      dispatch(jobActions.filterJobs(filtered));
    }
  }, [userDepartments, jobs]);

  const [showform, setShowform] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="nav-bar">
        <h1>
          Work Orders
        <OpenModalButton modalComponent={<CreateJob />} buttonText="Create Job" />
        </h1>
      </div>
      <div className="job-list">
        <JobList jobs={filteredJobs} />
      </div>
    </div>
  );
}

export default Dashboard;
