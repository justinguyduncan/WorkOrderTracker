// userDepartment.js

// Action types
export const FETCH_USER_DEPARTMENTS_SUCCESS = 'FETCH_USER_DEPARTMENTS_SUCCESS';

// Action creator
export const fetchUserDepartmentsSuccess = (departments) => ({
  type: FETCH_USER_DEPARTMENTS_SUCCESS,
  payload: departments,
});

// Thunk action to fetch user department information
export const fetchUserDepartments = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/user_departments/${userId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(fetchUserDepartmentsSuccess(data.user_departments));
    }
  } catch (error) {
    console.error('Error fetching user departments:', error);
  }
};




const initialState = {
    departments: [],
  };

  const userDepartmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_DEPARTMENTS_SUCCESS:
        return {
          ...state,
          departments: action.payload,
        };
      default:
        return state;
    }
  };

  export default userDepartmentReducer;
