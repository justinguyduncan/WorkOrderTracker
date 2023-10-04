import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import * as departmentActions from '../../store/department';
import OpenModalButton from '../OpenModalButton';
import CreateEditDepartment from '../../components/departmentmanagement/createdepartment';
import "./LeftNavBar.css"

function LeftNavBar() {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departmentReducer.departments);
  const [isCreatingOrEditingDepartment, setIsCreatingOrEditingDepartment] = useState(false);
  const [departmentToEdit, setDepartmentToEdit] = useState(null);

  useEffect(() => {

    dispatch(departmentActions.fetchDepartments());
  }, [dispatch]);

  const handleCreateDepartmentClick = () => {

    setIsCreatingOrEditingDepartment(true);
    setDepartmentToEdit(null);
  };

  const handleEditDepartmentClick = (departmentId) => {

    const department = departments.find((d) => d.id === departmentId);
    if (department) {

      setIsCreatingOrEditingDepartment(true);
      setDepartmentToEdit(department);
    }
  };


  const handleModalClose = () => {

    setIsCreatingOrEditingDepartment(false);
  };

  const handleDeleteDepartment = (departmentId) => {

    let answer = window.confirm("Are you sure you want to delete this Job?");
    if (answer) {
      dispatch(departmentActions.deleteDepartment(departmentId));
    }
  };

  return (
    <div>
      <h2>Departments</h2>
      <ul>
  {departments.map((department) => (
    <li key={department.id}>
      <Link to={`/departments/${department.id}`}>{department.name}</Link>
    </li>
  ))}
</ul>
      {/* <OpenModalButton
        modalComponent={
          <CreateEditDepartment
            departmentToEdit={departmentToEdit}
            onClose={handleModalClose}
          />
        }
        buttonText="Create Department"
        onClick={handleCreateDepartmentClick}
      />

      {/* Conditional rendering of the create/edit department modal */}
      {/* {isCreatingOrEditingDepartment && (
        <div className="modal-background">
          <div className="modal">
            <CreateEditDepartment
              departmentToEdit={departmentToEdit}
              onClose={handleModalClose}
            />
          </div>
        </div>
      )} */}
    </div>
  );
}

export default LeftNavBar;
