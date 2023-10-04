import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as jobActions from '../../../store/job';
import JobList from '../../jobmanagement/joblist'; // Import the JobList component

function DepartmentPage() {
  const { departmentId } = useParams();
  const dispatch = useDispatch();
  const department = useSelector((state) =>
    state.departmentReducer.departments.find((d) => d.id === Number(departmentId))
  );

  useEffect(() => {
    if (department) {
      dispatch(jobActions.fetchJobsByDepartmentId(departmentId));
    }
  }, [dispatch, departmentId]);

  return (
    <div>
      <h2>Department: {department?.name}</h2>
      {/* Reuse the JobList component */}
      <JobList selectedDepartmentId={departmentId}/>
    </div>
  );
}

export default DepartmentPage;
