import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import * as departmentActions from '../../store/department';
import OpenModalButton from '../OpenModalButton';
import CreateEditDepartment from '../../components/departmentmanagement/createdepartment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import Navigation from '../Navigation';
import "./LeftNavBar.css"

function LeftNavBar() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const departments = useSelector((state) => state.departmentReducer.departments);
  const [isCreatingOrEditingDepartment, setIsCreatingOrEditingDepartment] = useState(false);
  const [departmentIdToEdit, setDepartmentIdToEdit] = useState(null);
const [departmentToEdit, setDepartmentToEdit] = useState(null);

  useEffect(() => {

    dispatch(departmentActions.fetchDepartments());
  }, [dispatch]);



  const handleEditDepartmentClick = (departmentId) => {
    setDepartmentIdToEdit(departmentId);
    const department = departments.find((d) => d.id === departmentId);
    if (department) {
      setDepartmentToEdit(department);
    }
  };

  const handleCreateDepartmentClick = () => {
    setDepartmentToEdit(null);
    setIsCreatingOrEditingDepartment(true);
  };

  const handleModalClose = () => {

    setIsCreatingOrEditingDepartment(false);
  };




  return sessionUser && (
    <div className='left-navbar'>
      <div className='icon-user'>
        <Navigation/>
      </div>
      <div className='department-container'>
        <h2>Departments</h2>
        {departments.map((department) => (
          <Link key={department.id} to={`/departments/${department.id}`}>
            {department.name}
            <div className='editDep-pencil'>
            <OpenModalButton
              buttonText={<FontAwesomeIcon icon={faPencil} />}
              modalComponent={
                <CreateEditDepartment
                  departmentToEdit={department.id}
                  onClose={handleModalClose}
                  departmentId={departmentIdToEdit} // Pass departmentId
                />
              }
              onClick={() => handleEditDepartmentClick(department.id)} // Pass department.id here
              />
              </div>
          </Link>
        ))}
      </div>
      <div className='create-dept'>
        <OpenModalButton
          modalComponent={
            <CreateEditDepartment
              departmentToEdit={departmentToEdit}
              onClose={handleModalClose}
            />
          }
          buttonText="Create Department"
          onClick={handleCreateDepartmentClick}
        />
      </div>
    </div>
  );
}

export default LeftNavBar;
