


  // Action types
  export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
  export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
  export const FILTER_JOBS = 'FILTER_JOBS';
  export const FETCH_JOB_SUCCESS = 'FETCH_JOB_SUCCESS';
  export const EDIT_JOB_SUCCESS = 'EDIT_JOB_SUCCESS';
  export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
  export const FETCH_JOBS_FAILURE = 'FETCH_JOBS_FAILURE';
  export const FILTER_JOBS_BY_DEPARTMENT = 'FILTER_JOBS_BY_DEPARTMENT';

  // Action creators
  export const createJobSuccess = (job) => ({
    type: CREATE_JOB_SUCCESS,
    payload: job,
  });

  export const filterJobs = (filteredJobs) => ({
    type: FILTER_JOBS,
    payload: filteredJobs,
  });

  export const fetchJobsSuccess = (jobs) => ({
    type: FETCH_JOBS_SUCCESS,
    payload: jobs,
  });

  export const fetchJobSuccess = (job) => ({
    type: FETCH_JOB_SUCCESS,
    payload: job,
  });

  export const editJobSuccess = (updatedJob) => ({
    type: EDIT_JOB_SUCCESS,
    payload: updatedJob,
  });

  export const deleteJobSuccess = (jobId) => ({
    type: DELETE_JOB_SUCCESS,
    payload: jobId,
  });

  export const fetchJobsFailure = (error) => ({
    type: FETCH_JOBS_FAILURE,
    payload: error,
  });

  export const filterJobsByDepartment = (departmentId) => ({
    type: FILTER_JOBS_BY_DEPARTMENT,
    payload: departmentId,
  });


  // Thunk action creators
  export const createJob = (jobData) => async (dispatch) => {
    console.log(jobData)
    const response = await fetch('/api/jobs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(createJobSuccess(data));
    }
  };


  export const fetchJobs = () => async (dispatch) => {
    // console.log('inside fetchJobs');
      const response = await fetch('/api/jobs/');
      const data = await response.json();
      if (response.ok) {
        dispatch(fetchJobsSuccess(data.jobs))}};


  export const fetchJob = (jobId) => async (dispatch) => {
      const response = await fetch(`/api/jobs/${jobId}`);
      const data = await response.json();
      if (response.ok) {
        dispatch(fetchJobSuccess(data))}};


     export const editJob = (jobId, jobData) => async (dispatch) => {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(editJobSuccess(data));
    }
    };

    export const deleteJob = (jobId) => async (dispatch) => {
    const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteJobSuccess(jobId));
    } else {
        dispatch(fetchJobsFailure('Failed to delete the job'));
    }
};

export const fetchJobsByDepartmentId = (departmentId) => async (dispatch) => {
  const response = await fetch(`/api/jobs/department/${departmentId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(fetchJobsSuccess(data.jobs));
  } else {
    console.error('Failed to fetch jobs by department ID');
    dispatch(fetchJobsFailure('An error occurred while fetching jobs by department ID'));
  }
};


// Define initial state
const initialState = {
  jobs: [],
  filteredJobs: []
};

  // Reducer function
  const jobReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_JOBS_SUCCESS:
        return { ...state, loading: false, jobs: action.payload, error: null };
      case FILTER_JOBS:

        return {
          ...state,
          filteredJobs: action.payload,
        };
      case CREATE_JOB_SUCCESS:
        return {
          ...state,
          jobs: [...state.jobs, action.payload],
          error: null,
        };
      case EDIT_JOB_SUCCESS:
        const updatedJobIndex = state.jobs.findIndex((job) => job.id === action.payload.id);
        const updatedJobs = [...state.jobs];
        if (updatedJobIndex !== -1) {
          updatedJobs[updatedJobIndex] = action.payload;
        }
        return { ...state, jobs: updatedJobs, error: null };
      case DELETE_JOB_SUCCESS:
        return {
          ...state,
          jobs: state.jobs.filter((job) => job.id !== action.payload),
          error: null,
        };
        case FILTER_JOBS_BY_DEPARTMENT:
          const departmentId = action.payload;
          const filteredJobs = state.jobs.filter((job) => job.departmentId === departmentId);
          return {
            ...state,
            filteredJobs,
          };
      case FETCH_JOBS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export default jobReducer;
