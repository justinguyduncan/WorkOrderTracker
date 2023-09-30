import React,  {useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as jobActions from "../../../store/job";

function JobList() {
    // console.log("JobList component rendering");
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const jobs = useSelector((state) => state.jobs.jobs);

    useEffect(() => {
        // console.log('inside use effect');
        dispatch(jobActions.fetchJobs());
      }, [dispatch]);

      // console.log('jobs',jobs);
      if (!sessionUser) return <Redirect to="/" />;
      return (
        <div>
          <h1>Job List</h1>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id}>
                <h2>{job.title}</h2>
                <p>{job.description}</p>
              </div>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      );
    }

    export default JobList;
