
// Define initial state
const initialState = {
    jobs: [],
    interviews: [],
    loading: false,
    error: null,
  };

  // Action types
  export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
  export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
  export const FETCH_JOB_SUCCESS = 'FETCH_JOB_SUCCESS';
  export const EDIT_JOB_SUCCESS = 'EDIT_JOB_SUCCESS';
  export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
  export const FETCH_JOBS_FAILURE = 'FETCH_JOBS_FAILURE';

  // Action creators
  export const createJobSuccess = (job) => ({
    type: CREATE_JOB_SUCCESS,
    payload: job,
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


  // Thunk action creators
  export const createJob = (jobData) => async (dispatch) => {
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(createJobSuccess(data));
    }
  };


  export const fetchJobs = () => async (dispatch) => {

      const response = await fetch('/api/jobs');
      const data = await response.json();
      if (response.ok) {
        dispatch(fetchJobsSuccess(data.jobs))}};


  export const fetchJob = (jobId) => async (dispatch) => {
      const response = await fetch(`/api/jobs/${jobId}`);
      const data = await response.json();
      if (response.ok) {
        dispatch(fetchJobSuccess(data))}};


     export const editJob = (jobId, updatedData) => async (dispatch) => {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    if (response.ok) {
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

  // Reducer function
  const jobReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_JOBS_SUCCESS:
        return { ...state, loading: false, jobs: action.payload, error: null };
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
      case FETCH_JOBS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export default jobReducer;
