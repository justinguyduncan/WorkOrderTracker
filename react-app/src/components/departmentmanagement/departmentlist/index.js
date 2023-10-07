import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'; // Import useHistory
import * as jobActions from '../../../store/job';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import JobList from '../../jobmanagement/joblist';
import './departmentlist.css';
import * as departmentActions from '../../../store/department';

function DepartmentPage() {
  const { departmentId } = useParams();
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const department = useSelector((state) =>
    state.departmentReducer.departments.find((d) => d.id === Number(departmentId))
  );
  const history = useHistory(); // Initialize the history object

  useEffect(() => {
    if (department) {
      dispatch(jobActions.fetchJobsByDepartmentId(departmentId));
    }
  }, [dispatch, departmentId]);

  const handleDeleteDepartment = () => {

    const hasJobs = (jobs.length > 0)

    if (hasJobs) {
      alert("Cannot delete a department that has jobs");
    } else {
      let answer = window.confirm("Are you sure you want to delete this department?");
      if (answer) {
        dispatch(departmentActions.deleteDepartment(departmentId)).then(() => {
          history.push('/dashboard');
        });
      }
    }
  };

  return (
    <div className='deptlist-container'>
      <div className='dept-header'>
      <h1>
        {department?.name}
        <button className="delete-button" onClick={handleDeleteDepartment}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </h1>
      </div>
      <JobList selectedDepartmentId={departmentId}/>
    </div>
  );
}

export default DepartmentPage;
