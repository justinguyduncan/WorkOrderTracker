import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import * as departmentActions from "../../../store/department";
import "./createdept.css"

function CreateEditDepartment({ departmentToEdit}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const departmentName = useSelector((state) => {
    const department = state.departmentReducer.departments.find(
      (d) => d.id === departmentToEdit
    );
    return department ? department.name : "";
  });

  const [name, setName] = useState(departmentToEdit?.name || "");


  useEffect(() => {
    if (departmentToEdit) {
      setName(departmentName || "");

    }
  }, [departmentToEdit]);

  console.log(departmentToEdit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const departmentData = {
      name,

    };

    if (departmentToEdit) {

      await dispatch(departmentActions.editDepartment(departmentToEdit, departmentData));
      dispatch(departmentActions.fetchDepartments())
    } else {

      await dispatch(departmentActions.createDepartment(departmentData));
      dispatch(departmentActions.fetchDepartments())
    }

    closeModal();
  };

  return (
    <div className="createdept-container">
      <h2>{departmentToEdit ? "Edit Department" : "Create a New Department"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="createdept-form">
          <label htmlFor="name">Department Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">{departmentToEdit ? "Save Changes" : "Create Department"}</button>
      </form>
    </div>
  );
}

export default CreateEditDepartment;
