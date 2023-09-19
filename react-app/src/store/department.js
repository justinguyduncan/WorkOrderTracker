const initialState = {
    departments: [],
  };

  // Action types
export const CREATE_DEPARTMENT_SUCCESS = 'CREATE_DEPARTMENT_SUCCESS';
export const FETCH_DEPARTMENTS_SUCCESS = 'FETCH_DEPARTMENTS_SUCCESS';
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS';
export const EDIT_DEPARTMENT_SUCCESS = 'EDIT_DEPARTMENT_SUCCESS';
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS';

// Action creators
export const createDepartmentSuccess = (department) => ({
  type: CREATE_DEPARTMENT_SUCCESS,
  payload: department,
});

export const fetchDepartmentsSuccess = (departments) => ({
  type: FETCH_DEPARTMENTS_SUCCESS,
  payload: departments,
});

export const fetchDepartmentSuccess = (department) => ({
  type: FETCH_DEPARTMENT_SUCCESS,
  payload: department,
});

export const editDepartmentSuccess = (updatedDepartment) => ({
  type: EDIT_DEPARTMENT_SUCCESS,
  payload: updatedDepartment,
});

export const deleteDepartmentSuccess = (departmentId) => ({
  type: DELETE_DEPARTMENT_SUCCESS,
  payload: departmentId,
});

// Thunk action creators
export const createDepartment = (departmentData) => async (dispatch) => {
  const response = await fetch('/api/departments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(departmentData),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(createDepartmentSuccess(data));
  }
};

export const fetchDepartments = () => async (dispatch) => {
  const response = await fetch('/api/departments');
  const data = await response.json();
  if (response.ok) {
    dispatch(fetchDepartmentsSuccess(data.departments));
  }
};

export const fetchDepartment = (departmentId) => async (dispatch) => {
  const response = await fetch(`/api/departments/${departmentId}`);
  const data = await response.json();
  if (response.ok) {
    dispatch(fetchDepartmentSuccess(data.department));
  }
};

export const editDepartment = (departmentId, updatedData) => async (dispatch) => {
  const response = await fetch(`/api/departments/${departmentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(editDepartmentSuccess(data));
  }
};

export const deleteDepartment = (departmentId) => async (dispatch) => {
  const response = await fetch(`/api/departments/${departmentId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteDepartmentSuccess(departmentId));
  }
};


const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DEPARTMENTS_SUCCESS:
        return { ...state, loading: false, departments: action.payload, error: null };
      case CREATE_DEPARTMENT_SUCCESS:
        return { ...state, departments: [...state.departments, action.payload], error: null };
      case FETCH_DEPARTMENT_SUCCESS:
        return { ...state, loading: false, departments: [...state.departments, action.payload], error: null };
      case EDIT_DEPARTMENT_SUCCESS:
        const updatedDepartmentIndex = state.departments.findIndex(
          (department) => department.id === action.payload.id
        );
        const updatedDepartments = [...state.departments];
        if (updatedDepartmentIndex !== -1) {
          updatedDepartments[updatedDepartmentIndex] = action.payload;
        }
        return { ...state, departments: updatedDepartments, error: null };
      case DELETE_DEPARTMENT_SUCCESS:
        return {
          ...state,
          departments: state.departments.filter((department) => department.id !== action.payload),
          error: null,
        };
      default:
        return state;
    }
  };

  export default departmentReducer;
