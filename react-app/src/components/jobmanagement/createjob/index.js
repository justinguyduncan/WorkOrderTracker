import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../context/Modal';
import { useSelector } from 'react-redux';
import * as jobActions from '../../../store/job';
import "./createjob.css"


function CreateJob({ jobToEdit }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  // console.log('Session_User',sessionUser);

  const [title, setTitle] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [install, setInstall] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const departments = useSelector((state) => state.departmentReducer.departments);
  // console.log(jobToEdit)

  useEffect(() => {
    if (jobToEdit) {
      setTitle(jobToEdit.title || '');
      setPoNumber(jobToEdit.po_number || '');
      setDescription(jobToEdit.description || '');
      setStatus(jobToEdit.status || '');
      setInstall(jobToEdit.install || false);
      setDueDate(jobToEdit.due_date || '');
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
      install,
      due_date: dueDate,
      department_id: selectedDepartment,
    };
    // console.log(jobData)
    if (jobToEdit) {
      await dispatch(jobActions.editJob(jobToEdit.id, jobData));
      dispatch(jobActions.fetchJobs())
      history.push('/dashboard')
    } else {
      await dispatch(jobActions.createJob(jobData));
      dispatch(jobActions.fetchJobs())
    }
    closeModal();
  };

  return (
    <div className='createjob-container'>
      <h2>{jobToEdit ? 'Edit Job' : 'Create a New Job'}</h2>
      <form onSubmit={handleSubmit}>
        <label className="field-full" htmlFor="title">
          Job Title
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label htmlFor="poNumber">
          PO Number
          <input
            type="number"
            id="poNumber"
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
            required
          />
        </label>

        <label htmlFor="dueDate">
          Due Date
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <label htmlFor="department">
          Department
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
        </label>

        <label htmlFor="status">
          Status
          <div className="status-install-row">
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="High Priority">High Priority</option>
              <option value="In Progress">In Progress</option>
              <option value="Design">Design</option>
              <option value="Hold">Hold</option>
              <option value="Ready For Delivery">Ready For Delivery</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              type="button"
              className={`install-tag ${install ? 'install-tag-active' : ''}`}
              onClick={() => setInstall(!install)}
            >
              Install
            </button>
          </div>
        </label>

        <label className="field-full" htmlFor="description">
          Description
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <button type="submit">{jobToEdit ? 'Save Changes' : 'Create Job'}</button>
      </form>
    </div>
  );
}

export default CreateJob;
