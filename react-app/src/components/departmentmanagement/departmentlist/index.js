import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'; // Import useHistory
import * as jobActions from '../../../store/job';
import CreateEditDepartment from '../createdepartment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import JobList from '../../jobmanagement/joblist';
import './departmentlist.css';
import * as departmentActions from '../../../store/department';
import OpenModalButton from '../../OpenModalButton';
import { faPencil } from "@fortawesome/free-solid-svg-icons";

function DepartmentPage() {
  const { departmentId } = useParams();
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const departments = useSelector((state) => state.departmentReducer.departments);
  const department = useSelector((state) =>
    state.departmentReducer.departments.find((d) => d.id === Number(departmentId))
  );
  const history = useHistory();
  const [departmentIdToEdit, setDepartmentIdToEdit] = useState(null);
  const [departmentToEdit, setDepartmentToEdit] = useState(null);
  const [isCreatingOrEditingDepartment, setIsCreatingOrEditingDepartment] = useState(false);

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
          dispatch(departmentActions.fetchDepartments());
        });
      }
    }
  };

  const handleEditDepartmentClick = (departmentId) => {
    setDepartmentIdToEdit(departmentId);
    const department = departments.find((d) => d.id === departmentId);
    if (department) {
      setDepartmentToEdit(department);
    }
  };

  const handleModalClose = () => {

    setIsCreatingOrEditingDepartment(false);
  };

  return (
    <div className='deptlist-container'>
      <div className='dept-header'>
      <h1>
        <div className='title-container'>
        {department?.name}
              </div>
              <div>
            <OpenModalButton
              buttonText={<FontAwesomeIcon icon={faPencil} />}
              modalComponent={
                <CreateEditDepartment
                  departmentToEdit={department?.id}
                  onClose={handleModalClose}
                  departmentId={departmentIdToEdit} // Pass departmentId
                />
              }
              onClick={() => handleEditDepartmentClick(department.id)} // Pass department.id here
              />
        <button className="delete-button" onClick={handleDeleteDepartment}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        </div>
      </h1>
      </div>
      <JobList selectedDepartmentId={departmentId}/>
    </div>
  );
}

export default DepartmentPage;
