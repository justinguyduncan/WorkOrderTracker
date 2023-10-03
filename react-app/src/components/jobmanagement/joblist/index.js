import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as jobActions from "../../../store/job";
import CreateJob from "../createjob";
import OpenModalButton from "../../OpenModalButton";

function JobList() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const jobs = useSelector((state) => state.jobs.jobs);
  const history = useHistory();
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);

  useEffect(() => {
    dispatch(jobActions.fetchJobs());
  }, [dispatch]);

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
    <div>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id}>
            <h2 onClick={() => toggleJobDetails(job.id)}>{job.title}</h2>
            {expandedJobId === job.id && (
              <div>
                <p>
                  <strong>PO Number:</strong> {job.po_number}
                </p>
                <p>
                  <strong>Description:</strong> {job.description}
                </p>
                <p>
                  <strong>Department:</strong> {job.departmentName}
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

      {/* Conditional rendering of the modal */}
      {/* {isEditing && (
        <div className="modal-background">
          <div className="modal">
            <CreateJob jobToEdit={jobToEdit} onClose={handleModalClose} />
          </div>
        </div>
      )} */}
    </div>
  );
}

export default JobList;
