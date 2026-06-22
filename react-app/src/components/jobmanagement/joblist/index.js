import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as jobActions from "../../../store/job";
import * as userDepartmentActions from '../../../store/user_department'
import CreateJob from "../createjob";
import OpenModalButton from "../../OpenModalButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './joblist.css'


function getStatusClass(status) {
  switch (status) {
    case 'Hold':
      return 'status-hold';
    case 'In Progress':
      return 'status-in-progress';
    case 'Design':
      return 'status-design';
    case 'Install':
      return 'status-install';
    case 'Ready For Delivery':
      return 'status-ready';
    case 'Completed':
      return 'status-completed';
    case 'High Priority':
      return 'status-high-priority';
    default:
      return '';
  }
}

function parseLocalDate(str) {
  const [y, m, d] = str.split('-');
  return new Date(y, m - 1, d);
}

function getDueDateClass(dueDate, status) {
  if (status === 'High Priority') return 'job-high-priority';
  if (!dueDate || status === 'Completed') return '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = parseLocalDate(dueDate);
  const daysUntilDue = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  if (daysUntilDue <= 0) return 'due-overdue';
  if (daysUntilDue === 1) return 'due-tomorrow';
  return '';
}


function JobList({ selectedDepartmentId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const jobs = useSelector((state) => state.jobs.jobs);
  const history = useHistory();
  const departments = useSelector((state) => state.departmentReducer.departments);
  // const userDepartments = useSelector((state) => state.userDepartmentReducer.departments);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!selectedDepartmentId) {
        await dispatch(jobActions.fetchJobs());
      }else{
        await dispatch(jobActions.fetchJobsByDepartmentId(selectedDepartmentId));
      }
    };

    fetchData();
  }, [dispatch, sessionUser]);


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

  const sortedJobs = [...jobs].sort((a, b) => {
    const aHP = a.status === 'High Priority' ? 0 : 1;
    const bHP = b.status === 'High Priority' ? 0 : 1;
    if (aHP !== bHP) return aHP - bHP;
    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return new Date(a.due_date) - new Date(b.due_date);
  });

  const query = searchQuery.toLowerCase();
  const activeJobs = sortedJobs.filter((j) => j.status !== 'Completed');
  const completedJobs = sortedJobs.filter((j) => j.status === 'Completed');
  const filterBySearch = (list) => query
    ? list.filter((j) => j.title.toLowerCase().includes(query) || String(j.po_number).includes(query))
    : list;
  const visibleJobs = filterBySearch(activeTab === 'active' ? activeJobs : completedJobs);

  return (
    <div className="joblist-container">
      <div className="job-search-wrapper">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="job-search-icon" />
        <input
          className="job-search"
          type="text"
          placeholder="Search by title or PO number…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="job-tabs">
        <button
          className={`job-tab ${activeTab === 'active' ? 'job-tab-active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active <span className="tab-count">{activeJobs.length}</span>
        </button>
        <button
          className={`job-tab ${activeTab === 'completed' ? 'job-tab-active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed <span className="tab-count">{completedJobs.length}</span>
        </button>
      </div>
      {visibleJobs.length > 0 ? (
        visibleJobs.map((job) => (
          <div
            className={`job-container ${getDueDateClass(job.due_date, job.status)}`}
            key={job.id}
          >
            <div className="job-row" onClick={() => toggleJobDetails(job.id)}>
              <div className="job-row-main">
                <span className="job-po">{job.po_number}</span>
                <span className="job-title">{job.title}</span>
                {job.install && <span className="install-badge">Install</span>}
              </div>
              <div className="job-row-meta">
                <span className={`status-badge ${getStatusClass(job.status)}`}>{job.status}</span>
                {job.due_date && (
                  <span className="due-date-chip">
                    {parseLocalDate(job.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
                <FontAwesomeIcon icon={faCaretDown} className={`caret ${expandedJobId === job.id ? 'caret-open' : ''}`} />
              </div>
            </div>
            {expandedJobId === job.id && (
              <div className="job-details">
                <p>
                  <strong>Description:</strong> {job.description}
                </p>
                <p>
                  <strong>Department:</strong> {departments.find((dept) => dept.id === job.department_id)?.name || 'Unknown Department'}
                </p>
                <div className="job-detail-actions">
                  <OpenModalButton modalComponent={<CreateJob jobToEdit={job} />} buttonText={'Edit Job'} />
                  <button className="delete-job" onClick={() => deleteJob(job.id)}>Delete Job</button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="no-jobs">No {activeTab} jobs.</p>
      )}
    </div>
  );
}

export default JobList;
