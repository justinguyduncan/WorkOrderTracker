import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as jobActions from "../../../store/job";
import * as userDepartmentActions from '../../../store/user_department'
import CreateJob from "../createjob";
import OpenModalButton from "../../OpenModalButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import './joblist.css'

function JobList({ selectedDepartmentId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const jobs = useSelector((state) => state.jobs.jobs);
  const history = useHistory();
  const departments = useSelector((state) => state.departmentReducer.departments);
  // const userDepartments = useSelector((state) => state.userDepartmentReducer.departments);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!selectedDepartmentId) {
        await dispatch(jobActions.fetchJobs());
      }else{
        await dispatch(jobActions.fetchJobsByDepartmentId(selectedDepartmentId));
      }
    };

    fetchData();
  }, [dispatch, sessionUser]);


  const toggleJobDetails = (jobId) => {
    setExpandedJobId((prevId) => (prevId === jobId ? null : jobId));
  };

  function deleteJob(jobId) {
    let answer = window.confirm("Are you sure you want to delete this Job?");
    if (answer) {
      dispatch(jobActions.deleteJob(jobId))
    }
  };


  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="joblist-container">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div className='job-container' key={job.id}>
            <h2 onClick={() => toggleJobDetails(job.id)}>{job.po_number} {job.title} <FontAwesomeIcon icon={faCaretDown} /></h2>
            {expandedJobId === job.id && (
              <div>
                <p>
                  <strong>Description:</strong> {job.description}
                </p>
                <p>
                  <strong>Department:</strong> {departments.find((dept) => dept.id === job.department_id)?.name || 'Unknown Department'}
                </p>
                <p>
                  <strong>Status:</strong> {job.status}
                </p>
                <OpenModalButton modalComponent={<CreateJob jobToEdit={job} />} buttonText={'Edit Job'} />
                <button className="delete-job" onClick={() => deleteJob(job.id)}>Delete Job</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
}

export default JobList;
