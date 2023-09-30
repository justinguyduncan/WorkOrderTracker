import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../context/Modal';
import { useSelector } from 'react-redux';
import * as jobActions from '../../../store/job';


function CreateJob({ jobToEdit }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  console.log('Session_User',sessionUser);

  const [title, setTitle] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const departments = useSelector((state) => state.departmentReducer.departments);


  useEffect(() => {
    if (jobToEdit) {
      setTitle(jobToEdit.title || '');
      setPoNumber(jobToEdit.po_number || '');
      setDescription(jobToEdit.description || '');
      setStatus(jobToEdit.status || '');
      setSelectedDepartment(jobToEdit.department_id || '');
    }
  }, [jobToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a job object to send to the server
    const jobData = {
      title,
      po_number: poNumber,
      description,
      status,
      department_id: selectedDepartment,
    };

    if (jobToEdit) {

      dispatch(jobActions.editJob(jobToEdit.id, jobData));


    } else {

      dispatch(jobActions.createJob(jobData));


    }
    closeModal();
  };

  return (
    <div>
      <h2>{jobToEdit ? 'Edit Job' : 'Create a New Job'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="poNumber">PO Number</label>
          <input
            type="number"
            id="poNumber"
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            ></textarea>
          </div>
        <div>
          <label htmlFor="department">Department</label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        {/* Add status field */}
        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            {/* Add other status options as needed */}
          </select>
        </div>
        <button type="submit">{jobToEdit ? 'Save Changes' : 'Create Job'}</button>
      </form>
    </div>
  );
}

export default CreateJob;
